const { firebase } = require("./init");

const signInExistingUsers = (email, password, callbackOnSuccess) => {
  firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then((response) => {
    console.log(response.user.email);
    if(callbackOnSuccess) callbackOnSuccess();
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
}
// signInExistingUsers('wonder13662test2@gmail.com', 'barogobaroba');

const signInOut = () => {
  signInExistingUsers('wonder13662test2@gmail.com', 'barogobaroba', () => {
    firebase.auth().signOut().then(function() {
      console.log('Sign-out successful.');
    }).catch(function(error) {
      console.log('An error happened: ',error);
    });
  });
}
signInOut();

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

const getUserProfile1 = () => {
  signInExistingUsers('wonder13662test2@gmail.com', 'barogobaroba', () => {
    const user = firebase.auth().currentUser;
    let name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                       // this value to authenticate with your backend server, if
                       // you have one. Use User.getToken() instead.
    }

    console.log(`name: ${name}`);
    console.log(`email: ${email}`);
    console.log(`photoUrl: ${photoUrl}`);
    console.log(`emailVerified: ${emailVerified}`);
    console.log(`uid: ${uid}`);
  });
}

const getUserProfile2 = () => {
  signInExistingUsers('wonder13662test2@gmail.com', 'barogobaroba', () => {
    const user = firebase.auth().currentUser;

    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    }
  });
}

module.exports = {
  signInExistingUsers
}
