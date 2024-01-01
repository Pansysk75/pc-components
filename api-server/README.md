# API Server

This is the API server used for data exchange with the `pc_components_database`.
The server is written in Python using the Flask framework.
We provide several endpoints, such as:
- `/user` - POST a user
- `/user/<id>` - GET, DELETE a user
- `/user/<id>/favorites` - GET, DELETE, POST a favorite
- `/build` - POST a build
- `/build/<id>` - GET, DELETE a build
- `/components/gpus` - GET all GPUs   
  
and many more. They can be found in `app/X/routes.py`, and usage examples can be found in the `tests/test_X.py` files.  

## Usage
There are 2 ways to use the API server:

### Use deployed Online Server
The API is deployed online at http://64.226.122.251:81/ . The deployed server is connected to a database instance, and is ready to use.
By default, the web app communicates with this server.

### Run API Server Locally
To run the API server locally, the following steps are required:
- Have an instance of the `pc_components_database` running. 
- Configure database credentials. This is done either with an environment variable `DATABASE_URI` (also `TEST_DATABASE_URI` if you wish to run the tests) or a config file. See `config/__init__.py` for more details. 
- Install python requirements `pip install -r requirements.txt`
- Run `python3 run.py`

## Testing
To run the tests, run `python3 -m tests.run_all_tests.py`. A `TEST_DATABASE_URI` must be configured. The test database is reset before the tests are run.