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
        new_profile = Profile()
        new_profile.name = decoded_object['name']
        new_profile.photo = ""
        new_profile.description = ""
        new_profile.soundcloud = ""
        user = User.query.filter_by(email=new_user.email).first()
        new_profile.user_id = user.id
        db.session.add(new_profile)
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
    profiles_dict = {"actual_profile":actual_profile}
    if profile:
        #return jsonify({"email": get_token, "username": user.name, "profiles": profiles})
        print(profiles_dict)
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
    reversed_list = []
    for i in range(len(profiles_list)-1, 0, -1):
        reversed_list.append(profiles_list[i])
    return jsonify(reversed_list)


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
    favorites_all = Favorites.query.filter_by(user_id=user.id).all()
    if "profile" in body:
        profile = Profile.query.filter_by(name=body['profile']).first()
        favorite = Favorites()
        favorite.profile_id = profile.id
        favorite.user_id = user.id
        favorites_profiles_serialized = list(map( lambda x: Profile.query.filter_by(id=x.profile_id).first().serialize()['id'], favorites_all))
        if profile.user_id == user.id:
            return("cannot add yourself to favorites")
        elif profile.id in favorites_profiles_serialized:
            return("your profile is already in favorites")
        else:
            db.session.add(favorite)
            db.session.commit()
            notifications=Profile_favorites_notification()
            favorite_search = Favorites.query.all()
            favorite_target = favorite_search[-1]
            print(favorite_target)
            print(favorite_target.id)
            notifications.favorites_id = favorite_target.id
            notifications.read=False
            db.session.add(notifications)
            db.session.commit()
            return("added favorite successfully")

        """
        fav_dict = {"favorites_list":favorites_profiles_serialized}
        search_profile_id = "id"
        profile_ids = [a_dict[search_profile_id] for a_dict in favorites_profiles_serialized]
        if profile.user_id == user.id:
            return jsonify("you cant add your own profile to favorites")
        #exist = Favorites.query.filter_by(profile_id=favorite.profile_id).first()
        elif profile.id in profile_ids:
            return jsonify("este perfil ya está en tus favoritos") #YA ESTÁ FUNCIONANDO EL AGREGAR ! PERO MIRA BIEN QUE FALTA !!!!!!!!
        else:
            db.session.add(favorite)
            db.session.commit()
            notifications=Profile_favorites_notification()
            favorite_search = Favorites.query.all()
            favorite_target = favorite_search[-1]
            print(favorite_target)
            print(favorite_target.id)
            notifications.favorites_id = favorite_target.id
            notifications.read=False
            db.session.add(notifications)
            db.session.commit()
            return("added favorite successfully")
"""
    else:
        return jsonify("must specify profile")

@api.route('/favorites/getall', methods=['GET'])
@jwt_required()
def get_all_favorites():

    get_token = get_jwt_identity()
    user = User.query.filter_by(email=get_token).first()
    favorites = Favorites.query.filter_by(user_id=user.id).all()
    favorites_profiles_serialized = list(map( lambda x: Profile.query.filter_by(id=x.profile_id).first().serialize(), favorites))
    fav_dict = {"favorites_list":favorites_profiles_serialized}
    return jsonify(fav_dict)    

@api.route('favorites/delete', methods=['POST'])
@jwt_required()
def delete_favorite():
    get_token = get_jwt_identity()
    body = request.get_json()
    user = User.query.filter_by(email=get_token).first()
    if "profile" in body:
        profile = Profile.query.filter_by(name=body["profile"]).first()
        favorite_target = Favorites.query.filter_by(user_id=user.id, profile_id=profile.id).first()
        #search_profile_id = "id"
        #profile_ids = [a_dict[search_profile_id] for a_dict in favorites_profiles_serialized]
        notification = Profile_favorites_notification.query.filter_by(favorites_id = favorite_target.id).first()
        db.session.delete(favorite_target)
        if notification:
            db.session.delete(notification)
        db.session.commit()
        return(f"se borró el favorito")
    else:
        return("debe especificar un profile a eliminar")

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
    post = Post.query.all()
    final_post = post[-1]
    new_notification = User_post_notification()
    new_notification.post_id= final_post.id
    new_notification.read = False
    db.session.add(new_notification)
    db.session.commit()
    return jsonify("Post Hecho")

@api.route('/profile/getposts', methods=['POST'])
def get_post():
    body = request.get_json()
    profile = Profile.query.filter_by(name=body['profile']).first()
    posts_by_profile = Post.query.filter_by(profile_id=profile.id).all()
    post_serialized = list((map(lambda x: x.serialize(), posts_by_profile )))
    reversed_list = []
    for i in range(len(post_serialized)-1, 0, -1):
        reversed_list.append(post_serialized[i])
    return jsonify(reversed_list)


