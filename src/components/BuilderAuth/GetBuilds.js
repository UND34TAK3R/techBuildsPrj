import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

// Initialize Firestore
const db = getFirestore();

export async function getBuilds(CurrentUser) {
    try {
      const buildsCollection = collection(db, "Build");
      const userBuildsQuery = query(buildsCollection, where("user_id", "==", CurrentUser.uid));
      
      const querySnapshot = await getDocs(userBuildsQuery);
      
      // Ensure each build object includes the document ID
      const builds = querySnapshot.docs.map(doc => ({
        id: doc.id, // This captures the build's document ID
        ...doc.data()
      }));
      
      return builds;
    } catch (error) {
      console.error("Error fetching builds from Firebase:", error);
      return [];
    }
  }
  
