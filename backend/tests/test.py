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
        expected = {"build_id": 1, "case": "Be Quiet Pure Base 500 FX Gaming Midi Tower", "cpu": "AMD Ryzen 5 5600X", "mobo": "MSI MPG B550 Gaming Plus", "name": "EliteDominance",
                    "psu": "Be Quiet Dark Power Pro 12", "ram": "G.Skill Ripjaws V", "storage": "Samsung 970 Evo Plus SSD", "username": "PCMasterRace"}
        self.assertEqual(response.json, expected)
        
    def test_post_build(self):
        new_build = {
            "name": "ChristmasBuild",
            "username": "ByteBuster99",
            "CPU_id": 1,
            "MOBO_id": 1,
            "RAM_id": 1,
            "PSU_id": 1,
            "Case_id": 1,
            "storage_ids": [1, 2]
        }
        response = client.post('/build', json=new_build)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, int)
        self.assertGreater(response.json, 0)
        # Check that the build was actually added
        response = client.get(f'/build/{response.json}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json["name"], new_build["name"])
        self.assertEqual(response.json["username"], new_build["username"])
        self.assertEqual(response.json["cpu"], "AMD Ryzen 5 5600X")
        self.assertEqual(response.json["mobo"], "Gigabyte Z790 Gaming X AX (rev. 1.0) Wi-Fi Motherboard")
        self.assertEqual(response.json["ram"], "G.Skill Trident Z5 RGB")
        self.assertEqual(response.json["psu"], "Corsair RMx Series RM850x")
        self.assertEqual(response.json["storage"], "Samsung 970 Evo Plus SSD")
        self.assertEqual(response.json["case"], "Be Quiet Pure Base 500DX Gaming Midi Tower")


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
