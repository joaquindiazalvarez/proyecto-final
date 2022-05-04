  
import os
from flask_admin import Admin
from .models import db, Usuario, Perfil, Contacto, Genero, Genero_perfil, Favoritos, Post, Donacion, Perfil_favoritos_notificacion, Usuario_post_notificacion, Perfil_donacion_notificacion
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Usuario, db.session))
    admin.add_view(ModelView(Perfil, db.session))
    admin.add_view(ModelView(Contacto, db.session))
    admin.add_view(ModelView(Genero, db.session))
    admin.add_view(ModelView(Genero_perfil, db.session))
    admin.add_view(ModelView(Favoritos, db.session))
    admin.add_view(ModelView(Post, db.session))
    admin.add_view(ModelView(Donacion, db.session))
    admin.add_view(ModelView(Perfil_favoritos_notificacion, db.session))
    admin.add_view(ModelView(Usuario_post_notificacion, db.session))
    admin.add_view(ModelView(Perfil_donacion_notificacion, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))