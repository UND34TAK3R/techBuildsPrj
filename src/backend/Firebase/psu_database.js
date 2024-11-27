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

  const psu_id = [
    { psu_id: 1, brand: "Corsair", efficiency_rating: "80 Plus Gold", form_factor: "ATX", model: "RM850", modularity: "Fully Modular", price: 139.99, wattage: 850 },
    { psu_id: 2, brand: "Seasonic", efficiency_rating: "80 Plus Platinum", form_factor: "ATX", model: "PRIME Platinum 850W", modularity: "Fully Modular", price: 159.99, wattage: 850 },
    { psu_id: 3, brand: "EVGA", efficiency_rating: "80 Plus Gold", form_factor: "ATX", model: "SuperNOVA 750 G5", modularity: "Fully Modular", price: 124.99, wattage: 750 },
    { psu_id: 4, brand: "Thermaltake", efficiency_rating: "80 Plus Gold", form_factor: "ATX", model: "Toughpower GF1 750W", modularity: "Fully Modular", price: 109.99, wattage: 750 },
    { psu_id: 5, brand: "Cooler Master", efficiency_rating: "80 Plus Bronze", form_factor: "ATX", model: "MWE Bronze 650W", modularity: "Non-Modular", price: 69.99, wattage: 650 },
    { psu_id: 6, brand: "Antec", efficiency_rating: "80 Plus Gold", form_factor: "ATX", model: "HCG Gold 850W", modularity: "Fully Modular", price: 139.99, wattage: 850 },
    { psu_id: 7, brand: "be quiet!", efficiency_rating: "80 Plus Platinum", form_factor: "ATX", model: "Straight Power 11 750W", modularity: "Fully Modular", price: 149.99, wattage: 750 },
    { psu_id: 8, brand: "XFX", efficiency_rating: "80 Plus Gold", form_factor: "ATX", model: "XTR 850W", modularity: "Fully Modular", price: 129.99, wattage: 850 },
    { psu_id: 9, brand: "Gigabyte", efficiency_rating: "80 Plus Gold", form_factor: "ATX", model: "AORUS P850W", modularity: "Fully Modular", price: 119.99, wattage: 850 },
    { psu_id: 10, brand: "SilverStone", efficiency_rating: "80 Plus Bronze", form_factor: "SFX", model: "SST-ST45SF v2.0", modularity: "Non-Modular", price: 79.99, wattage: 450 },
    { psu_id: 11, brand: "Fractal Design", efficiency_rating: "80 Plus Gold", form_factor: "ATX", model: "Ion+ 760P", modularity: "Fully Modular", price: 129.99, wattage: 760 },
    { psu_id: 12, brand: "FSP", efficiency_rating: "80 Plus Gold", form_factor: "ATX", model: "Hydro G Pro 850W", modularity: "Fully Modular", price: 139.99, wattage: 850 },
    { psu_id: 13, brand: "InWin", efficiency_rating: "80 Plus Bronze", form_factor: "ATX", model: "CL Series 650W", modularity: "Non-Modular", price: 69.99, wattage: 650 },
    { psu_id: 14, brand: "HP", efficiency_rating: "80 Plus Silver", form_factor: "ATX", model: "HP 500W", modularity: "Non-Modular", price: 59.99, wattage: 500 },
    { psu_id: 15, brand: "Zalman", efficiency_rating: "80 Plus Bronze", form_factor: "ATX", model: "ZM500-GS", modularity: "Non-Modular", price: 69.99, wattage: 500 },
    { psu_id: 16, brand: "Thermaltake", efficiency_rating: "80 Plus Platinum", form_factor: "ATX", model: "Toughpower PF1 850W", modularity: "Fully Modular", price: 159.99, wattage: 850 },
    { psu_id: 17, brand: "Enermax", efficiency_rating: "80 Plus Gold", form_factor: "ATX", model: "REVOLUTION D.F. 850W", modularity: "Fully Modular", price: 139.99, wattage: 850 },
    { psu_id: 18, brand: "Rosewill", efficiency_rating: "80 Plus Bronze", form_factor: "ATX", model: "Capstone 750W", modularity: "Fully Modular", price: 89.99, wattage: 750 },
    { psu_id: 19, brand: "Thermaltake", efficiency_rating: "80 Plus Gold", form_factor: "ATX", model: "Smart Pro RGB 750W", modularity: "Fully Modular", price: 109.99, wattage: 750 },
    { psu_id: 20, brand: "Cooler Master", efficiency_rating: "80 Plus Gold", form_factor: "ATX", model: "V750 Gold", modularity: "Fully Modular", price: 119.99, wattage: 750 },
    { psu_id: 21, brand: "Zalman", efficiency_rating: "80 Plus Silver", form_factor: "ATX", model: "ZM750-EBT", modularity: "Non-Modular", price: 89.99, wattage: 750 },
    { psu_id: 22, brand: "Phanteks", efficiency_rating: "80 Plus Gold", form_factor: "ATX", model: "PH-P850PS", modularity: "Fully Modular", price: 129.99, wattage: 850 },
    { psu_id: 23, brand: "ASUS", efficiency_rating: "80 Plus Gold", form_factor: "ATX", model: "ROG Strix 750W", modularity: "Fully Modular", price: 149.99, wattage: 750 },
    { psu_id: 24, brand: "XPG", efficiency_rating: "80 Plus Gold", form_factor: "ATX", model: "XPG Core Reactor 850W", modularity: "Fully Modular", price: 129.99, wattage: 850 },
    { psu_id: 25, brand: "Lian Li", efficiency_rating: "80 Plus Gold", form_factor: "ATX", model: "SP750", modularity: "Fully Modular", price: 139.99, wattage: 750 },
    { psu_id: 26, brand: "Cougar", efficiency_rating: "80 Plus Gold", form_factor: "ATX", model: "GX-S 750W", modularity: "Fully Modular", price: 109.99, wattage: 750 },
    { psu_id: 27, brand: "Deepcool", efficiency_rating: "80 Plus Bronze", form_factor: "ATX", model: "DQ750-M", modularity: "Non-Modular", price: 79.99, wattage: 750 },
    { psu_id: 28, brand: "BitFenix", efficiency_rating: "80 Plus Gold", form_factor: "ATX", model: "Formula Gold 750W", modularity: "Fully Modular", price: 129.99, wattage: 750 },
    { psu_id: 29, brand: "Thermaltake", efficiency_rating: "80 Plus Gold", form_factor: "ATX", model: "Toughpower PF1 ARGB 850W", modularity: "Fully Modular", price: 159.99, wattage: 850 },
    { psu_id: 30, brand: "AeroCool", efficiency_rating: "80 Plus Bronze", form_factor: "ATX", model: "Cylon 600W", modularity: "Non-Modular", price: 59.99, wattage: 600 },
    { psu_id: 31, brand: "GameMax", efficiency_rating: "80 Plus Bronze", form_factor: "ATX", model: "GM600", modularity: "Non-Modular", price: 49.99, wattage: 600 },
  ];



  async function addPSUs() {
    const batch = db.batch();
  
    psu_id.forEach((PSU) => {
      const docRef = db.collection('PSU').doc(PSU.psu_id.toString()); // Use OS.os_id as the document ID
      batch.set(docRef, PSU);
    });
  
    await batch.commit();
    console.log('Power Supply Units added successfully!');
  }
  
  // Execute the function to add data
  addPSUs().catch(console.error);