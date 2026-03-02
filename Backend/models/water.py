from database.db import db
import datetime

class WaterQuality(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    source = db.Column(db.String(100))
    location = db.Column(db.String(100))
    ph = db.Column(db.Float)
    turbidity = db.Column(db.Float)
    worker_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    status = db.Column(db.String(20), default='submitted')

    def to_dict(self):
        return {
            "id": self.id,
            "source": self.source,
            "location": self.location,
            "ph": self.ph,
            "turbidity": self.turbidity,
            "worker_id": self.worker_id,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "status": self.status
        }
