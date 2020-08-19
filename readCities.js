const { db } = require("./init");

const citiesRef = db.collection("cities");

citiesRef.where("state", "==", "CA");
citiesRef.where("population", "<", 100000);
citiesRef.where("name", ">=", "San Francisco");

// Read data
citiesRef.get().then((querySnapshot) => {
  querySnapshot.forEach((city) => {
    console.log(city.data());
  });
});