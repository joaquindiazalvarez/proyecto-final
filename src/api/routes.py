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
        return jsonify({"message":"must specify email"})
    if "password" not in body:
        return jsonify({"message":"must specify a password"})
    
    #chequear si el usuario existe
    user = User.query.filter_by(email=body['email']).first()
    if user: #si el resultado de user es diferente a None
        if user.password == body['password']:
            #"usuario y clave correctos"
            #defino que el token tendrá un tiempo de vida dependiendo de los minutos indicados
            expiration = datetime.timedelta(minutes=20) 

            access_token = create_access_token(
                identity=user.email,
                expires_delta=expiration)
            
            return jsonify({
                "message": "inicio de sesión fue satisfactorio",
                "data": user.serialize(),
                "expires_seconds": expiration.total_seconds(),
                "token": access_token
            })

        else:
            return jsonify({"message":"wrong user or password"})



    return jsonify({"message":"user does not exist"})

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
        return jsonify({"message": "all went well"})

    return jsonify({"message":"this email is already in use"})

@api.route('/profile/getbyuser', methods=['GET'])
@jwt_required()
def get_profile_by_user():
    get_token = get_jwt_identity()
    user = User.query.filter_by(email=get_token).first()
    profile = Profile.query.filter_by(user_id=user.id).first()
    actual_profile = profile.serialize()
    #profiles_names = list(map(lambda x : x.name, serialized_profiles))
    profiles_dict = {"actual_profile": actual_profile}
    if profile:
        #return jsonify({"email": get_token, "username": user.name, "profiles": profiles})
 
        return jsonify(profiles_dict)
    else:
        return "User doesn't have a profile"

@api.route('/profile/get', methods=['POST'])
def get_profile_by_name():
    body = request.get_json()
    #validar si el campo existe o no
    if "name" not in body:
        return "must specify name"
    profile = Profile.query.filter_by(name=body['name']).first()
    if profile:
        serialized_profile = profile.serialize()
        return jsonify(serialized_profile)
    else:
        return "Profile doesn't exist"

@api.route('profile/getprofilephoto', methods=['GET'])
def get_profile_photo():
    profiles = Profile.query.all()
    profiles_list = list(map(lambda x: {"name":x.serialize()['name'], "photo":x.serialize()['photo']}, profiles))
    return jsonify(profiles_list)


@api.route('profile/update', methods=['POST'])
@jwt_required()
def update_profile():
    body = request.get_json()
    if "photo" in body or "description" in body or "soundcloud" in body:
        profile = Profile.query.filter_by(name=body['name']).first()
        if "photo" in body:
            profile.photo = body['photo']
        if "description" in body:
            profile.description = body['description']
        if "soundcloud" in body:
            profile.soundcloud = body['soundcloud']
        db.session.commit()
        return("profile updated")
    else:
        return("nothing to update")

@api.route('favorites/add', methods=['POST'])
@jwt_required()
def add_to_favorites():
    get_token = get_jwt_identity()
    body = request.get_json()
    user = User.query.filter_by(email = get_token).first()
    if "profile" in body:
        profile = Profile.query.filter_by(name=body['profile']).first()
        favorite = Favorites()
        favorite.profile_id = profile.id
        favorite.user_id = user.id
        exist = Favorites.query.filter_by(profile_id=favorite.profile_id).first()
        if exist:
            return("already a favorite")
        else:
            db.session.add(favorite)
            db.session.commit()
        return("added favorite successfully")
    else:
        return("must specify profile")

@api.route('/favorites/getall', methods=['GET'])
@jwt_required()
def get_all_favorites():

    get_token = get_jwt_identity()
    user = User.query.filter_by(email=get_token).first()
    favorites = Favorites.query.filter_by(user_id=user.id).all()
    favorites_profiles_serialized = list(map( lambda x: Profile.query.filter_by(id=x.profile_id).first().serialize(), favorites))
    fav_dict = {"favorites_list":favorites_profiles_serialized}
    return jsonify(fav_dict)    


@api.route('/profile/posting', methods=['POST'])
@jwt_required()
def posting():

    get_token = get_jwt_identity()
    #user = User.query.all()
    user = User.query.filter_by(email=get_token).first()
    profile = Profile.query.filter_by(user_id=user.id).first()
    body = request.get_json()
    post = body["post"]
    new_post = Post()
    new_post.post = post
    new_post.profile_id = profile.id
    #users = list((map(lambda x: x.serialize(),user)))
    db.session.add(new_post)
    db.session.commit()

    print(users)
    return("holahola")

    


