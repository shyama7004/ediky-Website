import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GlitchText from "./components/GlitchText";
import CircularGallery from './components/CircularGallery'

// Sections
import WelcomeSection from "./components/WelcomeSection";
import FuzzyText from './components/FuzzyText';
import InfiniteMenu from './components/InfiniteMenu'
import Sections from "./components/Sections";
import RecommendedSections from "./components/RecommendedSections";

// Pages
import AboutSection from "./components/AboutSection";
import Login from "./login/LoginPage";
import Algorithms from "./pages/Algorithms";
import DataStructures from "./pages/DataStructures";
import MachineLearning from "./pages/MachineLearning";
import ExploreML from "./ExploreML/ExploreML";
import AdvancedPDFViewer from "./ExploreML/AdvancedPDFViewer";
import SchedulePlanner from "./schedulePlanner/SchedulePlanner";

// Protected Pages
import DSAProgress from "./dsaProgress/components/DSAProgress";

// User Context and Private Routes
import { UserProvider } from "./components/userDetails/UserContext";
import PrivateRoute from "./components/PrivateRoute";

// CSS

const items = [
  {
    image: 'https://picsum.photos/300/300?grayscale',
    link: 'https://google.com/',
    title: 'Item 1',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/400/400?grayscale',
    link: 'https://google.com/',
    title: 'Item 2',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/500/500?grayscale',
    link: 'https://google.com/',
    title: 'Item 3',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/600/600?grayscale',
    link: 'https://google.com/',
    title: 'Item 4',
    description: 'This is pretty cool, right?'
  }
];

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <WelcomeSection />
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2em 0' }}>
                  <FuzzyText
                    className="fuzzy-canvas"
                    baseIntensity={0.2}
                    hoverIntensity={0.5}
                    enableHover={true}
                  >
                    Explore ML
                  </FuzzyText>
                </div>
                <div style={{ height: '600px', position: 'relative', margin: '7em 0' }}>
                  <InfiniteMenu items={items} />
                </div>
                <GlitchText
                  speed={2}
                  enableShadows={true}
                  enableOnHover={true}
                  className='custom-class'
                >
                  Explore Data Structures and Algorithms
                </GlitchText>
                <div style={{ height: '600px', position: 'relative' }}>
                  <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
                </div>
                <Sections />
                <RecommendedSections />
              </>
            }
          />

          {/* Public Pages */}
          <Route path="/about" element={<AboutSection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/algorithms" element={<Algorithms />} />
          <Route path="/data-structures" element={<DataStructures />} />
          <Route path="/machine-learning" element={<MachineLearning />} />
          <Route path="/explore-ml" element={<ExploreML />} />
          <Route path="/view-pdf" element={<AdvancedPDFViewer />} />

          {/* Protected Routes */}
          <Route
            path="/schedule-planner"
            element={
              <PrivateRoute>
                <SchedulePlanner />
              </PrivateRoute>
            }
          />
          <Route
            path="/dsa-progress"
            element={
              <PrivateRoute>
                <DSAProgress />
              </PrivateRoute>
            }
          />

          {/* Catch-All Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {/* Footer will remain visible on all pages */}
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
