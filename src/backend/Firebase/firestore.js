// Firebase/firestore.js
import { db } from './firebase.js'; // Adjust the import according to your file structure
import { collection, addDoc } from 'firebase/firestore';

export const addNewBuild = async (buildData) => {
    const buildCollectionRef = collection(db, 'Build'); // Your Firestore collection name

    // Ensure buildData includes build_id, user_id (uid), build_name, and build_type
    const { BuildName, BuildType, CurrentUser } = buildData;
    const userId = CurrentUser.uid; // Get the user ID from CurrentUser

    try {
        await addDoc(buildCollectionRef, {
            user_id: userId,
            build_name: BuildName,
            build_type: BuildType,
            last_used: new Date(),
        });
    } catch (error) {
        console.error('Error adding new build:', error);
        throw error; // Re-throw the error for the calling function to handle
    }
};


export const updateLastUsed = async (buildId) => {
  try {
    const buildRef = db.collection('Build').doc(buildId);
    await buildRef.update({
      last_used: new Date(), // Set to current timestamp
    });
  } catch (error) {
    console.error('Error updating last_used:', error);
  }
};

