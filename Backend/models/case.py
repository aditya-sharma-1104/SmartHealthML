from database.db import db

class Case(db.Model):
    __tablename__ = 'cases'
    id = db.Column(db.Integer, primary_key=True)
    patient_name = db.Column(db.String(100))
    age = db.Column(db.Integer)
    village = db.Column(db.String(100))
    symptoms = db.Column(db.String(200))
    severity = db.Column(db.String(50))
    disease_type = db.Column(db.String(50))
    worker_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    status = db.Column(db.String(20), default='submitted')

    def to_dict(self):
        return {
            "id": self.id,
            "patient_name": self.patient_name,
            "age": self.age,
            "village": self.village,
            "symptoms": self.symptoms,
            "severity": self.severity,
            "disease_type": self.disease_type,
            "worker_id": self.worker_id,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "status": self.status
        }
