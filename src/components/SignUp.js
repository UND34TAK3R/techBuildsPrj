import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword, doUpdateDisplayName } from '../backend/Firebase/auth';
import { useAuth } from '../backend/Context/authContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomepageCover from '../assets/HomepageCover.jpg';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        'Password must have at least 8 characters, including a number and a special character.'
      );
      return;
    }

    if (!isRegistering) {
        setIsRegistering(true);
        try {
            const userData = await doCreateUserWithEmailAndPassword(email, password);
            await doUpdateDisplayName(userData.user, username);
    
            if (rememberMe) {
                localStorage.setItem('userData', JSON.stringify({ username, email, password }));
            }
            navigate('/');
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setErrorMessage("This email is already associated with an account.");
            } else {
                setErrorMessage(error.message || "An error occurred during registration.");
            }
            setIsRegistering(false);
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
          <h1 className="text-center text-light">Sign Up</h1>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
              <label htmlFor="Username" className="form-label text-light">
                Username
              </label>
              <input
                type="text"
                id="Username"
                name="Username"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label text-light">
                Email
              </label>
              <input
                type="email"
                id="Email"
                name="Email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                pattern="(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}"
              />
              <small className="text-muted text-light">
                Password must have at least 8 characters, including a number and a special
                character.
              </small>
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
              disabled={isRegistering}
              className="btn btn-light w-100"
              type="submit"
            >
              {isRegistering ? 'Registering...' : 'Sign Up'}
            </button>
          </form>
          <div className="mt-3 text-center">
            <small>
              <Link to="/login" className="text-decoration-none text-info">
                Already have an account? Login.
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
