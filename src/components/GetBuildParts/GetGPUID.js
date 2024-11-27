import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore();


export async function getBuildGPU(doc_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "Build", doc_id);
    const docSnapshot = await getDoc(docRef);

    // Return the gpu_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data().gpu_id; // Access gpu_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching GPU ID from Firebase:", error);
    return null;
  }
}

export async function getGPUInfo(gpu_id) {
  try {
    // Reference to the specific document using the document ID
    const docRef = doc(db, "GPU", gpu_id);
    const docSnapshot = await getDoc(docRef);

    // Return the gpu_id if the document exists, or null if not found
    if (docSnapshot.exists()) {
      return docSnapshot.data(); // Access gpu_id from the document data
    } else {
      console.log("No matching document found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching GPU ID from Firebase:", error);
    return null;  
  }
}


