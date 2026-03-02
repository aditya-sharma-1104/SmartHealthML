from database.db import db
from datetime import datetime

class SystemLog(db.Model):
    __tablename__ = "system_logs"

    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    type = db.Column(db.String(20), nullable=False)  # INFO, WARNING, ERROR
    module = db.Column(db.String(50), nullable=False) # AUTH, API, DB, etc.
    message = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "timestamp": self.timestamp.isoformat(),
            "type": self.type,
            "module": self.module,
            "message": self.message
        }
