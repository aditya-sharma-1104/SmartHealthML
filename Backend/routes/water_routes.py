from flask import Blueprint, request, jsonify
from models.water import WaterQuality
from database.db import db

water_bp = Blueprint("water", __name__)

@water_bp.route("/water/report", methods=["POST"])
def water_report():

    data = request.json

    new = WaterQuality(
        source=data["source"],
        location=data["location"],
        ph=data["ph"],
        turbidity=data["turbidity"]
    )

    db.session.add(new)
    db.session.commit()

    return jsonify({"message": "Water Data Saved"})
