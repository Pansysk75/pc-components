from . import Build, User
import pymysql
from flask import Flask, jsonify
    
def create_app(config):
    app = Flask(__name__)
    
    # Connect to database
    app.config['db_connection'] = pymysql.connect(
        host=config['host'],
        user=config['username'],
        password=config['password'],
        db=config['database'],
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

    # Register blueprints
    app.register_blueprint(Build.routes.build_bp)
    app.register_blueprint(User.routes.user_bp)
    
    @app.route('/')
    def index():
        return "Hello, World!"

    
    return app