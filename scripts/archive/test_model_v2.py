import joblib
import pandas as pd
import os

# Adjust path based on execution location
model_path = "../models/outbreak_model_v2.pkl"
if not os.path.exists(model_path):
    # Try absolute path if relative fails
    model_path = "c:/Users/adity/Documents/All Projects/SmartHealthML/models/outbreak_model_v2.pkl"

# Load model
model = joblib.load(model_path)

# Create sample input (must match training features)
sample = pd.DataFrame([{
    "state": "Assam",
    "month": 7,
    "rainfall": 220,
    "ph": 7.1,
    "bod": 3.0,
    "nitrate": 1.5,
    "temp": 34
}])

# Predict
prediction = model.predict(sample)
probability = model.predict_proba(sample)[0][1]

print("Prediction:", prediction[0])
print("Probability:", probability)
