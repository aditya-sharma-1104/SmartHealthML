from flask import Blueprint, request, jsonify
import jwt
import datetime
from models.user import User
from database.db import db
from utils.logger import log_event

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

SECRET_KEY = "your_secret_key_here"  # In production, use environment variables

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({"error": "Missing required fields"}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "User already exists"}), 400

    new_user = User(
        name=data['name'],
        email=data['email'],
        role=data.get('role', 'public')
    )
    new_user.set_password(data['password'])
    
    db.session.add(new_user)
    db.session.commit()

    log_event("INFO", "AUTH", f"New user registered: {new_user.email}")

    return jsonify({"message": "User registered successfully", "user": new_user.to_dict()}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing required fields"}), 400

    user = User.query.filter_by(email=data['email']).first()
    if not user or not user.check_password(data['password']):
        log_event("WARNING", "AUTH", f"Failed login attempt for email: {data['email']}")
        return jsonify({"error": "Invalid credentials"}), 401

    token = jwt.encode({
        'user_id': user.id,
        'role': user.role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, SECRET_KEY, algorithm="HS256")

    log_event("INFO", "AUTH", f"User logged in: {user.email}")

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": user.to_dict()
    }), 200
