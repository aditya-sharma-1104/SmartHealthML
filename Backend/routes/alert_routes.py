from flask import Blueprint, jsonify
from models.alert import Alert

alert_bp = Blueprint("alerts", __name__)

@alert_bp.route("/alerts", methods=["GET"])
def get_alerts():
    alerts = Alert.query.order_by(Alert.created_at.desc()).limit(50).all()

    return jsonify([
        {
            "id": a.id,
            "state": a.state,
            "message": a.message,
            "risk_level": a.risk_level,
            "created_at": a.created_at.isoformat()
        } for a in alerts
    ])
