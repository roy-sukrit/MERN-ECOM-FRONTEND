import firebase from 'firebase'

// Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyCw_i-q1YvSEycrTujjRjDp5FPf91fDmok",
    authDomain: "mern-ecommerce-d7ec6.firebaseapp.com",
    projectId: "mern-ecommerce-d7ec6",
    storageBucket: "mern-ecommerce-d7ec6.appspot.com",
    messagingSenderId: "835479632806",
    appId: "1:835479632806:web:ee2b89b8ffad14268ead67"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
