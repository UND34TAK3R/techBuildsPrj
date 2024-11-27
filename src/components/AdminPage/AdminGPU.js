import React, { useEffect, useState } from "react";
import { db } from "../../backend/Firebase/firebase"; // Adjust the path based on your Firebase config
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getIdTokenResult } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {auth} from "../../backend/Firebase/firebase";

const AdminGPU = () => {
    const [gpuDevices, setGPU] = useState([]);
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
      const fetchGPU = async () => {
        const querySnapshot = await getDocs(collection(db, "GPU")); // Your Firestore collection name for PSUs
        const devices = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGPU(devices);
      };
  
      fetchGPU();
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
        <h1>All Graphics Cards</h1>
        <div><button onClick={handleAdd}>Add Graphics Card</button></div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Brand</th>
              <th scope="col">Model</th>
              <th scope="col">Chipset</th>
              <th scope="col">Core Clock</th>
              <th scope="col">Boost Clock</th>
              <th scope="col">Architecture</th>
              <th scope="col">Memory Type</th>
              <th scope="col">Memory Size</th>
              <th scope="col">Ray Tracing</th>
              <th scope="col">Length</th>
              <th scope="col">TDP</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {gpuDevices.map((device) => (
              <tr key={device.id}>
                <td>{device.brand}</td>
                <td>{device.model}</td>
                <td>{device.chipset}</td>
                <td>{device.core_clock}</td>
                <td>{device.boost_clock}</td>
                <td>{device.architecture}</td>
                <td>{device.memory_type}</td>
                <td>{device.memory_size}</td>
                <td>{device.ray_tracing ? "Yes" : "No"}</td>
                <td>{device.length}</td>
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

export default AdminGPU