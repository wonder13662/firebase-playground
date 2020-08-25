const { firebase } = require("./init");

// https://firebase.google.com/docs/auth/web/password-auth#create_a_password-based_account
const signUpNewUsers = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(() => {
    console.log('done');
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
}
// signUpNewUsers('wonder13662test2@gmail.com', 'barogobaroba');
