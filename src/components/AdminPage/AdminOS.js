import React, { useEffect, useState } from "react";
import { db } from "../../backend/Firebase/firebase"; // Adjust the path based on your Firebase config
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import UpdateAddOS from "./UpdateAddForms/UpdateAddOS";
import { onAuthStateChanged } from "firebase/auth";
import { getIdTokenResult } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {auth} from "../../backend/Firebase/firebase";


const AdminOS = () => {
    const [osDevices, setOS] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const checkAdminStatus = () => {
          const unsubscribe = onAuthStateChanged(auth, async (user) => {
              if (user) {
                  try {
                      const idTokenResult = await getIdTokenResult(user);
                      if (idTokenResult.claims.admin) {
                          console.log('User is an admin');
                      } else {
                          console.log('User is not an admin');
                          setError('You do not have admin privileges.');
                          navigate("/login"); // Redirect to login if not an admin
                      }
                  } catch (error) {
                      console.error('Error fetching token:', error);
                      setError('Error fetching admin claim.');
                      navigate("/login"); // Redirect to login in case of error
                  }
              } else {
                  console.log('No user logged in');
                  navigate("/login"); // Redirect to login if no user is logged in
              }
          });

          return () => unsubscribe(); // Clean up the listener on component unmount
      };

      checkAdminStatus();
  }, []);


    // Fetch PSU devices data from Firestore
    useEffect(() => {
      const fetchOS = async () => {
        const querySnapshot = await getDocs(collection(db, "OperatingSystem")); // Your Firestore collection name for PSUs
        const devices = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOS(devices);
      };
  
      fetchOS();
    }, []);
  
    const handleEdit = (id) => {
      const itemToEdit = osDevices.find((device) => device.id === id);
      setSelectedDevice(itemToEdit);
      setShowForm(true);
    };
  
    const handleDelete = (id) => {
      try {
        if (!window.confirm("Are you sure you want to delete this device?")) {
          return;
        }
        else{
          deleteDoc(doc(db, "OperatingSystem", id)); // Delete from Firestore
          console.log("Deleted device with ID:", id);
          setOS(osDevices.filter((device) => device.id !== id));}
         // Update state to remove the device from UI
      } catch (error) {
        console.error("Error deleting document:", error);
      }
    };
  
    const handleAdd = () => {
      setSelectedDevice(null);
      setShowForm(true);
    };

    const handleFormSubmit = (newData) => {
        if(selectedDevice){
          setOS(
            osDevices.map((device) => 
              device.id === selectedDevice.id ? {...device, ...newData} : device
            )
          );
        }else{
          setOS([...osDevices, newData]);
        }
        setShowForm(false);
        setSelectedDevice(null);
      };
    return (
      <div>
        {showForm ? (
          <UpdateAddOS
            device={selectedDevice}
            onSubmit={handleFormSubmit}
            onClose={() => setShowForm(false)}
          />
        ) : (
          <div>
            <h1>All Operating Systems</h1>
            <div><button onClick={handleAdd}>Add Power Supply Unit</button></div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Architecture</th>
                  <th scope="col">Version</th>
                  <th scope="col">Price</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {osDevices.map((device) => (
                  <tr key={device.id}>
                    <td>{device.name}</td>
                    <td>{device.architecture}</td>
                    <td>{device.version}</td>
                    <td>{device.price}</td>
                    <td>
                      <button onClick={() => handleEdit(device.id)}>Edit</button>
                      <button onClick={() => handleDelete(device.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
        )}
    </div>
  );
}

export default AdminOS