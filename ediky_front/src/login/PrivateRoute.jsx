import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../login/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) {
    // While auth state is loading, avoid redirect flicker
    return null;
  }
  return currentUser ? children : <Navigate to="/login" replace />;
}
