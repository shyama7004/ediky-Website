// src/components/userDetails/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import { auth } from "../../login/firebaseConfig"; // Corrected path
import { onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext();

/**
 * UserProvider Component
 * Provides user authentication state to the entire application.
 *
 * @param {React.ReactNode} children - The child components that require access to user state.
 * @returns {React.ReactNode} - The context provider with user state.
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
