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

const collectionGroupQuery = async() => {
  const querySnapshot = await db.collectionGroup('landmarks').where('type', '==', 'museum').get();
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
  });
}

const orderAndLimitData1 = async() => {
  const citiesRef = db.collection('cities');

  const firstThreeRes = await citiesRef.orderBy('name').limit(3).get();
  firstThreeRes.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
  });
}

const orderAndLimitData2 = async() => {
  const citiesRef = db.collection('cities');

  const lastThreeRes = await citiesRef.orderBy('name', 'desc').limit(3).get();
  lastThreeRes.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
  });
}

const orderAndLimitData3 = async() => {
  const citiesRef = db.collection('cities');

  const byStateByPopRes = await citiesRef.orderBy('state').orderBy('population', 'desc').get();
  showResult(byStateByPopRes);
}

const orderAndLimitData4 = async() => {
  const citiesRef = db.collection('cities');

  const biggestRes = await citiesRef.where('population', '>', 2500000).orderBy('population').limit(2).get();
  showResult(biggestRes);
}

const addSimpleCursorToQuery1 = async() => {
  const startAtRes = await db.collection('cities')
  .orderBy('population')
  .startAt(1000000)
  .get();

  showResult(startAtRes);
}

const addSimpleCursorToQuery2 = async() => {
  const endAtRes = await db.collection('cities')
  .orderBy('population')
  .endAt(1000000)
  .get();

  showResult(endAtRes);
}

const docSnapshot1 = async() => {
  const docRef = db.collection('cities').doc('SF');
  const snapshot = await docRef.get();
  const startAtSnapshot = db.collection('cities')
    .orderBy('population')
    .startAt(snapshot);

  const querySnapshot = await startAtSnapshot.limit(10).get();

  showResult(querySnapshot);
}

const paginate1 = async() => {
  const first = db.collection('cities')
  .orderBy('population')
  .limit(3);

  const snapshot = await first.get();

  // Get the last document
  const last = snapshot.docs[snapshot.docs.length - 1];

  // Construct a new query starting at this document.
  // Note: this will not have the desired effect if multiple
  // cities have the exact same population value.
  const next = db.collection('cities')
    .orderBy('population')
    .startAfter(last.data().population)
    .limit(3);

  showResult(await next.get());
}
paginate1();

const showResult = (querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
  });
}

