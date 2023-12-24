from flask import Flask, jsonify
import pymysql.cursors
from config import CONFIG
import models

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
    return models.hello_world(db_connection)

# Get specific build
# Returns dict{build_id, name, username, cpu, mobo, ram, psu, storage}
@app.route('/build/<int:build_id>')
def get_build(build_id):
    return models.get_build(db_connection, build_id)


# Get all builds
# Returns list of dicts{build_id, name, username, cpu, mobo, ram, psu, storage}
@app.route('/builds')
def get_builds():
    return models.get_builds(db_connection)


# Get specific user from username, and all build_ids associated with that user
@app.route('/user/<string:username>')
def get_user(username):
    return models.get_user(db_connection, username)
        

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=81)