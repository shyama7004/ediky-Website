import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Top Section */}
        <div className="footer-top">
          <div className="footer-brand">
            <h2>MLOrbit</h2>
            <p>Your hub for algorithms, data structures, and machine learning.</p>
          </div>
          <div className="footer-links">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/algorithms">Algorithms</a></li>
              <li><a href="/data-structures">Data Structures</a></li>
              <li><a href="/machine-learning">Machine Learning</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h5>Contact Us</h5>
            <p>Email: <a href="mailto:ayushi3368@gmail.com">ayushi3368@gmail.com</a></p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MLOrbit. All Rights Reserved.</p>
          <p>Made by <strong>shyama7004</strong> and <strong>Ayushi</strong></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
