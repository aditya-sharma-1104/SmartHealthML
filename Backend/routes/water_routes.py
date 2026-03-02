from flask import Blueprint, request, jsonify
from models.water import WaterQuality
from database.db import db

water_bp = Blueprint("water", __name__, url_prefix="/api/water")

@water_bp.route("/report", methods=["POST"])
def water_report():
    data = request.json
    new = WaterQuality(
        source=data.get("source"),
        location=data.get("location"),
        ph=data.get("ph"),
        turbidity=data.get("turbidity"),
        worker_id=data.get("worker_id")
    )
    db.session.add(new)
    db.session.commit()
    return jsonify({"message": "Water Data Saved"})

@water_bp.route("/my-submissions/<int:worker_id>", methods=["GET"])
def get_my_water_reports(worker_id):
    reports = WaterQuality.query.filter_by(worker_id=worker_id).order_by(WaterQuality.created_at.desc()).all()
    return jsonify([r.to_dict() for r in reports])
