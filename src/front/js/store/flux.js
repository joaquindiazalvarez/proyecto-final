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
      params: "",
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
            console.log(result);
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
            console.log(result);
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
            console.log("miresult", result);
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

        fetch(process.env.BACKEND_URL + "/api/favorites/getall", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
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

        fetch(process.env.BACKEND_URL + "/api/favorites/add", requestOptions)
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

        fetch(process.env.BACKEND_URL + "/api/favorites/delete", requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) =>
            console.log("ERROR AL ELIMINAR DE FAVORITOS MI REY !", error)
          );
      },
      posting: (post) =>{         
        var myHeaders = new Headers();
        let token = sessionStorage.getItem("token");
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(post),
          redirect: 'follow'
        };

        fetch(process.env.BACKEND_URL +  "/api/profile/posting", requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
          
      },
    },
  };
};

export default getState;
