import admin from 'firebase-admin';
import fs from 'fs';

// Read the service account key file synchronously
const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

  const cooler_id = [
    {
      cooler_id: 1,
      cfm: 52 // Estimated based on typical performance
    },
    {
      cooler_id: 2,
      cfm: 82 // Noctua fans are known for high airflow
    },
    {
      cooler_id: 3,
      cfm: 70 // Typical for 120mm fans in liquid coolers
    },
    {
      cooler_id: 4,
      cfm: 85 // High-performance 140mm fans
    },
    {
      cooler_id: 5,
      cfm: 55 // Average for budget air coolers
    },
    {
      cooler_id: 6,
      cfm: 65 // Quiet operation with decent airflow
    },
    {
      cooler_id: 7,
      cfm: 50 // Average for mid-range air coolers
    },
    {
      cooler_id: 8,
      cfm: 120 // High CFM typical for larger radiators
    },
    {
      cooler_id: 9,
      cfm: 75 // Efficient airflow for 140mm fans
    },
    {
      cooler_id: 10,
      cfm: 60 // Average airflow for larger coolers
    },
    {
      cooler_id: 11,
      cfm: 70 // Typical for 120mm liquid coolers
    },
    {
      cooler_id: 12,
      cfm: 120 // High-performance 240mm fans
    },
    {
      cooler_id: 13,
      cfm: 75 // Typical for Arctic 120mm fans
    },
    {
      cooler_id: 14,
      cfm: 55 // Average for budget air coolers
    },
    {
      cooler_id: 15,
      cfm: 140 // High airflow for 280mm fans
    },
    {
      cooler_id: 16,
      cfm: 50 // Basic airflow for lower-end coolers
    },
    {
      cooler_id: 17,
      cfm: 70 // Dual fan configuration improves airflow
    },
    {
      cooler_id: 18,
      cfm: 150 // High CFM for 280mm liquid cooler
    },
    {
      cooler_id: 19,
      cfm: 70 // Good airflow for dual fan setup
    },
    {
      cooler_id: 20,
      cfm: 60 // Average airflow for air coolers
    },
    {
      cooler_id: 21,
      cfm: 50 // Low profile with decent airflow
    },
    {
      cooler_id: 22,
      cfm: 180 // High CFM typical for large radiators
    },
    {
      cooler_id: 23,
      cfm: 60 // Average for single 120mm liquid cooler
    },
    {
      cooler_id: 24,
      cfm: 50 // Good efficiency for low-profile cooler
    },
    {
      cooler_id: 25,
      cfm: 200 // Very high CFM for large radiators
    },
    {
      cooler_id: 26,
      cfm: 45 // Budget cooler with average airflow
    },
    {
      cooler_id: 27,
      cfm: 75 // Typical for a 140mm liquid cooler
    },
    {
      cooler_id: 28,
      cfm: 40 // Low-profile cooler with modest airflow
    },
    {
      cooler_id: 29,
      cfm: 50 // Average for budget air cooler
    },
    {
      cooler_id: 30,
      cfm: 75 // Good airflow for dual fans
    }
  ];



  async function updateCoolers() {
    const batch = db.batch();

    cooler_id.forEach((Cooler) => {
        const docRef = db.collection('Cooler').doc(Cooler.cooler_id.toString());
        batch.update(docRef, {
            cfm: Cooler.cfm
        });
    });

    await batch.commit();
    console.log('Cooler documents updated successfully!');
}

updateCoolers().catch(console.error);
