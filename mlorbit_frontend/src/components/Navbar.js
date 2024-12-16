// Navbar.js
import React from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css"; // Ensure this path is correct

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate(-1);
  };

  // Determine if the current path is the Home page
  const isHome = location.pathname === "/";

  return (
    <nav className="navbar navbar-expand-lg shadow-sm">
      <div className="container">
        {/* Logo and Brand */}
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block me-2"
          />
          MLOrbit
        </Link>

        {/* Navbar Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left Side: Navigation Links */}
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Back Button - Visible only if not on Home */}
            {!isHome && (
              <li className="nav-item me-2">
                <button
                  className="btn btn-link nav-link fw-semibold back-button"
                  onClick={handleBack}
                  title="Go Back"
                >
                  <i className="fas fa-arrow-left me-1"></i> Back
                </button>
              </li>
            )}

            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link fw-semibold ${isActive ? "active" : ""}`
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link fw-semibold ${isActive ? "active" : ""}`
                }
                to="/about"
              >
                About
              </NavLink>
            </li>

            {/* Tutorials Dropdown */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle fw-semibold"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Tutorials
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `dropdown-item ${isActive ? "active-dropdown" : ""}`
                    }
                    to="/tutorials/algorithms"
                  >
                    Algorithms
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `dropdown-item ${isActive ? "active-dropdown" : ""}`
                    }
                    to="/tutorials/data-structures"
                  >
                    Data Structures
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `dropdown-item ${isActive ? "active-dropdown" : ""}`
                    }
                    to="/tutorials/machine-learning"
                  >
                    Machine Learning
                  </NavLink>
                </li>
                {/* Add more dropdown items as needed */}
              </ul>
            </li>

            <li className="nav-item d-flex align-items-center">
              <a
                className="nav-link fw-semibold d-flex align-items-center"
                href="https://github.com/MLOrbit/MLOrbit-Website"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github me-1"></i> GitHub
              </a>
            </li>
          </ul>

          {/* Right Side: Search Bar and Theme Toggle */}
          <form
            className="navbar-search ms-lg-3 mt-3 mt-lg-0"
            role="search"
            onSubmit={(e) => e.preventDefault()} // Prevent form submission
          >
            <input
              type="search"
              placeholder="Search tutorials..."
              aria-label="Search"
            />
            <button type="submit">
              <i className="fas fa-search"></i> Search
            </button>
          </form>

          {/* Theme Toggle */}
          <div className="ms-3">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
