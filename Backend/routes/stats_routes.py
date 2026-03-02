from flask import Blueprint, jsonify
from models.case import Case
from models.user import User
from models.alert import Alert
from models.water import WaterQuality
from database.db import db
from sqlalchemy import func
import datetime

stats_bp = Blueprint('stats', __name__, url_prefix='/api/stats')

@stats_bp.route('/admin', methods=['GET'])
def get_admin_stats():
    total_users = User.query.count()
    active_alerts = Alert.query.filter_by(status='active').count()
    total_cases = Case.query.count()
    
    # Simple monthly activity simulation or real data if available
    # For now, let's group cases by month
    monthly_data = db.session.query(
        func.strftime('%m', Case.created_at).label('month'),
        func.count(Case.id).label('count')
    ).group_by('month').all()
    
    # Map month numbers to names
    month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    chart_data = [{"name": month_names[int(m)-1], "cases": c} for m, c in monthly_data]

    return jsonify({
        "totalUsers": total_users,
        "activeAlerts": active_alerts,
        "totalCases": total_cases,
        "systemHealth": "98%",
        "chartData": chart_data or [{"name": "No Data", "cases": 0}]
    }), 200

@stats_bp.route('/officer', methods=['GET'])
def get_officer_stats():
    critical_alerts = Alert.query.filter_by(severity='high', status='active').count()
    active_cases = Case.query.filter_by(status='active').count()
    
    return jsonify({
        "criticalAlerts": critical_alerts,
        "predictedRisk": "12%", # Placeholder for ML model result
        "activeCases": active_cases
    }), 200
