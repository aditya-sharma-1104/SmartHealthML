from database.db import db

class DiseaseCase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_name = db.Column(db.String(100))
    age = db.Column(db.Integer)
    village = db.Column(db.String(100))
    symptoms = db.Column(db.String(200))
    severity = db.Column(db.String(50))
