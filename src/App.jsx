import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Impressum from './pages/Impressum'
import Footer from './components/Footer'

function AppContent() {
  const location = useLocation();
  const prevLocationRef = useRef(null);
  const [showMainLoader, setShowMainLoader] = useState(() => window.location.pathname === '/');
  const [showHomePageLoader, setShowHomePageLoader] = useState(false);

  useEffect(() => {
    const prevPath = prevLocationRef.current;
    const currentPath = location.pathname;

    if (currentPath === '/') {
      // Check if we're navigating FROM another page TO homepage
      if (prevPath && prevPath !== '/') {
        // Coming from About, Projects, or Contact → show Home PageLoader
        setShowHomePageLoader(true);
        setShowMainLoader(false);
      } else {
        // Direct visit or refresh → show Main Loader
        setShowMainLoader(true);
        setShowHomePageLoader(false);
      }
    }

    // Update previous location
    prevLocationRef.current = currentPath;
  }, [location.pathname]);

  return (
    <>
      {showMainLoader && <Loader onComplete={() => setShowMainLoader(false)} />}
      <div className="min-h-svh flex flex-col overflow-x-hidden">
        <Navbar />
        <div className="flex-grow overflow-x-hidden">
          <Routes>
            <Route path="/" element={
              <Home 
                showPageLoader={showHomePageLoader} 
                onLoaderComplete={() => setShowHomePageLoader(false)} 
              />
            } />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/impressum" element={<Impressum />} />
          </Routes>
        </div>
        <Footer />
        <Analytics />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
