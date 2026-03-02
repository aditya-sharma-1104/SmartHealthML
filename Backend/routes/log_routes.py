from flask import Blueprint, jsonify, request
from models.log import SystemLog

log_bp = Blueprint("log", __name__)

@log_bp.route("/api/logs/", methods=["GET"])
def get_logs():
    log_type = request.args.get('type')
    limit = request.args.get('limit', default=100, type=int)

    query = SystemLog.query

    if log_type and log_type.upper() != 'ALL':
        query = query.filter(SystemLog.type == log_type.upper())

    logs = query.order_by(SystemLog.timestamp.desc()).limit(limit).all()
    return jsonify([log.to_dict() for log in logs])
