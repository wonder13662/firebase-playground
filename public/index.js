// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");
const firebaseui = require('firebaseui');

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVC2hf2XrtzbLpSa_BE0BtmCKaxNYvnxk",
  authDomain: "playground-9a00c.firebaseapp.com",
  databaseURL: "https://playground-9a00c.firebaseio.com",
  projectId: "playground-9a00c",
  storageBucket: "playground-9a00c.appspot.com",
  messagingSenderId: "140017567845",
  appId: "1:140017567845:web:e20c8175c58a29533d9e8c",
  measurementId: "G-EYJZZMVJPX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    },
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
    }
  ],
  // Other config options...
});