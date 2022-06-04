import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCveE4qdNMMfHalIxY04WlWhdKlgLgn8ro",
  authDomain: "bandfolio-2b075.firebaseapp.com",
  projectId: "bandfolio-2b075",
  storageBucket: "bandfolio-2b075.appspot.com",
  messagingSenderId: "502011452131",
  appId: "1:502011452131:web:b56e9f9c14d039a4ca83d6",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
