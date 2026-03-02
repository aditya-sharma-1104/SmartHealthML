from flask import Blueprint, request, jsonify
import pandas as pd
import io
from models.patient import Patient
from models.lab_report import LabReport
from database.db import db
from utils.logger import log_event

clinic_bp = Blueprint('clinic', __name__, url_prefix='/api/clinic')

@clinic_bp.route('/upload', methods=['POST'])
def upload_patients():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Read CSV using pandas
        df = pd.read_csv(io.StringIO(file.stream.read().decode("UTF8")))
        
        # Required columns check
        required_cols = ['patient_id', 'name', 'age', 'gender']
        if not all(col in df.columns for col in required_cols):
            return jsonify({"error": f"Missing columns. Required: {', '.join(required_cols)}"}), 400

        added_count = 0
        for _, row in df.iterrows():
            # Check if patient exists
            existing = Patient.query.filter_by(patient_id=str(row['patient_id'])).first()
            if not existing:
                new_patient = Patient(
                    patient_id=str(row['patient_id']),
                    name=row['name'],
                    age=int(row['age']),
                    gender=row['gender'],
                    contact=str(row.get('contact', '')),
                    address=str(row.get('address', ''))
                )
                db.session.add(new_patient)
                added_count += 1
        
        db.session.commit()
        log_event("INFO", "CLINIC_MGR", f"Bulk uploaded {added_count} patients via CSV")
        return jsonify({"message": f"Successfully uploaded {added_count} patients"}), 201

    except Exception as e:
        db.session.rollback()
        log_event("ERROR", "CLINIC_MGR", f"CSV Upload failed: {str(e)}")
        return jsonify({"error": str(e)}), 500

@clinic_bp.route('/reports', methods=['GET'])
def get_lab_reports():
    reports = LabReport.query.all()
    # Joining with Patient info if needed, but for now just ToDict
    return jsonify([r.to_dict() for r in reports]), 200
