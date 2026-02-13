import pandas as pd
import joblib
import json

# Load the model
MODEL_PATH = "c:/Users/adity/Documents/All Projects/SmartHealthML/models/outbreak_model_v2.pkl"
model = joblib.load(MODEL_PATH)

# Test data (similar to what the frontend/backend would send)
test_inputs = [
    {"state": "Maharashtra", "month": 7, "rainfall": 400, "ph": 7.2, "bod": 15.0, "nitrate": 40.0, "temperature": 35},
    {"state": "Rajasthan", "month": 1, "rainfall": 10, "ph": 7.0, "bod": 2.0, "nitrate": 5.0, "temperature": 20}
]

print("Starting Direct Model Verification...")
print("-" * 60)

for i, data in enumerate(test_inputs):
    # Prepare DataFrame (logic from predict_routes.py)
    df = pd.DataFrame([{
        "state": data.get("state", "Maharashtra"),
        "month": int(data.get("month", 1)),
        "rainfall": float(data.get("rainfall", 0)),
        "ph": float(data.get("ph", 7.0)),
        "bod": float(data.get("bod", 0)),
        "nitrate": float(data.get("nitrate", 0)),
        "temp": float(data.get("temperature", 25))
    }])

    # Predict
    prediction = model.predict(df)[0]
    probabilities = model.predict_proba(df)[0]
    outbreak_prob = float(probabilities[1])

    risk_prediction = "HIGH RISK" if prediction == 1 else "LOW RISK"
    risk_score = int(outbreak_prob * 100)
    risk_level = "High" if outbreak_prob > 0.5 else "Low"

    print(f"Test Case {i+1}: {data['state']}, Month {data['month']}")
    print(f"  Prediction: {risk_prediction}")
    print(f"  Confidence: {risk_score}%")
    print(f"  Risk Level: {risk_level}")
    print("-" * 30)

print("\nVerification Complete.")
