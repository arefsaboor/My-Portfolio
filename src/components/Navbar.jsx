import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigationLinks, zIndex } from '../data/navigation';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef(null);
  const closeButtonRef = useRef(null);
  const scrollPositionRef = useRef(0);

  // Handle click on current page - refresh to show loader
  const handlePageClick = (e, path) => {
    if (location.pathname === path) {
      e.preventDefault();
      // Close sidebar if open
      if (isOpen) {
        handleClose();
        // Reload after sidebar closes
        setTimeout(() => {
          window.location.reload();
        }, 700);
      } else {
        window.location.reload();
      }
    }
  };

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when sidebar is open - no position changes, just prevent scrolling
  useEffect(() => {
    if (isOpen || isClosing) {
      // Add no-scroll class to prevent scrolling
      document.body.classList.add('no-scroll');
      document.documentElement.classList.add('no-scroll');
    } else {
      // Remove no-scroll class to allow scrolling
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    }
  }, [isOpen, isClosing]);

  // Close sidebar handler
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 700);
  };

  // Close menu when route changes
  useEffect(() => {
    if (isOpen) {
      handleClose();
    }
  }, [location.pathname]);

  // Toggle menu
  const toggleMenu = () => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
      setIsClosing(false);
    }
  };

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Focus management - focus close button when sidebar opens
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 900); // After animation completes
    }
  }, [isOpen]);

  // Focus trap within sidebar
  useEffect(() => {
    if (!isOpen || !sidebarRef.current) return;

    const sidebar = sidebarRef.current;
    const focusableElements = sidebar.querySelectorAll(
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (event) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    sidebar.addEventListener('keydown', handleTab);
    return () => sidebar.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  return (
    <>
      <style>{`
        .navbar-container {
          padding-left: clamp(1.5rem, 3vw, 5rem);
          padding-right: clamp(1.5rem, 3vw, 5rem);
          padding-top: clamp(1.5rem, 3vh, 3rem);
        }
        
        .logo-text {
          font-size: clamp(1.25rem, 2vw + 0.5rem, 1.75rem);
          line-height: 1;
          display: block;
        }
        
        .logo-wrapper {
          display: flex;
          align-items: center;
          height: clamp(3rem, 4vw + 0.5rem, 5rem);
        }
        
        .nav-link {
          font-size: clamp(1rem, 1.2vw + 0.3rem, 1.375rem);
          gap: clamp(1.5rem, 2vw, 2.5rem);
        }
        
        .burger-button {
          top: clamp(1.5rem, 3vh, 3rem);
          right: clamp(1.5rem, 3vw, 5rem);
          width: clamp(3rem, 4vw + 0.5rem, 5rem);
          height: clamp(3rem, 4vw + 0.5rem, 5rem);
        }
        
        .burger-icon {
          width: clamp(1.5rem, 2vw, 1.75rem);
          height: clamp(1.5rem, 2vw, 1.75rem);
        }
        
        .sidebar-width {
          width: 100%;
        }
        
        @media (min-width: 768px) {
          .sidebar-width {
            width: clamp(20rem, 90vw, 30rem);
          }
        }
        
        .sidebar-link {
          font-size: clamp(1.125rem, 2vw, 1.5rem);
          font-weight: 300;
        }
        
        .close-button {
          top: clamp(2rem, 4vh, 3rem);
          right: clamp(2rem, 4vw, 3rem);
          width: clamp(3rem, 4vw + 0.5rem, 5rem);
          height: clamp(3rem, 4vw + 0.5rem, 5rem);
        }
        
        .close-icon {
          width: clamp(1.5rem, 2vw, 1.75rem);
          height: clamp(1.5rem, 2vw, 1.75rem);
        }
      `}</style>

      {/* Transparent Navbar - Desktop */}
      <nav 
        className={`fixed w-full transition-all duration-500 ${isScrolled ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'}`}
        style={{ zIndex: zIndex.navbar }}
      >
        <div className="max-w-[1800px] mx-auto navbar-container">
          <div className="flex justify-start md:justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 logo-wrapper">
              <Link to="/" className="block" onClick={(e) => handlePageClick(e, '/')}>
                <h1 className="logo-text font-bold text-white tracking-wide drop-shadow-lg m-0">
                  <span className="font-bold">AREF </span>
                  <span className="font-thin">SABOOR</span>
                </h1>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center" style={{ gap: 'clamp(1.5rem, 2vw, 2.5rem)' }}>
              {navigationLinks.map((link, index) => {
                // Random hover directions for each link
                const hoverEffects = [
                  'hover:-translate-y-1',
                  'hover:translate-x-1',
                  'hover:translate-y-1',
                  'hover:-translate-x-1'
                ];
                const hoverEffect = hoverEffects[index % hoverEffects.length];
                
                return (
                  <Link
                    key={link.id}
                    to={link.path}
                    onClick={(e) => handlePageClick(e, link.path)}
                    className={`relative text-white hover:text-teal-400 transition-all duration-300 font-light drop-shadow-lg group transform ${hoverEffect}`}
                    style={{ fontSize: 'clamp(1rem, 1.2vw + 0.3rem, 1.375rem)' }}
                  >
                    {link.name}
                    <span 
                      className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-opacity duration-300 ${
                        location.pathname === link.path && link.path !== '/'
                          ? 'bg-cyan-400 opacity-100' 
                          : 'bg-teal-400 opacity-0 group-hover:opacity-100'
                      }`}
                      style={{ bottom: 'clamp(-1.25rem, -1.5vw, -1.5rem)' }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Burger Menu Button */}
      <button
        onClick={toggleMenu}
        className={`burger-button fixed flex items-center justify-center rounded-full transition-all duration-300 ease-in-out group z-50 ${
          isScrolled || isMobile ? 'scale-100 opacity-100 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900/70' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: zIndex.burgerButton }}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <svg 
          className="burger-icon" 
          fill="none" 
          strokeWidth="2.5" 
          strokeLinecap="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <line x1="4" y1="8" x2="20" y2="8" className="stroke-white transition-all duration-300" />
          <line x1="4" y1="16" x2="20" y2="16" className="stroke-white transition-all duration-300" />
        </svg>
      </button>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 transition-all duration-500 ${
          (isOpen || isClosing) ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: zIndex.sidebarOverlay }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-700 ${
            isOpen && !isClosing ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={toggleMenu}
          aria-hidden="true"
        />

        {/* Sidebar Container */}
        <aside
          ref={sidebarRef}
          className={`sidebar-width absolute top-0 right-0 h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900 shadow-2xl overflow-hidden ${
            isClosing ? 'animate-sidebar-bloom-close' : isOpen ? 'animate-sidebar-bloom' : 'h-0 opacity-0'
          }`}
          style={{ zIndex: zIndex.sidebar }}
        >
          {/* Sidebar Content */}
          <div 
            className={`relative w-full h-full transition-opacity duration-300 overflow-y-auto ${
              isOpen && !isClosing ? 'opacity-100 delay-[700ms]' : 'opacity-0'
            }`}
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={toggleMenu}
              className={`close-button absolute bg-teal-400 rounded-full shadow-2xl flex items-center justify-center z-10 outline-none focus:ring-2 focus:ring-teal-300 ${
                isOpen && !isClosing ? 'opacity-100' : 'opacity-0'
              }`}
              aria-label="Close navigation menu"
            >
              <svg 
                className="close-icon relative z-20" 
                fill="none" 
                stroke="#0a3d35" 
                strokeWidth="3" 
                strokeLinecap="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>

            {/* Menu Content */}
            <div className="flex flex-col h-full justify-between py-24 px-8 md:px-12">
              {/* Top Section: Brand + Navigation */}
              <div>
                {/* Brand */}
                <div 
                  className={`transition-opacity duration-500 mb-12 ${
                    isOpen && !isClosing ? 'opacity-100 delay-[900ms]' : 'opacity-0'
                  }`}
                >
                  <h2 className="font-bold text-white text-3xl md:text-4xl mb-3">
                    <span className="font-bold">AREF </span>
                    <span className="font-thin">SABOOR</span>
                  </h2>
                  <div className="h-1 w-16 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full" />
                </div>

                {/* Navigation Links */}
                <nav 
                  className={`flex flex-col gap-6 transition-opacity duration-700 ${
                    isOpen && !isClosing ? 'opacity-100 delay-[900ms]' : 'opacity-0'
                  }`}
                  aria-label="Main navigation"
                >
                {navigationLinks.map((link) => (
                  <Link
                    key={link.id}
                    to={link.path}
                    onClick={(e) => {
                      const isCurrentPage = location.pathname === link.path;
                      if (!isCurrentPage) {
                        toggleMenu();
                      }
                      handlePageClick(e, link.path);
                    }}
                    className="relative block text-white hover:text-teal-400 transition-all duration-300 font-light hover:translate-x-2 transform group text-2xl md:text-3xl"
                  >
                    {link.name}
                    <span 
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-opacity duration-300 ${
                        location.pathname === link.path 
                          ? 'bg-cyan-400 opacity-100' 
                          : 'bg-teal-400 opacity-0 group-hover:opacity-100'
                      }`}
                      style={{ marginLeft: '-1rem' }}
                      aria-hidden="true"
                    />
                  </Link>
                ))}
                </nav>
              </div>

              {/* Bottom Section: Footer Info */}
              <div 
                className={`space-y-6 transition-opacity duration-700 ${
                  isOpen && !isClosing ? 'opacity-100 delay-[900ms]' : 'opacity-0'
                }`}
              >
                {/* About */}
                <div className="border-t border-white/20 pt-6">
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed font-medium">
                    UX/UI Designer<br />
                    Full Stack Developer
                  </p>
                  <p className="text-gray-400 mt-3 text-xs md:text-sm leading-relaxed">
                    Crafting designs that visually speak on screens!<br />
                    Giving visual identity to ideas, products and brands<br />
                    in the digital world.
                  </p>
                </div>
                {/* Social Links */}
                <div className="flex flex-wrap gap-3">
                  {/* GitHub */}
                  <a 
                    href="https://github.com/arefsaboor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 border-2 border-white/20 rounded-xl flex items-center justify-center hover:border-teal-400 hover:bg-teal-400/20 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label="GitHub"
                    title="View my GitHub profile"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </a>
                  {/* Medium */}
                  <a 
                    href="https://medium.com/@arefsaboor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 border-2 border-white/20 rounded-xl flex items-center justify-center hover:border-teal-400 hover:bg-teal-400/20 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label="Medium"
                    title="Read my articles on Medium"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a 
                    href="https://linkedin.com/in/arefsaboor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 border-2 border-white/20 rounded-xl flex items-center justify-center hover:border-teal-400 hover:bg-teal-400/20 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label="LinkedIn"
                    title="Connect on LinkedIn"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  {/* Behance */}
                  <a 
                    href="https://behance.net/arefsaboor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 border-2 border-white/20 rounded-xl flex items-center justify-center hover:border-teal-400 hover:bg-teal-400/20 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label="Behance"
                    title="View my work on Behance"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11.524h3.391c2.093 0 2.093-3.137 0-3.137H3v3.137zm0 4.163h3.616c3.066 0 3.066-3.653 0-3.653H3v3.653z"/>
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a 
                    href="https://facebook.com/arefsaboor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 border-2 border-white/20 rounded-xl flex items-center justify-center hover:border-teal-400 hover:bg-teal-400/20 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label="Facebook"
                    title="Follow me on Facebook"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a 
                    href="https://instagram.com/arefsaboor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 border-2 border-white/20 rounded-xl flex items-center justify-center hover:border-teal-400 hover:bg-teal-400/20 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                    aria-label="Instagram"
                    title="Follow me on Instagram"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
                
                {/* Copyright */}
                <div className="border-t border-white/20 pt-4">
                  <p className="text-gray-500 text-center text-xs">
                    © {new Date().getFullYear()} Aref Saboor. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Navbar;
