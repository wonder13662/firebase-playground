const { firebase } = require("./init");

const signInExistingUsers = (email, password) => {
  firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then((response) => {
    console.log(response.user.email);
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
}
// signInExistingUsers('wonder13662test2@gmail.com', 'barogobaroba');

const setAuthStateObserver = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });
}