import pandas as pd
import numpy as np
import joblib
import os
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, roc_auc_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.utils.class_weight import compute_class_weight

# 1. Load Dataset
data_path = "c:/Users/adity/Documents/All Projects/SmartHealthML/data/idsp_synthetic_v2.csv"
df = pd.read_csv(data_path)

# 2. Select Features
features = ["state", "month", "rainfall", "ph", "bod", "nitrate", "temp"]
target = "outbreak"

X = df[features]
y = df[target]

# 3. Handle Class Imbalance
print("Class distribution:")
print(y.value_counts())

class_weights = compute_class_weight(
    class_weight='balanced',
    classes=np.unique(y),
    y=y
)
class_weight_dict = dict(zip(np.unique(y), class_weights))
print(f"Class weights: {class_weight_dict}")

# 4. Feature Engineering & Preprocessing
categorical = ["state"]
numeric = ["month", "rainfall", "ph", "bod", "nitrate", "temp"]

preprocessor = ColumnTransformer(
    transformers=[
        ("num", StandardScaler(), numeric),
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical)
    ]
)

# 5. Split Properly
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# 6. Model Training & Tuning
model = RandomForestClassifier(
    class_weight=class_weight_dict,
    random_state=42
)

pipeline = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("classifier", model)
])

param_grid = {
    "classifier__n_estimators": [100, 200], # Reduced for faster execution in this environment
    "classifier__max_depth": [None, 10],
    "classifier__min_samples_split": [2, 5],
    "classifier__min_samples_leaf": [1, 2]
}

print("Running Grid Search...")
grid_search = GridSearchCV(
    pipeline,
    param_grid,
    cv=5,
    scoring="roc_auc",
    n_jobs=-1
)

grid_search.fit(X_train, y_train)
best_model = grid_search.best_estimator_

# 7. Evaluate
y_pred = best_model.predict(X_test)
y_prob = best_model.predict_proba(X_test)[:,1]

print("\nClassification Report:")
print(classification_report(y_test, y_pred))
print("ROC AUC:", roc_auc_score(y_test, y_prob))

# 8. Cross Validation
cv_scores = cross_val_score(best_model, X, y, cv=5, scoring="roc_auc")
print("CV ROC AUC Mean:", cv_scores.mean())

# 9. Save Model
model_dir = "c:/Users/adity/Documents/All Projects/SmartHealthML/models"
if not os.path.exists(model_dir):
    os.makedirs(model_dir)

model_path = os.path.join(model_dir, "outbreak_model_v2.pkl")
joblib.dump(best_model, model_path)
print(f"\nModel saved to {model_path}")
