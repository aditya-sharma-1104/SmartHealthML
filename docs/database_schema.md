# Database Schema

SmartHealthML uses **SQLite** with **SQLAlchemy ORM** for lightweight, persistent data storage.

## Models

### 1. Prediction (`predictions`)
Stores every prediction made by the system.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | Integer | Primary Key |
| `state` | String(100) | State or region name |
| `month` | Integer | Month of prediction (1-12) |
| `rainfall` | Float | Rainfall in mm |
| `ph` | Float | Water pH level |
| `bod` | Float | Biological Oxygen Demand |
| `nitrate` | Float | Nitrate levels |
| `temp` | Float | Temperature in Celsius |
| `risk_level` | String(50) | `LOW`, `MODERATE`, or `HIGH` |
| `probability`| Float | Model confidence score (0.0 - 1.0) |
| `created_at` | DateTime | Timestamp of record creation |

### 2. Alert (`alerts`)
Stores alerts triggered by high-risk predictions.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | Integer | Primary Key |
| `state` | String(100) | Affected state |
| `message` | String(300) | Alert notification text |
| `risk_level` | String(50) | Severity of the alert |
| `created_at` | DateTime | Timestamp of alert |

### 3. WaterQuality (`water_quality`)
Stores manual water quality surveillance data.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | Integer | Primary Key |
| `source` | String(100) | Water source (e.g., River, Borewell) |
| `location` | String(100) | Physical location |
| `ph` | Float | Recorded pH level |
| `turbidity` | Float | Water clarity metric |

### 4. DiseaseCase (`disease_cases`)
Stores incident reports of disease cases.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | Integer | Primary Key |
| `patient_name`| String(100) | (Optional/Redacted in Prod) |
| `age` | Integer | Patient age |
| `village` | String(100) | Location of the case |
| `symptoms` | String(200) | Description of symptoms |
| `severity` | String(50) | `Mild`, `Moderate`, `Severe` |

---

## Database Management
The database is initialized automatically on application startup in `app.py`:
```python
with app.app_context():
    db.create_all()
```
The data file is located at `Backend/instance/smarthealth.db` (or as configured in `SQLALCHEMY_DATABASE_URI`).
