import {
    doCreateUserWithEmailAndPassword,
    doUpdateDisplayName,
    doSignInWithEmailAndPassword,
    doSignOut,
} from 'backend/Firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../../backend/Firebase/firebase";

function AddAdmin() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [isRegistering, setIsRegistering] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate inputs
        if (!username || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }
    
        const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must have at least 8 characters, including one number and one special character.');
            return;
        }
    
        try {
            if(!isRegistering){
                setIsRegistering(true);
                // Save the current user's credentials
                const currentUser = auth.currentUser;
                const currentEmail = currentUser.email;
                const currentPassword = prompt("Please re-enter your password for security:");
    
                if (!currentPassword) {
                    alert("Password is required to confirm your identity.");
                    return;
                }
    
                // Create the new admin user
                const userData = await doCreateUserWithEmailAndPassword(email, password);
                const newUser = userData.user;
    
                // Set display name for the new admin
                await doUpdateDisplayName(newUser, username);
                
    
                // Save new admin data to Firestore
                const response = await fetch('http://localhost:5000/admin-register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ uid: newUser.uid }),
                });
    
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message);
                }
    
                console.log("Admin created successfully:", newUser.displayName);
    
                // Sign out the newly created user
                
                await doSignOut();
                // Re-authenticate the original user
                await doSignInWithEmailAndPassword(currentEmail, currentPassword);
    
                console.log("Re-authenticated as original user.");
    
                // Wait for the re-authentication to finish before navigating
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        console.log("User is authenticated. Redirecting...");
                        navigate('/admin');
                    } else {
                        console.error("Re-authentication failed.");
                    }
                });
            }
        } catch (error) {
            console.error('Error creating admin:', error);
            setErrorMessage(error.message || 'An error occurred.');
        }
        setIsRegistering(false);
    };
    

    return (
        <div className="sign-up-form">
            <h1>Add Admin</h1>
            <form onSubmit={handleSubmit} noValidate className="container">
                <div className="inputbox">
                    <label className="label" htmlFor="Username">Username:</label>
                    <input
                        type="text"
                        id="Username"
                        className="Input"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="inputbox">
                    <label className="label" htmlFor="Email">Email:</label>
                    <input
                        type="email"
                        id="Email"
                        className="Input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="passwordbox">
                    <label className="label" htmlFor="Password">Password:</label>
                    <input
                        type="password"
                        id="Password"
                        className="Input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        pattern="(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                        title="Password must have at least 8 characters, including one number and one special character."
                    />
                    <small className="small-text">Password must have 8 characters including one number and one special character</small>
                </div>
                <div className="inputbox">
                    <button disabled={isRegistering} className="btn" id="signup" type="submit">{isRegistering ? 'Adding User...' : 'Add User'}</button>
                </div>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}

export default AddAdmin;
