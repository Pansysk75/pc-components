from flask import Blueprint, current_app, jsonify
from .Build import Build, Builds

build_bp = Blueprint('build', __name__)

# Get specific build
# Returns dict{build_id, name, username, cpu, mobo, ram, psu, storage}
@build_bp.route('/build/<int:build_id>')
def get_build(build_id):
    db_connection = current_app.config['db_connection']
    build = Build.get(db_connection, build_id)
    return build if build else (jsonify({"error": "Build not found"}), 404)


# Get all builds
# Returns list of dicts{build_id, name, username, cpu, mobo, ram, psu, storage}
@build_bp.route('/builds')
def get_builds():
    db_connection = current_app.config['db_connection']
    builds = Builds.get(db_connection)
    return builds # at worst this will be an empty list
