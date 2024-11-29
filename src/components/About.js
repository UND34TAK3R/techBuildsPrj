import React, { useState, useEffect } from 'react';
import '../css/About.css';
import about from '../assets/About.jpg';
import 'css/scrollbar.css';

function About() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = about; // Replace with your background image path
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div
      className={`about-page ${imageLoaded ? 'image-loaded' : 'image-loading'}`}
    >
      {/* About Us Section */}
      <section className="about-section py-5">
        <div className="container text-center">
          <h2 className="display-4 text-white mb-4">About Us</h2>
          <p className="lead text-white mb-5">
            We are a passionate team dedicated to providing the best custom PC building experience. Our goal is to simplify the process of creating your ideal setup.
          </p>

          {/* Our Mission */}
          <div className="mission">
            <h3 className="text-white mb-4">Our Mission</h3>
            <p className="text-white">
              We aim to empower individuals to create their perfect build, with easy-to-use tools and expert advice at every step.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
