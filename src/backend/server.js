import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import fs from 'fs';
import { getAllUsers, getAllAdminUsers, getUserCount, doUpdateUserRole, deleteUser, doUpdateAdminUserRole, verifyToken } from './Firebase/CreateAdmin.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON
app.use(bodyParser.json());

// Initialize Firebase Admin SDK


admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://techbuilds-b8416-default-rtdb.firebaseio.com",
});

app.get("/admin-users", async (req, res) => {
  const users = await getAllUsers();
  res.json({users});
});

app.get("/admin", async (req, res) => {
  const users = await getAllAdminUsers();
  res.json({users});
});

app.get("/userCount", async (req, res) => {
  const userCount = await getUserCount();
  res.json({ userCount });  // `userCount` is returned here, not `users`
});

app.post('/register', async (req, res) => {
  const {uid} = req.body;
  try {
    await doUpdateUserRole(uid);
    res.status(200).json({ message: 'User role updated successfully' });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Error updating user role' });
  }
});


app.post('/admin-register', async (req, res) => {
  const {uid} = req.body;
  try {
    await doUpdateAdminUserRole(uid);
    res.status(200).json({ message: 'User role updated successfully' });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Error updating user role' });
  }
});

app.post('/delete-user', async (req, res) => {
  const { uid } = req.body;  // Access UID from the request body

  if (!uid || uid.trim() === "") {
    return res.status(400).json({ message: 'Invalid UID provided.' });
  }

  try {
    // Await the deletion of the user from Firebase Authentication
    await deleteUser(uid);  // Ensure the deleteUser function is awaited

    res.status(200).json({ message: `User with UID: ${uid} deleted successfully` });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});


app.post('/verifyToken', async (req, res) => {
  const { tokenId } = req.body;

  try {
      const user = await verifyToken(tokenId);
      res.json({
          success: true,
          user: user,  // Send the user data back to the client
      });
  } catch (error) {
      res.json({
          success: false,
          message: 'Failed to authenticate user',
      });
  }
});





// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
