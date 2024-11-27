import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import '../../css/SignUpForm.css';
import { doSignInWithEmailAndPassword } from '../../backend/Firebase/auth';
import { useAuth } from '../../backend/Context/authContext';

const AdminLogin = () => {
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            setErrorMessage(''); // Clear previous error message
            try {
                const user = await doSignInWithEmailAndPassword(email, password);

                // Fetch custom claims from the user's ID token
                const idTokenResult = await user.getIdTokenResult();

                if (idTokenResult.claims.admin === true) {
                    // If user is an admin, navigate to the admin page
                    navigate('/admin');
                } 
                if (idTokenResult.claims.admin === false  && idTokenResult === null) {
                    // If user is not an admin, display an error
                    setErrorMessage('You do not have admin privileges.');
                    setIsSigningIn(false);
                }
            } catch (error) {
                // Handle login errors
                setErrorMessage(error.message || 'An error occurred while logging in.');
                setIsSigningIn(false);
            }
        }
    };

    return (
        <div>
            {userLoggedIn && <Navigate to={"/admin"} replace={true} />}
            <div className="login-container">
                <div className="login-form">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit} noValidate className="container">
                        <div className="inputbox">
                            <label className="label" htmlFor="Email">Email: </label>
                            <input
                                type="email"
                                id="Email"
                                name="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="Input"
                                placeholder="Email"
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                pattern="(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}" // Example password pattern
                            />
                        </div>
                        <div className='inputbox'>
                            <button disabled={isSigningIn} className="btn" id="login" type="submit">
                                {isSigningIn ? 'Logging In...' : 'Login'}
                            </button>
                        </div>
                    </form>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
