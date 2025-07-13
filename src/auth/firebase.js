// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPasswoord, getAuth, GoogleAuthProvider, getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnC_5d8By6h6tS9YgBcTmkuDp208Drzk0",
  authDomain: "t-tech-react.firebaseapp.com",
  projectId: "t-tech-react",
  storageBucket: "t-tech-react.firebasestorage.app",
  messagingSenderId: "115745703073",
  appId: "1:115745703073:web:8015026c326b011a449ce0",
  measurementId: "G-B0HTE7G9P9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export function crearUsuario() {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      console.log("Credenciales. ", userCredential);
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