@api.route('/profile/deletepost', methods=['POST'])
@jwt_required()
def delete_post():
    get_token = get_jwt_identity()
    body = request.get_json()
    user = User.query.filter_by(email=get_token).first()
    profile = Profile.query.filter_by(user_id=user.id).first()
    posts_by_profile = Post.query.filter_by(profile_id=profile.id, id=body["id"]).first()
    if posts_by_profile:
        notification = User_post_notification.query.filter_by(post_id = posts_by_profile.id).first()
        db.session.delete(posts_by_profile)
        if notification:
            db.session.delete(notification)
        db.session.commit()
        return jsonify("Post eliminado compipa")
    else:
        return jsonify("NO SE PUDO ELIMINAR , DAME EL ID")

@api.route('/notifications/getall', methods=['GET'])
@jwt_required()
def get_all_notifications():

    get_token = get_jwt_identity()
    user=User.query.filter_by(email=get_token).first()
    profile= Profile.query.filter_by(user_id=user.id).first()
    favorites= Favorites.query.filter_by(profile_id=profile.id).all()
    #notifications= Profile_favorites_notification.query.filter_by(profile_id=profile.id).all()
    #notifications_serialized= list(map( lambda x: x.serialize(), notifications ))
    notifications_serialized= []

    for element in favorites:
        #favorites=Favorites.query.filter_by(id=element.favorites_id)
        user_who_added= User.query.filter_by(id=element.user_id).first()
        profile_who_added= Profile.query.filter_by(user_id=user_who_added.id).first()
        notification= Profile_favorites_notification.query.filter_by(favorites_id=element.id).first()
        if notification:
            print(notification.serialize())
            notifications_serialized.append({"name":profile_who_added.name,"read":notification.read, "type":"favorite"})
    
    posts_all=[]
    favorites=Favorites.query.filter_by(user_id=user.id).all()

    for element in favorites:
        #user_who_added= User.query.filter_by(id=element.user_id).first()
        profile=Profile.query.filter_by(id=element.profile_id).first()
        print(profile)
        posts=Post.query.filter_by(profile_id=profile.id).all()
        print(posts)
        #posts_serialized= list(map(lambda x:{"post": x.serialze()["post"],post},posts ))

        post_by_user=[]
        for element2 in posts:
           # profile=Profile.query.filter_by(id=element.profile_id).first()
            notification= User_post_notification.query.filter_by(post_id=element.id).first()
            post_dict={"name":profile.name, "read":notification.read, "type":"post"}
            post_by_user.append(post_dict)
            print(post_dict)

        posts_all= posts_all+post_by_user

    notifications_dict= {"notification_list":notifications_serialized + posts_all}

    return jsonify(notifications_dict)

@api.route('/genre/getalldeafult', methods=['GET'])
def get_all_deafult_genres():
    genres = Genre.query.filter_by(deafult=True).all()
    genres_serialized = list(map(lambda x: x.serialize(), genres))
    genres_dict = {"genres_deafult_list":genres_serialized}
    return jsonify(genres_dict)

@api.route('/genre/addtoprofile', methods=['POST'])
@jwt_required()
def add_genres_to_profile():
    body = request.get_json()
    get_token = get_jwt_identity()
    user = User.query.filter_by(email=get_token).first()
    profile = Profile.query.filter_by(user_id = user.id).first()
    old_profile_genres_query = Genre_profile.query.filter_by(profile_id=profile.id).all()
    old_profile_list = list(map(lambda x: x.serialize()["genre_genre"], old_profile_genres_query))
    if "genres_list" in body:
        all_genres_deafult = Genre.query.filter_by(deafult=True).all()
        all_genres_deafult_serialized = list(map(lambda x: x.serialize()['genre'], all_genres_deafult))
        print(all_genres_deafult_serialized)
        for element in body["genres_list"]:
            if element not in all_genres_deafult_serialized:
                genre = Genre()
                genre.genre = element
                genre.deafult = False
                db.session.add(genre)
                db.session.commit()
            if element not in old_profile_list:
                profile_genre = Genre_profile()
                profile_genre.profile_id = profile.id
                profile_genre.genre_genre = element
                db.session.add(profile_genre)
                db.session.commit()
        return("genres added to profile")
            
    else:
        return("you must specify genres list(genres_list)")

@api.route('genre/delete', methods=['POST'])
@jwt_required()
def delete_genre():
    body = request.get_json()
    get_token = get_jwt_identity()
    user = User.query.filter_by(email = get_token).first()
    profile = Profile.query.filter_by(user_id = user.id).first()
    genre_deleted = Genre_profile.query.filter_by(genre_genre = body['genre']).first()
    if genre_deleted:
        db.session.delete(genre_deleted)
        db.session.commit()
    else:
        return("genre not found")
    return("genre deleted")

@api.route('/profile/getgenresbyprofilename', methods=['POST'])
def get_genres_by_profile_name():
    body = request.get_json()
    if "profile" not in body:
        return("you must specify a profile")
    profile = Profile.query.filter_by(name=body['profile']).first()
    profile_genres = Genre_profile.query.filter_by(profile_id = profile.id).all()
    profile_genres_serialized = list(map(lambda x: x.serialize()["genre_genre"], profile_genres))
    genres_dict = {"profile_genres_list":profile_genres_serialized}
    return jsonify(genres_dict)

