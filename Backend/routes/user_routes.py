from flask import Blueprint, request, jsonify
from models.user import User
from database.db import db
from werkzeug.security import generate_password_hash
from utils.logger import log_event

user_bp = Blueprint('users', __name__, url_prefix='/api/users')

@user_bp.route('/', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users]), 200

@user_bp.route('/', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data or not data.get('email') or not data.get('name'):
        return jsonify({"error": "Missing required fields"}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "User already exists"}), 400

    new_user = User(
        name=data['name'],
        email=data['email'],
        role=data.get('role', 'asha_worker'),
        status=data.get('status', 'Active')
    )
    # Set a default password if none provided, since this is an admin action
    new_user.set_password(data.get('password', 'Pass123!'))
    
    db.session.add(new_user)
    db.session.commit()

    log_event("INFO", "USER_MGMT", f"Admin created new user: {new_user.email} ({new_user.role})")

    return jsonify({"message": "User created successfully", "user": new_user.to_dict()}), 201

@user_bp.route('/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = User.query.get_or_404(id)

    if 'name' in data:
        user.name = data['name']
    if 'role' in data:
        user.role = data['role']
    if 'status' in data:
        user.status = data['status']
    if 'email' in data:
        user.email = data['email']

    db.session.commit()
    log_event("INFO", "USER_MGMT", f"Admin updated user ID {id}: {', '.join(data.keys())}")
    return jsonify({"message": "User updated successfully", "user": user.to_dict()}), 200

@user_bp.route('/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    log_event("WARNING", "USER_MGMT", f"Admin deleted user: {user.email}")
    return jsonify({"message": "User deleted successfully"}), 200
