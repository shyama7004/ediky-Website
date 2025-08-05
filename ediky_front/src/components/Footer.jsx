import React from "react";
import { FaGithub, FaArrowUp } from "react-icons/fa";
import "./Footer.css";

const quickLinks = [
  { name: "Algorithms", path: "/algorithms" },
  { name: "Data Structures", path: "/data-structures" },
  { name: "Machine Learning", path: "/machine-learning" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-col animate-footer" style={{ animationDelay: "0.1s" }}>
          <h2>EdikyLabs</h2>
          <p className="tagline">
            Empowering developers with clear, hands-on tutorials in DSA, ML & more.
          </p>
        </div>

        {/* Quick Links */}
        <nav className="footer-col animate-footer" style={{ animationDelay: "0.3s" }}>
          <h5>Quick Links</h5>
          <ul>
            {quickLinks.map((link, i) => (
              <li
                key={link.path}
                className="animate-footer"
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                <a href={link.path}>{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact + GitHub */}
        <div className="footer-col animate-footer contact-col" style={{ animationDelay: "0.7s" }}>
          <h5>Contact</h5>
          <a href="mailto:ayushi3368@gmail.com">ayushi3368@gmail.com</a>
          <div className="social">
            {[
              { href: "https://github.com/shyama7004", label: "Shyama GitHub" },
              { href: "https://github.com/Ayushi2234", label: "Ayushi GitHub" },
            ].map(({ href, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="social-icon"
                style={{ animationDelay: `${0.8 + i * 0.1}s` }}
              >
                <FaGithub />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom animate-footer" style={{ animationDelay: "1.1s" }}>
        <p>&copy; {currentYear} EdikyLabs. All Rights Reserved.</p>
        <p>
          Made by{" "}
          <a href="https://github.com/shyama7004" target="_blank" rel="noopener noreferrer">
            Shyama
          </a>{" "}
          &amp;{" "}
          <a href="https://github.com/Ayushi2234" target="_blank" rel="noopener noreferrer">
            Ayushi
          </a>
        </p>
      </div>

      {/* Back to Top */}
      <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;
