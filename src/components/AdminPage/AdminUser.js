import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { onAuthStateChanged } from "firebase/auth";
import { getIdTokenResult } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../backend/Firebase/firebase";

const AdminUser = () => {

    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
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

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('http://localhost:5000/admin-users');
            const data = await response.json();
            setUsers(data.users);
        };
        fetchUsers();
    }, []);

    // Function to handle deleting a user
    const handleDelete = async (uid) => {
        try {
            // Send a request to your backend to delete the user
            const response = await fetch('http://localhost:5000/delete-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({uid}),
            });
            if (response.ok) {
                // Remove the user from the local state after successful deletion
                setUsers(users.filter(user => user.uid !== uid));
                console.log(`User with UID: ${uid} deleted`);
            } else {
                console.error('Error deleting user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <Sidebar />
            <h1>All Users</h1>
            <div>
                <button>Add User</button>
                <table>
                    <thead>
                        <tr>
                            <th>UID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Last Connected</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.uid}>
                                <td>{user.uid}</td>
                                <td>{user.displayName}</td>
                                <td>{user.email}</td>
                                <td>{user.createdAt}</td>
                                <td>{user.lastLoginAt}</td>
                                <td>
                                    <button onClick={() => handleDelete(user.uid)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminUser;
