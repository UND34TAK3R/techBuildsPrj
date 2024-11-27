const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://techbuilds-b8416-default-rtdb.firebaseio.com/' // Replace with your Realtime Database URL
});

const firestore = admin.firestore();
const realtimeDb = admin.database();

async function transferMultipleCollections() {
    const collections = ['Build', 'CPU', 'Case', 'Cooler', 'GPU', 'Motherboard', 'PSU', 'RAM', 'Storage', 'NetAdapter', 'Operating System', 'Users']; // Replace with your collection names

    for (const collectionName of collections) {
        try {
            const snapshot = await firestore.collection(collectionName).get();
            snapshot.forEach(async (doc) => {
                const data = doc.data();
                // Write to Realtime Database under a specific path for each collection
                await realtimeDb.ref(`${collectionName}/${doc.id}`).set(data);
            });
            console.log(`Data successfully transferred for ${collectionName}`);
        } catch (error) {
            console.error(`Error transferring data for ${collectionName}:`, error);
        }
    }
}

transferMultipleCollections();
