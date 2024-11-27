import admin from "firebase-admin";
import fs from "fs";
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});


export async function getAllUsers() {
    try {
        const userRecords = await admin.auth().listUsers(1000);
        const adminUsers = [];
        for (const user of userRecords.users) {
            const userData = await admin.auth().getUser(user.uid);
            if (userData.customClaims && userData.customClaims.admin === false) {
                adminUsers.push({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    createdAt: user.metadata.creationTime,
                    lastLoginAt: user.metadata.lastSignInTime,
                });
            }
        }
        return adminUsers;
      } catch (error) {
        console.error("Error fetching admin users:", error);
        return [];
      }
}

export async function getAllAdminUsers(){
  try {
    const userRecords = await admin.auth().listUsers(1000);
    const Users = [];
    for (const user of userRecords.users) {
        const userData = await admin.auth().getUser(user.uid);
        if (userData.customClaims && userData.customClaims.admin === true) {
            Users.push({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                createdAt: user.metadata.creationTime,
                lastLoginAt: user.metadata.lastSignInTime,
            });
        }
    }
    return Users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
export async function getUserCount(){
    try{
        const listUsersResult = await admin.auth().listUsers();
        const userCount = listUsersResult.users.length;
        return userCount;
    }
    catch(error){
        console.error("Error fetching user count:", error);
        return 0; 
    }
}

export  async function doUpdateAdminUserRole(uid) {
    return admin.auth().setCustomUserClaims(uid, { admin: true })
        .then(() => {
            console.log(`User ${uid} is now an admin.`);
        })
        .catch((error) => {
            console.error("Error setting user role:", error);
        });
};

export  async function doUpdateUserRole(uid) {
    return admin.auth().setCustomUserClaims(uid, { admin: false })
        .then(() => {
            console.log(`User ${uid} is now a non-admin.`);
        })
        .catch((error) => {
            console.error("Error setting user role:", error);
        });
};


const checkAdminClaim = async (uid) => {
    try {
      const userRecord = await admin.auth().getUser(uid);
      if (userRecord.customClaims && userRecord.customClaims.admin) {
        console.log('User is an admin');
      } else {
        console.log('User is not an admin');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
  export const authenticateAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1]; // Get token from request header
    
    if (!token) {
      return res.status(401).json({ message: 'Authorization token required' });
    }
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token); // Verify token
      if (decodedToken.admin) {
        next(); // Proceed if user is an admin
      } else {
        return res.status(403).json({ message: 'Forbidden: Admin privileges required' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };

  export async function deleteUser(uid) {
    try {
      await admin.auth().deleteUser(uid);  // Await the deletion operation
      console.log(`User with UID: ${uid} deleted successfully`);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Error deleting user');  // Optionally rethrow the error
    }
  }


export const verifyToken = async (tokenId) => {
    try {
        const decodedToken = await admin.auth().verifyIdToken(tokenId);
        const uid = decodedToken.uid;

        // Check if the UID exists in your Firebase Authentication system or database
        const user = await admin.auth().getUser(uid);
        console.log("User found:", user);
        
        // Further checks can be done here, like checking for roles or other custom claims
        
        return user;
    } catch (error) {
        console.error("Error verifying token:", error.message);
        throw new Error(error.message);
    }
};



  