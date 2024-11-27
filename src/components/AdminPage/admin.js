import Sidebar from "./sidebar";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../backend/Firebase/firebase";
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../backend/Firebase/firebase";
import AddAdmin from "./UpdateAddForms/AddAdmin";


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
        // Fetch users and data counts only if the user is verified as admin
        const fetchAdminData = async () => {
            const response = await fetch('http://localhost:5000/admin');
            const data = await response.json();
            setAdmins(data.users);

            // Fetch Build count
            try {
                const querySnapshot = await getDocs(collection(db, 'Build'));
                setBuildCount(querySnapshot.size || 0);
            } catch (error) {
                console.error('Error fetching build count:', error);
                setBuildCount(0);
            }

            // Fetch User count
            const userResponse = await fetch('http://localhost:5000/userCount');
            const count = await userResponse.json();
            setUserCount(count.userCount || 0);
        };

        const checkAdminStatus = () => {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (user) {
                    try {
                        await user.getIdToken(true); // Force token refresh
                        const idTokenResult = await getIdTokenResult(user);

                        if (idTokenResult && idTokenResult.claims.admin) {
                            console.log('User is an admin');
                            fetchAdminData(); // Fetch data if admin
                        } else {
                            setError('You do not have admin privileges.');
                            setLoading(true);
                            
                            navigate("/");
                        }
                    } catch (error) {
                        setError('Error fetching admin claim.');
                        navigate("/");
                    }
                } else {
                    setError('No user logged in');
                }
                setLoading(false);  // Mark loading as false once check is complete
            });

            return () => unsubscribe();
        };

        checkAdminStatus();
    }, [navigate]);

    if (loading) {
        return <p>Loading...</p>;  // Show loading state until admin check is done
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            {showForm ? (
                <AddAdmin onClose={() => setShowForm(false)} />
            ) : (
                <>
                    <Sidebar />
                    <h1>Admin Dashboard</h1>
                    <div>
                        <h3>Admin Users</h3>
                        <div>
                            <button onClick={handleAdd}>Add User</button>
                            <table className="admin-table">
                                <thead>
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
                        <div>
                            <div>
                                <h3>Total Active Builds:</h3><span>{buildCount}</span>
                            </div>
                            <div>
                                <h3>Total Users:</h3><span>{userCount}</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Admin;
