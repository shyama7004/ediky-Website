// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sections from "./components/Sections";
import WelcomeSection from "./components/WelcomeSection";
import Footer from "./components/Footer";
import Login from "./login/LoginPage"; // Corrected path
import AboutSection from "./components/AboutSection";
import RecommendedSections from "./components/RecommendedSections";

import Algorithms from "./pages/Algorithms";
import DataStructures from "./pages/DataStructures";
import MachineLearning from "./pages/MachineLearning";
import DSAProgress from "./dsaProgress/components/DSAProgress"; // Corrected path

import { UserProvider } from "./components/userDetails/UserContext"; // Corrected path
import PrivateRoute from "./components/PrivateRoute"; // Corrected path

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <WelcomeSection />
                <Sections />
                <RecommendedSections />
                <Footer />
              </>
            }
          />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/algorithms" element={<Algorithms />} />
          <Route path="/data-structures" element={<DataStructures />} />
          <Route path="/machine-learning" element={<MachineLearning />} />

          {/* Protected Route */}
          <Route
            path="/dsa-progress"
            element={
              <PrivateRoute>
                <DSAProgress />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
