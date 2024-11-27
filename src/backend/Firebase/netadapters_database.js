import admin from 'firebase-admin';
import fs from 'fs';

// Read the service account key file synchronously
const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

  const na_id = [
    { na_id: 1, adapter_type: "USB", bluetooth_support: true, brand: "TP-Link", frequency_band: "2.4 GHz", interface: "USB 3.0", latency: 5, max_range: 100, model: "TL-WN823N", price: 29.99, speed: 300, wireless_standard: "802.11n" },
    { na_id: 2, adapter_type: "PCIe", bluetooth_support: true, brand: "ASUS", frequency_band: "2.4 GHz and 5 GHz", interface: "PCIe", latency: 3, max_range: 150, model: "PCE-AC56", price: 49.99, speed: 1200, wireless_standard: "802.11ac" },
    { na_id: 3, adapter_type: "USB", bluetooth_support: false, brand: "Netgear", frequency_band: "2.4 GHz", interface: "USB 2.0", latency: 7, max_range: 50, model: "A6100", price: 24.99, speed: 150, wireless_standard: "802.11n" },
    { na_id: 4, adapter_type: "PCIe", bluetooth_support: true, brand: "Gigabyte", frequency_band: "2.4 GHz and 5 GHz", interface: "PCIe", latency: 4, max_range: 200, model: "GC-WBAX200", price: 59.99, speed: 2400, wireless_standard: "802.11ax" },
    { na_id: 5, adapter_type: "USB", bluetooth_support: true, brand: "Linksys", frequency_band: "2.4 GHz and 5 GHz", interface: "USB 3.0", latency: 6, max_range: 120, model: "WUSB6100M", price: 39.99, speed: 1000, wireless_standard: "802.11ac" },
    { na_id: 6, adapter_type: "PCIe", bluetooth_support: false, brand: "EDIMAX", frequency_band: "2.4 GHz", interface: "PCIe", latency: 5, max_range: 100, model: "EW-7822PIC", price: 34.99, speed: 300, wireless_standard: "802.11n" },
    { na_id: 7, adapter_type: "USB", bluetooth_support: true, brand: "D-Link", frequency_band: "2.4 GHz and 5 GHz", interface: "USB 3.0", latency: 6, max_range: 150, model: "DWA-192", price: 49.99, speed: 600, wireless_standard: "802.11ac" },
    { na_id: 8, adapter_type: "PCIe", bluetooth_support: true, brand: "TP-Link", frequency_band: "2.4 GHz and 5 GHz", interface: "PCIe", latency: 3, max_range: 180, model: "Archer TX3000E", price: 79.99, speed: 2400, wireless_standard: "802.11ax" },
    { na_id: 9, adapter_type: "USB", bluetooth_support: false, brand: "Zyxel", frequency_band: "2.4 GHz", interface: "USB 2.0", latency: 8, max_range: 70, model: "NWD6605", price: 19.99, speed: 150, wireless_standard: "802.11n" },
    { na_id: 10, adapter_type: "PCIe", bluetooth_support: false, brand: "Edimax", frequency_band: "5 GHz", interface: "PCIe", latency: 4, max_range: 120, model: "EW-7833UAC", price: 49.99, speed: 1200, wireless_standard: "802.11ac" },
    { na_id: 11, adapter_type: "USB", bluetooth_support: true, brand: "Tenda", frequency_band: "2.4 GHz and 5 GHz", interface: "USB 3.0", latency: 5, max_range: 130, model: "U3", price: 25.99, speed: 600, wireless_standard: "802.11ac" },
    { na_id: 12, adapter_type: "PCIe", bluetooth_support: true, brand: "MSI", frequency_band: "2.4 GHz and 5 GHz", interface: "PCIe", latency: 3, max_range: 250, model: "Wi-Fi 6 AX200", price: 69.99, speed: 2400, wireless_standard: "802.11ax" },
    { na_id: 13, adapter_type: "USB", bluetooth_support: false, brand: "Huawei", frequency_band: "2.4 GHz", interface: "USB 2.0", latency: 7, max_range: 40, model: "E3372H", price: 39.99, speed: 150, wireless_standard: "802.11n" },
    { na_id: 14, adapter_type: "PCIe", bluetooth_support: true, brand: "Intel", frequency_band: "2.4 GHz and 5 GHz", interface: "PCIe", latency: 3, max_range: 220, model: "AX200", price: 59.99, speed: 2400, wireless_standard: "802.11ax" },
    { na_id: 15, adapter_type: "USB", bluetooth_support: true, brand: "TP-Link", frequency_band: "2.4 GHz", interface: "USB 2.0", latency: 6, max_range: 100, model: "TL-WN725N", price: 19.99, speed: 150, wireless_standard: "802.11n" },
    { na_id: 16, adapter_type: "PCIe", bluetooth_support: false, brand: "Netgear", frequency_band: "2.4 GHz and 5 GHz", interface: "PCIe", latency: 5, max_range: 150, model: "A6210", price: 49.99, speed: 1200, wireless_standard: "802.11ac" },
    { na_id: 17, adapter_type: "USB", bluetooth_support: true, brand: "Edimax", frequency_band: "2.4 GHz and 5 GHz", interface: "USB 3.0", latency: 4, max_range: 120, model: "EW-7822UTC", price: 39.99, speed: 600, wireless_standard: "802.11ac" },
    { na_id: 18, adapter_type: "PCIe", bluetooth_support: false, brand: "D-Link", frequency_band: "5 GHz", interface: "PCIe", latency: 5, max_range: 160, model: "DWA-582", price: 54.99, speed: 1200, wireless_standard: "802.11ac" },
    { na_id: 19, adapter_type: "USB", bluetooth_support: true, brand: "Linksys", frequency_band: "2.4 GHz", interface: "USB 2.0", latency: 6, max_range: 90, model: "WUSB54G", price: 29.99, speed: 54, wireless_standard: "802.11g" },
    { na_id: 20, adapter_type: "PCIe", bluetooth_support: true, brand: "ASUS", frequency_band: "2.4 GHz and 5 GHz", interface: "PCIe", latency: 4, max_range: 300, model: "PCE-AC68", price: 49.99, speed: 1900, wireless_standard: "802.11ac" },
  ];



  async function addNetAdapters() {
    const batch = db.batch();
  
    na_id.forEach((NA) => {
      const docRef = db.collection('NetAdapter').doc(NA.na_id.toString());
      batch.set(docRef, NA);
    });
  
    await batch.commit();
    console.log('Network Adapters added successfully!');
  }
  
  addNetAdapters().catch(console.error);