import unittest
# These imports work only if running python -m unittest from the root directory
from app import create_app
from config import get_config

config = get_config('test')  # Get test configuration
app = create_app(config)  # Create an instance with test configurations
client = app.test_client()  # Test client for making requests

class TestUser(unittest.TestCase):

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
        
    def test_get_favorites(self):
        response = client.get('/user/GamerGeek88/favorites')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)
        self.assertEqual(response.json, [3, 5])
        
    def test_post_favorite(self):
        username = "TechEnthusiast42"
        new_favorite = {
            "Build_id": 1
        }
        response = client.post(f'/user/{username}/favorites', json=new_favorite)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json)
        # Check that the favorite was actually added
        response = client.get(f'/user/{username}/favorites')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)
        self.assertEqual(response.json, [0, 1, 2])
        
    def test_delete_favorite(self):
        username = "SystemBuilderPro"
        favorite = {
            "Build_id": 2
        }
        response = client.delete(f'/user/{username}/favorites', json=favorite)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json)
        # Check that the favorite was actually deleted
        response = client.get(f'/user/{username}/favorites')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)
        self.assertEqual(response.json, [7])

if __name__ == '__main__':
    from .database import reset_test_db
    reset_test_db()
    unittest.main()