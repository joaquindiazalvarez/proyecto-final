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
      profile_name: [],
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
        const getInfoLoginUser = getStore();
        const setInfoLoginUser = setStore();
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
					.then(response => response.json())
					.then(result => {
						setStore({user:[result]})
						console.log(result)})
					.catch(error => console.log('ERROR MI REY !', error)); 
					// cuando no se hace el login da un error , poder traer los mensajes de error del back al front

			},
			
			 postRegister : async(registerUser) => {
				var myHeaders = new Headers();
					//myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY1MDcyOTI0NSwianRpIjoiODcwYzY5YTAtMTNhNy00MzE3LTg5ZGYtYjllODgxMmNmNjk0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImVsdGVyY2Vyb0BnbWFpbC5jb20iLCJuYmYiOjE2NTA3MjkyNDUsImV4cCI6MTY1MDcyOTM2NX0.TDrQBQs1hLO9YZfaBjkqNBAo1_pYx2b6mrViaRWRMFs");
					myHeaders.append("Content-Type", "application/json");

				var requestOptions = {
					method: 'POST',
					headers: myHeaders,
					body: JSON.stringify(registerUser),
					redirect: 'follow'
					};

					await fetch(process.env.BACKEND_URL  + "/api/user/signup", requestOptions)
					.then(response => response.json())
					.then(result => console.log(result))
					.catch(error => console.log('error', error));

      },
      getUserByName: async (name) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(name),
          redirect: "follow",
        };

        await fetch(
          process.env.BACKEND_URL + "/api/profile/get",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            setStore({ profile_name: result });
            console.log(result);
          })
          .catch((error) => console.log("ERROR MI REY !", error));
      },
    },
  };

};

export default getState;
