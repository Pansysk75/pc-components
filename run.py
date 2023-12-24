from flask import Flask, jsonify
import pymysql.cursors
from config import CONFIG

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
def hello_world():
    with db_connection.cursor() as cursor:
        sql = "SELECT * FROM pc_components_database.build_has_storage;"
        cursor.execute(sql)
        result = cursor.fetchall()
        return result if result else "No results found", 404

# Get specific build
# Returns dict{build_id, name, username, cpu, mobo, ram, psu, storage}
@app.route('/build/<int:build_id>')
def get_build(build_id):
    with db_connection.cursor() as cursor:
        sql = '''
        SELECT build.Build_id as build_id,
               build.name as name,
               build.Username as username,
               CPU.name as cpu,
               MOBO.name as mobo,
               RAM.name as ram,
               PSU.name as psu,
               Storage.name as storage
        FROM build 
            JOIN cpu ON build.CPU_id = cpu.CPU_id
            JOIN MOBO ON build.MOBO_id = MOBO.MOBO_id
            JOIN RAM ON build.RAM_id = RAM.RAM_id
            JOIN PSU ON build.PSU_id = PSU.PSU_id
            JOIN build_has_storage ON build_has_storage.Build_id = build.Build_id
            JOIN storage ON build.Build_id = build_has_storage.Build_id          
        WHERE build.build_id = %s;
        '''
        cursor.execute(sql, (build_id))
        build = cursor.fetchone()
        return build if build else "Build not found", 404


# Get all builds
# Returns list of dicts{build_id, name, username, cpu, mobo, ram, psu, storage}
@app.route('/builds')
def get_builds():
    with db_connection.cursor() as cursor:
        sql = '''
        SELECT build.Build_id as build_id,
               build.name as name,
               build.Username as username,
               CPU.name as cpu,
               MOBO.name as mobo,
               RAM.name as ram,
               PSU.name as psu,
               Storage.name as storage
        FROM build 
            JOIN cpu ON build.CPU_id = cpu.CPU_id
            JOIN MOBO ON build.MOBO_id = MOBO.MOBO_id
            JOIN RAM ON build.RAM_id = RAM.RAM_id
            JOIN PSU ON build.PSU_id = PSU.PSU_id
            JOIN build_has_storage ON build_has_storage.Build_id = build.Build_id
            JOIN storage ON build.Build_id = build_has_storage.Build_id;
        '''
        cursor.execute(sql)
        builds = cursor.fetchall()
        return builds if builds else "No builds found", 404
    

# Get specific user from username, and all build_ids associated with that user
@app.route('/user/<string:username>')
def get_user(username):
    with db_connection.cursor() as cursor:
        # << Question: Would it be more efficient to do this in one query? >>
        # Get user info first
        sql = '''
        SELECT * FROM user WHERE username = %s;
        '''
        cursor.execute(sql, (username))
        user = cursor.fetchone()
        print(user)
        if not user:
            return "User not found", 404
        # Then, get all build_ids of builds associated with user
        sql = '''
        SELECT build.Build_id FROM build WHERE build.Username = %s;
        '''
        cursor.execute(sql, (username))
        build_ids = cursor.fetchall()
        # The result is a dictionary with the user info and the list of build_ids
        result = user
        result["build_ids"] = [build_id["Build_id"] for build_id in build_ids]
        return result
        

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=81)