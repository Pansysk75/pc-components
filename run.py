from flask import Flask, jsonify
import pymysql.cursors
from config import CONFIG
import model

app = Flask(__name__)

# Connect to the database using info from config.py
db_connection = pymysql.connect(
    host=CONFIG['host'],
    user=CONFIG['username'],
    password=CONFIG['password'],
    db=CONFIG['database'],
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)

@app.route('/')
def index():
    return "Hello, world!"

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
        

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=81)