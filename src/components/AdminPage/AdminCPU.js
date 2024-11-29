import React, { useEffect, useState } from "react";
import { db } from "../../backend/Firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../backend/Firebase/firebase";
import Sidebar from "./sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminCPU = () => {
  const [cpuDevices, setCPU] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch CPUs from Firestore
  useEffect(() => {
    const fetchCPU = async () => {
      const querySnapshot = await getDocs(collection(db, "CPU"));
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
    // Add new CPU logic here
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container mt-4">
        <h1 className="text-center mb-4">All CPUs</h1>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="d-flex  mb-3">
          <button className="btn btn-primary" onClick={handleAdd}>
            Add CPU
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
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
                <th scope="col">Integrated Graphics</th>
                <th scope="col">Multi-Thread Support</th>
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

export default AdminCPU;
