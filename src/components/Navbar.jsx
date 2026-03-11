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

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen || isClosing) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
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
              <Link to="/" className="block">
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
                    className={`relative text-white hover:text-teal-400 transition-all duration-300 font-medium drop-shadow-lg group transform ${hoverEffect}`}
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
            className={`relative w-full h-full transition-opacity duration-300 ${
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
            <div className="flex flex-col h-full justify-center" style={{ padding: 'clamp(2rem, 4vw, 3rem)' }}>
              {/* Brand */}
              <div 
                className={`transition-opacity duration-500 ${
                  isOpen && !isClosing ? 'opacity-100 delay-[900ms]' : 'opacity-0'
                }`}
                style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }}
              >
                <h2 className="font-bold text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '0.5rem' }}>
                  <span className="font-bold">AREF </span>
                  <span className="font-thin">SABOOR</span>
                </h2>
                <div className="h-1 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full" style={{ width: 'clamp(3rem, 8vw, 4rem)' }} />
              </div>

              {/* Navigation Links */}
              <nav 
                className={`flex flex-col transition-opacity duration-700 ${
                  isOpen && !isClosing ? 'opacity-100 delay-[900ms]' : 'opacity-0'
                }`}
                style={{ gap: 'clamp(1rem, 2vh, 1.5rem)' }}
                aria-label="Main navigation"
              >
                {navigationLinks.map((link) => (
                  <Link
                    key={link.id}
                    to={link.path}
                    onClick={toggleMenu}
                    className="relative block text-white hover:text-teal-400 transition-all duration-300 font-light hover:translate-x-4 transform group sidebar-link"
                  >
                    {link.name}
                    <span 
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-opacity duration-300 ${
                        location.pathname === link.path 
                          ? 'bg-cyan-400 opacity-100' 
                          : 'bg-teal-400 opacity-0 group-hover:opacity-100'
                      }`}
                      style={{ marginLeft: 'clamp(-0.75rem, -1vw, -1rem)' }}
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </nav>

              {/* Footer Info */}
              <div 
                className={`border-t border-white/20 transition-opacity duration-700 ${
                  isOpen && !isClosing ? 'opacity-100 delay-[900ms]' : 'opacity-0'
                }`}
                style={{ 
                  marginTop: 'clamp(2rem, 4vh, 3rem)',
                  paddingTop: 'clamp(1.5rem, 3vh, 2rem)'
                }}
              >
                <p className="text-gray-400" style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}>Designer & Developer</p>
                <p className="text-gray-500 mt-1" style={{ fontSize: 'clamp(0.625rem, 1vw, 0.75rem)' }}>Crafting digital experiences</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Navbar;
