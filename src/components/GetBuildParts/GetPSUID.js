import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();


export async function getBuildPSU(doc_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "Build", doc_id);
    const docSnapshot = await getDoc(docRef);

    // Return the psu_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data().psu_id; // Access psu_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching PSU ID from Firebase:", error);
    return null;
  }
}

export async function getPSUInfo(psu_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "PSU", psu_id);
    const docSnapshot = await getDoc(docRef);

    // Return the psu_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data(); // Access psu_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching PSU ID from Firebase:", error);
    return null;  
  }
}


