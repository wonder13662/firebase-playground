const { firebase } = require("./init");
const { signInExistingUsers } = require("./signIn");

const updateUserProfile = () => {
  signInExistingUsers('wonder13662test2@gmail.com', 'barogobaroba', () => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: "Jane Q. User",
      photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
      // Update successful.
      console.log('done');
    }).catch(function(error) {
      // An error happened.
      console.log('error:',error);
    });
  });
}

const updateUserEmail = () => {
  signInExistingUsers('wonder13662test2@gmail.com', 'barogobaroba', () => {
    const user = firebase.auth().currentUser;

    user.updateEmail("user@example.com").then(function() {
      // Update successful.
      console.log('done');
    }).catch(function(error) {
      // An error happened.
      console.log('error:',error);
    });
  });
}

const sendUserVerificationEmail = () => {
  signInExistingUsers('wonder13662test2@gmail.com', 'barogobaroba', () => {
    const user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      console.log('Email sent.');
    }).catch(function(error) {
      console.log('error:',error);
    });
  });
}

const setUserPassword = () => {
  signInExistingUsers('wonder13662test2@gmail.com', 'barogobaroba', () => {
    const user = firebase.auth().currentUser;
    const newPassword = 'barogobaroba2';

    user.updatePassword(newPassword).then(function() {
      console.log('Update successful.');
    }).catch(function(error) {
      console.log('error:',error);
    });
  });
}

const sendPasswordResetEmail = () => {
  signInExistingUsers('wonder13662test2@gmail.com', 'barogobaroba', () => {
    const auth = firebase.auth();
    const emailAddress = 'wonder13662test2@gmail.com';

    auth.sendPasswordResetEmail(emailAddress).then(function() {
      console.log('Email sent.');
    }).catch(function(error) {
      console.log('error:',error);
    });
  });
}

// https://firebase.google.com/docs/auth/web/manage-users#delete_a_user
const deleteUser = () => {
  signInExistingUsers('wonder13662test2@gmail.com', 'barogobaroba', () => {
    var user = firebase.auth().currentUser;

    user.delete().then(function() {
      console.log('User deleted.');
    }).catch(function(error) {
      console.log('error:',error);
    });
  });
}

// https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user
const reauthenticateUser = () => {
  signInExistingUsers('wonder13662test2@gmail.com', 'barogobaroba', () => {
    var user = firebase.auth().currentUser;
    var credential;

    // Prompt the user to re-provide their sign-in credentials / doesn't work!
    user.reauthenticateWithCredential(credential).then(function() {
      console.log('User re-authenticated:',credential);
    }).catch(function(error) {
      console.log('error:',error);
    });
  });
}
reauthenticateUser();