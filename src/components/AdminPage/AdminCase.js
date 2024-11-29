import React, { useEffect, useState } from "react";
import { db } from "../../backend/Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../backend/Firebase/firebase";
import Sidebar from "./sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminCase = () => {
  const [caseDevices, setCase] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Fetch cases from Firestore
  useEffect(() => {
    const fetchCase = async () => {
      const querySnapshot = await getDocs(collection(db, "Case"));
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
              console.log("User is an admin");
            } else {
              setError("You do not have admin privileges.");
              navigate("/login");
            }
          } catch (error) {
            console.error("Error fetching token:", error);
            setError("Error fetching admin claim.");
            navigate("/login");
          }
        } else {
          console.log("No user logged in");
          navigate("/login");
        }
      });

      return () => unsubscribe();
    };

    checkAdminStatus();
  }, [navigate]);

  const handleEdit = (id) => {
    console.log("Edit", id);
    // Add edit logic here
  };

  const handleDelete = (id) => {
    console.log("Delete", id);
    // Add delete logic here
  };

  const handleAdd = () => {
    console.log("Add");
    // Add new case logic here
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-4">
        <h1 className="text-center mb-4">All Cases</h1>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-primary" onClick={handleAdd}>
            Add Case
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
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
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(device.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(device.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCase;
