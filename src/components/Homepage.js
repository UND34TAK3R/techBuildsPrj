import React, { useState } from 'react';
import HomePageCover from '../assets/HomepageCover.jpg';
import HomePageImage from '../assets/HomepageImage1.jpg';
import BuildSvg from '../assets/build.svg';
import BenchmarkSvg from '../assets/benchmark.svg';
import CompareSvg from '../assets/compare.svg';
import { Link } from 'react-router-dom';
import '../css/Homepage.css';
import 'css/scrollbar.css';

function HomePage() {
  // States to track if images are loaded
  const [coverImageLoaded, setCoverImageLoaded] = useState(false);
  const [homeImageLoaded, setHomeImageLoaded] = useState(false);

  // Event handlers for image loading
  const handleCoverImageLoad = () => {
    setCoverImageLoaded(true);
  };

  const handleHomeImageLoad = () => {
    setHomeImageLoaded(true);
  };

  return (
    <div>
      {/* Full-Screen Section with Image Background */}
      <section
        className="hero d-flex justify-content-center align-items-center text-center"
        style={{
          height: '100vh',
          backgroundImage: `url(${HomePageCover})`,  // Correctly referencing the imported image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: coverImageLoaded ? 1 : 0, // Fade-in effect for the cover image
          transition: 'opacity 1s ease-in-out', // Smooth transition for opacity
        }}
      >
        <div>
          <h1 className="display-4 font-weight-bold text-white mb-4">Welcome to Your Build Hub</h1>
          <p className="lead text-white mb-4">Create, Benchmark, and Compare Builds like a pro.</p>
          <div className="mt-4">
            <Link to="/builder">
              <button className="btn btn-outline-light btn-lg text-white custom-hover-btn">Get Started</button>
            </Link>
          </div>
        </div>
        <img
          src={HomePageCover}
          alt="Cover Image"
          onLoad={handleCoverImageLoad}
          style={{ display: 'none' }} // Hide the image element, it’s only for the fade-in effect
        />
      </section>

      {/* Image and Call to Action Section */}
      <section
        className="image-section d-flex justify-content-center align-items-center text-center py-5"
        style={{
          height: '75vh',
          backgroundImage: `url(${HomePageImage})`,  // Correctly referencing the imported image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: homeImageLoaded ? 1 : 0, // Fade-in effect for the second image
          transition: 'opacity 1s ease-in-out', // Smooth transition for opacity
        }}
      >
        <div>
          <h2 className="display-5 mb-3 text-white">Start Building Your Ideal Setup Today</h2>
          <p className="lead mb-4 text-white">Everything you need in one place.</p>
          <Link to="/builder">
            <button className="btn btn-outline-light btn-lg text-white custom-hover-btn">Start Building</button>
          </Link>
        </div>
        <img
          src={HomePageImage}
          alt="Homepage Image"
          onLoad={handleHomeImageLoad}
          style={{ display: 'none' }} // Hide the image element, it’s only for the fade-in effect
        />
      </section>

      {/* Three Cards Section */}
      <section
        className="card-section py-5"
        style={{
          backgroundImage: `url(${HomePageImage})`,  // Correctly referencing the imported image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="container">
          <div className="row text-center">
            {/* Create Build Card */}
            <div className="col-md-4 mb-4">
              <div className="card border border-white shadow-sm" style={{ backgroundColor: 'transparent' }}>
                <div className="card-body" style={{ backgroundColor: 'transparent' }}>
                  <img src={BuildSvg} alt="Build Icon" className="img-fluid mb-3" />
                  <h5 className="card-title text-white">Create Build</h5>
                  <p className="card-text text-white">Design your custom build with ease using our simple tools.</p>
                </div>
              </div>
            </div>

            {/* Benchmark Card */}
            <div className="col-md-4 mb-4">
              <div className="card border border-white shadow-sm" style={{ backgroundColor: 'transparent' }}>
                <div className="card-body" style={{ backgroundColor: 'transparent' }}>
                  <img src={BenchmarkSvg} alt="Benchmark Icon" className="img-fluid mb-3" />
                  <h5 className="card-title text-white">Benchmark</h5>
                  <p className="card-text text-white">Test your builds and see how they perform under load.</p>
                </div>
              </div>
            </div>

            {/* Compare Builds Card */}
            <div className="col-md-4 mb-4">
              <div className="card border border-white shadow-sm" style={{ backgroundColor: 'transparent' }}>
                <div className="card-body" style={{ backgroundColor: 'transparent' }}>
                  <img src={CompareSvg} alt="Compare Icon" className="img-fluid mb-3" />
                  <h5 className="card-title text-white">Compare Builds</h5>
                  <p className="card-text text-white">Compare multiple builds side-by-side to find the best one for you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
