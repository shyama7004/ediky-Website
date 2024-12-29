// src/components/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./userDetails/UserContext"; // Corrected path
import Spinner from "./Spinner"; // Import the Spinner component

/**
 * PrivateRoute Component
 * Protects routes from being accessed by unauthenticated users.
 * If the user is not authenticated, redirects to the login page.
 * While authentication status is loading, displays a spinner.
 *
 * @param {React.ReactNode} children - The component(s) to render if authenticated.
 * @returns {React.ReactNode} - The children components or a redirect to login.
 */
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation(); // Get the current location

  if (loading) {
    // Display a spinner while authentication status is being determined
    return <Spinner />;
  }

  if (!user) {
    // If not authenticated, redirect to login with the intended path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child components
  return children;
};

export default PrivateRoute;
