from database.db import db

class WaterQuality(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    source = db.Column(db.String(100))
    location = db.Column(db.String(100))
    ph = db.Column(db.Float)
    turbidity = db.Column(db.Float)
