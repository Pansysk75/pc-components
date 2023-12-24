class Build: 
    # Get specific build
    # Returns dict{build_id, name, username, cpu, mobo, ram, psu, storage}
    @staticmethod
    def get(db, build_id):
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
            JOIN storage ON build.Build_id = build_has_storage.Build_id          
        WHERE build.build_id = %s;
        '''
        cursor.execute(sql, (build_id))
        build = cursor.fetchone()
        return build

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
    
