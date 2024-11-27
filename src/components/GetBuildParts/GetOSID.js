import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();


export async function getBuildOS(doc_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "Build", doc_id);
    const docSnapshot = await getDoc(docRef);

    // Return the os_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data().os_id; // Access os_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching OS ID from Firebase:", error);
    return null;
  }
}

export async function getOSInfo(os_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "OperatingSystem", os_id);
    const docSnapshot = await getDoc(docRef);

    // Return the os_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data(); // Access os_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching OS ID from Firebase:", error);
    return null;  
  }
}


