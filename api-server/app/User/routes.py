from flask import Blueprint, current_app, jsonify, request
from .User import User, UserFavorite
from .. import database

user_bp = Blueprint('user', __name__)

# Get specific user from username, and all build_ids associated with that user
@user_bp.route('/user/<string:username>')
def get_user(username):
    db_connection = database.ensure_app_connection(current_app)
    user = User.get(db_connection, username)
    return user if user else (jsonify({"error": "User not found"}), 404)

# Create new user
@user_bp.route('/user', methods=['POST'])
def post_user():
    db_connection = database.ensure_app_connection(current_app)
    new_user = User.post(db_connection, request.json)
    return new_user if new_user else (jsonify({"error": "Username already taken"}), 409)

# The following DELETE endpoint is ommitted on purpose, we would really prefer a "soft delete"
# for users, so that we can still keep the build and rating data, but we cannot do that
# with the current database design.

# # Delete user
# @user_bp.route('/user/<string:username>', methods=['DELETE'])
# def delete_user(username):
#     db_connection = database.ensure_app_connection(current_app)
#     deleted_user = User.delete(db_connection, username)
#     return deleted_user if deleted_user else (jsonify({"error": "User not found"}), 404)

# Get all favorites of a user
@user_bp.route('/user/<string:username>/favorites')
def get_user_favorites(username):
    db_connection = database.ensure_app_connection(current_app)
    favorites = UserFavorite.get(db_connection, username)
    return jsonify(favorites)

# Add build to user favorites
@user_bp.route('/user/<string:username>/favorites', methods=['POST'])
def post_user_favorite(username):
    db_connection = database.ensure_app_connection(current_app)
    new_favorite = UserFavorite.post(db_connection, request.json)
    return new_favorite if new_favorite else (jsonify({"error": "Favorite already exists"}), 409)

# Delete build from user favorites
@user_bp.route('/user/<string:username>/favorites', methods=['DELETE'])
def delete_user_favorite(username):
    db_connection = database.ensure_app_connection(current_app)
    deleted_favorite = UserFavorite.delete(db_connection, request.json)
    return deleted_favorite if deleted_favorite else (jsonify({"error": "Favorite not found"}), 404)