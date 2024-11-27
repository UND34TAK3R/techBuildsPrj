import React, { useEffect, useState } from "react";
import { db } from "../../backend/Firebase/firebase"; // Adjust the path based on your Firebase config
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getIdTokenResult } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {auth} from "../../backend/Firebase/firebase";

const AdminCPU = () => {
    const [cpuDevices, setCPU] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch PSU devices data from Firestore
    useEffect(() => {

      const fetchCPU = async () => {
        const querySnapshot = await getDocs(collection(db, "CPU")); // Your Firestore collection name for PSUs
        const devices = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCPU(devices);
      };
  
      fetchCPU();
    }, []);

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
        <div>
        <h1>All CPUs</h1>
        <div><button onClick={handleAdd}>Add CPU</button></div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Brand</th>
              <th scope="col">Model</th>
              <th scope="col">Architecture</th>
              <th scope="col">Socket</th>
              <th scope="col">Generation</th>
              <th scope="col">Core Count</th>
              <th scope="col">Thread Count</th>
              <th scope="col">Base Clock</th>
              <th scope="col">Boost Clock</th>
              <th scope="col">Cache Size</th>
              <th scope="col">Max Temperature</th>
              <th scope="col">Max Memory Bandwidth</th>
              <th scope="col">Intergrated Graphics</th>
              <th scope="col">Multi Thread Support</th>
              <th scope="col">TDP</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cpuDevices.map((device) => (
              <tr key={device.id}>
                <td>{device.brand}</td>
                <td>{device.model}</td>
                <td>{device.architecture}</td>
                <td>{device.socket}</td>
                <td>{device.generation}</td>
                <td>{device.cores}</td>
                <td>{device.threads}</td>
                <td>{device.base_clock}</td>
                <td>{device.boost_clock}</td>
                <td>{device.cache}</td>
                <td>{device.max_temperature}</td>
                <td>{device.max_memory_bandwidth}</td>
                <td>{device.integrated_graphics ? "Yes" : "No"}</td>
                <td>{device.multi_thread_support ? "Yes" : "No"}</td>
                <td>{device.tdp}</td>
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

export default AdminCPU;