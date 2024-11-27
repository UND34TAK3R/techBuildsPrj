import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();


export async function getBuildRAM(doc_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "Build", doc_id);
    const docSnapshot = await getDoc(docRef);

    // Return the ram_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data().ram_id; // Access ram_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching RAM ID from Firebase:", error);
    return null;
  }
}

export async function getRAMInfo(ram_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "RAM",ram_id);
    const docSnapshot = await getDoc(docRef);

    // Return the ram_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data(); // Accessram_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching ram ID from Firebase:", error);
    return null;  
  }
}


