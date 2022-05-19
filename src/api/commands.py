
import click
from api.models import db, User, Profile, Favorites, Profile_favorites_notification, Genre, Genre_profile

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

    #flask insert-notifications
    @app.cli.command("insert-notifications")
    def insert_notifications():
        
        notifications1= Profile_favorites_notification()
        notifications1.favorites_id= 1
        notifications1.profile_id = 1
        notifications1.read= True
        db.session.add(notifications1)
        db.session.commit()
        print('the first notification was created')
        
        notifications2= Profile_favorites_notification()
        notifications2.favorites_id= 2
        notifications2.profile_id= 1
        notifications2.read= True
        db.session.add(notifications2)
        db.session.commit()
        print('the second notification was created')

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

    #flask insert-user1-genres /// insert genres to profile "Note"
    @app.cli.command("insert-profile1-genres")
    def insert_user1_genres():
        genre1 = Genre_profile()
        genre1.profile_id = 1
        genre1.genre_genre = "Metal"
        db.session.add(genre1)
        db.session.commit()
        print("added Metal Genre to  profile 'Note'")

        genre2 = Genre_profile()
        genre2.profile_id = 1
        genre2.genre_genre = "Rock"
        db.session.add(genre2)
        db.session.commit()
        print("added Rock Genre to profile 'Note'")


       #ALL COMMANDS

       #flask insert-6-users-6-profiles
       #flask insert-favorites
       #flask insert-notifications
       #flask insert-deafult-genres
       #flask insert-profile1-genres