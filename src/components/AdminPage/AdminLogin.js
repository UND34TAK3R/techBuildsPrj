import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from '../../backend/Firebase/auth';
import { useAuth } from '../../backend/Context/authContext';
import 'bootstrap/dist/css/bootstrap.min.css';


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
                    navigate('/admin'); // Navigate to admin page if admin
                } else {
                    setErrorMessage('You do not have admin privileges.');
                    setIsSigningIn(false);
                }
            } catch (error) {
                setErrorMessage(error.message || 'An error occurred while logging in.');
                setIsSigningIn(false);
            }
        }
    };

    return (
        <div>
            {userLoggedIn && <Navigate to="/admin" replace={true} />}
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
                    <h1 className="text-center mb-4">Admin Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="Email"
                                name="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                id="Password"
                                name="Password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                pattern="(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
                            />
                        </div>
                        {errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        <div className="d-grid">
                            <button
                                disabled={isSigningIn}
                                className="btn btn-primary"
                                type="submit"
                            >
                                {isSigningIn ? 'Logging In...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
