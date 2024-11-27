import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import '../css/SignUpForm.css';
import { doCreateUserWithEmailAndPassword, doUpdateDisplayName} from 'backend/Firebase/auth';
import { useAuth } from '../backend/Context/authContext';

const SignUp = () => {
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate(); // Hook for navigation
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const { userLoggedIn } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        // Simple client-side validation
        if (!username || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // Additional validation checks (e.g., password rules)
        const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must have at least 8 characters, including one number and one special character.');
            return;
        }
        // Force refresh of ID token

        // If not already registering
        if (!isRegistering) {
            setIsRegistering(true);
            const userData = await doCreateUserWithEmailAndPassword(email, password);
            const user = userData.user;
            const uid = user.uid;   
            await doUpdateDisplayName(user, username);
            try {
                // Step 2: Add user to your Firestore collection or database
                const userData = { uid }; // Prepare your user data
                
                const response = await fetch('http://localhost:5000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                const result = await response.json();
                
                if (response.ok) {
                    console.log("User created and displayName set:", user.displayName);
                    if (rememberMe) {
                        localStorage.setItem('userData', JSON.stringify({ username, email, password }));
                    } else {
                        localStorage.removeItem('userData');
                    }

                    // Redirect to the main page after successful sign-up
                    navigate('/');
                } else {
                    alert(result.message); // Show error message
                }

            } catch (error) {
                console.error('Error during sign-up:', error);
                setErrorMessage(error.message || 'An error occurred during sign-up.');
            }

            setIsRegistering(false);
        }
    };

    return (
        <div>{userLoggedIn && (<Navigate to={"/"} replace={true} />)}
            <div className="sign-up-container">
                <div className="sign-up-form">
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit} noValidate className="container">
                        <div className="inputbox">
                            <label className="label" htmlFor="Username">Username: </label>
                            <input
                                type="text"
                                id="Username"
                                name="Username"
                                className="Input"
                                placeholder="Username"
                                value={username} onChange={(e) => { setUsername(e.target.value) }}
                                required
                            />
                        </div>
                        <div className="inputbox">
                            <label className="label" htmlFor="Email">Email: </label>
                            <input
                                type="email"
                                id="Email"
                                name="Email"
                                className="Input"
                                placeholder="Email"
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                required
                            />
                        </div>
                        <div className="passwordbox">
                            <label className="label" htmlFor="Password">Password: </label>
                            <input
                                type="password"
                                id="Password"
                                name="Password"
                                className="Input"
                                placeholder="Password"
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                pattern="(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                                title="Password must have at least 8 characters, including one number and one special character."
                            />
                            <small className="small-text">Password must have 8 characters including one number and one special character</small>
                        </div>
                        <input type="checkbox"
                            id="Remember"
                            name="Remember"
                            className="check"
                            checked={rememberMe}
                            onChange={() => setRememberMe(prev => !prev)} />
                        <label id='Remember' htmlFor="Remember">Remember me</label>
                        <br></br>
                        <small><Link to="/login">Already have an account?</Link></small>
                        <div className='inputbox'><button disabled={isRegistering} className="btn" id="signup" type="submit">{isRegistering ? 'Registering...' : 'Signup'}</button></div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
