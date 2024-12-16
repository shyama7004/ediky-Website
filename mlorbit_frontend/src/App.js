import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sections from "./components/Sections";
import WelcomeSection from "./components/WelcomeSection";
import RecommendedSections from "./components/RecommendedSections";

// Import pages for navigation
import Algorithms from "./pages/Algorithms";
import DataStructures from "./pages/DataStructures";
import MachineLearning from "./pages/MachineLearning";

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
            </>
          }
        />
        {/* Individual Pages */}
        <Route path="/algorithms" element={<Algorithms />} />
        <Route path="/data-structures" element={<DataStructures />} />
        <Route path="/machine-learning" element={<MachineLearning />} />
      </Routes>
    </Router>
  );
}

export default App;