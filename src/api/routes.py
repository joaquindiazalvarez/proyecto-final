"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User, Profile, Contact, Genre, Genre_profile, Favorites, Post, Donation, Profile_favorites_notification, User_post_notification, Profile_donation_notification
from api.utils import generate_sitemap, APIException
import datetime
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user/login', methods=['POST'])
def login():
    #recibo info de la solicitud (fetch)
    body = request.get_json()
    #validar si el campo existe o no
    if "email" not in body:
        return jsonify({"message":"debes especificar el email"})
    if "password" not in body:
        return sonify({"message":"debes especificar un password"})

    #chequear si el usuario existe
    user = User.query.filter_by(email=body['email']).first()
    
    if user: #si el resultado de user es diferente a None
        if user.password == body['password']:
            #"usuario y clave correctos"
            #defino que el token tendrá un tiempo de vida dependiendo de los minutos indicados
            expiracion = datetime.timedelta(minutes=5) 

            access_token = create_access_token(
                identity=user.email,
                expires_delta=expiracion)
            
            return jsonify({
                "mensaje": "inicio de sesión fue satisfactorio",
                "data": user.serialize(),
                "expira_segundos": expiracion.total_seconds(),
                "token": access_token
            })

        else:
            return jsonify({"mensaje":"usuario o clave incorrectos"})



    return jsonify({"message":"el usuario no existe"})

@api.route('/user/signup', methods=['POST'])
def signup():
    decoded_object = json.loads(request.data)
    checkuser = User.query.filter_by(email=decoded_object['email']).all()
    #checkuser = User.query.get(decoded_object['email'])
    if not checkuser:
        new_user = User()
        new_user.name = decoded_object['name']
        new_user.email = decoded_object['email']
        new_user.password = decoded_object['password']
        new_user.gender = decoded_object['gender']
        new_user.date_of_birth= decoded_object['date_of_birth']
        new_user.is_active = True
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"mensaje": "todo salió bien"})

    return jsonify({"mensaje":"el usuario ya existe"})

@api.route('/autenticacion', methods=['GET'])
@jwt_required()
def autenticacion():
    get_token = get_jwt_identity()
    return (get_token)

