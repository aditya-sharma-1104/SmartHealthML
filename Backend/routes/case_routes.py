from flask import Blueprint, request, jsonify
from models.case import Case
from database.db import db
import jwt
from utils.logger import log_event

case_bp = Blueprint("case", __name__, url_prefix="/api/cases")

@case_bp.route("/report", methods=["POST"])
def report_case():
    data = request.json
    new_case = Case(
        patient_name=data.get("patient_name"),
        age=data.get("age"),
        village=data.get("village"),
        symptoms=data.get("symptoms"),
        severity=data.get("severity"),
        disease_type=data.get("disease_type"),
        worker_id=data.get("worker_id")
    )
    db.session.add(new_case)
    db.session.commit()

    log_event("INFO", "CASE_MGR", f"New case reported: {new_case.disease_type} for {new_case.patient_name}")

    return jsonify({"message": "Case Reported Successfully", "case": new_case.to_dict()})

@case_bp.route("/all", methods=["GET"])
def get_all_cases():
    cases = Case.query.all()
    return jsonify([c.to_dict() for c in cases])

@case_bp.route("/my-submissions/<int:worker_id>", methods=["GET"])
def get_my_submissions(worker_id):
    cases = Case.query.filter_by(worker_id=worker_id).order_by(Case.created_at.desc()).all()
    return jsonify([c.to_dict() for c in cases])
