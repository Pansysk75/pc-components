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
        # Get all build_ids of builds associated with user
        sql = '''
        SELECT build.Build_id FROM build WHERE build.Username = %s;
        '''
        cursor.execute(sql, (username))
        build_ids = cursor.fetchall()
        result = user
        result["build_ids"] = [build_id["Build_id"] for build_id in build_ids]
        # Get all favorites of user
        favorites = UserFavorite.get(db, username)
        result["favorites"] = favorites    
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
    
    @staticmethod
    def delete(db, username):
        cursor = db.cursor()
        sql = '''
        DELETE FROM user WHERE Username = %s;
        '''
        cursor.execute(sql, (username))
        db.commit()
        return username


class UserFavorite:
    # Get all favorites of a user
    # Returns list of dicts{Username, Build_id}
    @staticmethod
    def get(db, username):
        cursor = db.cursor()
        sql = '''
        SELECT Username, Build_id FROM user_has_favorite_build WHERE Username = %s;
        '''
        cursor.execute(sql, (username))
        favorites = cursor.fetchall()
        return favorites

    # Add a favorite to a user
    # Returns dict{Username, Build_id}
    @staticmethod
    def post(db, new_favorite):
        cursor = db.cursor()
        sql = '''
        INSERT INTO user_has_favorite_build (Username, Build_id) VALUES (%s, %s);
        '''
        cursor.execute(
            sql, (new_favorite["Username"], new_favorite["Build_id"]))
        db.commit()
        return new_favorite

    # Delete a favorite from a user
    # Returns dict{Username, Build_id}
    @staticmethod
    def delete(db, username, build_id):
        cursor = db.cursor()
        sql = '''
        DELETE FROM user_has_favorite_build WHERE Username = %s AND Build_id = %s;
        '''
        cursor.execute(sql, (username, build_id))
        db.commit()
        return {"Username": username, "Build_id": build_id}
