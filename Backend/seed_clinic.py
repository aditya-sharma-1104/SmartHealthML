from app import app
from database.db import db
from models.patient import Patient
from models.lab_report import LabReport
import random
from datetime import datetime, timedelta

def seed_clinic():
    with app.app_context():
        # Ensure patients exist
        patients = Patient.query.all()
        if not patients:
            print("No patients found. Please upload CSV first or add patients.")
            return

        tests = ["Blood Test", "Malaria Smear", "Typhoid Test", "COVID-19 PCR", "Liver Function"]
        results = ["Negative", "Positive", "Normal", "Elevated", "Detected"]
        
        for i in range(10):
            patient = random.choice(patients)
            report_id = f"LAB-{1000 + i}"
            if not LabReport.query.filter_by(report_id=report_id).first():
                report = LabReport(
                    report_id=report_id,
                    patient_id=patient.patient_id,
                    test_name=random.choice(tests),
                    result=random.choice(results),
                    status="Completed",
                    date=(datetime.now() - timedelta(days=random.randint(0, 10))).strftime("%Y-%m-%d")
                )
                db.session.add(report)
        
        db.session.commit()
        print("Seeded 10 lab reports.")

if __name__ == "__main__":
    seed_clinic()
