from datetime import datetime
from database.db import db

class Prediction(db.Model):
    __tablename__ = 'predictions'
    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String(100))
    month = db.Column(db.Integer)
    rainfall = db.Column(db.Float)
    ph = db.Column(db.Float)
    bod = db.Column(db.Float)
    nitrate = db.Column(db.Float)
    temp = db.Column(db.Float)
    risk_level = db.Column(db.String(50))
    probability = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "state": self.state,
            "month": self.month,
            "rainfall": self.rainfall,
            "ph": self.ph,
            "bod": self.bod,
            "nitrate": self.nitrate,
            "temp": self.temp,
            "risk_level": self.risk_level,
            "probability": self.probability,
            "created_at": self.created_at.isoformat()
        }
