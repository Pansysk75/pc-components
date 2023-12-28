import unittest
# These imports work only if running python -m unittest from the root directory
from app import create_app
from config import get_config

config = get_config('test')  # Get test configuration
app = create_app(config)  # Create an instance with test configurations
client = app.test_client()  # Test client for making requests

class TestUser(unittest.TestCase):
    # Reset database before tests
    def setUpClass():
        from .database import reset_test_db
        reset_test_db()

    def test_get_user(self):
        response = client.get('/user/TechEnthusiast42')
        self.assertEqual(response.status_code, 200)
        expected = {'Username': 'TechEnthusiast42', 'builds_created': [0, 8], 'email': 'tech42@email.com', 'favorite_builds': [0, 2]}
        self.assertEqual(response.json, expected)

    def test_post_user(self):
        # This user does not exist in the test database
        new_user = {
            "Username": "TestUser",
            "email": "testEmail"
        }
        # Create new user
        response = client.post('/user', json=new_user)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, dict)
        self.assertEqual(response.json["Username"], new_user["Username"])
        self.assertEqual(response.json["email"], new_user["email"])
        # Check that the user was actually added
        response = client.get(f'/user/{response.json["Username"]}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json["Username"], new_user["Username"])
        self.assertEqual(response.json["email"], new_user["email"])

if __name__ == '__main__':
    unittest.main()
