import unittest
from . import database

if __name__ == "__main__":
    # Define the directory that contains your test cases
    test_dir = './'
    
    # Reset the test database
    database.reset_test_db()

    # Discover and run tests
    test_suite = unittest.defaultTestLoader.discover(start_dir=test_dir, pattern='test_*.py')
    unittest.TextTestRunner().run(test_suite)
