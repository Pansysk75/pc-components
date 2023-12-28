from flask import Blueprint, current_app, jsonify, redirect, url_for, request
from .Components import Components
from .. import database

components_bp = Blueprint('components', __name__)

# Get all gpus
@components_bp.route('/components/gpus', methods=['GET'])
def get_gpus():
    db_connection = database.ensure_app_connection(current_app)
    gpus = Components.get_gpus(db_connection)
    return jsonify(gpus)

# Get all cpus
@components_bp.route('/components/cpus', methods=['GET'])
def get_cpus():
    db_connection = database.ensure_app_connection(current_app)
    cpus = Components.get_cpus(db_connection)
    return jsonify(cpus)

# Get all mobos
@components_bp.route('/components/mobos', methods=['GET'])
def get_mobos():
    db_connection = database.ensure_app_connection(current_app)
    mobos = Components.get_mobos(db_connection)
    return jsonify(mobos)

# Get all rams
@components_bp.route('/components/rams', methods=['GET'])
def get_rams():
    db_connection = database.ensure_app_connection(current_app)
    rams = Components.get_rams(db_connection)
    return jsonify(rams)

# Get all psus
@components_bp.route('/components/psus', methods=['GET'])
def get_psus():
    db_connection = database.ensure_app_connection(current_app)
    psus = Components.get_psus(db_connection)
    return jsonify(psus)

# Get all cases
@components_bp.route('/components/cases', methods=['GET'])
def get_cases():
    db_connection = database.ensure_app_connection(current_app)
    cases = Components.get_cases(db_connection)
    return jsonify(cases)

# Get all storages
@components_bp.route('/components/storages', methods=['GET'])
def get_storages():
    db_connection = database.ensure_app_connection(current_app)
    storages = Components.get_storages(db_connection)
    return jsonify(storages)

