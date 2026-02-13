import pandas as pd
import numpy as np
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler, LabelEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import classification_report, accuracy_score

# 1. Load Dataset
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
data_path = os.path.join(BASE_DIR, "data", "idsp_synthetic_v2.csv")
df = pd.read_csv(data_path)

# 2. Stricter Risk Rules (from v4)
def classify_risk_v4(row):
    score = 0
    if row["rainfall"] > 250: score += 2
    if row["bod"] > 4: score += 2
    if row["nitrate"] > 3: score += 2
    if row["month"] in [6, 7, 8, 9]: score += 1
        
    if score >= 5:
        return "HIGH"
    elif score >= 3:
        return "MODERATE"
    else:
        return "LOW"

print("Applying classification rules...")
df["risk_level"] = df.apply(classify_risk_v4, axis=1)

# 3. Encode Target
le = LabelEncoder()
df["risk_encoded"] = le.fit_transform(df["risk_level"])

# 4. Feature Engineering
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

# 5. Model with Calibration (v5)
base_clf = RandomForestClassifier(
    n_estimators=300,
    max_depth=12,
    class_weight="balanced",
    random_state=42
)

# Using CalibratedClassifierCV to refine probabilities
calibrated_clf = CalibratedClassifierCV(estimator=base_clf, method='sigmoid', cv=5)

model = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("classifier", calibrated_clf)
])

# 6. Split and Train
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

print("\nTraining v5 calibrated model...")
model.fit(X_train, y_train)

# 7. Evaluate
y_pred = model.predict(X_test)
print("\nAccuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=le.classes_))

# 8. Save
model_dir = os.path.join(BASE_DIR, "models")
model_path = os.path.join(model_dir, "outbreak_model_v5.pkl")
encoder_path = os.path.join(model_dir, "risk_label_encoder_v5.pkl")

joblib.dump(model, model_path)
joblib.dump(le, encoder_path)

print(f"\nModel saved to {model_path}")
print(f"Encoder saved to {encoder_path}")
