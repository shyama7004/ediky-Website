import React, { useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../context/UserContext";
import { auth } from "../login/firebaseConfig";
import { signOut } from "firebase/auth";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const isHome = location.pathname === "/";

  return (
    <nav className="navbar navbar-expand-lg shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/">
          <h3>MLOrbit</h3>
        </Link>

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

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
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
                    to="/dsa-progress"
                  >
                    DSA Progress
                  </NavLink>
                </li>
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
                    to="/tutorials/machine-learning"
                  >
                    Machine Learning
                  </NavLink>
                </li>
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

            <li className="nav-item ms-3">
              {user ? (
                <div className="nav-link fw-semibold d-flex align-items-center text-success">
                  <i className="fas fa-user me-2"></i> {user.name}
                  <button
                    onClick={handleLogout}
                    className="btn btn-link text-danger ms-3"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="nav-link fw-semibold d-flex align-items-center"
                  title="Login"
                >
                  <i className="fas fa-sign-in-alt me-1"></i> Login
                </Link>
              )}
            </li>
          </ul>
          {/* Search form and ThemeToggle removed */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
