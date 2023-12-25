from datetime import datetime

class Build:
    # Get specific build
    # Returns dict{build_id, name, username, cpu, mobo, ram, psu, storage}
    @staticmethod
    def get(db, build_id):
        cursor = db.cursor()
        # Note: The word "case" is a reserved keyword in MySQL, so we have escape it with backticks
        sql = '''
        SELECT build.Build_id as build_id,
                build.name as name,
                build.Username as username,
                CPU.name as cpu,
                MOBO.name as mobo,
                RAM.name as ram,
                PSU.name as psu,
                Storage.name as storage,
                `case`.name as `case`
        FROM build
            JOIN cpu ON build.CPU_id = cpu.CPU_id
            JOIN MOBO ON build.MOBO_id = MOBO.MOBO_id
            JOIN RAM ON build.RAM_id = RAM.RAM_id
            JOIN PSU ON build.PSU_id = PSU.PSU_id
            JOIN build_has_storage ON build_has_storage.Build_id = build.Build_id
            JOIN storage ON build.Build_id = build_has_storage.Build_id
            JOIN `case` ON build.Case_id = `case`.Case_id
        WHERE build.build_id = %s;
        '''
        cursor.execute(sql, (build_id))
        build = cursor.fetchone()
        return build

    def post(db, new_build):
        cursor = db.cursor()
        date = datetime.today().strftime('%Y-%m-%d')
        sql = '''
        INSERT INTO build (name, Username, CPU_id, GPU_id, MOBO_id, RAM_id, PSU_id, Case_id, date_created)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);
        '''
        cursor.execute(sql, (new_build["name"], new_build["username"], new_build["CPU_id"],
                             new_build.get("GPU_id", None), #Can be null
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
        SELECT build.Build_id as build_id,
                build.name as name,
                build.Username as username,
                CPU.name as cpu,
                MOBO.name as mobo,
                RAM.name as ram,
                PSU.name as psu,
                Storage.name as storage
        FROM build 
            JOIN cpu ON build.CPU_id = cpu.CPU_id
            JOIN MOBO ON build.MOBO_id = MOBO.MOBO_id
            JOIN RAM ON build.RAM_id = RAM.RAM_id
            JOIN PSU ON build.PSU_id = PSU.PSU_id
            JOIN build_has_storage ON build_has_storage.Build_id = build.Build_id
            JOIN storage ON build.Build_id = build_has_storage.Build_id;
        '''
        cursor.execute(sql)
        builds = cursor.fetchall()
        return builds
