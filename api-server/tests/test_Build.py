import unittest
# These imports work only if running python -m unittest from the root directory
from app import create_app
from config import get_config

config = get_config('test')  # Get test configuration
app = create_app(config)  # Create an instance with test configurations
client = app.test_client()  # Test client for making requests

class TestBuild(unittest.TestCase):
    # Reset database before tests
    def setUpClass():
        from .database import reset_test_db
        reset_test_db()

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
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, int)
        self.assertGreater(response.json, 0)

        response = client.get(f'/build/{response.json}')
        build = response.json
        expected = {'Build_id': 45, 'CPU_id': 1, 'CPU_name': 'AMD Ryzen 5 5600X', 'Case_id': 1, 'Case_name': 'Be Quiet Pure Base 500DX Gaming Midi Tower', 'GPU_id': None, 'GPU_name': None, 'MOBO_id': 1,
                    'MOBO_name': 'Gigabyte Z790 Gaming X AX (rev. 1.0) Wi-Fi Motherboard', 'PSU_id': 1, 'PSU_name': 'Corsair RMx Series RM850x', 'RAM_id': 1, 'RAM_name': 'G.Skill Trident Z5 RGB', 'Username': 'ByteBuster99', 'date_created': 'Fri, 29 Dec 2023 00:00:00 GMT', 'name': 'ChristmasBuild', 'storage': [{'Storage_id': 1, 'Storage_name': 'Samsung 870 Evo SSD'}, {'Storage_id': 2, 'Storage_name': 'Western Digital Blue'}]}
        self.assertEqual(build, expected)

    def test_get_builds(self):
        # This test is not comprehensive, but i guess it's better than nothing
        response = client.get('/builds')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)
        # Check that the first build has the expected values
        build = response.json[0]
        expected = {'Build_id': 0, 'CPU_id': 0, 'CPU_name': 'AMD Ryzen 5 5600G', 'Case_id': 0, 'Case_name': 'Cougar MX410 Mesh-G RGB Gaming Midi Tower', 'GPU_id': 0, 'GPU_name': 'Gigabyte GeForce RTX 3060', 'MOBO_id': 0, 'MOBO_name': 'MSI MPG B550 Gaming Plus', 'PSU_id': 2, 'PSU_name': 'Be Quiet Straight Power 11', 'RAM_id': 2,
                    'RAM_name': 'Corsair Vengeance RGB Pro', 'Username': 'TechEnthusiast42', 'date_created': 'Mon, 23 Nov 2015 00:00:00 GMT', 'name': 'QuantumDream', 'storage': [{'Build_id': 0, 'Storage_id': 0, 'Storage_name': 'Samsung 970 Evo Plus SSD'}, {'Build_id': 0, 'Storage_id': 2, 'Storage_name': 'Western Digital Blue'}]}
        self.assertEqual(build, expected)

if __name__ == '__main__':
    unittest.main()
