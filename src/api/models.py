from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), unique = False, nullable = False)
    email = db.Column(db.String(120), unique = True, nullable = False)
    password = db.Column(db.String(80), unique = False, nullable = False)
    gender = db.Column(db.String(120), unique = False, nullable = True)
    date_of_birth = db.Column(db.String(120), unique = False, nullable = True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "gender": self.gender,
            "date_of_birth": self.date_of_birth
            # do not serialize the password, its a security breach
        }

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), unique = True, nullable = False)
    photo = db.Column(db.String(120), unique = False, nullable = True)
    description = db.Column(db.String(1000), unique = False, nullable = True)
    soundcloud = db.Column(db.String(120), unique = True, nullable = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique = False, nullable = False)
    user = db.relationship(User)
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "photo": self.photo,
            "description": self.description,
            # do not serialize the password, its a security breach
        }

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    type = db.Column(db.String(120), unique = False, nullable = False)
    value = db.Column(db.String(120), unique = False, nullable = False)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'), unique = False, nullable = False)
    profile = db.relationship(Profile)

    def serialize(self):
        return {
        "id": self.id,
        "type": self.type,
        "value": self.value,
        "profile_id": self.profile.id
        # do not serialize the password, its a security breach
        }

class Genre(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    genre = db.Column(db.String(120), unique = False, nullable = False)

class Genre_profile(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'), unique = False, nullable = False)
    genre_id = db.Column(db.Integer, db.ForeignKey('genre.id'), unique = False, nullable = False)
    profile = db.relationship(Profile)
    genre = db.relationship(Genre)

    def serialize(self):
        return {
            "id": self.id,
            "profile_id": self.profile_id,
            "genre_id": self.genre_id
            # do not serialize the password, its a security breach
        }
class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique = False, nullable = False)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'), unique = False, nullable = False)
    user = db.relationship(User)
    profile = db.relationship(Profile)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "profile_id": self.profile_id
            # do not serialize the password, its a security breach
        }
class Post(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    post = db.Column(db.String(120), unique = False, nullable = False)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'), unique = False, nullable = False)
    profile = db.relationship(Profile)

    def serialize(self):
        return {
            "id": self.id,
            "profile_id": self.profile_id,
            "post": self.post
            # do not serialize the password, its a security breach
        }

class Donation(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    amount = db.Column(db.String(120), unique = False, nullable = False)
    date = db.Column(db.String(120), unique = False, nullable = False)
    notes = db.Column(db.String(200), unique = False, nullable = False)
    donor_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique = False, nullable = False)
    donee_id = db.Column(db.Integer, db.ForeignKey('profile.id'), unique = False, nullable = False)
    user = db.relationship(User)
    profile = db.relationship(Profile)

    def serialize(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "date": self.date,
            "notes": self.notes,
            "donor_id": self.donor_id,
            "donee_id": self.donee_id
            # do not serialize the password, its a security breach
        }

class Profile_favorites_notification(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    favorites_id = db.Column(db.Integer, db.ForeignKey('favorites.id'), unique = False, nullable = False)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'), unique = False, nullable = False)
    read = db.Column(db.Boolean(), nullable = False)
    favorites = db.relationship(Favorites)
    profile = db.relationship(Profile)

    def serialize(self):
        return {
            "id": self.id,
            "favorites_id": self.favorites_id,
            "profile_id": self.profile_id,
            "read": self.read
            # do not serialize the password, its a security breach
        }

class User_post_notification(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), unique = False, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique = False, nullable = False)
    read = db.Column(db.Boolean(), nullable = False)
    post = db.relationship(Post)
    user = db.relationship(User)

    def serialize(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "user_id": self.user_id,
            "read": self.read
            # do not serialize the password, its a security breach
        }

class Profile_donation_notification(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    donation_id = db.Column(db.Integer, db.ForeignKey('donation.id'), unique = False, nullable = False)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'), unique = False, nullable = False)
    read = db.Column(db.Boolean(), nullable = False)
    donation = db.relationship(Donation)
    profile = db.relationship(Profile)

    def serialize(self):
        return {
            "id": self.id,
            "donation_id": self.donation_id,
            "profile_id": self.profile_id,
            "read": self.read
            # do not serialize the password, its a security breach
        }