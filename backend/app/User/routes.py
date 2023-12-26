from flask import Blueprint, current_app, jsonify
from .User import User
from .. import database

user_bp = Blueprint('user', __name__)

# Get specific user from username, and all build_ids associated with that user
@user_bp.route('/user/<string:username>')
def get_user(username):
    db_connection = database.ensure_app_connection(current_app)
    user = User.get(db_connection, username)
    return user if user else (jsonify({"error": "User not found"}), 404)
