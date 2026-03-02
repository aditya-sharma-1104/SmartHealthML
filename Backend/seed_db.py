from app import app
from database.db import db
from models.user import User
from models.case import Case
from models.alert import Alert
import datetime

def seed():
    with app.app_context():
        # Create tables
        db.create_all()

        # Add Admin
        if not User.query.filter_by(email="admin@system.com").first():
            admin = User(name="Super Admin", email="admin@system.com", role="admin")
            admin.set_password("admin123")
            db.session.add(admin)

        # Add Health Officer
        if not User.query.filter_by(email="officer@health.gov").first():
            officer = User(name="Dr. Sarah Connor", email="officer@health.gov", role="health_officer")
            officer.set_password("officer123")
            db.session.add(officer)

        # Add ASHA Worker
        if not User.query.filter_by(email="worker@health.gov").first():
            worker = User(name="Anita Devi", email="worker@health.gov", role="asha_worker")
            worker.set_password("worker123")
            db.session.add(worker)

        # Add Mock Cases for Stats
        if Case.query.count() == 0:
            officer = User.query.filter_by(role="health_officer").first()
            for i in range(1, 13): # One case for each month
                case = Case(
                    patient_name=f"Patient {i}",
                    age=20+i,
                    village=f"Village {chr(65+i%5)}",
                    disease_type="Flu" if i % 2 == 0 else "Dengue",
                    severity="high" if i % 3 == 0 else "medium",
                    status="active",
                    worker_id=officer.id if officer else 1,
                    created_at=datetime.datetime(2024, i, 1)
                )
                db.session.add(case)

        # Add Mock Alert
        if Alert.query.count() == 0:
            alert1 = Alert(
                title="Seasonal Flu Warning",
                description="Cases rising in Sector 4. Please wear masks in crowded areas.",
                severity="medium",
                status="active"
            )
            alert2 = Alert(
                title="Water Quality Advisory",
                description="Boil drinking water in districts 7 & 8 until further notice.",
                severity="high",
                status="active"
            )
            db.session.add(alert1)
            db.session.add(alert2)

        db.session.commit()
        print("Database seeded successfully!")

if __name__ == "__main__":
    seed()
