import joblib
import pandas as pd

model = joblib.load("c:/Users/adity/Documents/All Projects/SmartHealthML/models/outbreak_model_v4.pkl")
le = joblib.load("c:/Users/adity/Documents/All Projects/SmartHealthML/models/risk_label_encoder_v4.pkl")

safe_input = pd.DataFrame([{
    "state": "Maharashtra",
    "month": 1,
    "rainfall": 10,
    "ph": 7.0,
    "bod": 0.8,
    "nitrate": 0.2,
    "temp": 18
}])

pred_code = model.predict(safe_input)[0]
pred_label = le.inverse_transform([pred_code])[0]
probs = model.predict_proba(safe_input)[0]

print(f"Prediction: {pred_label}")
print(f"Probabilities: {dict(zip(le.classes_, [round(p, 4) for p in probs]))}")
