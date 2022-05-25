
import click
from api.models import db, User, Profile, Favorites, Profile_favorites_notification, Genre, Genre_profile, Contact, Post, User_post_notification 

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_data(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

        ### Insert the code to populate others tables if needed
            ###PARA AGREGAR EL USUARIO Y LOS PERFILES ESCRIBIR EN CONSOLA
    ###     flask insert-6-users-6-profiles
    @app.cli.command("insert-6-users-6-profiles") # name of our command
    def insert_6_user_6_profiles():
        for x in range(1, 7):
            user = User()
            user.name = "testman" + str(x)
            user.email = "testman" + str(x) + "@testman.com"
            user.password = "123456"
            user.gender = "hombre"
            user.date_of_birth = "10/10/2003"
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")
        
        
        print("Creating test profiles")
        profile1 = Profile()
        profile1.name = "Note"
        profile1.photo = "https://i1.sndcdn.com/avatars-pwFpqKvPHu9LcB1i-GDrSnA-t500x500.jpg"
        profile1.description = "Hi, My name is Note! I basically post things that Nick doesn't finish, or somethings that he just feels like posting for no reason."
        profile1.soundcloud = "https://soundcloud.com/nikalt/homicidalcurse"
        profile1.user_id = 1
        db.session.add(profile1)
        db.session.commit()
        print("Profile 1, Note created.")

        profile2 = Profile()
        profile2.name = "KROD"
        profile2.photo = "https://i1.sndcdn.com/avatars-TeN9i8yNaAqXhiTp-ZDPEPw-t500x500.jpg"
        profile2.description = "BLACK METAL FROM CHILE \n linktr.ee/KROD666"
        profile2.soundcloud = "https://soundcloud.com/krod666/krod-nihilist-shadows-1"
        profile2.user_id = 2
        db.session.add(profile2)
        db.session.commit()
        print("Profile 2 KROD created.")

        profile3 = Profile()
        profile3.name = "Richi Chamoi"
        profile3.photo = "https://i1.sndcdn.com/avatars-isaOJM13mJFtKRgk-MF4KhQ-t500x500.jpg"
        profile3.description = "𝖏𝖆𝖗𝖉í𝖓 𝖉𝖊 𝖗𝖔𝖘𝖆𝖘🦧"
        profile3.soundcloud = "https://soundcloud.com/ricardo-sepulveda-villa/me-haces-sentir-que-la-vida-es-hermosa"
        profile3.user_id = 3
        db.session.add(profile3)
        db.session.commit()
        print("Profile 3, Soothing Things created.")

        profile4 = Profile()
        profile4.name = "Tevvez"
        profile4.photo = "https://i1.sndcdn.com/avatars-SRhwNTbzeNhC9Cke-FrnX1g-t500x500.jpg"
        profile4.description = "Hardstyle, Edm, Trance Producer"
        profile4.soundcloud = "https://soundcloud.com/thierry-estev/mog-1"
        profile4.user_id = 4
        db.session.add(profile4)
        db.session.commit()
        print("Profile 4, Tevvez created.")

        profile5 = Profile()
        profile5.name = "Elie Lapointe"
        profile5.photo = "https://i1.sndcdn.com/avatars-wxJowXBhgqzwLWzn-MZTu1w-t500x500.jpg"
        profile5.description = "Award winning Producer, Singer, Songwriter, Guitarist in the Haitian Music Industry. Credits : Wyclef Jean, Djakout Mizik, Djakout #1, Rutshelle, Arly Lariviere, Tabou Combo, Beethova Obas, Haiti Twoubadou ... Get to know me !"
        profile5.soundcloud = "https://soundcloud.com/elie-lapointe/dans-tes-bras-elie-lapointe-feat-rutshelle"
        profile5.user_id = 5
        db.session.add(profile5)
        db.session.commit()
        print("Profile 5, Elie Lapointe created.")

        profile6 = Profile()
        profile6.name = "Pierre Jean Haiti"
        profile6.photo = "https://i1.sndcdn.com/avatars-GJ9g5SkRoNC5CDWj-ym44Rg-t500x500.jpg"
        profile6.description = "Beatmaker • Producer • Singer • Composer"
        profile6.soundcloud = "https://soundcloud.com/pierrejeanhaiti/pierre-jean-anvi-viv"
        profile6.user_id = 6
        db.session.add(profile6)
        db.session.commit()
        print("Profile 6, Pierre Jean Haiti")

        print("All test users and profiles created")

    #flask insert-favorites
    @app.cli.command("insert-favorites")
    def insert_favorites():
        favorite1 = Favorites()
        favorite1.user_id = 1
        favorite1.profile_id = 2
        db.session.add(favorite1)
        db.session.commit()
        print("Favorite from user 1 to profile 2 created")

        favorite2 = Favorites()
        favorite2.user_id = 2
        favorite2.profile_id = 3
        db.session.add(favorite2)
        db.session.commit()
        print("Favorite from user 2 to profile 3 created")

        favorite = Favorites()
        favorite.user_id = 3
        favorite.profile_id = 4
        db.session.add(favorite)
        db.session.commit()
        print("Favorite from user 3 to profile 4 created")

        favorite = Favorites()
        favorite.user_id = 4
        favorite.profile_id = 5
        db.session.add(favorite)
        db.session.commit()
        print("Favorite from user 4 to profile 5 created")

        favorite = Favorites()
        favorite.user_id = 5
        favorite.profile_id = 6
        db.session.add(favorite)
        db.session.commit()
        print("Favorite from user 5 to profile 6 created")

        favorite = Favorites()
        favorite.user_id = 6
        favorite.profile_id = 1
        db.session.add(favorite)
        db.session.commit()
        print("Favorite from user 6 to profile 1 created")

    @app.cli.command('insert-post')
    def insert_post(): 
        post= Post()
        post.profile_id=2
        post.post="prueba"
        db.session.add(post)
        db.session.commit()

        post= Post()
        post.profile_id=2
        post.post="prueba2"
        db.session.add(post)
        db.session.commit()
    

    #flask insert-notifications
    @app.cli.command("insert-notifications")
    def insert_notifications():
        
        notifications1= Profile_favorites_notification()
        notifications1.favorites_id = 1
        notifications1.read= False
        db.session.add(notifications1)
        db.session.commit()
        print('the first notification was created')
        
        notifications2= Profile_favorites_notification()
        notifications2.favorites_id = 2
        notifications2.read = False
        db.session.add(notifications2)
        db.session.commit()
        print('the second notification was created')

        notifications = Profile_favorites_notification()
        notifications.favorites_id = 3
        notifications.read = False
        db.session.add(notifications)
        db.session.commit()
        print('the third notification was created')

        notifications = Profile_favorites_notification()
        notifications.favorites_id = 4
        notifications.read = False
        db.session.add(notifications)
        db.session.commit()
        print('the fourth notification was created')

        notifications= Profile_favorites_notification()
        notifications.favorites_id = 5
        notifications.read = False
        db.session.add(notifications)
        db.session.commit()
        print('the fifth notification was created')

        notifications = Profile_favorites_notification()
        notifications.favorites_id = 6
        notifications.read = False
        db.session.add(notifications)
        db.session.commit()
        print('the sixth notification was created')

        notifications = User_post_notification()
        notifications.post_id = 1
        notifications.read = False 
        db.session.add(notifications)
        db.session.commit()

        notifications = User_post_notification()
        notifications.post_id = 2
        notifications.read = False 
        db.session.add(notifications)
        db.session.commit()

    #flask insert-deafult-genres
    @app.cli.command("insert-deafult-genres")
    def insert_deafult_genres():
        genres = ["Alternative Rock","Ambient","Classical","Country","Dance & EDM","Dancehall", "DeepHouse", "Disco","Drum & Bass", "Dubstep", "Electronic", "Folk & Singer-Songwriter", "Hip-hop & Rap", "House", "Indie", "Jazz & Blues", "Latin", "Metal", "Piano", "Pop", "R&B & Soul", "Reggae","Reggaeton","Rock","Soundtrack", "Techno","Trance","Trap","Triphop","World"]
        for element in genres:
            genre1 = Genre()
            genre1.genre = element 
            genre1.deafult = True
            db.session.add(genre1)
            db.session.commit()
            print(f'{element} added')

    #flask insert-profiles-genres /// insert genres to profile "Note"
    @app.cli.command("insert-profiles-genres")
    def insert_user1_genres():
        genre = Genre_profile()
        genre.profile_id = 1
        genre.genre_genre = "Metal"
        db.session.add(genre)
        db.session.commit()
        print("added Metal Genre to  profile 'Note'")

        genre = Genre_profile()
        genre.profile_id = 1
        genre.genre_genre = "Rock"
        db.session.add(genre)
        db.session.commit()
        print("added Rock Genre to profile 'Note'")

        genre = Genre_profile()
        genre.profile_id = 2
        genre.genre_genre = "Metal"
        db.session.add(genre)
        db.session.commit()
        print("added Metal Genre to  profile 'KROD'")

        genre = Genre_profile()
        genre.profile_id = 2
        genre.genre_genre = "Alternative Rock"
        db.session.add(genre)
        db.session.commit()
        print("added Rock Genre to profile 'KROD'")

        genre1 = Genre_profile()
        genre1.profile_id = 3
        genre1.genre_genre = "Dance & EDM"
        db.session.add(genre1)
        db.session.commit()
        print("added Techno Genre to  profile 'Ricky Chamoi'")

        genre2 = Genre_profile()
        genre2.profile_id = 3
        genre2.genre_genre = "Electronic"
        db.session.add(genre2)
        db.session.commit()
        print("added Electronic Genre to profile 'Ricky Chamoi'")

        genre2 = Genre_profile()
        genre2.profile_id = 4
        genre2.genre_genre = "Techno"
        db.session.add(genre2)
        db.session.commit()
        print("added Techno Genre to profile 'Tevvez'")

        genre2 = Genre_profile()
        genre2.profile_id = 4
        genre2.genre_genre = "Electronic"
        db.session.add(genre2)
        db.session.commit()
        print("added Electronic Genre to profile 'Tevvez'")

        genre2 = Genre_profile()
        genre2.profile_id = 5
        genre2.genre_genre = "World"
        db.session.add(genre2)
        db.session.commit()
        print("added World Genre to profile 'Ellie Lapointe'")

        genre2 = Genre_profile()
        genre2.profile_id = 5
        genre2.genre_genre = "Reggaeton"
        db.session.add(genre2)
        db.session.commit()
        print("added Reggaeton Genre to profile 'Ellie Lapointe'")

        genre2 = Genre_profile()
        genre2.profile_id = 6
        genre2.genre_genre = "World"
        db.session.add(genre2)
        db.session.commit()
        print("added World Genre to profile 'Pierre Jean Haiti'")

        genre2 = Genre_profile()
        genre2.profile_id = 6
        genre2.genre_genre = "Reggae"
        db.session.add(genre2)
        db.session.commit()
        print("added Reggae Genre to profile 'Pierre Jean Haiti'")

    #flask insert-contacts-to-profiles
    @app.cli.command('insert-contacts-to-profiles')
    def insert_contacts_to_first_profile():
        contact = Contact()
        contact.type = "facebook"
        contact.value = "note"
        contact.public = True
        contact.profile_id = 1
        db.session.add(contact)
        db.session.commit()

        print("added facebook profile name")

        contact = Contact()
        contact.type = "instagram"
        contact.value = "note"
        contact.public = True
        contact.profile_id = 1
        db.session.add(contact)
        db.session.commit()

        print("added instagram profile")


        contact = Contact()
        contact.type = "youtube"
        contact.value = "note"
        contact.public = True
        contact.profile_id = 1
        db.session.add(contact)
        db.session.commit()
        
        print("youtube channel added")

        
        contact = Contact()
        contact.type = "phone_number"
        contact.value = "+56967678989"
        contact.public = False
        contact.profile_id = 1
        db.session.add(contact)
        db.session.commit()

        print("added phone_number")


        contact = Contact()
        contact.type = "email"
        contact.value = "note@note.com"
        contact.public = False
        contact.profile_id = 1
        db.session.add(contact)
        db.session.commit()
        
         ##########2############
        print("added email")

        contact = Contact()
        contact.type = "facebook"
        contact.value = "krod"
        contact.public = True
        contact.profile_id = 2
        db.session.add(contact)
        db.session.commit()

        print("added facebook profile name")

        contact = Contact()
        contact.type = "instagram"
        contact.value = "krod"
        contact.public = True
        contact.profile_id = 2
        db.session.add(contact)
        db.session.commit()

        print("added instagram profile")


        contact = Contact()
        contact.type = "youtube"
        contact.value = "krod"
        contact.public = True
        contact.profile_id = 2
        db.session.add(contact)
        db.session.commit()
        
        print("youtube channel added")

        
        contact = Contact()
        contact.type = "phone_number"
        contact.value = "+56967673459"
        contact.public = False
        contact.profile_id = 2
        db.session.add(contact)
        db.session.commit()

        print("added phone_number")


        contact = Contact()
        contact.type = "email"
        contact.value = "krod@krod.com"
        contact.public = False
        contact.profile_id = 2
        db.session.add(contact)
        db.session.commit()
        
        print("added email")

        ##############3##############

        contact = Contact()
        contact.type = "facebook"
        contact.value = "richi_chamoi"
        contact.public = True
        contact.profile_id = 2
        db.session.add(contact)
        db.session.commit()

        print("added facebook profile name")

        contact = Contact()
        contact.type = "instagram"
        contact.value = "richi_chamoi"
        contact.public = True
        contact.profile_id = 3
        db.session.add(contact)
        db.session.commit()

        print("added instagram profile")


        contact = Contact()
        contact.type = "youtube"
        contact.value = "richi_chamoi"
        contact.public = True
        contact.profile_id = 3
        db.session.add(contact)
        db.session.commit()
        
        print("youtube channel added")

        
        contact = Contact()
        contact.type = "phone_number"
        contact.value = "+56923423489"
        contact.public = False
        contact.profile_id = 3
        db.session.add(contact)
        db.session.commit()

        print("added phone_number")


        contact = Contact()
        contact.type = "email"
        contact.value = "richi@chamoi.com"
        contact.public = False
        contact.profile_id = 3
        db.session.add(contact)
        db.session.commit()
        
        print("added email")

        ############4#############

        contact = Contact()
        contact.type = "facebook"
        contact.value = "tevvez"
        contact.public = True
        contact.profile_id = 4
        db.session.add(contact)
        db.session.commit()

        print("added facebook profile name")

        contact = Contact()
        contact.type = "instagram"
        contact.value = "tevvez"
        contact.public = True
        contact.profile_id = 4
        db.session.add(contact)
        db.session.commit()

        print("added instagram profile")


        contact = Contact()
        contact.type = "youtube"
        contact.value = "tevvez"
        contact.public = True
        contact.profile_id = 4
        db.session.add(contact)
        db.session.commit()
        
        print("youtube channel added")

        
        contact = Contact()
        contact.type = "phone_number"
        contact.value = "+56945645645"
        contact.public = False
        contact.profile_id = 4
        db.session.add(contact)
        db.session.commit()

        print("added phone_number")


        contact = Contact()
        contact.type = "email"
        contact.value = "tevvez@tevvez.com"
        contact.public = False
        contact.profile_id = 4
        db.session.add(contact)
        db.session.commit()
        
        print("added email")

        ############5#############

        contact = Contact()
        contact.type = "facebook"
        contact.value = "ellie_lapointe"
        contact.public = True
        contact.profile_id = 5
        db.session.add(contact)
        db.session.commit()

        print("added facebook profile name")

        contact = Contact()
        contact.type = "instagram"
        contact.value = "ellie_lapointe"
        contact.public = True
        contact.profile_id = 5
        db.session.add(contact)
        db.session.commit()

        print("added instagram profile")


        contact = Contact()
        contact.type = "youtube"
        contact.value = "ellie_lapointe"
        contact.public = True
        contact.profile_id = 5
        db.session.add(contact)
        db.session.commit()
        
        print("youtube channel added")

        
        contact = Contact()
        contact.type = "phone_number"
        contact.value = "+56923423434"
        contact.public = False
        contact.profile_id = 5
        db.session.add(contact)
        db.session.commit()

        print("added phone_number")


        contact = Contact()
        contact.type = "email"
        contact.value = "ellie@lapointe.com"
        contact.public = False
        contact.profile_id = 5
        db.session.add(contact)
        db.session.commit()
        
        print("added email")

        ############6#############

        contact = Contact()
        contact.type = "facebook"
        contact.value = "matias"
        contact.public = True
        contact.profile_id = 6
        db.session.add(contact)
        db.session.commit()

        print("added facebook profile name")

        contact = Contact()
        contact.type = "instagram"
        contact.value = "pierre_jean"
        contact.public = True
        contact.profile_id = 6
        db.session.add(contact)
        db.session.commit()

        print("added instagram profile")


        contact = Contact()
        contact.type = "youtube"
        contact.value = "pierre_jean"
        contact.public = True
        contact.profile_id = 6
        db.session.add(contact)
        db.session.commit()
        
        print("youtube channel added")

        
        contact = Contact()
        contact.type = "phone_number"
        contact.value = "+56235645645"
        contact.public = False
        contact.profile_id = 6
        db.session.add(contact)
        db.session.commit()

        print("added phone_number")


        contact = Contact()
        contact.type = "email"
        contact.value = "pierre@jean.com"
        contact.public = False
        contact.profile_id = 6
        db.session.add(contact)
        db.session.commit()
        
        print("added email")

   


       #ALL COMMANDS
       #flask insert-6-users-6-profiles
       #flask insert-favorites
       #flask insert-post
       #flask insert-notifications
       #flask insert-deafult-genres
       #flask insert-profiles-genres
       #flask insert-contacts-to-profiles