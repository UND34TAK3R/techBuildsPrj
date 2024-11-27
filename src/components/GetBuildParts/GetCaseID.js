import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();


export async function getBuildCase(doc_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "Build", doc_id);
    const docSnapshot = await getDoc(docRef);

    // Return the case_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data().case_id; // Access case_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Case ID from Firebase:", error);
    return null;
  }
}

export async function getCaseInfo(case_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "Case", case_id);
    const docSnapshot = await getDoc(docRef);

    // Return the case_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data(); // Access case_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching Case ID from Firebase:", error);
    return null;  
  }
}


