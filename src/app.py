"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory, json
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User, Profile, Contact, Genre, Genre_profile, Favorites, Post, Donation, Profile_favorites_notification, User_post_notification, Profile_donation_notification
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import datetime
#from models import Person

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

jwt = JWTManager(app)

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

#_________________AQUI VAN LAS RUTAS QUE CREAMOS PARA EL LOGIN_____________
##################____________________________________________#############

@app.route('/user/login', methods=['POST'])
def login():
    #recibo info de la solicitud (fetch)
    body = request.get_json()
    #validar si el campo existe o no
    if "email" not in body:
        return "debes especificar el email"
    if "password" not in body:
        return "debes especificar un password"

    #chequear si el usuario existe
    user = User.query.filter_by(email=body['email']).first()
    
    if user: #si el resultado de user es diferente a None
        if user.password == body['password']:
            #"usuario y clave correctos"
            #defino que el token tendrá un tiempo de vida dependiendo de los minutos indicados
            expiracion = datetime.timedelta(minutes=2) 

            access_token = create_access_token(
                identity=user.email,
                expires_delta=expiracion)
            
            return jsonify({
                "mensaje": "inicio de sesión fue satisfactorio",
                "data": user.serialize(),
                #"expira_segundos": expiracion.total_seconds(),
                "token": access_token
            })

        else:
            return "usuario o clave incorrectos"



    return "el usuario no existe"

@app.route('/autenticacion', methods=['GET'])
@jwt_required()
def autenticacion():
    get_token = get_jwt_identity()
    return (get_token)
@app.route('/user/signup', methods=['POST'])
def signup():
    decoded_object = json.loads(request.data)
    checkuser = Usuario.query.filter_by(email=decoded_object['email']).all()
    #checkuser = User.query.get(decoded_object['email'])
    if not checkuser:
        new_user = User()
        new_user.email = decoded_object['email']
        new_user.password = decoded_object['password']
        new_user.is_active = True
        db.session.add(new_user)
        db.session.commit()
        return("todo salio bien")
    else:
        return("el usuario ya existe")


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
