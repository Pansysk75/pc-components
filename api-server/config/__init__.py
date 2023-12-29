# Description: This file contains the configuration for the database connection
# The connection URI may be specified in the environment variable DATABASE_URI
# or in a config.ini file in the current directory
# (If both are specified, the environment takes precedence)
# Example config.ini file:
# [DATABASE]
# URI = mysql+pymysql://username:password@host:port/database

import os
from pathlib import Path
import configparser

config = configparser.ConfigParser()
config_path = Path(__file__).with_name('config.ini')
config.read(config_path)

# Parse the connection URI to get the individual components
def parse_uri(uri):
    result = {}
    result["uri"] = uri
    result["driver"] = uri.split(':')[0]
    result["username"] = uri.split(':')[1].split('//')[1].split(':')[0]
    result["password"] = uri.split(':')[2].split('@')[0]
    result["host"] = uri.split(':')[2].split('@')[1]
    result["port"] = int(uri.split(':')[3].split('/')[0])
    result["database"] = uri.split(':')[3].split('/')[1].split('?')[0]
    return result
    


def get_config_entry(section, key):
    try:
        return config[section][key]
    except KeyError:
        return None
    
def get_config(mode):
    switcher = {
        'production': 'DATABASE',
        'development': 'DATABASE',
        'test': 'TEST_DATABASE'
    }
    section = switcher.get(mode)
    if not section:
        raise Exception(f"Invalid configuration mode: {mode}")
    uri = os.environ.get(section + '_URI') or get_config_entry(section, 'URI')
    if not uri:
        raise Exception(f"Invalid configuration, can't find URI for {mode} mode")
    return parse_uri(uri)
