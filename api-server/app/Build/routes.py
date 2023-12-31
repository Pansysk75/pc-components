from flask import Blueprint, current_app, jsonify, redirect, url_for, request
from .Build import Build, Builds, BuildRating
from .. import database

build_bp = Blueprint('build', __name__)

# Get specific build
@build_bp.route('/build/<int:build_id>')
def get_build(build_id):
    db_connection = database.get_connection(current_app)
    build = Build.get(db_connection, build_id)
    return build if build else (jsonify({"error": "Build not found"}), 404)

# Post new build
@build_bp.route('/build', methods=['POST'])
def post_build():
    db_connection = database.get_connection(current_app)
    new_build = request.get_json()
    build_id = Build.post(db_connection, new_build)
    return jsonify(build_id)

# Delete build
@build_bp.route('/build/<int:build_id>', methods=['DELETE'])
def delete_build(build_id):
    db_connection = database.get_connection(current_app)
    result = Build.delete(db_connection, build_id)
    return jsonify(result)

# Get all builds
@build_bp.route('/builds')
def get_builds():
    db_connection = database.get_connection(current_app)
    builds = Builds.get(db_connection)
    return builds # at worst this will be an empty list

# Get build ratings
@build_bp.route('/build/<int:build_id>/ratings')
def get_build_ratings(build_id):
    db_connection = database.get_connection(current_app)
    ratings = BuildRating.get(db_connection, build_id)
    return jsonify(ratings)

# Post new build rating
@build_bp.route('/build/<int:build_id>/ratings', methods=['POST'])
def post_build_rating(build_id):
    db_connection = database.get_connection(current_app)
    new_rating = request.get_json()
    new_rating["Build_id"] = build_id
    result = BuildRating.post(db_connection, new_rating)
    return jsonify(result)

# Delete build rating
@build_bp.route('/build/<int:build_id>/ratings', methods=['DELETE'])
def delete_build_rating(build_id):
    db_connection = database.get_connection(current_app)
    Username_and_Build_id = request.get_json()
    Username_and_Build_id["Build_id"] = build_id
    result = BuildRating.delete(db_connection, Username_and_Build_id)
    return jsonify(result)