import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import { useAuth } from '../backend/Context/authContext';
import { doSignOut } from '../backend/Firebase/auth';
import { useEffect } from 'react';
import HomePageCover from '../assets/HomepageCover.jpg';
import { useState } from 'react';

function NavBar() {
  const { userLoggedIn } = useAuth();
  const [coverImageLoaded, setCoverImageLoaded] = useState(false);
  

  // Event handlers for image loading
  const handleCoverImageLoad = () => {
    setCoverImageLoaded(true);
  };

  // Effect to handle navbar style changes when scrolling
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top"
      style={{
        backgroundImage: `url(${HomePageCover})`,  // Correctly referencing the imported image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: coverImageLoaded ? 1 : 0, // Fade-in effect for the cover image
          transition: 'opacity 1s ease-in-out', // Smooth transition for opacity
      }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">TechBuilds</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-white"  to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-white" to="Builder">Builder</Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle active text-white"
                to="prebuilt"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Prebuilt
              </Link>
              <ul className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item text-white bg-dark custom-hover" to="/Desktop">Desktops</Link></li>
                <li><Link className="dropdown-item text-white bg-dark custom-hover" to="/Laptop">Laptops</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-white" to="Parts">Parts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-white" to="Benchmark">Benchmark</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active text-white" to="About">About Us</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {userLoggedIn ? (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-danger custom-hover-btn" onClick={() => { doSignOut() }}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-light custom-hover-btn" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      <img
          src={HomePageCover}
          alt='Cover'
          onLoad={handleCoverImageLoad}
          style={{ display: 'none' }} // Hide the image element, it’s only for the fade-in effect
        />
    </nav>
  );
}

export default NavBar;
