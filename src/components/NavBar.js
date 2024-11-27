import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import { useAuth } from '../backend/Context/authContext';
import { doSignOut } from '../backend/Firebase/auth';

function NavBar() {
  const {userLoggedIn} = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">TechBuilds</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="Builder">Builder</Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="prebuilt"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Prebuilt
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/Desktop">Desktops</Link></li>
                <li><Link className="dropdown-item" to="/Laptop">Laptops</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="Parts">Parts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="Benchmark">Benchmark</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="Contact">Contact Us</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {userLoggedIn ? (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={() => { doSignOut()}}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-primary" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
