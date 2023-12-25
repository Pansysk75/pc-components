import unittest
# These imports work only if running python -m unittest from the root directory
from app import create_app
from config import get_config

config = get_config('test')  # Get test configuration
app = create_app(config)  # Create an instance with test configurations
client = app.test_client()  # Test client for making requests


class BasicTestCase(unittest.TestCase):
    def test_home(self):
        response = client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Hello, World!', response.data.decode())

    def test_get_build(self):
        response = client.get('/build/1')
        self.assertEqual(response.status_code, 200)
        expected = {"build_id": 1, "cpu": "AMD Ryzen 5 5600X", "mobo": "MSI MPG B550 Gaming Plus", "name": "EliteDominance",
                    "psu": "Be Quiet Dark Power Pro 12", "ram": "G.Skill Ripjaws V", "storage": "Samsung 970 Evo Plus SSD", "username": "PCMasterRace"}
        self.assertEqual(response.json, expected)

    def test_get_builds(self):
        response = client.get('/builds')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)
        # Check that the first build has the expected keys
        build = response.json[0]
        self.assertIn('build_id', build)
        self.assertIn('name', build)
        self.assertIn('username', build)
        self.assertIn('cpu', build)
        self.assertIn('mobo', build)
        self.assertIn('ram', build)
        self.assertIn('psu', build)
        self.assertIn('storage', build)

    def test_get_user(self):
        response = client.get('/user/TechEnthusiast42')
        self.assertEqual(response.status_code, 200)
        expected = {"Username":"TechEnthusiast42","build_ids":[0,8],"email":"tech42@email.com"}
        self.assertEqual(response.json, expected)

if __name__ == '__main__':
    unittest.main()
