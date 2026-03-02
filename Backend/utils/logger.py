from database.db import db
from models.log import SystemLog

def log_event(log_type, module, message):
    """
    Records a system event to the database.
    log_type: 'INFO', 'WARNING', or 'ERROR'
    """
    try:
        new_log = SystemLog(type=log_type, module=module, message=message)
        db.session.add(new_log)
        db.session.commit()
    except Exception as e:
        print(f"Error recording log: {e}")
        db.session.rollback()
