from flask import Blueprint, jsonify

public_bp = Blueprint("public", __name__)

@public_bp.route("/hygiene-tips", methods=["GET"])
def hygiene_tips():
    tips = [
        "Boil drinking water during monsoon season.",
        "Use mosquito nets to prevent Dengue.",
        "Wash hands frequently with soap for 20 seconds.",
        "Avoid stagnant water near your home.",
        "Wear masks during flu season.",
        "Store food in covered containers.",
        "Use ORS solution for dehydration cases.",
        "Sanitize frequently touched surfaces."
    ]
    return jsonify(tips)
