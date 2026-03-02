from app import app
from database.db import db
import os

def migrate():
    with app.app_context():
        print("Dropping users table to update schema...")
        # SQLite doesn't support easy ALTER TABLE for adding non-null columns without defaults,
        # and since this is dev, dropping and recreating is easiest.
        db.session.execute(db.text("DROP TABLE IF EXISTS users"))
        db.session.commit()
        
        print("Recreating all tables...")
        db.create_all()
        
        from models.user import User
        from models.log import SystemLog
        
        # Add initial log
        if SystemLog.query.count() == 0:
            from utils.logger import log_event
            log_event("INFO", "SYSTEM", "Database schema updated and system initialized.")
        if not User.query.filter_by(email="admin@system.com").first():
            print("Adding default admin...")
            admin = User(name="Super Admin", email="admin@system.com", role="admin", status="Active")
            admin.set_password("admin123")
            db.session.add(admin)
            db.session.commit()
            print("Admin added.")

if __name__ == "__main__":
    migrate()
