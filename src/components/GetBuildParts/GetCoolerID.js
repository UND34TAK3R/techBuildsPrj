import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();


export async function getBuildCooler(doc_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "Build", doc_id);
    const docSnapshot = await getDoc(docRef);

    // Return the cooler_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data().cooler_id; // Access cooler_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Cooler ID from Firebase:", error);
    return null;
  }
}

export async function getCoolerInfo(cooler_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "Cooler", cooler_id);
    const docSnapshot = await getDoc(docRef);

    // Return the cooler_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data(); // Access cooler_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Cooler ID from Firebase:", error);
    return null;  
  }
}


