const { db } = require("./init");

const getDocument = async () => {
  const cityRef = db.collection('cities').doc('SF');
  const doc = await cityRef.get();
  if (!doc.exists) {
    console.log('No such document!');
  } else {
    console.log('Document data:', doc.data());
  }
}

const getMultipleDocumentsFromCollection = async () => {
  const citiesRef = db.collection('cities');
  const snapshot = await citiesRef.where('capital', '==', true).get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }

  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

const getAllDocumentsInCollection = async () => {
  const citiesRef = db.collection('cities');
  const snapshot = await citiesRef.get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

const getSubCollections = async () => {
  const sfRef = db.collection('cities').doc('SF');
  const collections = await sfRef.listCollections(); // TypeError: sfRef.listCollections is not a function
  collections.forEach(collection => {
    console.log('Found subcollection with id:', collection.id);
  });
}

const getSimpleQuery = async () => {
  // Create a reference to the cities collection
  const citiesRef = db.collection('cities');

  // Create a query against the collection
  const queryRef = citiesRef.where('state', '==', 'CA');
  // const queryRef = citiesRef.where('state', '==', 'CA').where('name:', '==', 'Los Angeles'); // Doesn't work

  const snapshot = await queryRef.get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

const getSimpleQuery2 = async () => {
  // Create a reference to the cities collection
  const citiesRef = db.collection('cities');

  // Create a query against the collection
  const allCapitalsRes = await citiesRef.where('capital', '==', true).get();

  allCapitalsRes.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

const executeQuery = async() => {
  const citiesRef = db.collection('cities');
  const snapshot = await citiesRef.where('capital', '==', true).get();
  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }

  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

const queryOperators = async() => {
  const citiesRef = db.collection('cities');

  // const snapshot = await citiesRef.where('state', '==', 'CA').get();
  // const snapshot = await citiesRef.where('population', '<', 1000000).get();
  const snapshot = await citiesRef.where('name', '>=', 'San Francisco').get();

  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

const arrayMembership = async() => {
  const citiesRef = db.collection('cities');

  const snapshot = await citiesRef.where('regions', 'array-contains', 'west_coast').get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

const arrayContainsAny1 = async() => {
  const citiesRef = db.collection('cities');

  const snapshot = await citiesRef.where('country', 'in', ['USA', 'Japan']).get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

const arrayContainsAny2 = async() => {
  const citiesRef = db.collection('cities');

  const snapshot = await citiesRef.where('regions', 'array-contains-any', ['west_coast', 'east_coast']).get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

const arrayContainsAny3 = async() => { // Doesn't work
  const citiesRef = db.collection('cities');

  const snapshot = await citiesRef.where('region', 'in', [['west_coast', 'east_coast']]).get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

const compoundQuery1 = async() => {
  const citiesRef = db.collection('cities');

  const snapshot = await citiesRef.where('state', '==', 'CA').where('name', '==', 'Los Angeles').get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

const compoundQuery2 = async() => {
  const citiesRef = db.collection('cities');

  const snapshot = await citiesRef.where('state', '==', 'CA').where('population', '<', 1000000).get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
}

const collectionGroupQuery = async() => { // Wait for indexing
  const querySnapshot = await db.collectionGroup('landmarks').where('type', '==', 'museum').get();
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
  });
}
collectionGroupQuery();
