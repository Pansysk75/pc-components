from datetime import datetime


class Build:
    # Get specific build
    # Returns dict{build_id, name, username, cpu, mobo, ram, psu, storage}
    @staticmethod
    def get(db, build_id):
        print(f"Getting build {build_id}")
        cursor = db.cursor()
        # Note: The word "case" is a reserved keyword in MySQL, so we have escape it with backticks
        sql = '''
        SELECT build.Build_id, build.name, build.Username,
               build.CPU_id,  cpu.name AS CPU_name,     
               build.MOBO_id, mobo.name AS MOBO_name,   
               build.RAM_id,  ram.name AS RAM_name,     
               build.PSU_id,  psu.name AS PSU_name,     
               build.Case_id, `case`.name AS Case_name,
               build.GPU_id, gpu.name AS GPU_name,
               build.date_created
        FROM build
            JOIN cpu ON build.CPU_id = cpu.CPU_id
            JOIN mobo ON build.MOBO_id = mobo.MOBO_id
            JOIN ram ON build.RAM_id = ram.RAM_id
            JOIN psu ON build.PSU_id = psu.PSU_id
            JOIN `case` ON build.Case_id = `case`.Case_id
            LEFT JOIN gpu ON build.GPU_id = gpu.GPU_id
        WHERE build.Build_id = %s;
        '''
        cursor.execute(sql, (build_id))
        build = cursor.fetchone()
        print(build)
        if not build:
            return None
        sql_storage = '''
        SELECT storage.Storage_id, storage.name AS Storage_name
        FROM build_has_storage
            JOIN storage ON build_has_storage.Storage_id = storage.Storage_id
        WHERE build_has_storage.Build_id = %s;
        '''
        cursor.execute(sql_storage, (build_id))
        storage = cursor.fetchall()
        build["storage"] = storage
        print(build)
        return build

    def post(db, new_build):
        cursor = db.cursor()
        date = datetime.today().strftime('%Y-%m-%d')
        sql = '''
        INSERT INTO build (name, Username, CPU_id, GPU_id, MOBO_id, RAM_id, PSU_id, Case_id, date_created)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);
        '''
        cursor.execute(sql, (new_build["name"], new_build["Username"], new_build["CPU_id"],
                             new_build.get("GPU_id", None),  # Can be null
                       new_build["MOBO_id"], new_build["RAM_id"], new_build["PSU_id"], new_build["Case_id"], date))
        build_id = cursor.lastrowid
        for storage_id in new_build["storage_ids"]:
            sql = '''
            INSERT INTO build_has_storage (Build_id, Storage_id)
            VALUES (%s, %s);
            '''
            cursor.execute(sql, (build_id, storage_id))
        db.commit()
        return build_id


class Builds:
    # Get all builds
    # Returns list of dicts{build_id, name, username, cpu, mobo, ram, psu, storage}
    @staticmethod
    def get(db):
        cursor = db.cursor()
        sql = '''
        SELECT build.Build_id, build.name, build.Username,
               build.CPU_id,  cpu.name AS CPU_name,     
               build.MOBO_id, mobo.name AS MOBO_name,   
               build.RAM_id,  ram.name AS RAM_name,     
               build.PSU_id,  psu.name AS PSU_name,     
               build.Case_id, `case`.name AS Case_name,
               build.GPU_id, gpu.name AS GPU_name,
               build.date_created
        FROM build
            JOIN cpu ON build.CPU_id = cpu.CPU_id
            JOIN mobo ON build.MOBO_id = mobo.MOBO_id
            JOIN ram ON build.RAM_id = ram.RAM_id
            JOIN psu ON build.PSU_id = psu.PSU_id
            JOIN `case` ON build.Case_id = `case`.Case_id
            LEFT JOIN gpu ON build.GPU_id = gpu.GPU_id
        ORDER BY build.Build_id;
        '''
        cursor.execute(sql)
        builds = cursor.fetchall()
        # Get storage for each build
        for build in builds:
            sql_storage = '''
            SELECT storage.Storage_id, storage.name AS Storage_name
            FROM build_has_storage
                JOIN storage ON build_has_storage.Storage_id = storage.Storage_id
            WHERE build_has_storage.Build_id = %s;
            '''
            cursor.execute(sql_storage, (build["Build_id"]))
            storage = cursor.fetchall()
            build["storage"] = storage
        return builds