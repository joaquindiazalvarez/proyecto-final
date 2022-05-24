const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],

      user: [],
      user_profile: { name: "void" },
      profile: {},
      favorites: { favorites_list: [] },
      loged: false,
      deafult_genres_list: [],
      profile_genres_list: [],
      notifications: [],
      profile_public_contact_list: [],
      profile_private_contact_list: [],
      populated: [],
      profile_by_genre: [],
      populated_genres: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/hello")
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },

      postLogin: async (user) => {
        const actions = getActions();
        var myHeaders = new Headers();
        //myHeaders.append("Authorization", `Bearer ${getInfoLoginUser.user[0].token}`); //VER BIEN COMO ENVIAR ESTO!
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(user),
          redirect: "follow",
        };

        await fetch(process.env.BACKEND_URL + "/api/user/login", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            setStore({ user: [result] });
            sessionStorage.setItem("token", result.token);
            // console.log(result);
            setStore({ loged: true });
          })
          .catch((error) => console.log("ERROR AL LOGUEAR MI REY !", error));
        // cuando no se hace el login da un error , poder traer los mensajes de error del back al front
      },

      postRegister: async (registerUser) => {
        var myHeaders = new Headers();
        //myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY1MDcyOTI0NSwianRpIjoiODcwYzY5YTAtMTNhNy00MzE3LTg5ZGYtYjllODgxMmNmNjk0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImVsdGVyY2Vyb0BnbWFpbC5jb20iLCJuYmYiOjE2NTA3MjkyNDUsImV4cCI6MTY1MDcyOTM2NX0.TDrQBQs1hLO9YZfaBjkqNBAo1_pYx2b6mrViaRWRMFs");
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(registerUser),
          redirect: "follow",
        };

        await fetch(
          process.env.BACKEND_URL + "/api/user/signup",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => console.log(result))
          .catch((error) => console.log("ERROR AL REGISTRASE", error));
      },
      getProfileByName: async (name) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({ name: name }),
          redirect: "follow",
        };

        await fetch(
          process.env.BACKEND_URL + "/api/profile/get",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            setStore({ profile: result });
          })
          .catch((error) =>
            console.log("ERROR AL OBTENER PROFILE MI REY !", error)
          );
      },

      getProfileByUser: async () => {
        const token = sessionStorage.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        await fetch(
          process.env.BACKEND_URL + "/api/profile/getbyuser",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            setStore({ user_profile: result["actual_profile"] });
          })
          .catch((error) =>
            console.log("ERROR DE AUTENTICACION MI REY !", error)
          );
      },
      logout: () => {
        sessionStorage.removeItem("token");
        setStore({ loged: false });
      },
      updateProfile: async (obj) => {
        let token = sessionStorage.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(obj);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        await fetch(
          process.env.BACKEND_URL + "/api/profile/update",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) =>
            console.log("ERROR AL HACER UPDATE MI REY !", error)
          );
      },

      getPhotosProfile: async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        await fetch(
          process.env.BACKEND_URL + "/api/profile/getprofilephoto",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            setStore({ profile: result });
          })
          .catch((error) =>
            console.log("ERROR AL OBTENER FOTOS MI REY !", error)
          );
      },
      getAllFavorites: async () => {
        const token = sessionStorage.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        await fetch(
          process.env.BACKEND_URL + "/api/favorites/getall",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            setStore({ favorites: result });
          })
          .catch((error) =>
            console.log("ERROR AL OBTENER FAVORITOS MI REY !", error)
          );
      },
      addToFavorites: async (name) => {
        const token = sessionStorage.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          profile: name,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        await fetch(
          process.env.BACKEND_URL + "/api/favorites/add",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) =>
            console.log("ERROR AL AGREGAR A FAVORITOS MI REY !", error)
          );
      },
      deleteFromFavorites: async (name) => {
        var myHeaders = new Headers();
        const token = sessionStorage.getItem("token");
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          profile: name,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        await fetch(
          process.env.BACKEND_URL + "/api/favorites/delete",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) =>
            console.log("ERROR AL ELIMINAR DE FAVORITOS MI REY !", error)
          );
      },
      getAllDeafultGenres: async () => {
        //trae los generos por defecto, que son rock, rock alternativo, pop, etc
        //vienen en un arreglo y sirven para cuando se crea un perfil, se puedan seleccionar
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        await fetch(
          process.env.BACKEND_URL + "/api/genre/getalldeafult",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            setStore({ deafult_genres_list: result.genres_deafult_list });
          })
          .catch((error) =>
            console.log("ERROR AL OBTENER GENEROS MI REY !", error)
          );
      },
      addGenresToProfile: async (genres_arr) => {
        //Este fetch agrega los generos pasados en un array a un profile
        //sirve cuando se crea un perfil, se seleccionan generos
        //incluso si el genero no es deafult, se crea y se le asocia al perfil
        const token = sessionStorage.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          genres_list: genres_arr,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        await fetch(
          process.env.BACKEND_URL + "/api/genre/addtoprofile",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) =>
            console.log("ERROR AL AGREGAR GENEROS MI REY !", error)
          );
      },
      getGenresByProfileName: async (name) => {
        //Este fetch se trae los generos asociados a un perfil, y es público
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          profile: name,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        await fetch(
          process.env.BACKEND_URL + "/api/profile/getgenresbyprofilename",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            setStore({ profile_genres_list: result.profile_genres_list });
          })
          .catch((error) =>
            console.log("ERROR AL OBTENER GENEROS MI REY !", error)
          );
      },
      addContact: async (type, value, publicBool) => {
        //OJO, public es booleano
        //este fetch agrega un contacto con el tipo:"facebook", "instagram", "youtube", "email", "phone_number", "address", etc
        //con el valor: "mi_profile", "mi_instagram", "micanaldeyoutube", "miemail", "minumero", etc
        //en el caso de facebook vendría siendo lo que viene después del slash https://web.facebook.com/, igual que instagram, y youtube https://www.youtube.com/c/ porque hay que anteponer un /c/ para entrar al canal
        //y la variable public es = true para mostrarlo a todos en el perfil o = false para que solo se pueda obtener en privado como el telefono, la dirección etc
        //sirve para cuando se crea un perfil
        const token = sessionStorage.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          type: type,
          value: value,
          public: publicBool,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(process.env.BACKEND_URL + "/api/contact/add", requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) =>
            console.log("ERROR AL AGREGAR CONTACTO MI REY", error)
          );
      },
      getContactByProfileName: async (profile_name) => {
        //este Fetch se trae todos los contactos publicos y rrss del perfil, sirve para ponerlo dentro de profile.js
        //llámese facebook, instagram, youtube
        //viene serializado con el tipo, el valor, y si es public = true o = false
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          profile: profile_name,
        });

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          process.env.BACKEND_URL + "/api/contact/public/getbyprofilename",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            setStore({
              profile_public_contact_list: result.public_contact_list,
            });
          })
          .catch((error) => console.log("error", error));
      },
      getPrivateContactFromFavorite: async (profile_name) => {
        //este fetch se trae los items de contactos privados solo si el usuario logueado tiene en favoritos al profile
        //tiene como argumento el profile del cual se quieren obtener los contactos privados
        //
        const token = sessionStorage.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          profile: profile_name,
        });

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          process.env.BACKEND_URL + "/api/contact/private/getfromfavorite",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => {
            console.log("error", error);
            setStore({
              profile_private_contact_list: result.contact_private_list,
            });
          });
      },

      getAllNotifications: async () => {
        const token = sessionStorage.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        await fetch(
          process.env.BACKEND_URL + "/api/notifications/getall",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            setStore({ notifications: result.notification_list });
            console.log(result);
          })
          .catch((error) =>
            console.log("error al conseguir notificaciones", error)
          );
      },
      getPopulatedGenres: async () => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        await fetch(
          process.env.BACKEND_URL + "/api/genre/populatedgenres/get",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            setStore({ populated: result.populated });
          })
          .catch((error) =>
            console.log("ERROR AL OBTENER GENEROS MI REY !", error)
          );
      },
      getProfilesByGenre: async (genre) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          genre: genre,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        await fetch(
          process.env.BACKEND_URL + "/api/profile/getbygenre",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            setStore({ profile_by_genre: result.genre_profile_name });
          })
          .catch((error) =>
            console.log("ERROR AL OBTENER PERFILES POR GENERO MI REY !", error)
          );
      },
      deleteGenreFromProfile: async (genero) => {
        const token = sessionStorage.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          genre: genero,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        await fetch(
          process.env.BACKEND_URL + "/api/genre/delete",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) =>
            console.log("ERROR AL BORRAR GENERO MI REY !", error)
          );
      },
      getPopulated: async () => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        fetch(
          process.env.BACKEND_URL + "/api/profile/getpopulated",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            setStore({ populated_genres: result.populated_array });
          })
          .catch((error) =>
            console.log("ERROR AL TRAER PERFILES POR GENERO MI REY !", error)
          );
      },
    },
  };
};

export default getState;
