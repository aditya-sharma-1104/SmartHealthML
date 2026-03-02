from database.db import db

class LabReport(db.Model):
    __tablename__ = 'lab_reports'
    
    id = db.Column(db.Integer, primary_key=True)
    report_id = db.Column(db.String(50), unique=True, nullable=False)
    patient_id = db.Column(db.String(50), db.ForeignKey('patients.patient_id'), nullable=False)
    test_name = db.Column(db.String(100), nullable=False)
    result = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), nullable=False, default='Completed')
    date = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "report_id": self.report_id,
            "patient_id": self.patient_id,
            "test_name": self.test_name,
            "result": self.result,
            "status": self.status,
            "date": self.date
        }
