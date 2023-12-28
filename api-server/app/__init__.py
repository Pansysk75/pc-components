from . import Build, User, Components
import pymysql
from flask import Flask, jsonify
from flask_cors import CORS 
from . import database
    
def create_app(config):
    app = Flask(__name__)
    CORS(app)
    
    database.connect_app(app, config)

    # Register blueprints
    app.register_blueprint(Build.routes.build_bp)
    app.register_blueprint(User.routes.user_bp)
    app.register_blueprint(Components.routes.components_bp)
    
    @app.route('/')
    def index():
        return "Hello, World!"

    return app

