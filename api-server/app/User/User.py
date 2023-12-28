class User:
    # Get specific user from username, and all build_ids associated with that user
    # Returns dict{username, email, build_ids}
    @staticmethod
    def get(db, username):
        cursor = db.cursor()
        # << Question: Would it be more efficient to do this in one query? >>
        # Get user info first
        sql = '''
        SELECT * FROM user WHERE Username = %s;
        '''
        cursor.execute(sql, (username))
        user = cursor.fetchone()
        if not user:
            return None
        # Then, get all build_ids of builds associated with user
        sql = '''
        SELECT build.Build_id FROM build WHERE build.Username = %s;
        '''
        cursor.execute(sql, (username))
        build_ids = cursor.fetchall()
        # The result is a dictionary with the user info and the list of build_ids
        result = user
        result["build_ids"] = [build_id["Build_id"] for build_id in build_ids]
        return result
    
    @staticmethod
    def post(db, new_user):
        cursor = db.cursor()
        # Check if username is already taken
        sql = '''
        SELECT * FROM user WHERE Username = %s;
        '''
        cursor.execute(sql, (new_user["Username"]))
        if cursor.fetchone():
            return None
        # Insert new user into database
        sql = '''
        INSERT INTO user (Username, email) VALUES (%s, %s);
        '''
        cursor.execute(sql, (new_user["Username"], new_user["email"]))
        db.commit()
        return new_user