@api.route('/contact/add', methods=['POST'])
@jwt_required()
def add_contact_info():
    get_token = get_jwt_identity()
    body = request.get_json()
    user = User.query.filter_by(email = get_token).first()
    profile = Profile.query.filter_by(user_id=user.id).first()
    if "type" in body and "value" in body and "public" in body:
        contact = Contact()
        contact.type = body['type']
        contact.value = body['value']
        contact.public = body['public']
        contact.profile_id = profile.id
        db.session.add(contact)
        db.session.commit()
        return("added successfully")
    else:
        return("must specify all parameters")

@api.route('/contact/public/getbyprofilename', methods =["POST"])
def get_public_contact():
    body = request.get_json()
    if "profile" not in body:
        return("must specify profile")
    profile = Profile.query.filter_by(name = body['profile']).first()
    contact = Contact.query.filter_by(public = True, profile_id = profile.id).all()
    contact_serialized = list(map(lambda x: x.serialize(), contact))
    contact_serialized_dict = {"public_contact_list": contact_serialized}
    return jsonify(contact_serialized_dict)

@api.route('/profile/contact/edit', methods=['POST'])
@jwt_required()
def edit_contact_info():
    get_token = get_jwt_identity()
    body = request.get_json()
    if "facebook" in body and "instagram" in body and "youtube" in body:
        user = User.query.filter_by(email = get_token).first()
        profile = Profile.query.filter_by(user_id = user.id).first()
        facebook = Contact.query.filter_by(profile_id = profile.id, type = "facebook").first()
        if not facebook:
            contact = Contact()
            contact.type = "facebook"
            contact.value = body['facebook']
            contact.public = True
            contact.profile_id = profile.id
            db.session.add(contact)
            db.session.commit()
        elif facebook.value != body['facebook']:
            facebook.value = body['facebook']
            db.session.commit()
        instagram = Contact.query.filter_by(profile_id = profile.id, type = "instagram").first()
        if not instagram:
            contact = Contact()
            contact.type = "instagram"
            contact.value = body['instagram']
            contact.public = True
            contact.profile_id = profile.id
            db.session.add(contact)
            db.session.commit()
        elif instagram.value != body['instagram']:
            instagram.value = body['instagram']
            db.session.commit()
        youtube = Contact.query.filter_by(profile_id = profile.id, type = "youtube").first()
        if not youtube:
            contact = Contact()
            contact.type = "youtube"
            contact.value = body['youtube']
            contact.public = True
            contact.profile_id = profile.id
            db.session.add(contact)
            db.session.commit()
        elif youtube.value != body['youtube']:
            youtube.value = body['youtube']
            db.session.commit()
        return("added changes")
    else:
        return("must specify facebook, instagram and youtube")


@api.route('/contact/private/getfromfavorite', methods = ['GET'])
@jwt_required()
def get_private_contact_from_favorite():
    get_token = get_jwt_identity()
    body = request.get_json()
    user = User.query.filter_by(email = get_token).first()
    profile = Profile.query.filter_by(name = body['profile']).first()
    #user_favorites = Favorites.query.filter_by(user_id = user.id)
    favorite = Favorites.query.filter_by(user_id = user.id, profile_id = profile.id).first()
    if favorite:
        contact = Contact.query.filter_by(profile_id = profile.id, public = False).all()
        contact_serialized = list(map(lambda x: x.serialize(), contact))
        contact_dict = {"contact_private_list": contact_serialized}
        return jsonify(contact_dict)
    else:
        return("not added to favorite")


@api.route('/genre/populatedgenres/get', methods = ['GET'])
def get_all_populated_genres():
    populated_genres = set()
    all_genres = Genre_profile.query.all()
    for element in all_genres:
        populated_genres.add(element.genre_genre)
    populated_genres = list(populated_genres)
    genres_dict = {"populated": populated_genres}
    return jsonify(genres_dict)

@api.route('/profile/getbygenre', methods = ['POST'])
def get_profiles_by_genre():
    body = request.get_json()
    genre_profile = Genre_profile.query.filter_by(genre_genre = body['genre']).all()
    all_names = []
    for element in genre_profile:
        profile = Profile.query.filter_by(id = element.profile_id).first()
        all_names.append({"name":profile.name, "photo":profile.photo})
    names_dict = {"genre_profile_name":all_names}
    return jsonify(names_dict)

@api.route('profile/getpopulated', methods=['GET'])
def get_populated():
    populated_genres = set()
    all_genres = Genre_profile.query.all()
    for element in all_genres:
        populated_genres.add(element.genre_genre)
    populated_genres = list(populated_genres)
    final_genre_list = []
    for element in populated_genres:
        genres_plural = Genre_profile.query.filter_by(genre_genre=element).all()
        array = []
        for element2 in genres_plural:
            profile = Profile.query.filter_by(id=element2.profile_id).first()
            array.append({"profile_name":profile.name, "profile_photo":profile.photo})
        final_genre_list.append({"genre":element, "profiles_array":array})
    final_dict = {"populated_array":final_genre_list}
    return jsonify(final_dict)

