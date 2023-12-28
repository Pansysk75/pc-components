import subprocess
from config import get_config

def reset_test_db():
    config = get_config('test')

    # MySQL Shell command to execute the dump file
    mysqlsh_command = f"mysqlsh --sql --user={config['username']} --password={config['password']} --host={config['host']} --port={config['port']} --database={config['database']} --file=tests/test_db_dump.sql"

    # Execute the command
    try:
        print("Resetting test database...")
        result = subprocess.run(mysqlsh_command, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        print("Database reset successfully.")
    except subprocess.CalledProcessError as e:
        print(f"An error occurred: {e}")
        print("Standard Output:\n", e.stdout)
        print("Standard Error:\n", e.stderr)

