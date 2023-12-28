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
        expected = {'Build_id': 1, 'name': 'EliteDominance', 'Username': 'PCMasterRace', 'CPU_id': 1, 'CPU_name': 'AMD Ryzen 5 5600X', 'MOBO_id': 0, 'MOBO_name': 'MSI MPG B550 Gaming Plus', 'RAM_id': 4, 'RAM_name': 'G.Skill Ripjaws V', 'PSU_id': 7,
                    'PSU_name': 'Be Quiet Dark Power Pro 12', 'Case_id': 5, 'Case_name': 'Be Quiet Pure Base 500 FX Gaming Midi Tower', 'GPU_id': 2, 'GPU_name': 'Gigabyte GeForce RTX 4070', 'date_created': 'Wed, 23 Nov 2016 00:00:00 GMT', 'storage': [{'Storage_id': 1, 'Storage_name': 'Samsung 870 Evo SSD'}]}
        self.assertEqual(response.json, expected)

    def test_post_build(self):
        new_build = {
            "name": "ChristmasBuild",
            "Username": "ByteBuster99",
            "CPU_id": 1,
            "MOBO_id": 1,
            "RAM_id": 1,
            "PSU_id": 1,
            "Case_id": 1,
            "storage_ids": [1, 2]
        }
        response = client.post('/build', json=new_build)
        print(response.json)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, int)
        self.assertGreater(response.json, 0)

        response = client.get(f'/build/{response.json}')
        build = response.json
        self.assertEqual(response.status_code, 200)
        self.assertIn("Build_id", build)
        self.assertIn("name", build)
        self.assertIn("Username", build)
        self.assertIn("CPU_id", build)
        self.assertIn("CPU_name", build)
        self.assertIn("MOBO_id", build)
        self.assertIn("MOBO_name", build)
        self.assertIn("RAM_id", build)
        self.assertIn("RAM_name", build)
        self.assertIn("PSU_id", build)
        self.assertIn("PSU_name", build)
        self.assertIn("Case_id", build)
        self.assertIn("Case_name", build)
        self.assertIn("GPU_id", build)
        self.assertIn("GPU_name", build)
        self.assertIn("date_created", build)
        self.assertIn("storage", build)
        # Storage is an array
        self.assertIsInstance(build["storage"], list)
        

    def test_get_builds(self):
        response = client.get('/builds')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)
        # Check that the first build has the expected keys
        build = response.json[0]
        self.assertIn("Build_id", build)
        self.assertIn("name", build)
        self.assertIn("Username", build)
        self.assertIn("CPU_id", build)
        self.assertIn("CPU_name", build)
        self.assertIn("MOBO_id", build)
        self.assertIn("MOBO_name", build)
        self.assertIn("RAM_id", build)
        self.assertIn("RAM_name", build)
        self.assertIn("PSU_id", build)
        self.assertIn("PSU_name", build)
        self.assertIn("Case_id", build)
        self.assertIn("Case_name", build)
        self.assertIn("GPU_id", build)
        self.assertIn("GPU_name", build)
        self.assertIn("date_created", build)
        self.assertIn("storage", build)
        # Storage is an array
        self.assertIsInstance(build["storage"], list)

    def test_get_user(self):
        response = client.get('/user/TechEnthusiast42')
        self.assertEqual(response.status_code, 200)
        expected = {"Username": "TechEnthusiast42",
                    "build_ids": [0, 8], "email": "tech42@email.com"}
        self.assertEqual(response.json, expected)

    def test_post_user(self):
        new_user = {
            "Username": "TestUser",
            "email": "testEmail@email.com"
        }
        response = client.post('/user', json=new_user)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, dict)
        self.assertEqual(response.json["Username"], new_user["Username"])
        self.assertEqual(response.json["email"], new_user["email"])
        # Check that the user was actually added
        response = client.get(f'/user/{response.json["Username"]}')
        print(response.json)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json["Username"], new_user["Username"])
        self.assertEqual(response.json["email"], new_user["email"])


if __name__ == '__main__':
    unittest.main()
