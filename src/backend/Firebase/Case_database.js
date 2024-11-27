import admin from 'firebase-admin';
import fs from 'fs';

// Read the service account key file synchronously
const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

  const case_id = [
    {case_id: 1, brand: "Corsair", color: "Black", dimensions: "450 x 210 x 450 mm", fan_count: 4, form_factor: "ATX", material: "Steel", max_cooler_height: 160, max_gpu_length: 350, model: "4000D Airflow", price: 99, type: "Mid Tower", volume: "45 liters" },
    { case_id: 2, brand: "NZXT", color: "White", dimensions: "410 x 210 x 460 mm", fan_count: 3, form_factor: "ATX", material: "Steel", max_cooler_height: 165, max_gpu_length: 330, model: "H510", price: 79, type: "Mid Tower", volume: "40 liters" },
    { case_id: 3, brand: "Cooler Master", color: "Black", dimensions: "500 x 230 x 500 mm", fan_count: 5, form_factor: "ATX", material: "Plastic/Steel", max_cooler_height: 170, max_gpu_length: 400, model: "MasterBox Q300L", price: 59, type: "Micro ATX", volume: "35 liters" },
    { case_id: 4, brand: "Fractal Design", color: "Black", dimensions: "440 x 232 x 479 mm", fan_count: 2, form_factor: "ATX", material: "Steel", max_cooler_height: 165, max_gpu_length: 360, model: "Meshify C", price: 89, type: "Mid Tower", volume: "42 liters" },
    { case_id: 6, brand: "Lian Li", color: "Aluminum", dimensions: "482 x 210 x 460 mm", fan_count: 3, form_factor: "ATX", material: "Aluminum", max_cooler_height: 165, max_gpu_length: 380, model: "PC-O11 Dynamic", price: 129, type: "Mid Tower", volume: "55 liters" },
    { case_id: 7, brand: "Thermaltake", color: "Black", dimensions: "470 x 210 x 520 mm", fan_count: 3, form_factor: "ATX", material: "Steel", max_cooler_height: 160, max_gpu_length: 350, model: "View 71", price: 179, type: "Full Tower", volume: "62 liters" },
    { case_id: 8, brand: "Phanteks", color: "Black", dimensions: "490 x 210 x 460 mm", fan_count: 3, form_factor: "ATX", material: "Steel", max_cooler_height: 160, max_gpu_length: 420, model: "P300A", price: 69, type: "Mid Tower", volume: "43 liters" },
    { case_id: 9, brand: "be quiet!", color: "Black", dimensions: "410 x 210 x 470 mm", fan_count: 3, form_factor: "ATX", material: "Steel", max_cooler_height: 160, max_gpu_length: 370, model: "Pure Base 500", price: 89, type: "Mid Tower", volume: "41 liters" },
    { case_id: 10, brand: "ASUS", color: "Black", dimensions: "470 x 210 x 500 mm", fan_count: 3, form_factor: "ATX", material: "Steel", max_cooler_height: 160, max_gpu_length: 350, model: "ROG Strix Helios", price: 199, type: "Mid Tower", volume: "55 liters" },
    { case_id: 11, brand: "InWin", color: "Black", dimensions: "500 x 220 x 510 mm", fan_count: 4, form_factor: "ATX", material: "Steel", max_cooler_height: 160, max_gpu_length: 400, model: "303", price: 139, type: "Mid Tower", volume: "46 liters" },
    { case_id: 12, brand: "SilverStone", color: "Black", dimensions: "420 x 205 x 460 mm", fan_count: 3, form_factor: "ATX", material: "Aluminum", max_cooler_height: 165, max_gpu_length: 350, model: "RL06", price: 89, type: "Mid Tower", volume: "41 liters" },
    { case_id: 13, brand: "Cooler Master", color: "White", dimensions: "510 x 210 x 485 mm", fan_count: 4, form_factor: "ATX", material: "Plastic/Steel", max_cooler_height: 165, max_gpu_length: 370, model: "HAF 912", price: 99, type: "Mid Tower", volume: "47 liters" },
    { case_id: 14, brand: "Corsair", color: "Black", dimensions: "450 x 210 x 465 mm", fan_count: 3, form_factor: "ATX", material: "Steel", max_cooler_height: 160, max_gpu_length: 350, model: "Crystal Series 280X", price: 129, type: "Micro ATX", volume: "50 liters" },
    { case_id: 15, brand: "Thermaltake", color: "White", dimensions: "465 x 235 x 517 mm", fan_count: 3, form_factor: "ATX", material: "Steel", max_cooler_height: 165, max_gpu_length: 390, model: "H200 TG", price: 109, type: "Mid Tower", volume: "53 liters" },
    { case_id: 16, brand: "Fractal Design", color: "White", dimensions: "440 x 232 x 479 mm", fan_count: 2, form_factor: "ATX", material: "Steel", max_cooler_height: 165, max_gpu_length: 360, model: "Define C", price: 89, type: "Mid Tower", volume: "42 liters" },
    { case_id: 17, brand: "Lian Li", color: "Black", dimensions: "460 x 210 x 460 mm", fan_count: 4, form_factor: "ATX", material: "Aluminum", max_cooler_height: 165, max_gpu_length: 390, model: "PC-O11 Dynamic Mini", price: 139, type: "Mid Tower", volume: "42 liters" },
    { case_id: 18, brand: "Phanteks", color: "White", dimensions: "490 x 210 x 450 mm", fan_count: 4, form_factor: "ATX", material: "Steel", max_cooler_height: 160, max_gpu_length: 420, model: "P400A", price: 79, type: "Mid Tower", volume: "45 liters" },
    { case_id: 19, brand: "NZXT", color: "Black", dimensions: "430 x 210 x 465 mm", fan_count: 3, form_factor: "ATX", material: "Steel", max_cooler_height: 160, max_gpu_length: 340, model: "H510 Elite", price: 149, type: "Mid Tower", volume: "40 liters" },
    { case_id: 20, brand: "Cooler Master", color: "Black", dimensions: "450 x 220 x 470 mm", fan_count: 3, form_factor: "ATX", material: "Steel", max_cooler_height: 160, max_gpu_length: 350, model: "MasterBox NR600", price: 79, type: "Mid Tower", volume: "43 liters" },
    { case_id: 21, brand: "Thermaltake", color: "Red", dimensions: "500 x 210 x 520 mm", fan_count: 4, form_factor: "ATX", material: "Steel", max_cooler_height: 160, max_gpu_length: 400, model: "View 21", price: 159, type: "Mid Tower", volume: "62 liters" },
    { case_id: 22, brand: "be quiet!", color: "Black", dimensions: "400 x 200 x 450 mm", fan_count: 3, form_factor: "ATX", material: "Steel", max_cooler_height: 165, max_gpu_length: 360, model: "Pure Base 600", price: 99, type: "Mid Tower", volume: "40 liters" },
    { case_id: 23, brand: "ASUS", color: "Black", dimensions: "470 x 210 x 500 mm", fan_count: 3, form_factor: "ATX", material: "Steel", max_cooler_height: 160, max_gpu_length: 350, model: "ROG Strix Helios", price: 199, type: "Mid Tower", volume: "55 liters" },
    { case_id: 24, brand: "InWin", color: "Black", dimensions: "500 x 220 x 510 mm", fan_count: 4, form_factor: "ATX", material: "Steel", max_cooler_height: 160, max_gpu_length: 400, model: "303", price: 139, type: "Mid Tower", volume: "46 liters" },
    { case_id: 25, brand: "SilverStone", color: "Black", dimensions: "420 x 205 x 460 mm", fan_count: 3, form_factor: "ATX", material: "Aluminum", max_cooler_height: 165, max_gpu_length: 350, model: "RL06", price: 89, type: "Mid Tower", volume: "41 liters" },
    { case_id: 26, brand: "Cooler Master", color: "White", dimensions: "510 x 210 x 485 mm", fan_count: 4, form_factor: "ATX", material: "Plastic/Steel", max_cooler_height: 165, max_gpu_length: 370, model: "HAF 912", price: 99, type: "Mid Tower", volume: "47 liters" },
    { case_id: 27, brand: "Corsair", color: "Black", dimensions: "450 x 210 x 465 mm", fan_count: 3, form_factor: "ATX", material: "Steel", max_cooler_height: 160, max_gpu_length: 350, model: "Crystal Series 280X", price: 129, type: "Micro ATX", volume: "50 liters" },
    { case_id: 28, brand: "Thermaltake", color: "White", dimensions: "465 x 235 x 517 mm", fan_count: 3, form_factor: "ATX", material: "Steel", max_cooler_height: 165, max_gpu_length: 390, model: "H200 TG", price: 109, type: "Mid Tower", volume: "53 liters" },
    { case_id: 29, brand: "Fractal Design", color: "White", dimensions: "440 x 232 x 479 mm", fan_count: 2, form_factor: "ATX", material: "Steel", max_cooler_height: 165, max_gpu_length: 360, model: "Define C", price: 89, type: "Mid Tower", volume: "42 liters" },
    { case_id: 30, brand: "Lian Li", color: "Black", dimensions: "460 x 210 x 460 mm", fan_count: 4, form_factor: "ATX", material: "Aluminum", max_cooler_height: 165, max_gpu_length: 390, model: "PC-O11 Dynamic Mini", price: 139, type: "Mid Tower", volume: "42 liters" },
    { case_id: 31, brand: "Phanteks", color: "White", dimensions: "490 x 210 x 450 mm", fan_count: 4, form_factor: "ATX", material: "Steel", max_cooler_height: 160, max_gpu_length: 420, model: "P400A", price: 79, type: "Mid Tower", volume: "45 liters" }
  ];



  async function addCases() {
    const batch = db.batch();
  
    case_id.forEach((Case) => {
        const docRef = db.collection('Case').doc(Case.case_id.toString());
      batch.set(docRef, Case);
    });
  
    await batch.commit();
    console.log('Cases added successfully!');
  }
  
  addCases().catch(console.error);