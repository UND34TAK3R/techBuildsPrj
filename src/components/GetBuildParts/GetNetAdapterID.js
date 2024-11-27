import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();


export async function getBuildNA(doc_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "Build", doc_id);
    const docSnapshot = await getDoc(docRef);

    // Return the na_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data().na_id; // Access na_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Network Adapter ID from Firebase:", error);
    return null;
  }
}

export async function getNAInfo(na_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "NetAdapter", na_id);
    const docSnapshot = await getDoc(docRef);

    // Return the na_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data(); // Access na_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Network Adapter ID from Firebase:", error);
    return null;  
  }
}


