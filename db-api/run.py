from config import get_config
from app import create_app

# Connect to the database using info from config.py
config = get_config('development')

app = create_app(config)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=81)