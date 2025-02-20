import admin from 'firebase-admin';
import fs from 'fs';

// Read the service account key file synchronously
const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

  const cpu_id = [
    {
      cpu_id: '1',
      architecture: 'Zen 3',
      base_clock: 3.8,
      boost_clock: 4.7,
      brand: 'AMD',
      cores: 8,
      generation: 'Ryzen 5000',
      integrated_graphics: false,
      max_memory_bandwith: 51.2,
      max_temperature: 95,
      model: 'Ryzen 7 5800X',
      multi_thread_support: true,
      price: 399,
      socket: 'AM4',
      tdp: 105,
      threads: 16
    },
    {
      cpu_id: '2',
      architecture: 'Rocket Lake',
      base_clock: 3.5,
      boost_clock: 5.1,
      brand: 'Intel',
      cores: 8,
      generation: '11th Gen',
      integrated_graphics: true,
      max_memory_bandwith: 50,
      max_temperature: 100,
      model: 'Core i7-11700K',
      multi_thread_support: true,
      price: 374,
      socket: 'LGA1200',
      tdp: 125,
      threads: 16
    },
    {
      cpu_id: '3',
      architecture: 'Comet Lake',
      base_clock: 3.6,
      boost_clock: 5.0,
      brand: 'Intel',
      cores: 10,
      generation: '10th Gen',
      integrated_graphics: false,
      max_memory_bandwith: 45.8,
      max_temperature: 100,
      model: 'Core i9-10900K',
      multi_thread_support: true,
      price: 499,
      socket: 'LGA1200',
      tdp: 125,
      threads: 20
    },
    {
      cpu_id: '4',
      architecture: 'Zen 2',
      base_clock: 3.6,
      boost_clock: 4.4,
      brand: 'AMD',
      cores: 6,
      generation: 'Ryzen 3000',
      integrated_graphics: false,
      max_memory_bandwith: 47.68,
      max_temperature: 95,
      model: 'Ryzen 5 3600',
      multi_thread_support: true,
      price: 199,
      socket: 'AM4',
      tdp: 65,
      threads: 12
    },
    {
      cpu_id: '5',
      architecture: 'Ice Lake',
      base_clock: 2.7,
      boost_clock: 4.1,
      brand: 'Intel',
      cores: 4,
      generation: '10th Gen',
      integrated_graphics: true,
      max_memory_bandwith: 34.1,
      max_temperature: 100,
      model: 'Core i5-1035G7',
      multi_thread_support: true,
      price: 280,
      socket: 'BGA1526',
      tdp: 15,
      threads: 8
    },
    {
      cpu_id: '6',
      architecture: 'Zen 3',
      base_clock: 3.7,
      boost_clock: 4.8,
      brand: 'AMD',
      cores: 12,
      generation: 'Ryzen 5000',
      integrated_graphics: false,
      max_memory_bandwith: 64,
      max_temperature: 95,
      model: 'Ryzen 9 5900X',
      multi_thread_support: true,
      price: 549,
      socket: 'AM4',
      tdp: 105,
      threads: 24
    },
    {
      cpu_id: '7',
      architecture: 'Comet Lake',
      base_clock: 3.1,
      boost_clock: 4.9,
      brand: 'Intel',
      cores: 6,
      generation: '10th Gen',
      integrated_graphics: true,
      max_memory_bandwith: 41.6,
      max_temperature: 100,
      model: 'Core i5-10600K',
      multi_thread_support: true,
      price: 262,
      socket: 'LGA1200',
      tdp: 125,
      threads: 12
    },
    {
      cpu_id: '8',
      architecture: 'Rocket Lake',
      base_clock: 3.9,
      boost_clock: 5.3,
      brand: 'Intel',
      cores: 8,
      generation: '11th Gen',
      integrated_graphics: true,
      max_memory_bandwith: 51.2,
      max_temperature: 100,
      model: 'Core i7-11900K',
      multi_thread_support: true,
      price: 399,
      socket: 'LGA1200',
      tdp: 125,
      threads: 16
    },
    {
      cpu_id: '9',
      architecture: 'Zen 3',
      base_clock: 3.7,
      boost_clock: 4.6,
      brand: 'AMD',
      cores: 6,
      generation: 'Ryzen 5000',
      integrated_graphics: false,
      max_memory_bandwith: 51.2,
      max_temperature: 95,
      model: 'Ryzen 5 5600X',
      multi_thread_support: true,
      price: 299,
      socket: 'AM4',
      tdp: 65,
      threads: 12
    },
    {
      cpu_id: '10',
      architecture: 'Zen 2',
      base_clock: 3.5,
      boost_clock: 4.2,
      brand: 'AMD',
      cores: 4,
      generation: 'Ryzen 3000',
      integrated_graphics: true,
      max_memory_bandwith: 47.68,
      max_temperature: 95,
      model: 'Ryzen 3 3200G',
      multi_thread_support: true,
      price: 99,
      socket: 'AM4',
      tdp: 65,
      threads: 4
    },
    {
      cpu_id: '11',
      architecture: 'Zen 3',
      base_clock: 3.9,
      boost_clock: 4.9,
      brand: 'AMD',
      cores: 8,
      generation: 'Ryzen 5000',
      integrated_graphics: false,
      max_memory_bandwith: 51.2,
      max_temperature: 95,
      model: 'Ryzen 7 5800G',
      multi_thread_support: true,
      price: 399,
      socket: 'AM4',
      tdp: 65,
      threads: 16
    },
    {
      cpu_id: '12',
      architecture: 'Rocket Lake',
      base_clock: 3.5,
      boost_clock: 4.8,
      brand: 'Intel',
      cores: 6,
      generation: '11th Gen',
      integrated_graphics: true,
      max_memory_bandwith: 50,
      max_temperature: 100,
      model: 'Core i5-11400',
      multi_thread_support: true,
      price: 157,
      socket: 'LGA1200',
      tdp: 65,
      threads: 12
    },
    {
      cpu_id: '13',
      architecture: 'Comet Lake',
      base_clock: 3.3,
      boost_clock: 4.8,
      brand: 'Intel',
      cores: 4,
      generation: '10th Gen',
      integrated_graphics: true,
      max_memory_bandwith: 41.6,
      max_temperature: 100,
      model: 'Core i3-10300',
      multi_thread_support: true,
      price: 122,
      socket: 'LGA1200',
      tdp: 65,
      threads: 8
    },
    {
      cpu_id: '14',
      architecture: 'Zen 2',
      base_clock: 3.9,
      boost_clock: 4.4,
      brand: 'AMD',
      cores: 8,
      generation: 'Ryzen 3000',
      integrated_graphics: false,
      max_memory_bandwith: 47.68,
      max_temperature: 95,
      model: 'Ryzen 7 3700X',
      multi_thread_support: true,
      price: 329,
      socket: 'AM4',
      tdp: 65,
      threads: 16
    },
    {
      cpu_id: '15',
      architecture: 'Comet Lake',
      base_clock: 2.9,
      boost_clock: 4.3,
      brand: 'Intel',
      cores: 10,
      generation: '10th Gen',
      integrated_graphics: false,
      max_memory_bandwith: 41.6,
      max_temperature: 100,
      model: 'Core i9-10900F',
      multi_thread_support: true,
      price: 488,
      socket: 'LGA1200',
      tdp: 65,
      threads: 20
    },
    {
      cpu_id: '16',
      architecture: 'Zen 3',
      base_clock: 3.6,
      boost_clock: 4.4,
      brand: 'AMD',
      cores: 6,
      generation: 'Ryzen 5000',
      integrated_graphics: false,
      max_memory_bandwith: 51.2,
      max_temperature: 95,
      model: 'Ryzen 5 5500',
      multi_thread_support: true,
      price: 249,
      socket: 'AM4',
      tdp: 65,
      threads: 12
    },
    {
      cpu_id: '17',
      architecture: 'Rocket Lake',
      base_clock: 3.5,
      boost_clock: 5.0,
      brand: 'Intel',
      cores: 8,
      generation: '11th Gen',
      integrated_graphics: false,
      max_memory_bandwith: 51.2,
      max_temperature: 100,
      model: 'Core i7-11700',
      multi_thread_support: true,
      price: 349,
      socket: 'LGA1200',
      tdp: 65,
      threads: 16
    },
    {
      cpu_id: '18',
      architecture: 'Zen 2',
      base_clock: 3.6,
      boost_clock: 4.2,
      brand: 'AMD',
      cores: 4,
      generation: 'Ryzen 3000',
      integrated_graphics: false,
      max_memory_bandwith: 47.68,
      max_temperature: 95,
      model: 'Ryzen 3 3300X',
      multi_thread_support: true,
      price: 120,
      socket: 'AM4',
      tdp: 65,
      threads: 8
    },
    {
      cpu_id: '19',
      architecture: 'Comet Lake',
      base_clock: 2.8,
      boost_clock: 4.3,
      brand: 'Intel',
      cores: 4,
      generation: '10th Gen',
      integrated_graphics: true,
      max_memory_bandwith: 41.6,
      max_temperature: 100,
      model: 'Core i3-10100',
      multi_thread_support: true,
      price: 122,
      socket: 'LGA1200',
      tdp: 65,
      threads: 8
    },
    {
      cpu_id: '20',
      architecture: 'Zen 2',
      base_clock: 3.4,
      boost_clock: 4.0,
      brand: 'AMD',
      cores: 6,
      generation: 'Ryzen 3000',
      integrated_graphics: false,
      max_memory_bandwith: 47.68,
      max_temperature: 95,
      model: 'Ryzen 5 3400G',
      multi_thread_support: true,
      price: 149,
      socket: 'AM4',
      tdp: 65,
      threads: 12
    },
    {
      cpu_id: '21',
      architecture: 'Zen 3',
      base_clock: 3.5,
      boost_clock: 4.6,
      brand: 'AMD',
      cores: 6,
      generation: 'Ryzen 5000',
      integrated_graphics: true,
      max_memory_bandwith: 51.2,
      max_temperature: 95,
      model: 'Ryzen 5 5600GE',
      multi_thread_support: true,
      price: 299,
      socket: 'AM4',
      tdp: 35,
      threads: 12
    },
    {
      cpu_id: '22',
      architecture: 'Rocket Lake',
      base_clock: 3.4,
      boost_clock: 4.6,
      brand: 'Intel',
      cores: 4,
      generation: '11th Gen',
      integrated_graphics: false,
      max_memory_bandwith: 51.2,
      max_temperature: 100,
      model: 'Core i5-11400F',
      multi_thread_support: true,
      price: 157,
      socket: 'LGA1200',
      tdp: 65,
      threads: 8
    },
    {
      cpu_id: '23',
      architecture: 'Comet Lake',
      base_clock: 3.3,
      boost_clock: 4.6,
      brand: 'Intel',
      cores: 4,
      generation: '10th Gen',
      integrated_graphics: true,
      max_memory_bandwith: 41.6,
      max_temperature: 100,
      model: 'Core i5-10400',
      multi_thread_support: true,
      price: 157,
      socket: 'LGA1200',
      tdp: 65,
      threads: 8
    },
    {
      cpu_id: '24',
      architecture: 'Zen 3',
      base_clock: 3.8,
      boost_clock: 4.9,
      brand: 'AMD',
      cores: 8,
      generation: 'Ryzen 5000',
      integrated_graphics: false,
      max_memory_bandwith: 51.2,
      max_temperature: 95,
      model: 'Ryzen 7 5700G',
      multi_thread_support: true,
      price: 359,
      socket: 'AM4',
      tdp: 65,
      threads: 16
    },
    {
      cpu_id: '25',
      architecture: 'Zen 3',
      base_clock: 3.6,
      boost_clock: 4.4,
      brand: 'AMD',
      cores: 4,
      generation: 'Ryzen 5000',
      integrated_graphics: false,
      max_memory_bandwith: 51.2,
      max_temperature: 95,
      model: 'Ryzen 3 5300G',
      multi_thread_support: true,
      price: 199,
      socket: 'AM4',
      tdp: 65,
      threads: 8
    },
    {
      cpu_id: '26',
      architecture: 'Comet Lake',
      base_clock: 3.7,
      boost_clock: 4.8,
      brand: 'Intel',
      cores: 6,
      generation: '10th Gen',
      integrated_graphics: true,
      max_memory_bandwith: 41.6,
      max_temperature: 100,
      model: 'Core i5-10600',
      multi_thread_support: true,
      price: 262,
      socket: 'LGA1200',
      tdp: 65,
      threads: 12
    },
    {
      cpu_id: '27',
      architecture: 'Rocket Lake',
      base_clock: 3.6,
      boost_clock: 5.0,
      brand: 'Intel',
      cores: 8,
      generation: '11th Gen',
      integrated_graphics: true,
      max_memory_bandwith: 51.2,
      max_temperature: 100,
      model: 'Core i7-11700T',
      multi_thread_support: true,
      price: 334,
      socket: 'LGA1200',
      tdp: 35,
      threads: 16
    },
    {
      cpu_id: '28',
      architecture: 'Zen 2',
      base_clock: 3.4,
      boost_clock: 4.2,
      brand: 'AMD',
      cores: 6,
      generation: 'Ryzen 3000',
      integrated_graphics: false,
      max_memory_bandwith: 47.68,
      max_temperature: 95,
      model: 'Ryzen 5 3400GE',
      multi_thread_support: true,
      price: 149,
      socket: 'AM4',
      tdp: 35,
      threads: 12
    },
    {
      cpu_id: '29',
      architecture: 'Comet Lake',
      base_clock: 3.0,
      boost_clock: 4.3,
      brand: 'Intel',
      cores: 6,
      generation: '10th Gen',
      integrated_graphics: false,
      max_memory_bandwith: 41.6,
      max_temperature: 100,
      model: 'Core i5-10400F',
      multi_thread_support: true,
      price: 157,
      socket: 'LGA1200',
      tdp: 65,
      threads: 12
    },
    {
      cpu_id: '30',
      architecture: 'Zen 3',
      base_clock: 3.4,
      boost_clock: 4.6,
      brand: 'AMD',
      cores: 6,
      generation: 'Ryzen 5000',
      integrated_graphics: false,
      max_memory_bandwith: 51.2,
      max_temperature: 95,
      model: 'Ryzen 5 5600HS',
      multi_thread_support: true,
      price: 279,
      socket: 'AM4',
      tdp: 35,
      threads: 12
    },
    {
      cpu_id: '31',
      architecture: 'Zen 3',
      base_clock: 3.6,
      boost_clock: 4.5,
      brand: 'AMD',
      cores: 8,
      generation: 'Ryzen 5000',
      integrated_graphics: false,
      max_memory_bandwith: 51.2,
      max_temperature: 95,
      model: 'Ryzen 7 5800HS',
      multi_thread_support: true,
      price: 399,
      socket: 'AM4',
      tdp: 35,
      threads: 16
    },
    {
      cpu_id: '32',
      architecture: 'Zen 2',
      base_clock: 3.8,
      boost_clock: 4.4,
      brand: 'AMD',
      cores: 8,
      generation: 'Ryzen 3000',
      integrated_graphics: false,
      max_memory_bandwith: 47.68,
      max_temperature: 95,
      model: 'Ryzen 7 3800XT',
      multi_thread_support: true,
      price: 399,
      socket: 'AM4',
      tdp: 105,
      threads: 16
    },
    {
      cpu_id: '33',
      architecture: 'Rocket Lake',
      base_clock: 3.2,
      boost_clock: 4.4,
      brand: 'Intel',
      cores: 6,
      generation: '11th Gen',
      integrated_graphics: true,
      max_memory_bandwith: 51.2,
      max_temperature: 100,
      model: 'Core i5-11500',
      multi_thread_support: true,
      price: 189,
      socket: 'LGA1200',
      tdp: 65,
      threads: 12
    },
    {
      cpu_id: '34',
      architecture: 'Zen 3',
      base_clock: 3.8,
      boost_clock: 4.5,
      brand: 'AMD',
      cores: 8,
      generation: 'Ryzen 5000',
      integrated_graphics: true,
      max_memory_bandwith: 51.2,
      max_temperature: 95,
      model: 'Ryzen 7 5700U',
      multi_thread_support: true,
      price: 349,
      socket: 'AM4',
      tdp: 15,
      threads: 16
    },
    {
      cpu_id: '35',
      architecture: 'Comet Lake',
      base_clock: 2.9,
      boost_clock: 4.6,
      brand: 'Intel',
      cores: 4,
      generation: '10th Gen',
      integrated_graphics: true,
      max_memory_bandwith: 41.6,
      max_temperature: 100,
      model: 'Core i3-10300',
      multi_thread_support: true,
      price: 122,
      socket: 'LGA1200',
      tdp: 65,
      threads: 8
    },
    {
      cpu_id: '36',
      architecture: 'Zen 3',
      base_clock: 3.9,
      boost_clock: 4.8,
      brand: 'AMD',
      cores: 8,
      generation: 'Ryzen 5000',
      integrated_graphics: false,
      max_memory_bandwith: 51.2,
      max_temperature: 95,
      model: 'Ryzen 7 5800X3D',
      multi_thread_support: true,
      price: 449,
      socket: 'AM4',
      tdp: 105,
      threads: 16
    },
    {
      cpu_id: '37',
      architecture: 'Rocket Lake',
      base_clock: 3.3,
      boost_clock: 4.5,
      brand: 'Intel',
      cores: 6,
      generation: '11th Gen',
      integrated_graphics: true,
      max_memory_bandwith: 51.2,
      max_temperature: 100,
      model: 'Core i5-11400',
      multi_thread_support: true,
      price: 179,
      socket: 'LGA1200',
      tdp: 65,
      threads: 12
    },
    {
      cpu_id: '38',
      architecture: 'Comet Lake',
      base_clock: 3.8,
      boost_clock: 4.5,
      brand: 'Intel',
      cores: 4,
      generation: '10th Gen',
      integrated_graphics: false,
      max_memory_bandwith: 41.6,
      max_temperature: 100,
      model: 'Core i3-10320',
      multi_thread_support: true,
      price: 139,
      socket: 'LGA1200',
      tdp: 65,
      threads: 8
    },
    {
      cpu_id: '39',
      architecture: 'Zen 3',
      base_clock: 3.5,
      boost_clock: 4.6,
      brand: 'AMD',
      cores: 6,
      generation: 'Ryzen 5000',
      integrated_graphics: false,
      max_memory_bandwith: 51.2,
      max_temperature: 95,
      model: 'Ryzen 5 5600G',
      multi_thread_support: true,
      price: 259,
      socket: 'AM4',
      tdp: 65,
      threads: 12
    },
    {
      cpu_id: '40',
      architecture: 'Comet Lake',
      base_clock: 3.5,
      boost_clock: 4.6,
      brand: 'Intel',
      cores: 8,
      generation: '10th Gen',
      integrated_graphics: false,
      max_memory_bandwith: 41.6,
      max_temperature: 100,
      model: 'Core i7-10700F',
      multi_thread_support: true,
      price: 349,
      socket: 'LGA1200',
      tdp: 65,
      threads: 16
    },
    {
      cpu_id: '41',
      architecture: 'Zen 4',
      base_clock: 4.5,
      boost_clock: 5.0,
      brand: 'AMD',
      cores: 16,
      generation: 'Ryzen 7000',
      integrated_graphics: false,
      max_memory_bandwith: 60.0,
      max_temperature: 95,
      model: 'Ryzen 9 7900X',
      multi_thread_support: true,
      price: 549,
      socket: 'AM5',
      tdp: 105,
      threads: 32
    },
    {
      cpu_id: '42',
      architecture: 'Alder Lake',
      base_clock: 2.5,
      boost_clock: 5.0,
      brand: 'Intel',
      cores: 14,
      generation: '12th Gen',
      integrated_graphics: false,
      max_memory_bandwith: 76.0,
      max_temperature: 100,
      model: 'Core i9-12900K',
      multi_thread_support: true,
      price: 589,
      socket: 'LGA1700',
      tdp: 125,
      threads: 20
    },
    {
      cpu_id: '43',
      architecture: 'Zen 4',
      base_clock: 4.0,
      boost_clock: 5.0,
      brand: 'AMD',
      cores: 8,
      generation: 'Ryzen 7000',
      integrated_graphics: false,
      max_memory_bandwith: 60.0,
      max_temperature: 95,
      model: 'Ryzen 7 7700X',
      multi_thread_support: true,
      price: 449,
      socket: 'AM5',
      tdp: 105,
      threads: 16
    },
    {
      cpu_id: '44',
      architecture: 'Alder Lake',
      base_clock: 3.2,
      boost_clock: 5.0,
      brand: 'Intel',
      cores: 10,
      generation: '12th Gen',
      integrated_graphics: false,
      max_memory_bandwith: 76.0,
      max_temperature: 100,
      model: 'Core i7-12700K',
      multi_thread_support: true,
      price: 439,
      socket: 'LGA1700',
      tdp: 125,
      threads: 20
    },
    {
      cpu_id: '45',
      architecture: 'Zen 4',
      base_clock: 4.2,
      boost_clock: 5.0,
      brand: 'AMD',
      cores: 12,
      generation: 'Ryzen 7000',
      integrated_graphics: false,
      max_memory_bandwith: 60.0,
      max_temperature: 95,
      model: 'Ryzen 9 7900XT',
      multi_thread_support: true,
      price: 699,
      socket: 'AM5',
      tdp: 125,
      threads: 24
    },
    {
      cpu_id: '46',
      architecture: 'Alder Lake',
      base_clock: 3.8,
      boost_clock: 5.0,
      brand: 'Intel',
      cores: 6,
      generation: '12th Gen',
      integrated_graphics: false,
      max_memory_bandwith: 76.0,
      max_temperature: 100,
      model: 'Core i5-12600K',
      multi_thread_support: true,
      price: 299,
      socket: 'LGA1700',
      tdp: 125,
      threads: 12
    },
    {
      cpu_id: '47',
      architecture: 'Zen 4',
      base_clock: 4.3,
      boost_clock: 5.0,
      brand: 'AMD',
      cores: 16,
      generation: 'Ryzen 7000',
      integrated_graphics: false,
      max_memory_bandwith: 60.0,
      max_temperature: 95,
      model: 'Ryzen 9 7950X',
      multi_thread_support: true,
      price: 799,
      socket: 'AM5',
      tdp: 170,
      threads: 32
    },
    {
      cpu_id: '48',
      architecture: 'Alder Lake',
      base_clock: 2.7,
      boost_clock: 5.0,
      brand: 'Intel',
      cores: 12,
      generation: '12th Gen',
      integrated_graphics: false,
      max_memory_bandwith: 76.0,
      max_temperature: 100,
      model: 'Core i7-12650H',
      multi_thread_support: true,
      price: 389,
      socket: 'LGA1700',
      tdp: 45,
      threads: 16
    },
    {
      cpu_id: '49',
      architecture: 'Zen 4',
      base_clock: 4.5,
      boost_clock: 5.0,
      brand: 'AMD',
      cores: 8,
      generation: 'Ryzen 7000',
      integrated_graphics: false,
      max_memory_bandwith: 60.0,
      max_temperature: 95,
      model: 'Ryzen 7 7800X',
      multi_thread_support: true,
      price: 449,
      socket: 'AM5',
      tdp: 105,
      threads: 16
    },
    {
      cpu_id: '50',
      architecture: 'Alder Lake',
      base_clock: 3.0,
      boost_clock: 5.0,
      brand: 'Intel',
      cores: 8,
      generation: '12th Gen',
      integrated_graphics: true,
      max_memory_bandwith: 76.0,
      max_temperature: 100,
      model: 'Core i5-12400',
      multi_thread_support: true,
      price: 192,
      socket: 'LGA1700',
      tdp: 65,
      threads: 12
    }
  ];



  async function addCPUs() {
    const batch = db.batch();
  
    cpu_id.forEach((CPU) => {
      const docRef = db.collection('CPU').doc(CPU.cpu_id.toString());
      batch.set(docRef, CPU);
    });
  
    await batch.commit();
    console.log('CPU added successfully!');
  }
  
  addCPUs().catch(console.error);