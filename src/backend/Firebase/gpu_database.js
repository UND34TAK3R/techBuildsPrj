import admin from 'firebase-admin';
import fs from 'fs';

// Read the service account key file synchronously
const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

  const gpu_id = [
    { gpu_id: 1, architecture: "NVIDIA", boost_clock: 1800, brand: "NVIDIA", chipset: "GeForce RTX 3080", core_clock: 1440, length: 300, memory_bus_width: 320, memory_size: 10, memory_type: "GDDR6X", model: "RTX 3080 Founders Edition", price: 699, ray_tracing: true, ray_tracing_cores: 68, stream_processors: "8704", tdp: 320, tensor_core: 272 },
  { gpu_id: 2, architecture: "AMD", boost_clock: 2250, brand: "AMD", chipset: "Radeon RX 6800 XT", core_clock: 2015, length: 267, memory_bus_width: 256, memory_size: 16, memory_type: "GDDR6", model: "RX 6800 XT", price: 649, ray_tracing: true, ray_tracing_cores: 72, stream_processors: "4608", tdp: 300, tensor_core: 0 },
  { gpu_id: 3, architecture: "NVIDIA", boost_clock: 1750, brand: "NVIDIA", chipset: "GeForce RTX 3070", core_clock: 1500, length: 242, memory_bus_width: 256, memory_size: 8, memory_type: "GDDR6", model: "RTX 3070 Founders Edition", price: 499, ray_tracing: true, ray_tracing_cores: 46, stream_processors: "5888", tdp: 220, tensor_core: 184 },
  { gpu_id: 4, architecture: "AMD", boost_clock: 2600, brand: "AMD", chipset: "Radeon RX 6900 XT", core_clock: 2015, length: 267, memory_bus_width: 256, memory_size: 16, memory_type: "GDDR6", model: "RX 6900 XT", price: 999, ray_tracing: true, ray_tracing_cores: 80, stream_processors: "5120", tdp: 300, tensor_core: 0 },
  { gpu_id: 5, architecture: "NVIDIA", boost_clock: 1600, brand: "NVIDIA", chipset: "GeForce GTX 1660 Ti", core_clock: 1500, length: 245, memory_bus_width: 192, memory_size: 6, memory_type: "GDDR6", model: "GTX 1660 Ti", price: 279, ray_tracing: false, ray_tracing_cores: 0, stream_processors: "1536", tdp: 120, tensor_core: 0 },
  { gpu_id: 6, architecture: "NVIDIA", boost_clock: 1900, brand: "NVIDIA", chipset: "GeForce RTX 3060 Ti", core_clock: 1410, length: 242, memory_bus_width: 256, memory_size: 8, memory_type: "GDDR6", model: "RTX 3060 Ti Founders Edition", price: 399, ray_tracing: true, ray_tracing_cores: 38, stream_processors: "4864", tdp: 200, tensor_core: 152 },
  { gpu_id: 7, architecture: "AMD", boost_clock: 2400, brand: "AMD", chipset: "Radeon RX 6700 XT", core_clock: 2321, length: 267, memory_bus_width: 192, memory_size: 12, memory_type: "GDDR6", model: "RX 6700 XT", price: 479, ray_tracing: true, ray_tracing_cores: 40, stream_processors: "2560", tdp: 230, tensor_core: 0 },
  { gpu_id: 8, architecture: "NVIDIA", boost_clock: 1800, brand: "NVIDIA", chipset: "GeForce RTX 3090", core_clock: 1400, length: 313, memory_bus_width: 384, memory_size: 24, memory_type: "GDDR6X", model: "RTX 3090 Founders Edition", price: 1499, ray_tracing: true, ray_tracing_cores: 82, stream_processors: "10496", tdp: 350, tensor_core: 336 },
  { gpu_id: 9, architecture: "AMD", boost_clock: 2300, brand: "AMD", chipset: "Radeon RX 6600 XT", core_clock: 1968, length: 262, memory_bus_width: 128, memory_size: 8, memory_type: "GDDR6", model: "RX 6600 XT", price: 379, ray_tracing: true, ray_tracing_cores: 32, stream_processors: "2048", tdp: 160, tensor_core: 0 },
  { gpu_id: 10, architecture: "NVIDIA", boost_clock: 1750, brand: "NVIDIA", chipset: "GeForce RTX 2080 Super", core_clock: 1650, length: 267, memory_bus_width: 256, memory_size: 8, memory_type: "GDDR6", model: "RTX 2080 Super Founders Edition", price: 699, ray_tracing: true, ray_tracing_cores: 46, stream_processors: "3072", tdp: 250, tensor_core: 0 },
  { gpu_id: 11, architecture: "AMD", boost_clock: 2450, brand: "AMD", chipset: "Radeon RX 5500 XT", core_clock: 1717, length: 238, memory_bus_width: 128, memory_size: 8, memory_type: "GDDR6", model: "RX 5500 XT", price: 199, ray_tracing: false, ray_tracing_cores: 0, stream_processors: "1408", tdp: 130, tensor_core: 0 },
  { gpu_id: 12, architecture: "NVIDIA", boost_clock: 1550, brand: "NVIDIA", chipset: "GeForce GTX 1650 Super", core_clock: 1530, length: 229, memory_bus_width: 128, memory_size: 4, memory_type: "GDDR6", model: "GTX 1650 Super", price: 159, ray_tracing: false, ray_tracing_cores: 0, stream_processors: "1280", tdp: 100, tensor_core: 0 },
  { gpu_id: 13, architecture: "AMD", boost_clock: 2000, brand: "AMD", chipset: "Radeon RX 5600 XT", core_clock: 1375, length: 240, memory_bus_width: 192, memory_size: 6, memory_type: "GDDR6", model: "RX 5600 XT", price: 279, ray_tracing: false, ray_tracing_cores: 0, stream_processors: "2304", tdp: 150, tensor_core: 0 },
  { gpu_id: 14, architecture: "NVIDIA", boost_clock: 1680, brand: "NVIDIA", chipset: "GeForce GTX 1080 Ti", core_clock: 1480, length: 267, memory_bus_width: 352, memory_size: 11, memory_type: "GDDR5X", model: "GTX 1080 Ti Founders Edition", price: 699, ray_tracing: false, ray_tracing_cores: 0, stream_processors: "3584", tdp: 250, tensor_core: 0 },
  { gpu_id: 15, architecture: "AMD", boost_clock: 2150, brand: "AMD", chipset: "Radeon RX 6700", core_clock: 2495, length: 267, memory_bus_width: 192, memory_size: 10, memory_type: "GDDR6", model: "RX 6700", price: 499, ray_tracing: true, ray_tracing_cores: 40, stream_processors: "2304", tdp: 200, tensor_core: 0 },
  { gpu_id: 16, architecture: "NVIDIA", boost_clock: 1650, brand: "NVIDIA", chipset: "GeForce GTX 1070", core_clock: 1506, length: 250, memory_bus_width: 256, memory_size: 8, memory_type: "GDDR5", model: "GTX 1070 Founders Edition", price: 449, ray_tracing: false, ray_tracing_cores: 0, stream_processors: "1920", tdp: 150, tensor_core: 0 },
  { gpu_id: 17, architecture: "NVIDIA", boost_clock: 1500, brand: "NVIDIA", chipset: "GeForce GTX 1060", core_clock: 1506, length: 238, memory_bus_width: 192, memory_size: 6, memory_type: "GDDR5", model: "GTX 1060 Founders Edition", price: 299, ray_tracing: false, ray_tracing_cores: 0, stream_processors: "1280", tdp: 120, tensor_core: 0 },
  { gpu_id: 18, architecture: "AMD", boost_clock: 2700, brand: "AMD", chipset: "Radeon VII", core_clock: 1400, length: 300, memory_bus_width: 4096, memory_size: 16, memory_type: "HBM2", model: "Radeon VII", price: 699, ray_tracing: false, ray_tracing_cores: 0, stream_processors: "3840", tdp: 300, tensor_core: 0 },
  { gpu_id: 19, architecture: "NVIDIA", boost_clock: 1400, brand: "NVIDIA", chipset: "GeForce RTX 2080", core_clock: 1515, length: 267, memory_bus_width: 256, memory_size: 8, memory_type: "GDDR6", model: "RTX 2080 Founders Edition", price: 699, ray_tracing: true, ray_tracing_cores: 46, stream_processors: "2944", tdp: 225, tensor_core: 0 },
  { gpu_id: 20, architecture: "AMD", boost_clock: 2400, brand: "AMD", chipset: "Radeon RX 5800", core_clock: 1740, length: 260, memory_bus_width: 256, memory_size: 8, memory_type: "GDDR6", model: "RX 5800", price: 599, ray_tracing: true, ray_tracing_cores: 40, stream_processors: "2304", tdp: 250, tensor_core: 0 },
  { gpu_id: 21, architecture: "NVIDIA", boost_clock: 1850, brand: "NVIDIA", chipset: "GeForce RTX 3070 Ti", core_clock: 1575, length: 250, memory_bus_width: 256, memory_size: 8, memory_type: "GDDR6", model: "RTX 3070 Ti Founders Edition", price: 599, ray_tracing: true, ray_tracing_cores: 38, stream_processors: "6144", tdp: 290, tensor_core: 0 },
  { gpu_id: 22, architecture: "AMD", boost_clock: 2200, brand: "AMD", chipset: "Radeon RX 6700 XT", core_clock: 2321, length: 267, memory_bus_width: 192, memory_size: 12, memory_type: "GDDR6", model: "RX 6700 XT", price: 479, ray_tracing: true, ray_tracing_cores: 40, stream_processors: "2560", tdp: 230, tensor_core: 0 },
  { gpu_id: 23, architecture: "NVIDIA", boost_clock: 1750, brand: "NVIDIA", chipset: "GeForce GTX 1660 Super", core_clock: 1530, length: 240, memory_bus_width: 192, memory_size: 6, memory_type: "GDDR6", model: "GTX 1660 Super", price: 229, ray_tracing: false, ray_tracing_cores: 0, stream_processors: "1408", tdp: 125, tensor_core: 0 },
  { gpu_id: 24, architecture: "AMD", boost_clock: 1600, brand: "AMD", chipset: "Radeon RX 5600", core_clock: 1375, length: 240, memory_bus_width: 192, memory_size: 6, memory_type: "GDDR6", model: "RX 5600", price: 279, ray_tracing: false, ray_tracing_cores: 0, stream_processors: "2304", tdp: 150, tensor_core: 0 },
  { gpu_id: 25, architecture: "NVIDIA", boost_clock: 1700, brand: "NVIDIA", chipset: "GeForce RTX 3050", core_clock: 1500, length: 240, memory_bus_width: 128, memory_size: 8, memory_type: "GDDR6", model: "RTX 3050", price: 249, ray_tracing: true, ray_tracing_cores: 20, stream_processors: "2048", tdp: 130, tensor_core: 0 },
  { gpu_id: 26, architecture: "AMD", boost_clock: 2450, brand: "AMD", chipset: "Radeon RX 5500", core_clock: 1600, length: 250, memory_bus_width: 128, memory_size: 4, memory_type: "GDDR6", model: "RX 5500", price: 199, ray_tracing: false, ray_tracing_cores: 0, stream_processors: "1408", tdp: 130, tensor_core: 0 },
  { gpu_id: 27, architecture: "NVIDIA", boost_clock: 1850, brand: "NVIDIA", chipset: "GeForce RTX 3060", core_clock: 1320, length: 232, memory_bus_width: 192, memory_size: 12, memory_type: "GDDR6", model: "RTX 3060", price: 329, ray_tracing: true, ray_tracing_cores: 28, stream_processors: "3584", tdp: 170, tensor_core: 0 },
  { gpu_id: 28, architecture: "AMD", boost_clock: 2150, brand: "AMD", chipset: "Radeon RX 6600", core_clock: 1968, length: 267, memory_bus_width: 128, memory_size: 8, memory_type: "GDDR6", model: "RX 6600", price: 299, ray_tracing: true, ray_tracing_cores: 32, stream_processors: "2048", tdp: 132, tensor_core: 0 },
  { gpu_id: 29, architecture: "NVIDIA", boost_clock: 1600, brand: "NVIDIA", chipset: "GeForce GTX 980 Ti", core_clock: 1000, length: 267, memory_bus_width: 384, memory_size: 6, memory_type: "GDDR5", model: "GTX 980 Ti", price: 649, ray_tracing: false, ray_tracing_cores: 0, stream_processors: "2816", tdp: 250, tensor_core: 0 },
  { gpu_id: 30, architecture: "AMD", boost_clock: 2300, brand: "AMD", chipset: "Radeon RX 470", core_clock: 1206, length: 250, memory_bus_width: 256, memory_size: 4, memory_type: "GDDR5", model: "RX 470", price: 199, ray_tracing: false, ray_tracing_cores: 0, stream_processors: "2048", tdp: 120, tensor_core: 0 },
  { gpu_id: 31, architecture: "NVIDIA", boost_clock: 1500, brand: "NVIDIA", chipset: "GeForce GTX 750 Ti", core_clock: 1020, length: 170, memory_bus_width: 128, memory_size: 2, memory_type: "GDDR5", model: "GTX 750 Ti", price: 159, ray_tracing: false, ray_tracing_cores: 0, stream_processors: "640", tdp: 60, tensor_core: 0 },
  ];



  async function addGPUs() {
    const batch = db.batch();
  
    gpu_id.forEach((GPU) => {
      const docRef = db.collection('GPU').doc(GPU.gpu_id.toString());
      batch.set(docRef, GPU);
    });
  
    await batch.commit();
    console.log('GPU added successfully!');
  }
  
  addGPUs().catch(console.error);