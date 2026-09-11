import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Impressum from './pages/Impressum'
import NotFound from './pages/NotFound'
import Footer from './components/Footer'

function AppContent() {
  const [showMainLoader, setShowMainLoader] = useState(() => window.location.pathname === '/');

  return (
    <>
      {showMainLoader && <Loader onComplete={() => setShowMainLoader(false)} />}
      <div className="min-h-svh flex flex-col overflow-x-hidden">
        <Navbar />
        <div className="flex-grow overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="*" element={<NotFound />} />
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
  );
}

export default App
