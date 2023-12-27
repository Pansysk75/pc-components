from flask import Blueprint, current_app, jsonify, request
from .User import User
from .. import database

user_bp = Blueprint('user', __name__)

# Get specific user from username, and all build_ids associated with that user
@user_bp.route('/user/<string:username>')
def get_user(username):
    db_connection = database.ensure_app_connection(current_app)
    user = User.get(db_connection, username)
    return user if user else (jsonify({"error": "User not found"}), 404)

@user_bp.route('/user', methods=['POST'])
def post_user():
    db_connection = database.ensure_app_connection(current_app)
    new_user = User.post(db_connection, request.json)
    return new_user if new_user else (jsonify({"error": "Username already taken"}), 409)
