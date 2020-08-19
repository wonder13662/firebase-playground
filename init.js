// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

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

const db = firebase.firestore();

module.exports = { db, firebase };