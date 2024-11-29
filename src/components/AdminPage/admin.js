import Sidebar from "./sidebar";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../backend/Firebase/firebase";
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../backend/Firebase/firebase";
import AddAdmin from "./UpdateAddForms/AddAdmin";
import 'bootstrap/dist/css/bootstrap.min.css';

function Admin() {
    const navigate = useNavigate();
    const [admins, setAdmins] = useState([]);
    const [error, setError] = useState("");
    const [buildCount, setBuildCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);  // Track if user is being checked

    const handleAdd = () => {
        setShowForm(true);
    };

    useEffect(() => {
        const fetchAdminData = async () => {
            const response = await fetch('http://localhost:5000/admin');
            const data = await response.json();
            setAdmins(data.users);

            try {
                const querySnapshot = await getDocs(collection(db, 'Build'));
                setBuildCount(querySnapshot.size || 0);
            } catch (error) {
                console.error('Error fetching build count:', error);
                setBuildCount(0);
            }

            const userResponse = await fetch('http://localhost:5000/userCount');
            const count = await userResponse.json();
            setUserCount(count.userCount || 0);
        };

        const checkAdminStatus = () => {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    try {
                        await user.getIdToken(true); 
                        const idTokenResult = await getIdTokenResult(user);

                        if (idTokenResult && idTokenResult.claims.admin) {
                            fetchAdminData();
                        } else {
                            setError('You do not have admin privileges.');
                            navigate("/");
                        }
                    } catch (error) {
                        setError('Error fetching admin claim.');
                        navigate("/");
                    }
                } else {
                    setError('No user logged in');
                }
                setLoading(false);
            });

            return () => unsubscribe();
        };

        checkAdminStatus();
    }, [navigate]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="container mt-4">
                <h1 className="text-center mb-4">Admin Dashboard</h1>
                {showForm ? (
                    <AddAdmin onClose={() => setShowForm(false)} />
                ) : (
                    <>
                        <div className="mb-4 d-flex justify-content-between align-items-center">
                            <h3>Admin Users</h3>
                            <button onClick={handleAdd} className="btn btn-success">
                                Add Admin
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered">
                                <thead className="table-dark">
                                    <tr>
                                        <th>UID</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Created At</th>
                                        <th>Last Login</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admins.map((admin) => (
                                        <tr key={admin.uid}>
                                            <td>{admin.uid}</td>
                                            <td>{admin.displayName || "N/A"}</td>
                                            <td>{admin.email}</td>
                                            <td>{admin.createdAt}</td>
                                            <td>{admin.lastLoginAt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-6 mb-4">
                                <div className="card text-center shadow">
                                    <div className="card-body">
                                        <h4 className="card-title">Total Active Builds</h4>
                                        <p className="card-text text-dark fs-3">{buildCount}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card text-center shadow">
                                    <div className="card-body">
                                        <h4 className="card-title">Total Users</h4>
                                        <p className="card-text text-dark fs-3">{userCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Admin;
