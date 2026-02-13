import pandas as pd
import numpy as np
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler, LabelEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

# 1. Load Dataset
data_path = "c:/Users/adity/Documents/All Projects/SmartHealthML/data/idsp_synthetic_v2.csv"
df = pd.read_csv(data_path)

# 2. Define Risk Rules (Domain-based)
def classify_risk(row):
    score = 0
    
    # HIGH RISK criteria
    if row["rainfall"] > 250:
        score += 2
    if row["bod"] > 4:
        score += 2
    if row["nitrate"] > 3:
        score += 2
    if row["month"] in [6, 7, 8, 9]:
        score += 1
        
    if score >= 5:
        return "HIGH"
    elif score >= 2:
        return "MODERATE"
    else:
        return "LOW"

print("Applying risk classification rules...")
df["risk_level"] = df.apply(classify_risk, axis=1)

print("\nRisk distribution:")
print(df["risk_level"].value_counts())

# 3. Encode Target
le = LabelEncoder()
df["risk_encoded"] = le.fit_transform(df["risk_level"])

# 4. ML Pipeline
X = df[["state", "month", "rainfall", "ph", "bod", "nitrate", "temp"]]
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

print("\nTraining v3 model...")
model.fit(X_train, y_train)

# 6. Evaluate
y_pred = model.predict(X_test)
print("\nAccuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=le.classes_))

# 7. Save Model + Encoder
model_dir = "c:/Users/adity/Documents/All Projects/SmartHealthML/models"
if not os.path.exists(model_dir):
    os.makedirs(model_dir)

model_path = os.path.join(model_dir, "outbreak_model_v3.pkl")
encoder_path = os.path.join(model_dir, "risk_label_encoder.pkl")

joblib.dump(model, model_path)
joblib.dump(le, encoder_path)

print(f"\nModel saved to {model_path}")
print(f"Encoder saved to {encoder_path}")
