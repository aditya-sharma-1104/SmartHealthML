import joblib
import pandas as pd

# Load trained model
model = joblib.load("models/outbreak_model.pkl")

# Same state encoding used during training
state_mapping = {
    "Assam": 0,
    "Odisha": 1,
    "Kerala": 2,
    "Tamil Nadu": 3,
    "Maharashtra": 4,
    "Jharkhand": 5,
    "Gujarat": 6,
    "Uttar Pradesh": 7,
    "Chhattisgarh": 8,
    "Jammu & Kashmir": 9
}

def predict_outbreak(state, month, rainfall, ph, bod, nitrate, temp):

    if state not in state_mapping:
        return "State not found in model training data"

    state_encoded = state_mapping[state]

    # Compute Risk Score exactly like in training
    risk_score = rainfall * 0.4 + bod * 0.3 + nitrate * 0.2 + temp * 0.1

    input_data = pd.DataFrame([[
        state_encoded,
        month,
        rainfall,
        ph,
        bod,
        nitrate,
        temp,
        risk_score
    ]], columns=[
        "State",
        "Month",
        "Rainfall",
        "pH",
        "BOD",
        "Nitrate",
        "Monsoon_Temp",
        "Risk_Score"
    ])

    prediction = model.predict(input_data)

    return "HIGH RISK of Outbreak" if prediction[0] == 1 else "LOW RISK"


# Example Test
result = predict_outbreak(
    state="Assam",
    month=7,
    rainfall=1200,
    ph=7.2,
    bod=3,
    nitrate=1,
    temp=30
)

print("Prediction:", result)
