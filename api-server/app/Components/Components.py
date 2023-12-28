
class Components:
    # Get all gpus
    # Returns list of dicts{GPU_id, name, vram, pcie_gen, release_date, length, min_psu_wattage, memory_type, Manufacturer_name}
    @staticmethod
    def get_gpus(db):
        cursor = db.cursor()
        sql = '''
        SELECT GPU_id, name, vram, pcie_gen, release_date, length, min_psu_wattage, memory_type, Manufacturer_name
        FROM gpu
        ORDER BY GPU_id;
        '''
        cursor.execute(sql)
        gpus = cursor.fetchall()
        return gpus

    # Get all cpus
    # Returns list of dicts{CPU_id, name, num_physical_cores, num_logical_cores, base_freq, max_freq, socket, release_date, tdp, has_integrated_graphics, Manufacturer_name}
    @staticmethod
    def get_cpus(db):
        cursor = db.cursor()
        sql = '''
        SELECT CPU_id, name, num_physical_cores, num_logical_cores, base_freq, max_freq, socket, release_date, tdp, has_integrated_graphics, Manufacturer_name
        FROM cpu
        ORDER BY CPU_id;
        '''
        cursor.execute(sql)
        cpus = cursor.fetchall()
        # has_integrated_graphics is returned as a byte, convert to boolean
        for cpu in cpus:
            cpu['has_integrated_graphics'] = bool(cpu['has_integrated_graphics'])
        return cpus

    # Get all mobos
    # Returns list of dicts{MOBO_id, name, ddr_generation, form_factor, socket, num_memory_slots, Manufacturer_name}
    @staticmethod
    def get_mobos(db):
        cursor = db.cursor()
        sql = '''
        SELECT MOBO_id, name, ddr_generation, form_factor, socket, num_memory_slots, Manufacturer_name
        FROM mobo
        ORDER BY Mobo_id;
        '''
        cursor.execute(sql)
        mobos = cursor.fetchall()
        return mobos

    # Get all rams
    # Returns list of dicts{RAM_id, name, num_modules, max_freq, total_capacity, ddr_generation, Manufacturer_name}
    @staticmethod
    def get_rams(db):
        cursor = db.cursor()
        sql = '''
        SELECT RAM_id, name, num_modules, max_freq, total_capacity, ddr_generation, Manufacturer_name
        FROM ram
        ORDER BY RAM_id;
        '''
        cursor.execute(sql)
        rams = cursor.fetchall()
        return rams

    # Get all psus
    # Returns list of dicts{psu_id, name, form_factor, wattage, modularity, efficiency_certification, Manufacturer_name}
    @staticmethod
    def get_psus(db):
        cursor = db.cursor()
        sql = '''
        SELECT PSU_id, name, form_factor, wattage, modularity, efficiency_certification, Manufacturer_name
        FROM psu
        ORDER BY PSU_id;
        '''
        cursor.execute(sql)
        psus = cursor.fetchall()
        return psus
    
    # Get all cases
    # Returns list of dicts{case_id, name, mobo_form_factor, width, height, length, max_gpu_length, Manufacturer_name}
    @staticmethod
    def get_cases(db):
        cursor = db.cursor()
        sql = '''
        SELECT Case_id, name, mobo_form_factor, width, height, length, max_gpu_length, Manufacturer_name
        FROM `case`
        ORDER BY Case_id;
        '''
        cursor.execute(sql)
        cases = cursor.fetchall()
        return cases
    
    # Get all storages
    # Returns list of dicts{storage_id, name, capacity, type, connectivity, form_factor, Manufacturer_name}
    @staticmethod
    def get_storages(db):
        cursor = db.cursor()
        sql = '''
        SELECT Storage_id, name, capacity, type, connectivity, form_factor, Manufacturer_name
        FROM storage
        ORDER BY Storage_id;
        '''
        cursor.execute(sql)
        storages = cursor.fetchall()
        return storages
        