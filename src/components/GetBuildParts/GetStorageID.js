import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();


export async function getBuildStorage(doc_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "Build", doc_id);
    const docSnapshot = await getDoc(docRef);

    // Return the storage_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data().storage_id; // Access storage_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Storage ID from Firebase:", error);
    return null;
  }
}

export async function getStorageInfo(storage_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "Storage", storage_id);
    const docSnapshot = await getDoc(docRef);

    // Return the storage_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data(); // Access storage_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Storage ID from Firebase:", error);
    return null;  
  }
}


