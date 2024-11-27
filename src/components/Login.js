import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../css/SignUpForm.css';
import { doSignInWithEmailAndPassword } from '../backend/Firebase/auth';
import { useAuth } from '../backend/Context/authContext';

const Login = () => {
    const { userLoggedIn } = useAuth();
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!isSigningIn){
            setIsSigningIn(true);
            await doSignInWithEmailAndPassword(email, password);
        }  
    };
    return (
        <div>{userLoggedIn && (<Navigate to={"/"} replace={true}/>) }
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
                                value={email} onChange={(e) => {setEmail(e.target.value) }}
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
                                value={password} onChange={(e) => {setPassword(e.target.value) }}
                                required
                                pattern="(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}" // Example password pattern
                            />
                            <div>
                                <input
                                    type="checkbox"
                                    id="Remember"
                                    name="Remember"
                                    className="check"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(prev => !prev)} // Toggle remember me
                                />
                                <label htmlFor="Remember">Remember me</label>
                            </div>
                            <small><Link to="/forgotpasswd">Don't remember your password?</Link></small><br />
                            <small><Link to="/signup">Don't have an account?</Link></small>
                        </div>
                        <div className='inputbox'>
                            <button disabled={isSigningIn} className="btn" id="login" type="submit">{isSigningIn ? 'Logging In...' : 'Login'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
