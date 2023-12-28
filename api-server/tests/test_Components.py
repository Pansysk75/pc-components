import unittest
# These imports work only if running python -m unittest from the root directory
from app import create_app
from config import get_config

config = get_config('test')  # Get test configuration
app = create_app(config)  # Create an instance with test configurations
client = app.test_client()  # Test client for making requests


class TestComponents(unittest.TestCase):
    # Reset database before tests
    def setUpClass():
        # Only gets, so no need to reset the database for now
        # from .database import reset_test_db
        # reset_test_db()
        pass

    def test_get_gpus(self):
        response = client.get('/components/gpus')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)
        # Check that the first gpu has the expected values
        gpu = response.json[0]
        expected = {'GPU_id': 0, 'Manufacturer_name': 'Gigabyte', 'length': 242, 'memory_type': 'GDDR6', 'min_psu_wattage': 550,
                    'name': 'Gigabyte GeForce RTX 3060', 'pcie_gen': 'PCI Express x16 4.0', 'release_date': None, 'vram': 16}
        self.assertEqual(gpu, expected)

    def test_get_cpus(self):
        response = client.get('/components/cpus')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)
        # Check that the first cpu has the expected values
        cpu = response.json[0]
        expected = {'CPU_id': 0, 'Manufacturer_name': 'AMD', 'base_freq': 4, 'has_integrated_graphics': True, 'max_freq': 4, 'name': 'AMD Ryzen 5 5600G',
                    'num_logical_cores': 12, 'num_physical_cores': 6, 'release_date': 'Fri, 01 Jan 2021 00:00:00 GMT', 'socket': 'AM4', 'tdp': 65}
        self.assertEqual(cpu, expected)

    def test_get_mobos(self):
        response = client.get('/components/mobos')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)
        # Check that the first mobo has the expected values
        mobo = response.json[0]
        expected = {'MOBO_id': 0, 'Manufacturer_name': 'MSI', 'ddr_generation': 'DDR4', 'form_factor': 'ATX', 'name': 'MSI MPG B550 Gaming Plus',
                    'num_memory_slots': 4, 'socket': 'AM4'}
        self.assertEqual(mobo, expected)

    def test_get_rams(self):
        response = client.get('/components/rams')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)
        # Check that the first ram has the expected values
        ram = response.json[0]
        expected = {'Manufacturer_name': 'Kingston', 'RAM_id': 0, 'ddr_generation': 'DDR5',
                    'max_freq': 6000, 'name': 'Kingston Fury Beast', 'num_modules': 2, 'total_capacity': 32}
        self.assertEqual(ram, expected)

    def test_get_psus(self):
        response = client.get('/components/psus')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)
        # Check that the first psu has the expected values
        psu = response.json[0]
        expected = {'Manufacturer_name': 'Be Quiet', 'PSU_id': 0, 'efficiency_certification': '80 PLUS Bronze',
                    'form_factor': 'ATX', 'modularity': 'Non-Modular', 'name': 'Be Quiet System Power 10', 'wattage': 650}
        self.assertEqual(psu, expected)

    def test_get_cases(self):
        response = client.get('/components/cases')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)
        # Check that the first case has the expected values
        case = response.json[0]
        expected = {'Case_id': 0, 'Manufacturer_name': 'COUGAR', 'height': 455, 'length': 380, 'max_gpu_length': 300,
                    'mobo_form_factor': 'ATX', 'name': 'Cougar MX410 Mesh-G RGB Gaming Midi Tower', 'width': 210}
        self.assertEqual(case, expected)

    def test_get_storages(self):
        response = client.get('/components/storages')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)
        # Check that the first storage has the expected values
        storage = response.json[0]
        expected = {'Manufacturer_name': 'Samsung', 'Storage_id': 0, 'capacity': 1024, 'connectivity': 'PCI Express 3.0',
                    'form_factor': 'M.2 2280', 'name': 'Samsung 970 Evo Plus SSD', 'type': 'SSD'}
        self.assertEqual(storage, expected)
