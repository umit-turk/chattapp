import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyBJh3mq-teV1us3LjBg6EQtrFtuVL-OG3M",
    authDomain: "mychat-bbd92.firebaseapp.com",
    projectId: "mychat-bbd92",
    storageBucket: "mychat-bbd92.appspot.com",
    messagingSenderId: "626047853798",
    appId: "1:626047853798:web:b705d8b7f7d87cbe154727",
    measurementId: "G-G7DCVJQ93P"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;