import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from '../backend/Firebase/auth';
import { useAuth } from '../backend/Context/authContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomepageCover from '../assets/HomepageCover.jpg';

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
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        navigate('/');
      } catch (error) {
        setErrorMessage('Invalid email or password.');
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div>
      {userLoggedIn && <Navigate to="/" replace={true} />}
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{
          backgroundImage: `url(${HomepageCover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="card p-4 shadow bg-dark"
          style={{
            width: '100%',
            maxWidth: '400px',
            border: 'none',
            borderRadius: '8px',
          }}
        >
          <h1 className="text-center text-light">Login</h1>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
              <label htmlFor="Email" className="form-label text-light">
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
              <label htmlFor="Password" className="form-label text-light">
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
                pattern="(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}" // Example password pattern
              />
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="Remember"
                name="Remember"
                className="form-check-input"
                checked={rememberMe}
                onChange={() => setRememberMe((prev) => !prev)}
              />
              <label className="form-check-label text-light" htmlFor="Remember">
                Remember me
              </label>
            </div>
            {errorMessage && (
              <div className="alert alert-danger text-center" role="alert">
                {errorMessage}
              </div>
            )}
            <button
              disabled={isSigningIn}
              className="btn btn-light w-100"
              type="submit"
            >
              {isSigningIn ? 'Logging In...' : 'Login'}
            </button>
          </form>
          <div className="mt-3 text-center">
            <small>
              <Link
                to="/forgotpasswd"
                className="text-decoration-none text-light"
              >
                Forgot your password?
              </Link>
            </small>
            <br />
            <small>
              <Link
                to="/signup"
                className="text-decoration-none text-info"
              >
                Don't have an account? Sign up.
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
