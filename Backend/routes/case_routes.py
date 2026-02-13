from flask import Blueprint, request, jsonify
from models.case import DiseaseCase
from database.db import db

case_bp = Blueprint("case", __name__)

@case_bp.route("/cases/report", methods=["POST"])
def report_case():

    data = request.json

    new_case = DiseaseCase(
        patient_name=data["patient_name"],
        age=data["age"],
        village=data["village"],
        symptoms=data["symptoms"],
        severity=data["severity"]
    )

    db.session.add(new_case)
    db.session.commit()

    return jsonify({"message": "Case Reported Successfully"})
