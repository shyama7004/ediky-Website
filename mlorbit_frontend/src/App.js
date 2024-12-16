import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sections from "./components/Sections";
import WelcomeSection from "./components/WelcomeSection";
import Footer from "./components/Footer";
import AboutSection from "./components/AboutSection";
import RecommendedSections from "./components/RecommendedSections";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Algorithms from "./pages/Algorithms";
import DataStructures from "./pages/DataStructures";
import MachineLearning from "./pages/MachineLearning";
import LoginPage from "./login/LoginPage";
function App() {
  return (
    <Router>
      <Navbar /> {/* Main Navbar */}
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <WelcomeSection /> {/* Centered GIF with text */}
              <Sections /> {/* HTML, CSS, JS Sections */}
              <RecommendedSections /> {/* Recommended Courses Section */}
              <Footer />
            </>
          }
        />
        {/* Individual Pages */}
        <Route path="/algorithms" element={<Algorithms />} />
        <Route path="/data-structures" element={<DataStructures />} />
        <Route path="/machine-learning" element={<MachineLearning />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
