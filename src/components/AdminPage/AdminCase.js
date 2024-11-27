import React, { useEffect, useState } from "react";
import { db } from "../../backend/Firebase/firebase"; // Adjust the path based on your Firebase config
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getIdTokenResult } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {auth} from "../../backend/Firebase/firebase";

const AdminCase = () => {
    const [caseDevices, setCase] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    // Fetch PSU devices data from Firestore
    useEffect(() => {
      const fetchCase = async () => {
        const querySnapshot = await getDocs(collection(db, "Case")); // Your Firestore collection name for PSUs
        const devices = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCase(devices);
      };
  
      fetchCase();
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
        <h1>All Cases</h1>
        <div><button onClick={handleAdd}>Add Case</button></div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Brand</th>
              <th scope="col">Model</th>
              <th scope="col">Type</th>
              <th scope="col">Color</th>
              <th scope="col">Dimensions</th>
              <th scope="col">Fan Count</th>
              <th scope="col">Form Factor</th>
              <th scope="col">Material</th>
              <th scope="col">Volume</th>
              <th scope="col">Max Cooler Height</th>
              <th scope="col">Max GPU Length</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {caseDevices.map((device) => (
              <tr key={device.id}>
                <td>{device.brand}</td>
                <td>{device.model}</td>
                <td>{device.type}</td>
                <td>{device.color}</td>
                <td>{device.dimensions}</td>
                <td>{device.fan_count}</td>
                <td>{device.form_factor}</td>
                <td>{device.material}</td>
                <td>{device.volume}</td>
                <td>{device.max_cooler_height}</td>
                <td>{device.max_gpu_length}</td>
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

export default AdminCase;