# Machine Learning Model Guide

SmartHealthML utilizes a machine learning engine to quantify disease outbreak risks.

## Model Overview
- **Type**: Random Forest Classifier
- **Calibration**: Calibrated using `CalibratedClassifierCV` (Sigmoid method) to provide reliable probability scores.
- **Library**: `scikit-learn`
- **Storage**: `models/outbreak_model_v5.pkl`

## Features
The model consumes 7 primary features to estimate risk:

1.  **Month**: Seasonal variations in disease patterns.
2.  **Rainfall**: High rainfall often correlates with waterborne disease spikes.
3.  **pH Level**: Water acidity/alkalinity affecting pathogen survival.
4.  **BOD Level**: Biological Oxygen Demand (indicator of organic pollution).
5.  **Nitrate Level**: Chemical indicator of water contamination.
6.  **Temperature**: High temperatures can accelerate bacterial growth.
7.  **State**: Regional historical variances (Categorical).

## Training Process
The training pipeline is automated via `scripts/training/train_model.py`.

### Pipeline Steps:
1.  **Preprocessing**:
    - Numerical features are scaled using `StandardScaler`.
    - Categorical features (State) are encoded via `OneHotEncoder`.
2.  **Model Configuration**:
    - `n_estimators`: 300
    - `max_depth`: 12
    - `class_weight`: "balanced" (to handle risk level imbalance).
3.  **Calibration**:
    - Wrapped in a 5-fold cross-validation calibration layer to ensure the output `predict_proba` values are well-aligned with real-world frequencies.

## Explainability (XAI)
In `Backend/routes/predict_routes.py`, the system extracts `feature_importances_` from the base Random Forest estimator. For every prediction, the top 3 contributing factors are identified and returned to the frontend to help health officials understand *why* a specific risk level was assigned.

## Retraining the Model
To update the model with new data:
1.  Update `data/idsp_synthetic_v2.csv` with fresh records.
2.  Run the training script:
    ```bash
    python scripts/training/train_model.py
    ```
3.  Restart the Backend service to load the new `.pkl` files.
