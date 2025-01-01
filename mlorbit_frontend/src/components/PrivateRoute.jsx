// src/components/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./userDetails/UserContext";
import Spinner from "./Spinner";

/**
 * PrivateRoute Component
 * Protects routes from being accessed by unauthenticated users.
 * If the user is not authenticated, redirects to the login page.
 */
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
