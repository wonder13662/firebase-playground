const { firebase } = require("./init");

const signUpNewUsers = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
}
// signUpNewUsers('wonder13662test2@gmail.com', 'barogobaroba');