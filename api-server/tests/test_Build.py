import unittest
# These imports work only if running python -m unittest from the root directory
from app import create_app
from config import get_config
from datetime import datetime

config = get_config('test')  # Get test configuration
app = create_app(config)  # Create an instance with test configurations
client = app.test_client()  # Test client for making requests


class TestBuild(unittest.TestCase):

    def test_get_build(self):
        response = client.get('/build/1')
        self.assertEqual(response.status_code, 200)
        expected = {'Build_id': 1, 'name': 'EliteDominance', 'Username': 'PCMasterRace', 'CPU_id': 1, 'CPU_name': 'AMD Ryzen 5 5600X', 'MOBO_id': 0, 'MOBO_name': 'MSI MPG B550 Gaming Plus', 'RAM_id': 4, 'RAM_name': 'G.Skill Ripjaws V', 'PSU_id': 7,
                    'PSU_name': 'Be Quiet Dark Power Pro 12', 'Case_id': 5, 'Case_name': 'Be Quiet Pure Base 500 FX Gaming Midi Tower', 'GPU_id': 2, 'GPU_name': 'Gigabyte GeForce RTX 4070', 'date_created': 'Wed, 23 Nov 2016 00:00:00 GMT', 'storage': [{'Storage_id': 1, 'Storage_name': 'Samsung 870 Evo SSD'}],
                    'average_rating': 3.0000, 'number_of_ratings': 2, 'times_added_to_favorites': 3}

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
        expected = {'CPU_id': 1, 'CPU_name': 'AMD Ryzen 5 5600X', 'Case_id': 1, 'Case_name': 'Be Quiet Pure Base 500DX Gaming Midi Tower', 'GPU_id': None, 'GPU_name': None, 'MOBO_id': 1,
                    'MOBO_name': 'Gigabyte Z790 Gaming X AX (rev. 1.0) Wi-Fi Motherboard', 'PSU_id': 1, 'PSU_name': 'Corsair RMx Series RM850x', 'RAM_id': 1, 'RAM_name': 'G.Skill Trident Z5 RGB', 'Username': 'ByteBuster99', 'name': 'ChristmasBuild', 'storage': [{'Storage_id': 1, 'Storage_name': 'Samsung 870 Evo SSD'}, {'Storage_id': 2, 'Storage_name': 'Western Digital Blue'}],
                    'average_rating': 0.0000, 'number_of_ratings': 0, 'times_added_to_favorites': 0}
        expected["date_created"] = datetime.today().strftime(
            '%a, %d %b %Y 00:00:00 GMT')
        # Let's accept whatever the database returns for Build_id
        expected["Build_id"] = response.json["Build_id"]
        self.assertEqual(build, expected)
        
    def test_delete_build(self):
        # This build exists in the test database
        response = client.delete('/build/4')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json)

        # Check that the build is no longer in the database
        response = client.get('/build/4')
        self.assertEqual(response.status_code, 404)

    def test_get_builds(self):
        # This test is not comprehensive, but i guess it's better than nothing
        response = client.get('/builds')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)
        # Check that the first build has the expected values
        build = response.json[0]
        expected = {'Build_id': 0, 'CPU_id': 0, 'CPU_name': 'AMD Ryzen 5 5600G', 'Case_id': 0, 'Case_name': 'Cougar MX410 Mesh-G RGB Gaming Midi Tower', 'GPU_id': 0, 'GPU_name': 'Gigabyte GeForce RTX 3060', 'MOBO_id': 0, 'MOBO_name': 'MSI MPG B550 Gaming Plus', 'PSU_id': 2, 'PSU_name': 'Be Quiet Straight Power 11', 'RAM_id': 2,
                    'RAM_name': 'Corsair Vengeance RGB Pro', 'Username': 'TechEnthusiast42', 'date_created': 'Mon, 23 Nov 2015 00:00:00 GMT', 'name': 'QuantumDream', 'storage': [{'Build_id': 0, 'Storage_id': 0, 'Storage_name': 'Samsung 970 Evo Plus SSD'}, {'Build_id': 0, 'Storage_id': 2, 'Storage_name': 'Western Digital Blue'}],
                    'average_rating': 3.5000, 'number_of_ratings': 2, 'times_added_to_favorites': 6}
        self.assertEqual(build, expected)

    def test_get_build_rating(self):
        response = client.get('/build/1/ratings')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)
        # Check that the first rating has the expected values
        ratings = response.json
        expected = [{'Build_id': 1, 'Username': 'GamerGeek88', 'comment': ' Good value for gaming on a budget ', 'date': 'Mon, 23 Dec 2019 00:00:00 GMT', 'rating': 3}, {
            'Build_id': 1, 'Username': 'CircuitWizard23', 'comment': 'Smooth multitasking and quick application load', 'date': 'Sat, 23 Dec 2017 00:00:00 GMT', 'rating': 3}]
        self.assertEqual(ratings, expected)

    def test_post_build_rating(self):
        new_rating = {
            "Username": "TechEnthusiast42",
            "rating": 5,
            "comment": "Wow, what an amazing build!, I wish I could afford it!"
        }
        response = client.post('/build/2/ratings', json=new_rating)
        self.assertEqual(response.status_code, 200)
        # Returns True if successful
        self.assertEqual(response.json, True)
        # Check that the rating was added
        response = client.get(f'/build/2/ratings')
        ratings = response.json
        new_rating["date"] = datetime.today().strftime(
            '%a, %d %b %Y 00:00:00 GMT')
        new_rating["Build_id"] = 2
        self.assertIn(new_rating, ratings)

    def test_delete_build_rating(self):
        # This rating exists in the test database
        rating = {
            "Username": "ByteBuster99"
        }
        response = client.delete('/build/3/ratings', json=rating)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json)

        # Check that the rating is no longer in the database
        response = client.get('/build/3/ratings')
        ratings = response.json
        expected = [{'Build_id': 3, 'Username': 'ComponentExplorer', 'comment': 'Budget-friendly option for casual gamers       ',
                     'date': 'Wed, 24 Jan 2007 00:00:00 GMT', 'rating': 5}]
        self.assertEqual(ratings, expected)


if __name__ == '__main__':
    from .database import reset_test_db
    reset_test_db()
    unittest.main()
