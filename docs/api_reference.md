# API Reference

SmartHealthML provides a RESTful API for outbreak prediction, historical data analysis, and alert management.

## Base URL
- **Local**: `http://localhost:5000`
- **Production**: `https://smarthealthml.onrender.com`

---

## Prediction Endpoints

### 1. Predict Outbreak Risk
Predicts the risk level based on environmental factors.

- **URL**: `/predict`
- **Method**: `POST`
- **Body**:
```json
{
  "state": "Maharashtra",
  "month": 7,
  "rainfall": 300.5,
  "ph": 6.8,
  "bod": 4.5,
  "nitrate": 3.2,
  "temperature": 28.5
}
```
- **Response (200 OK)**:
```json
{
  "risk_level": "HIGH",
  "probability": 0.88,
  "confidence": "VERY HIGH",
  "factors": ["Rainfall", "BOD Level", "Month"],
  "alert": true
}
```

### 2. Fetch Heatmap Data
Retrieves recent prediction data grouped by state for map visualization.

- **URL**: `/heatmap-data`
- **Method**: `GET`
- **Response**:
```json
[
  {
    "state": "Maharashtra",
    "risk_level": "HIGH",
    "probability": 0.88
  }
]
```

### 3. Report Summary
Returns aggregate statistics of all predictions stored in the database.

- **URL**: `/report-summary`
- **Method**: `GET`
- **Response**:
```json
{
  "total_predictions": 150,
  "high_risk": 20,
  "moderate_risk": 45,
  "low_risk": 85
}
```

---

## Alerts Endpoints

### 1. List Alerts
Fetches a list of triggered high-risk alerts.

- **URL**: `/alerts`
- **Method**: `GET`
- **Response**:
```json
[
  {
    "id": 1,
    "state": "Maharashtra",
    "message": "High outbreak risk detected in Maharashtra",
    "risk_level": "HIGH",
    "created_at": "2024-02-14T12:00:00Z"
  }
]
```

---

## Environmental & Case Data

### 1. Report Case
Submits a new disease case report.
- **URL**: `/cases/report`
- **Method**: `POST`

### 2. Add Water Quality Record
Submits a new water quality measurement.
- **URL**: `/water/report`
- **Method**: `POST`
