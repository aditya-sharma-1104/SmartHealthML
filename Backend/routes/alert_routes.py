from flask import Blueprint, jsonify
from models.alert import Alert

alert_bp = Blueprint("alerts", __name__, url_prefix="/api/alerts")

@alert_bp.route("/", methods=["GET"])
def get_alerts():
    alerts = Alert.query.filter_by(status='active').order_by(Alert.created_at.desc()).all()
    return jsonify([a.to_dict() for a in alerts])

@alert_bp.route("/all", methods=["GET"])
def get_all_alerts():
    alerts = Alert.query.order_by(Alert.created_at.desc()).all()
    return jsonify([a.to_dict() for a in alerts])
