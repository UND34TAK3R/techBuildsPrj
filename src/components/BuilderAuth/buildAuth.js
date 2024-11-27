import { getBuilds } from "./GetBuilds"; // Fetches builds for the user

export async function getClosestBuild(CurrentUser) {
    try {
        // Get the list of builds for the specific user
        const builds = await getBuilds(CurrentUser);
        
        // Find the build with the 'last_used' timestamp closest to the current time
        const now = Date.now();
        const closestBuild = builds.reduce((closest, build) => {
            const buildTimestamp = build.last_used.toDate().getTime(); // Convert Firestore Timestamp to milliseconds
            const closestTimestamp = closest.last_used.toDate().getTime(); // Same for closest build
            return Math.abs(buildTimestamp - now) < Math.abs(closestTimestamp - now) ? build : closest;
        });
        
        // Return only the closest build
        return closestBuild;
        
    } catch (error) {
        console.error("Error finding closest build:", error);
        return null;
    }
}
