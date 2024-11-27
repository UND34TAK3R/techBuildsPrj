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

  const storage_id = [
    { storage_id: 1, brand: "Samsung", cache: 256, capacity: 1000, form_factor: "M.2", interface: "NVMe", model: "970 EVO Plus", nvme: true, price: 119.99, read_speed: 3500, storage_type: "SSD", tdp: 5, write_speed: 3300 },
    { storage_id: 2, brand: "Samsung", cache: 512, capacity: 2000, form_factor: "M.2", interface: "NVMe", model: "970 EVO", nvme: true, price: 199.99, read_speed: 3500, storage_type: "SSD", tdp: 5, write_speed: 3000 },
    { storage_id: 3, brand: "Western Digital", cache: 128, capacity: 500, form_factor: "2.5 inch", interface: "SATA", model: "Blue 3D NAND", nvme: false, price: 54.99, read_speed: 545, storage_type: "SSD", tdp: 3, write_speed: 425 },
    { storage_id: 4, brand: "Western Digital", cache: 256, capacity: 1000, form_factor: "2.5 inch", interface: "SATA", model: "Blue 3D NAND", nvme: false, price: 89.99, read_speed: 545, storage_type: "SSD", tdp: 3, write_speed: 425 },
    { storage_id: 5, brand: "Crucial", cache: 256, capacity: 1000, form_factor: "M.2", interface: "NVMe", model: "P5", nvme: true, price: 109.99, read_speed: 3400, storage_type: "SSD", tdp: 5, write_speed: 3000 },
    { storage_id: 6, brand: "Crucial", cache: 128, capacity: 500, form_factor: "M.2", interface: "NVMe", model: "P3", nvme: true, price: 49.99, read_speed: 2000, storage_type: "SSD", tdp: 4, write_speed: 1700 },
    { storage_id: 7, brand: "Seagate", cache: 256, capacity: 2000, form_factor: "3.5 inch", interface: "SATA", model: "Barracuda", nvme: false, price: 59.99, read_speed: 160, storage_type: "HDD", tdp: 6, write_speed: 140 },
    { storage_id: 8, brand: "Seagate", cache: 512, capacity: 4000, form_factor: "3.5 inch", interface: "SATA", model: "IronWolf", nvme: false, price: 139.99, read_speed: 180, storage_type: "HDD", tdp: 7, write_speed: 150 },
    { storage_id: 9, brand: "Kingston", cache: 256, capacity: 1000, form_factor: "M.2", interface: "NVMe", model: "KC2500", nvme: true, price: 89.99, read_speed: 3500, storage_type: "SSD", tdp: 5, write_speed: 3000 },
    { storage_id: 10, brand: "Kingston", cache: 128, capacity: 500, form_factor: "2.5 inch", interface: "SATA", model: "A400", nvme: false, price: 44.99, read_speed: 500, storage_type: "SSD", tdp: 3, write_speed: 450 },
    { storage_id: 11, brand: "Team Group", cache: 512, capacity: 2000, form_factor: "3.5 inch", interface: "SATA", model: "T-Force Vulcan", nvme: false, price: 69.99, read_speed: 150, storage_type: "HDD", tdp: 6, write_speed: 140 },
    { storage_id: 12, brand: "Team Group", cache: 256, capacity: 1000, form_factor: "M.2", interface: "NVMe", model: "MP33", nvme: true, price: 49.99, read_speed: 2000, storage_type: "SSD", tdp: 5, write_speed: 1500 },
    { storage_id: 13, brand: "ADATA", cache: 128, capacity: 512, form_factor: "M.2", interface: "NVMe", model: "XPG SX8200 Pro", nvme: true, price: 69.99, read_speed: 3500, storage_type: "SSD", tdp: 5, write_speed: 3000 },
    { storage_id: 14, brand: "ADATA", cache: 256, capacity: 1000, form_factor: "2.5 inch", interface: "SATA", model: "SU800", nvme: false, price: 59.99, read_speed: 550, storage_type: "SSD", tdp: 3, write_speed: 450 },
    { storage_id: 15, brand: "Toshiba", cache: 128, capacity: 500, form_factor: "2.5 inch", interface: "SATA", model: "Canvio Basics", nvme: false, price: 49.99, read_speed: 540, storage_type: "HDD", tdp: 4, write_speed: 150 },
    { storage_id: 16, brand: "Toshiba", cache: 512, capacity: 2000, form_factor: "3.5 inch", interface: "SATA", model: "X300", nvme: false, price: 99.99, read_speed: 160, storage_type: "HDD", tdp: 6, write_speed: 140 },
    { storage_id: 17, brand: "Western Digital", cache: 256, capacity: 1000, form_factor: "M.2", interface: "NVMe", model: "Black SN750", nvme: true, price: 129.99, read_speed: 3470, storage_type: "SSD", tdp: 5, write_speed: 3000 },
    { storage_id: 18, brand: "Samsung", cache: 512, capacity: 2000, form_factor: "M.2", interface: "NVMe", model: "980 PRO", nvme: true, price: 249.99, read_speed: 7000, storage_type: "SSD", tdp: 6, write_speed: 5000 },
    { storage_id: 19, brand: "Crucial", cache: 256, capacity: 2000, form_factor: "2.5 inch", interface: "SATA", model: "MX500", nvme: false, price: 139.99, read_speed: 560, storage_type: "SSD", tdp: 4, write_speed: 500 },
    { storage_id: 20, brand: "Seagate", cache: 256, capacity: 1000, form_factor: "2.5 inch", interface: "SATA", model: "FireCuda", nvme: false, price: 89.99, read_speed: 140, storage_type: "HDD", tdp: 5, write_speed: 120 },
    { storage_id: 21, brand: "ADATA", cache: 512, capacity: 4000, form_factor: "M.2", interface: "NVMe", model: "XPG SX8200", nvme: true, price: 169.99, read_speed: 3500, storage_type: "SSD", tdp: 6, write_speed: 3000 },
    { storage_id: 22, brand: "Kingston", cache: 128, capacity: 256, form_factor: "2.5 inch", interface: "SATA", model: "UV400", nvme: false, price: 39.99, read_speed: 500, storage_type: "SSD", tdp: 3, write_speed: 450 },
    { storage_id: 23, brand: "Team Group", cache: 256, capacity: 512, form_factor: "M.2", interface: "NVMe", model: "MP34", nvme: true, price: 49.99, read_speed: 2000, storage_type: "SSD", tdp: 4, write_speed: 1700 },
    { storage_id: 24, brand: "Toshiba", cache: 128, capacity: 1000, form_factor: "3.5 inch", interface: "SATA", model: "DT01ACA100", nvme: false, price: 49.99, read_speed: 150, storage_type: "HDD", tdp: 5, write_speed: 140 },
    { storage_id: 25, brand: "Seagate", cache: 256, capacity: 2000, form_factor: "3.5 inch", interface: "SATA", model: "SkyHawk", nvme: false, price: 79.99, read_speed: 180, storage_type: "HDD", tdp: 6, write_speed: 150 },
    { storage_id: 26, brand: "Western Digital", cache: 512, capacity: 1000, form_factor: "M.2", interface: "NVMe", model: "Black SN750 SE", nvme: true, price: 149.99, read_speed: 3470, storage_type: "SSD", tdp: 5, write_speed: 3000 },
    { storage_id: 27, brand: "Toshiba", cache: 128, capacity: 500, form_factor: "2.5 inch", interface: "SATA", model: "Canvio Basics", nvme: false, price: 49.99, read_speed: 540, storage_type: "HDD", tdp: 4, write_speed: 150 },
    { storage_id: 28, brand: "Corsair", cache: 512, capacity: 1000, form_factor: "M.2", interface: "NVMe", model: "MP600", nvme: true, price: 199.99, read_speed: 4950, storage_type: "SSD", tdp: 7, write_speed: 4250 },
    { storage_id: 29, brand: "Samsung", cache: 256, capacity: 500, form_factor: "2.5 inch", interface: "SATA", model: "860 EVO", nvme: false, price: 69.99, read_speed: 550, storage_type: "SSD", tdp: 3, write_speed: 520 },
    { storage_id: 30, brand: "Western Digital", cache: 512, capacity: 3000, form_factor: "M.2", interface: "NVMe", model: "Black SN850", nvme: true, price: 299.99, read_speed: 7000, storage_type: "SSD", tdp: 9, write_speed: 5300 },
    { storage_id: 31, brand: "Crucial", cache: 128, capacity: 256, form_factor: "M.2", interface: "NVMe", model: "P1", nvme: true, price: 39.99, read_speed: 2000, storage_type: "SSD", tdp: 3, write_speed: 1700 },
    { storage_id: 32, brand: "Seagate", cache: 256, capacity: 5000, form_factor: "3.5 inch", interface: "SATA", model: "Barracuda", nvme: false, price: 109.99, read_speed: 150, storage_type: "HDD", tdp: 7, write_speed: 140 },
    { storage_id: 33, brand: "Kingston", cache: 512, capacity: 2000, form_factor: "M.2", interface: "NVMe", model: "NV1", nvme: true, price: 89.99, read_speed: 2100, storage_type: "SSD", tdp: 4, write_speed: 1700 },
    { storage_id: 34, brand: "ADATA", cache: 256, capacity: 512, form_factor: "M.2", interface: "NVMe", model: "XPG SX6000 Pro", nvme: true, price: 59.99, read_speed: 2100, storage_type: "SSD", tdp: 4, write_speed: 1200 },
    { storage_id: 35, brand: "Corsair", cache: 512, capacity: 1000, form_factor: "M.2", interface: "NVMe", model: "MP400", nvme: true, price: 129.99, read_speed: 3480, storage_type: "SSD", tdp: 5, write_speed: 3000 },
    { storage_id: 36, brand: "Team Group", cache: 128, capacity: 256, form_factor: "2.5 inch", interface: "SATA", model: "T-Force Delta", nvme: false, price: 34.99, read_speed: 550, storage_type: "SSD", tdp: 3, write_speed: 450 },
    { storage_id: 37, brand: "Toshiba", cache: 256, capacity: 2000, form_factor: "3.5 inch", interface: "SATA", model: "X300", nvme: false, price: 99.99, read_speed: 160, storage_type: "HDD", tdp: 6, write_speed: 140 },
    { storage_id: 38, brand: "Western Digital", cache: 128, capacity: 4000, form_factor: "3.5 inch", interface: "SATA", model: "Red", nvme: false, price: 149.99, read_speed: 150, storage_type: "HDD", tdp: 6, write_speed: 140 },
    { storage_id: 39, brand: "Crucial", cache: 256, capacity: 1000, form_factor: "M.2", interface: "NVMe", model: "P3", nvme: true, price: 49.99, read_speed: 2000, storage_type: "SSD", tdp: 4, write_speed: 1700 },
    { storage_id: 40, brand: "Seagate", cache: 256, capacity: 2000, form_factor: "2.5 inch", interface: "SATA", model: "FireCuda", nvme: false, price: 89.99, read_speed: 140, storage_type: "HDD", tdp: 5, write_speed: 120 },
    { storage_id: 41, brand: "ADATA", cache: 512, capacity: 1000, form_factor: "2.5 inch", interface: "SATA", model: "SU800", nvme: false, price: 69.99, read_speed: 550, storage_type: "SSD", tdp: 3, write_speed: 450 }
  ];



  async function addStorages() {
    const batch = db.batch();
  
    storage_id.forEach((Storage) => {
      const docRef = db.collection('Storage').doc(Storage.storage_id.toString()); // Use OS.os_id as the document ID
      batch.set(docRef, Storage);
    });
  
    await batch.commit();
    console.log('Storage devices added successfully!');
  }
  
  // Execute the function to add data
  addStorages().catch(console.error);