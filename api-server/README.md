# API Server

This is the API used for data exchange with the `pc_components_database`.

## How to use the API
There are 2 ways to run the API server. For both options, the database is hosted online.

### Online Server
The API is deployed online. There is no setup for this option. The web app communicates with the deployed API. This is the recommended option. 

### Locally run Server
In order to run the API locally, database credentials must be configured. For security reasons, the credentials are not included in the GitHub files. If you wish to run the server locally, contact the developers.

Instructions:
- Install python requirements `pip install -r requirements.txt`
- Configure database credentials. This is done either with an environment variable or a config file. See `config.py` for more details. 
- Run `python run.py`