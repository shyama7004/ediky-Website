import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WelcomeSection from "./components/WelcomeSection";
import Login from "./login/LoginPage";
import AboutSection from "./components/AboutSection";
import { UserProvider } from "./components/userDetails/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<WelcomeSection />} />

          {/* Public Pages */}
          <Route path="/about" element={<AboutSection />} />
          <Route path="/login" element={<Login />} />

          {/* Catch-All Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
