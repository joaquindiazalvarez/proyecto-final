  
import os
from flask_admin import Admin
from .models import db, User, Profile, Contact, Genre, Genre_profile, Favorites, Post, Donation, Profile_favorites_notification, User_post_notification, Profile_donation_notification
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Profile, db.session))
    admin.add_view(ModelView(Contact, db.session))
    admin.add_view(ModelView(Genre, db.session))
    admin.add_view(ModelView(Genre_profile, db.session))
    admin.add_view(ModelView(Favorites, db.session))
    admin.add_view(ModelView(Post, db.session))
    admin.add_view(ModelView(Donation, db.session))
    admin.add_view(ModelView(Profile_favorites_notification, db.session))
    admin.add_view(ModelView(User_post_notification, db.session))
    admin.add_view(ModelView(Profile_donation_notification, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))