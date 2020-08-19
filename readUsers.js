const { db } = require("./init");

// Read data
db.collection("users").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().last}`);
  });
});