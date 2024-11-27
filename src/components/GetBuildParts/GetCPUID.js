import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();


export async function getBuildCPU(doc_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "Build", doc_id);
    const docSnapshot = await getDoc(docRef);

    // Return the cpu_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data().cpu_id; // Access cpu_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching CPU ID from Firebase:", error);
    return null;
  }
}

export async function getCPUInfo(cpu_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "CPU", cpu_id);
    const docSnapshot = await getDoc(docRef);

    // Return the cpu_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data(); // Access cpu_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching CPU ID from Firebase:", error);
    return null;  
  }
}


