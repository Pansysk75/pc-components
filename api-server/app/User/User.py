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
        result["builds_created"] = [build_id["Build_id"]
                                    for build_id in build_ids]
        # Get all favorites of user
        favorite_builds = UserFavorite.get(db, username)
        result["favorite_builds"] = favorite_builds
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
        # Note: This method is not used, because with the current database design,
        # deleting a user would require deleting all builds created by that user,
        # and all ratings and favorites associated with those builds.
        # Ideally we would have a "soft delete" where the user is not actually deleted,
        # so that we can still keep the build and rating data.
        # But it's too late to change the database design now.
        raise NotImplementedError

        # cursor = db.cursor()
        # # First, entries in user_has_favorite_build and user_rates_build must be deleted
        # del_fav_sql = '''
        # DELETE FROM user_has_favorite_build WHERE Username = %s;
        # '''
        # cursor.execute(del_fav_sql, (username))
        # del_rates_sql = '''
        # DELETE FROM user_rates_build WHERE Username = %s;
        # '''
        # cursor.execute(del_rates_sql, (username))
        # # Then, all builds created by the user must be deleted
        # del_builds_sql = '''
        # DELETE FROM build WHERE Username = %s;
        # '''
        # cursor.execute(del_builds_sql, (username))
        # # Now we can delete the user
        # sql = '''
        # DELETE FROM user WHERE Username = %s;
        # '''
        # cursor.execute(sql, (username))
        # db.commit()
        # return username


class UserFavorite:
    # Get all favorites of a user
    # Returns list of dicts{Username, Build_id}
    @staticmethod
    def get(db, username):
        cursor = db.cursor()
        sql = '''
        SELECT Build_id FROM user_has_favorite_build WHERE Username = %s;
        '''
        cursor.execute(sql, (username))
        favorites = cursor.fetchall()
        favorites = [favorite["Build_id"] for favorite in favorites]
        return favorites

    # Add a favorite to a user
    @staticmethod
    def post(db, username, new_favorite_build_id):
        cursor = db.cursor()
        sql = '''
        INSERT INTO user_has_favorite_build (Username, Build_id) VALUES (%s, %s);
        '''
        cursor.execute(
            sql, (username, new_favorite_build_id))
        db.commit()
        return True

    # Delete a favorite from a user
    @staticmethod
    def delete(db, username, build_id):
        cursor = db.cursor()
        sql = '''
        DELETE FROM user_has_favorite_build WHERE Username = %s AND Build_id = %s;
        '''
        cursor.execute(sql, (username, build_id))
        db.commit()
        return True
