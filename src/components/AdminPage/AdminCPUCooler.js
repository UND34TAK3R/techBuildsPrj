import React, { useEffect, useState } from "react";
import { db } from "../../backend/Firebase/firebase"; // Adjust the path based on your Firebase config
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getIdTokenResult } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {auth} from "../../backend/Firebase/firebase";
import Sidebar from "./sidebar";

const AdminCooler = () => {
    const [coolerDevices, setCooler] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

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
      const fetchCooler = async () => {
        const querySnapshot = await getDocs(collection(db, "Cooler")); // Your Firestore collection name for PSUs
        const devices = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCooler(devices);
      };
  
      fetchCooler();
    }, []);
  
    const handleEdit = (id) => {
      console.log("Edit", id);
      // Add your edit logic here (e.g., open an edit form, navigate to edit page, etc.)
    };
  
    const handleDelete = (id) => {
      console.log("Delete", id);
      // Add your delete logic here (e.g., delete from Firestore)
    };
  
    const handleAdd = () => {
      console.log("Add");
    };
    return (
      <div className="d-flex">
            <Sidebar />
        <h1 className="text-center mb-4">All CPU Coolers</h1>
        <div><button onClick={handleAdd}>Add CPU Cooler</button></div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Brand</th>
              <th scope="col">Model</th>
              <th scope="col">CFM</th>
              <th scope="col">Fan Height</th>
              <th scope="col">Noise Level</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coolerDevices.map((device) => (
              <tr key={device.id}>
                <td>{device.brand}</td>
                <td>{device.model}</td>
                <td>{device.cfm}</td>
                <td>{device.fan_height}</td>
                <td>{device.max_noise}</td>
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
    );
}

export default AdminCooler;