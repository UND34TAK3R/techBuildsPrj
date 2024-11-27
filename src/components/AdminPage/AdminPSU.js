import React, { useEffect, useState } from "react";
import { db } from "../../backend/Firebase/firebase"; // Adjust the path based on your Firebase config
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getIdTokenResult } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {auth} from "../../backend/Firebase/firebase";

const AdminPSU = () => {
  const [psuDevices, setPsuDevices] = useState([]);
  const [error, setError] = useState("");
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
    const fetchPsuDevices = async () => {
      const querySnapshot = await getDocs(collection(db, "PSU")); // Your Firestore collection name for PSUs
      const devices = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPsuDevices(devices);
    };

    fetchPsuDevices();
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
      <h1>All PSU</h1>
      <div><button onClick={handleAdd}>Add Power Supply Unit</button></div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Brand</th>
            <th scope="col">Model</th>
            <th scope="col">Form Factor</th>
            <th scope="col">Efficiency Rating</th>
            <th scope="col">Wattage</th>
            <th scope="col">Modularity</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {psuDevices.map((device) => (
            <tr key={device.id}>
              <td>{device.brand}</td>
              <td>{device.model}</td>
              <td>{device.form_factor}</td>
              <td>{device.efficiency_rating}</td>
              <td>{device.wattage}</td>
              <td>{device.modularity}</td>
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
};

export default AdminPSU;
