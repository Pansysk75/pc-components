from datetime import datetime



class Build:
    # Get specific build
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
        sql_ratings = '''
        SELECT Username, Build_id, rating, date, comment
        FROM user_rates_build
        WHERE Build_id = %s
        ORDER BY date DESC;
        '''
        cursor.execute(sql_ratings, (build_id))
        ratings = cursor.fetchall()
        build["ratings"] = ratings
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


class BuildRating:
    @staticmethod
    def get(db, build_id):
        cursor = db.cursor()
        sql = '''
        SELECT Username, Build_id, rating, date, comment
        FROM user_rates_build
        WHERE Build_id = %s
        ORDER BY date DESC;
        '''
        cursor.execute(sql, (build_id))
        ratings = cursor.fetchall()
        return ratings

    @staticmethod
    def post(db, new_rating):
        cursor = db.cursor()
        date = datetime.today().strftime('%Y-%m-%d')
        sql = '''
        INSERT INTO user_rates_build (Username, Build_id, rating, date, comment)
        VALUES (%s, %s, %s, %s, %s);
        '''
        cursor.execute(sql, (new_rating["Username"], new_rating["Build_id"],
                       new_rating["rating"], date, new_rating["comment"]))
        db.commit()
        return cursor.lastrowid

    @staticmethod
    def delete(db, rating_id):
        cursor = db.cursor()
        sql = '''
        DELETE FROM user_rates_build
        WHERE Rating_id = %s;
        '''
        cursor.execute(sql, (rating_id))
        db.commit()
        return cursor.lastrowid


class Builds:
    # Get all builds
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
        # Get storage for all builds in a single query
        sql_storage = '''
        SELECT build_has_storage.Build_id, storage.Storage_id, storage.name AS Storage_name
        FROM build_has_storage
            JOIN storage ON build_has_storage.Storage_id = storage.Storage_id
        ORDER BY build_has_storage.Build_id;
        '''
        cursor.execute(sql_storage)
        storage = cursor.fetchall()
        # Group storage by build_id
        storage_by_build_id = {}
        for row in storage:
            build_id = row["Build_id"]
            if build_id not in storage_by_build_id:
                storage_by_build_id[build_id] = []
            storage_by_build_id[build_id].append(row)
        # Add storage to each build
        for build in builds:
            build_id = build["Build_id"]
            build["storage"] = storage_by_build_id.get(build_id, [])

        return builds
