import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();


export async function getBuildMotherboard(doc_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "Build", doc_id);
    const docSnapshot = await getDoc(docRef);

    // Return the mb_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data().mb_id; // Access mb_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Motherboard ID from Firebase:", error);
    return null;
  }
}

export async function getMotherboardInfo(mb_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "Motherboard", mb_id);
    const docSnapshot = await getDoc(docRef);

    // Return the mb_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data(); // Access mb_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Motherboard ID from Firebase:", error);
    return null;  
  }
}


