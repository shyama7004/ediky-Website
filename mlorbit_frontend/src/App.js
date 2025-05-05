import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GlitchText from "./components/GlitchText";
import CircularGallery from './components/CircularGallery';

// Sections
import WelcomeSection from "./components/WelcomeSection";
import FuzzyText from './components/FuzzyText';
import Ballpit from './components/BallPit';
import StarBorder from './components/button';
import TrueFocus from './components/devops';
import InfiniteMenu from './components/InfiniteMenu';
import RecommendedSections from "./components/RecommendedSections";

// Pages
import AboutSection from "./components/AboutSection";
import Login from "./login/LoginPage";
import Algorithms from "./pages/Algorithms";
import DataStructures from "./pages/DataStructures";
import MachineLearning from "./pages/MachineLearning";
import { DocsRoutes } from "./pages/DocsPage";
import ExploreML from "./ExploreML/ExploreML";
import AdvancedPDFViewer from "./ExploreML/AdvancedPDFViewer";
import SchedulePlanner from "./schedulePlanner/SchedulePlanner";

// Protected Pages
import DSAProgress from "./dsaProgress/components/DSAProgress";

// User Context and Private Routes
import { UserProvider } from "./components/userDetails/UserContext";
import PrivateRoute from "./components/PrivateRoute";

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
                <div style={{ position: 'relative', overflow: 'hidden', minHeight: '600px', maxHeight: '600px', width: '100%', margin: '3em 0' }}>
                  <Ballpit
                    count={200}
                    gravity={1.4}
                    friction={0.4}
                    wallBounce={0.98}
                    followCursor={true}
                  />
                </div>
                <div align="center" style={{ margin: '0.5em 0' }}>
                  <h2>Click on any button to Explore</h2>
                </div>
                <StarBorder
                  as="button"
                  className="custom-class"
                  color="cyan"
                  speed="5s"
                >
                  MachineLearning
                </StarBorder>
                <div style={{ position: 'relative', margin: '4em 0' }}>
                  <TrueFocus
                    sentence="Explore DevOps"
                    manualMode={false}
                    blurAmount={4}
                    borderColor="white"
                    animationDuration={1}
                    pauseBetweenAnimations={1}
                  />
                </div>
                <div style={{ height: '600px', position: 'relative', margin: '7em 0' }}>
                  <InfiniteMenu items={items} />
                </div>
                <GlitchText
                  speed={2}
                  enableShadows={true}
                  enableOnHover={true}
                  className="custom-class"
                >
                  Explore Data Structures and Algorithms
                </GlitchText>
                <div style={{ height: '600px', position: 'relative' }}>
                  <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
                </div>
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
          <Route path="/docs/*" element={<DocsRoutes />} />

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
        <Footer />
      </Router>
    </UserProvider>
  );
}

export default App;
