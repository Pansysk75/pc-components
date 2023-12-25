from . import model
import pymysql
from flask import Flask, jsonify

def create_app(config):
    app = Flask(__name__)

    db_connection = pymysql.connect(
        host=config['host'],
        user=config['username'],
        password=config['password'],
        db=config['database'],
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

    @app.route('/')
    def index():
        return "Hello, World!"

    # Get specific build
    # Returns dict{build_id, name, username, cpu, mobo, ram, psu, storage}
    @app.route('/build/<int:build_id>')
    def get_build(build_id):
        build = model.Build.get(db_connection, build_id)
        return build if build else (jsonify({"error": "Build not found"}), 404)


    # Get all builds
    # Returns list of dicts{build_id, name, username, cpu, mobo, ram, psu, storage}
    @app.route('/builds')
    def get_builds():
        builds = model.Builds.get(db_connection)
        return builds # at worst this will be an empty list


    # Get specific user from username, and all build_ids associated with that user
    @app.route('/user/<string:username>')
    def get_user(username):
        user = model.User.get(db_connection, username)
        return user if user else (jsonify({"error": "User not found"}), 404)
    
    return app