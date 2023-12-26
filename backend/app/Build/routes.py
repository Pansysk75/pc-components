from flask import Blueprint, current_app, jsonify, redirect, url_for, request
from .Build import Build, Builds
from .. import database

build_bp = Blueprint('build', __name__)

# Get specific build
# Returns dict{build_id, name, username, cpu, mobo, ram, psu, storage}
@build_bp.route('/build/<int:build_id>')
def get_build(build_id):
    db_connection = database.ensure_app_connection(current_app)
    build = Build.get(db_connection, build_id)
    return build if build else (jsonify({"error": "Build not found"}), 404)

# Post new build
# Returns build_id
@build_bp.route('/build', methods=['POST'])
def post_build():
    db_connection = database.ensure_app_connection(current_app)
    new_build = request.get_json()
    build_id = Build.post(db_connection, new_build)
    return jsonify(build_id)

# Get all builds
# Returns list of dicts{build_id, name, username, cpu, mobo, ram, psu, storage}
@build_bp.route('/builds')
def get_builds():
    db_connection = database.ensure_app_connection(current_app)
    builds = Builds.get(db_connection)
    return builds # at worst this will be an empty list
