from flask import Blueprint, request, jsonify
import joblib
import numpy as np

import pandas as pd
import joblib

predict_bp = Blueprint("predict", __name__)

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
        new_prediction = Prediction(
            state=data.get("state", "Unknown"),
            month=int(data.get("month", 1)),
            rainfall=float(data.get("rainfall", 0)),
            ph=float(data.get("ph", 7.0)),
            bod=float(data.get("bod", 0)),
            nitrate=float(data.get("nitrate", 0)),
            temp=float(data.get("temp", data.get("temperature", 25))),
            risk_level=risk_label,
            probability=round(float(final_probability), 2)
        )
        db.session.add(new_prediction)
        
        # Epidemic Alert System
        if risk_label == "HIGH":
            alert = Alert(
                state=data.get("state", "Unknown"),
                message=f"High outbreak risk detected in {data.get('state', 'Unknown')}",
                risk_level="HIGH"
            )
            db.session.add(alert)
            
        db.session.commit()
    except Exception as e:
        print(f"DB Error: {e}")

    return jsonify({
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
            "probability": p.probability
        } for p in predictions
    ])

@predict_bp.route("/report-summary", methods=["GET"])
def report_summary():
    total = Prediction.query.count()
    high = Prediction.query.filter_by(risk_level="HIGH").count()
    moderate = Prediction.query.filter_by(risk_level="MODERATE").count()
    low = Prediction.query.filter_by(risk_level="LOW").count()

    return jsonify({
        "total_predictions": total,
        "high_risk": high,
        "moderate_risk": moderate,
        "low_risk": low
    })

