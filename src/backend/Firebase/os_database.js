import admin from 'firebase-admin';
import fs from 'fs';

// Read the service account key file synchronously
const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Get Firestore
const db = admin.firestore();

// Sample OS data
const os_id = [
  { os_id: 1, architecture: "x86", name: "Windows 10", price: 139.99, version: "20H2" },
  { os_id: 2, architecture: "x64", name: "Windows 11", price: 139.99, version: "22H2" },
  { os_id: 3, architecture: "x64", name: "macOS Monterey", price: 199.99, version: "12.0" },
  { os_id: 4, architecture: "x86", name: "Windows 8.1", price: 119.99, version: "8.1" },
  { os_id: 5, architecture: "x86", name: "Windows Server 2019", price: 999.99, version: "2019" },
  { os_id: 6, architecture: "x64", name: "SUSE Linux Enterprise", price: 799.99, version: "15 SP3" },
];

// Function to add OS data to Firestore
async function addOS() {
  const batch = db.batch();

  os_id.forEach((OS) => {
    const docRef = db.collection('OperatingSystem').doc(OS.os_id.toString()); // Use OS.os_id as the document ID
    batch.set(docRef, OS);
  });

  await batch.commit();
  console.log('Operating systems added successfully!');
}

// Execute the function to add data
addOS().catch(console.error);
