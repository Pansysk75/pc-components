# Description: This file contains the configuration for the database connection
# The connection URI may be specified in the environment variable DATABASE_URI
# or in a config.ini file in the current directory
# (If both are specified, the environment takes precedence)
# Example config.ini file:
# [DEFAULT]
# DATABASE_URI = mysql+pymysql://username:password@host:port/database

import os
import configparser

# Parse the connection URI to get the individual components
def parse_uri(uri):
    result = {}
    result["uri"] = uri
    result["driver"] = uri.split(':')[0]
    result["username"] = uri.split(':')[1].split('//')[1].split(':')[0]
    result["password"] = uri.split(':')[2].split('@')[0]
    result["host"] = uri.split(':')[2].split('@')[1]
    result["port"] = uri.split(':')[3].split('/')[0]
    result["database"] = uri.split(':')[3].split('/')[1]
    return result
    
# Finds the DATABASE_URI environment variable and returns it
def get_uri_from_env():
    return os.environ.get('DATABASE_URI')

# Finds the config.ini file in the current directory and returns it
def get_uri_from_config():
    config = configparser.ConfigParser()
    config.read('config.ini')
    return config['DEFAULT']['DATABASE_URI']


# Get the connection URI from the environment or config file
CONFIG = {}
CONFIG['uri'] = get_uri_from_env() or get_uri_from_config()
if CONFIG['uri'] is None:
    raise Exception("No database connection URI specified. See config.py for more information.")
CONFIG.update(parse_uri(CONFIG['uri']))

