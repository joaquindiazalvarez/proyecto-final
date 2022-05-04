from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    nombre = db.Column(db.String(120), unique = False, nullable = False)
    email = db.Column(db.String(120), unique = True, nullable = False)
    password = db.Column(db.String(80), unique = False, nullable = False)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Perfil(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    nombre = db.Column(db.String(120), unique = True, nullable = False)
    foto = db.Column(db.String(120), unique = False, nullable = True)
    descripcion = db.Column(db.String(1000), unique = False, nullable = True)
    soundcloud = db.Column(db.String(120), unique = True, nullable = True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), unique = False, nullable = False)
    usuario = db.relationship(Usuario)
    
    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "foto": self.foto,
            "descripcion": self.descripcion,
            # do not serialize the password, its a security breach
        }

class Contacto(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    tipo = db.Column(db.String(120), unique = False, nullable = False)
    valor = db.Column(db.String(120), unique = False, nullable = False)
    perfil_id = db.Column(db.Integer, db.ForeignKey('perfil.id'), unique = False, nullable = False)
    perfil = db.relationship(Perfil)

    def serialize(self):
        return {
        "id": self.id,
        "tipo": self.tipo,
        "valor": self.valor,
        "perfil_id": self.perfil.id
        # do not serialize the password, its a security breach
        }

class Genero(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    genero = db.Column(db.String(120), unique = False, nullable = False)

class Genero_perfil(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    perfil_id = db.Column(db.Integer, db.ForeignKey('perfil.id'), unique = False, nullable = False)
    genero_id = db.Column(db.Integer, db.ForeignKey('genero.id'), unique = False, nullable = False)
    perfil = db.relationship(Perfil)
    genero = db.relationship(Genero)

    def serialize(self):
        return {
            "id": self.id,
            "perfil_id": self.perfil_id,
            "genero_id": self.genero_id
            # do not serialize the password, its a security breach
        }
class Favoritos(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), unique = False, nullable = False)
    perfil_id = db.Column(db.Integer, db.ForeignKey('perfil.id'), unique = False, nullable = False)
    usuario = db.relationship(Usuario)
    perfil = db.relationship(Perfil)

    def serialize(self):
        return {
            "id": self.id,
            "nombre_usuario": self.email,
            "nombre_perfil": self.email
            # do not serialize the password, its a security breach
        }
class Post(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    post = db.Column(db.String(120), unique = False, nullable = False)
    perfil_id = db.Column(db.Integer, db.ForeignKey('perfil.id'), unique = False, nullable = False)
    perfil = db.relationship(Perfil)

    def serialize(self):
        return {
            "id": self.id,
            "perfil_id": self.perfil_id,
            "post": self.post
            # do not serialize the password, its a security breach
        }

class Donacion(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    cantidad = db.Column(db.String(120), unique = False, nullable = False)
    fecha = db.Column(db.String(120), unique = False, nullable = False)
    notas = db.Column(db.String(200), unique = False, nullable = False)
    donador_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), unique = False, nullable = False)
    donatario_id = db.Column(db.Integer, db.ForeignKey('perfil.id'), unique = False, nullable = False)
    usuario = db.relationship(Usuario)
    perfil = db.relationship(Perfil)

    def serialize(self):
        return {
            "id": self.id,
            "cantidad": self.cantidad,
            "fecha": self.fecha,
            "notas": self.notas,
            "donador_id": self.donador_id,
            "donatario_id": self.donatario_id
            # do not serialize the password, its a security breach
        }

class Perfil_favoritos_notificacion(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    favoritos_id = db.Column(db.Integer, db.ForeignKey('favoritos.id'), unique = False, nullable = False)
    perfil_id = db.Column(db.Integer, db.ForeignKey('perfil.id'), unique = False, nullable = False)
    leido = db.Column(db.Boolean(), nullable = False)
    favoritos = db.relationship(Favoritos)
    perfil = db.relationship(Perfil)

    def serialize(self):
        return {
            "id": self.id,
            "favoritos_id": self.favoritos_id,
            "perfil_id": self.perfil_id,
            "leido": self.leido
            # do not serialize the password, its a security breach
        }

class Usuario_post_notificacion(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), unique = False, nullable = False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), unique = False, nullable = False)
    leido = db.Column(db.Boolean(), nullable = False)
    post = db.relationship(Post)
    usuario = db.relationship(Usuario)

    def serialize(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "usuario_id": self.usuario_id,
            "leido": self.leido
            # do not serialize the password, its a security breach
        }

class Perfil_donacion_notificacion(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    donacion_id = db.Column(db.Integer, db.ForeignKey('donacion.id'), unique = False, nullable = False)
    perfil_id = db.Column(db.Integer, db.ForeignKey('perfil.id'), unique = False, nullable = False)
    leido = db.Column(db.Boolean(), nullable = False)
    donacion = db.relationship(Donacion)
    perfil = db.relationship(Perfil)

    def serialize(self):
        return {
            "id": self.id,
            "donacion_id": self.donacion_id,
            "perfil_id": self.perfil_id,
            "leido": self.leido
            # do not serialize the password, its a security breach
        }