from flask import Blueprint, request, jsonify
import joblib
import numpy as np

import pandas as pd
import joblib

predict_bp = Blueprint("predict", __name__, url_prefix="/api")

from database.db import db
from models.prediction import Prediction
from models.alert import Alert

import os

# Base directory relative to this file (Backend/routes/predict_routes.py)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Load the v5 calibrated model and encoder from the root models/ folder
MODEL_PATH = os.path.join(BASE_DIR, "models", "outbreak_model_v5.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "models", "risk_label_encoder_v5.pkl")

model = joblib.load(MODEL_PATH)
le = joblib.load(ENCODER_PATH)

STATE_COORDS = {
    "Andhra Pradesh": (15.9129, 79.7400), "Arunachal Pradesh": (28.2180, 94.7278),
    "Assam": (26.2006, 92.9376), "Bihar": (25.0961, 85.3131),
    "Chhattisgarh": (21.2787, 81.8661), "Goa": (15.2993, 74.1240),
    "Gujarat": (22.2587, 71.1924), "Haryana": (29.0588, 76.0856),
    "Himachal Pradesh": (31.1048, 77.1734), "Jharkhand": (23.6102, 85.2799),
    "Karnataka": (15.3173, 75.7139), "Kerala": (10.8505, 76.2711),
    "Madhya Pradesh": (22.9734, 78.6569), "Maharashtra": (19.7515, 75.7139),
    "Manipur": (24.6637, 93.9063), "Meghalaya": (25.4670, 91.3662),
    "Mizoram": (23.1645, 92.9376), "Nagaland": (26.1584, 94.5624),
    "Odisha": (20.9517, 85.0985), "Punjab": (31.1471, 75.3412),
    "Rajasthan": (27.0238, 74.2179), "Sikkim": (27.5330, 88.5122),
    "Tamil Nadu": (11.1271, 78.6569), "Telangana": (18.1124, 79.0193),
    "Tripura": (23.9408, 91.9882), "Uttar Pradesh": (26.8467, 80.9462),
    "Uttarakhand": (30.0668, 79.0193), "West Bengal": (22.9868, 87.8550),
    "Delhi": (28.7041, 77.1025), "Jammu and Kashmir": (33.7782, 76.5762),
    "Ladakh": (34.1526, 77.5771)
}

@predict_bp.route("/predict", methods=["POST"], strict_slashes=False)
def predict():
    data = request.json
    
    # Directly use data dict as DataFrame
    df = pd.DataFrame([data])
    
    # Get probabilities for each class
    probs = model.predict_proba(df)[0]
    prob_dict = dict(zip(le.classes_, probs))
    
    # Professional Confidence Logic
    max_prob = float(max(probs))
    if max_prob > 0.85:
        confidence_band = "VERY HIGH"
    elif max_prob > 0.70:
        confidence_band = "HIGH"
    elif max_prob > 0.55:
        confidence_band = "MODERATE"
    else:
        confidence_band = "LOW"

    # Risk Label based on calibrated probabilities + custom thresholding for safety
    if prob_dict.get("HIGH", 0) > 0.7:
        risk_label = "HIGH"
        final_probability = prob_dict["HIGH"]
    elif prob_dict.get("MODERATE", 0) > 0.6:
        risk_label = "MODERATE"
        final_probability = prob_dict["MODERATE"]
    else:
        risk_label = "LOW"
        final_probability = prob_dict.get("LOW", 1.0)

    # Explainable AI (XAI) - Feature Importance Contribution
    try:
        calibrated_clf = model.named_steps["classifier"]
        rf_model = calibrated_clf.calibrated_classifiers_[0].estimator
        importances = rf_model.feature_importances_
        feature_names = ["Month", "Rainfall", "pH Level", "BOD Level", "Nitrate Level", "Temperature"]
        top_indices = np.argsort(importances)[::-1][:3]
        factors = [f"{feature_names[i]}" for i in top_indices if i < len(feature_names)]
    except Exception as e:
        print(f"XAI Error: {e}")
        factors = ["Environmental Conditions"]

    # Save to Database
    try:
        state_name = data.get("state", "Unknown")
        default_lat, default_lon = STATE_COORDS.get(state_name, (20.5937, 78.9629))
        
        # Robust coordinate fallback
        lat = data.get("latitude")
        lon = data.get("longitude")
        
        if lat is None or lat == "": lat = default_lat
        if lon is None or lon == "": lon = default_lon

        new_prediction = Prediction(
            state=state_name,
            month=int(data.get("month", 1)),
            rainfall=float(data.get("rainfall", 0)),
            ph=float(data.get("ph", 7.0)),
            bod=float(data.get("bod", 0)),
            nitrate=float(data.get("nitrate", 0)),
            temp=float(data.get("temp", data.get("temperature", 25))),
            risk_level=risk_label,
            probability=round(float(final_probability), 2),
            latitude=float(lat),
            longitude=float(lon)
        )
        db.session.add(new_prediction)
        
        # Epidemic Alert System
        if risk_label == "HIGH":
            alert = Alert(
                title=f"High Risk: {state_name}",
                description=f"Automated surveillance detected high outbreak risk in {state_name}.",
                severity="high"
            )
            db.session.add(alert)
            
        db.session.commit()
    except Exception as e:
        print(f"DB Error: {e}")

    return jsonify({
        "state": state_name,
        "latitude": float(lat),
        "longitude": float(lon),
        "risk_level": risk_label,
        "probability": round(float(final_probability), 2),
        "confidence": confidence_band,
        "factors": factors,
        "alert": (risk_label == "HIGH")
    })

@predict_bp.route("/heatmap-data", methods=["GET"])
def heatmap_data():
    from datetime import datetime, timedelta
    recent = datetime.utcnow() - timedelta(days=7)
    
    predictions = Prediction.query.filter(Prediction.created_at >= recent).order_by(Prediction.created_at.desc()).all()
    
    return jsonify([
        {
            "state": p.state,
            "risk_level": p.risk_level,
            "probability": p.probability,
            "latitude": p.latitude,
            "longitude": p.longitude
        } for p in predictions
    ])

@predict_bp.route("/report-summary", methods=["GET"])
def report_summary():
    total = Prediction.query.count()
    high = Prediction.query.filter_by(risk_level="HIGH").count()
    moderate = Prediction.query.filter_by(risk_level="MODERATE").count()
    low = Prediction.query.filter_by(risk_level="LOW").count()

    # Fetch 10 most recent predictions
    recent_preds = Prediction.query.order_by(Prediction.created_at.desc()).limit(10).all()
    recent_predictions = [
        {
            "id": p.id,
            "state": p.state,
            "risk_level": p.risk_level,
            "probability": p.probability,
            "date": p.created_at.strftime("%Y-%m-%d %H:%M:%S")
        } for p in recent_preds
    ]

    return jsonify({
        "total_predictions": total,
        "high_risk": high,
        "moderate_risk": moderate,
        "low_risk": low,
        "recent_predictions": recent_predictions
    })

