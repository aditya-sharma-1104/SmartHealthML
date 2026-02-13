import pandas as pd
import numpy as np
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler, LabelEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix

# 1. Load Dataset
data_path = "c:/Users/adity/Documents/All Projects/SmartHealthML/data/idsp_synthetic_v2.csv"
df = pd.read_csv(data_path)

# 2. Stricter Risk Rules (v4)
def classify_risk_v4(row):
    score = 0
    if row["rainfall"] > 250: score += 2
    if row["bod"] > 4: score += 2
    if row["nitrate"] > 3: score += 2
    if row["month"] in [6, 7, 8, 9]: score += 1
        
    if score >= 5:
        return "HIGH"
    elif score >= 3: # Changed from >= 2 to >= 3 for better separation
        return "MODERATE"
    else:
        return "LOW"

print("Applying stricter v4 rules...")
df["risk_level"] = df.apply(classify_risk_v4, axis=1)

print("\nDistribution (v4):")
print(df["risk_level"].value_counts(normalize=True))

# 3. Encode Target
le = LabelEncoder()
df["risk_encoded"] = le.fit_transform(df["risk_level"])

# 4. ML Pipeline
features = ["state", "month", "rainfall", "ph", "bod", "nitrate", "temp"]
X = df[features]
y = df["risk_encoded"]

numeric_features = ["month", "rainfall", "ph", "bod", "nitrate", "temp"]
categorical_features = ["state"]

preprocessor = ColumnTransformer(
    transformers=[
        ("num", StandardScaler(), numeric_features),
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features)
    ]
)

model = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("classifier", RandomForestClassifier(
        n_estimators=300,
        max_depth=12,
        class_weight="balanced",
        random_state=42
    ))
])

# 5. Split and Train
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

print("\nTraining v4 model...")
model.fit(X_train, y_train)

# 6. Evaluate
y_pred = model.predict(X_test)
print("\nAccuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=le.classes_))

print("\nConfusion Matrix:")
cm = confusion_matrix(y_test, y_pred)
print(pd.DataFrame(cm, index=le.classes_, columns=le.classes_))

# 7. Save Model + Encoder
model_dir = "c:/Users/adity/Documents/All Projects/SmartHealthML/models"
model_path = os.path.join(model_dir, "outbreak_model_v4.pkl")
encoder_path = os.path.join(model_dir, "risk_label_encoder_v4.pkl")

joblib.dump(model, model_path)
joblib.dump(le, encoder_path)

print(f"\nModel saved to {model_path}")

# 8. Sanity Check with "Safe" Input
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
print(f"\nSanity Check (Safe Input):")
print(f"Prediction: {pred_label}")
print(f"Probabilities: {dict(zip(le.classes_, [round(p, 4) for p in probs]))}")
