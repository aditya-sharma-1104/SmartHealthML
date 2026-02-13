from datetime import datetime
from database.db import db

class Alert(db.Model):
    __tablename__ = 'alerts'
    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String(100))
    message = db.Column(db.String(300))
    risk_level = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
