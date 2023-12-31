from dbutils.pooled_db import PooledDB
import pymysql

def connect_app(app, config):
    print(f"Connecting to database {config['database']} on {config['host']}:{config['port']} as {config['username']}")
    
    app.config['db_pool'] = PooledDB(
        creator=pymysql,  # the module to use for connecting to the database
        host=config['host'],
        port=config['port'],
        user=config['username'],
        password=config['password'],
        db=config['database'],
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor,
        blocking=True,  # block and wait for a connection
        maxconnections=5  # max number of connections in the pool
    )

# Sometimes db disconnects, this function will reconnect if necessary
def get_connection(app):
    try:
        connection = app.config['db_pool'].connection()
        return connection
    except AttributeError:
        raise Exception("Trying to reconnect to database, but no connection exists")