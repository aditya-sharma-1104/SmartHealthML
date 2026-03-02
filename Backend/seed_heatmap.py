from app import app
from database.db import db
from models.prediction import Prediction
import datetime

def seed_heatmap():
    with app.app_context():
        data = [
            ('Karnataka', 'HIGH', 0.85),
            ('Bihar', 'MODERATE', 0.72),
            ('Goa', 'LOW', 0.35),
            ('Punjab', 'HIGH', 0.88),
            ('Kerala', 'MODERATE', 0.65),
            ('Gujarat', 'LOW', 0.41),
            ('West Bengal', 'HIGH', 0.90),
            ('Rajasthan', 'MODERATE', 0.55),
            ('Telangana', 'HIGH', 0.82),
            ('Odisha', 'MODERATE', 0.60)
        ]
        
        for state, level, prob in data:
            p = Prediction(
                state=state,
                month=datetime.datetime.now().month,
                rainfall=200,
                ph=7.0,
                bod=10.0,
                nitrate=20.0,
                temp=30.0,
                risk_level=level,
                probability=prob
            )
            db.session.add(p)
        
        db.session.commit()
        print("Heatmap verification data added successfully!")

if __name__ == "__main__":
    seed_heatmap()
