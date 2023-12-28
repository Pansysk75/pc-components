import pymysql

def connect_app(app, config):
    print(f"Connecting to database {config['database']} on {config['host']}:{config['port']} as {config['username']}")
    app.config['db_connection'] = pymysql.connect(
        host=config['host'],
        port=config['port'],
        user=config['username'],
        password=config['password'],
        db=config['database'],
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

# Sometimes db disconnects, this function will reconnect if necessary
def ensure_app_connection(app):
    try:
        app.config['db_connection'].ping(reconnect=True)
        return app.config['db_connection']
    except AttributeError:
        raise Exception("Trying to reconnect to database, but no connection exists")