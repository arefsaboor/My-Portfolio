import { useState, useEffect, useRef } from 'react';
import ExternalIcon from './ExternalIcon';
import { projectNav } from '../data/projectNav';
import { Link, useLocation } from 'react-router-dom';
import { navigationLinks, zIndex } from '../data/navigation';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef(null);
  const closeButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  const sidebarDropdownRef = useRef(null);
  // Only the homepage has a dark photo hero behind the transparent navbar;
  // every other route (including any future route or an unmatched 404 path)
  // opens on a light background, so it defaults to dark nav text instead of
  // needing to be added to a whitelist by hand.
  const isLightHero = location.pathname !== '/';
  const navTextClass = isLightHero ? 'text-[#0C2A2C]' : 'text-white';
  const navShadowClass = isLightHero ? '' : 'drop-shadow-lg';

  // Handle click on current page - smooth scroll to top
  const handlePageClick = (e, path) => {
    if (location.pathname === path) {
      e.preventDefault();
      // Close sidebar if open
      if (isOpen) {
        handleClose();
      }
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle logo click - reload when already on homepage to replay loader
  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.location.reload();
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
    // We intentionally only depend on pathname so the sidebar
    // closes when the route changes, not when isOpen toggles.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideDesktopDropdown = dropdownRef.current && dropdownRef.current.contains(event.target);
      const clickedInsideSidebarDropdown = sidebarDropdownRef.current && sidebarDropdownRef.current.contains(event.target);
      
      if (!clickedInsideDesktopDropdown && !clickedInsideSidebarDropdown) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);

  // Close dropdown on route change
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  return (
    <>
      <style>{`
        .navbar-container {
          padding-left: clamp(1.5rem, 3vw, 5rem);
          padding-right: clamp(1.5rem, 3vw, 5rem);
          padding-top: clamp(1.5rem, 3vh, 3rem);
        }
        
        .logo-text {
          font-size: clamp(1rem, 1.4vw + 0.4rem, 1.25rem);
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

        .sidebar-overlay {
          width: 100%;
          max-width: 100%;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          overscroll-behavior: none;
        }

        .sidebar-panel {
          height: 100vh;
          height: 100dvh;
          max-height: 100dvh;
          max-width: 100%;
          overflow: hidden;
          overscroll-behavior: contain;
        }

        .sidebar-content-shell {
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          padding-top: max(5rem, calc(3.5rem + env(safe-area-inset-top, 0px)));
          padding-right: 1.75rem;
          padding-bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
          padding-left: 1.75rem;
        }

        .sidebar-scroll-region {
          width: 100%;
          min-width: 0;
          overflow-x: hidden;
          overflow-y: auto;
          overscroll-behavior: contain;
        }

        .sidebar-socials {
          min-width: 0;
          flex-wrap: nowrap;
          gap: clamp(.2rem, 1.6vw, .5rem);
        }

        .sidebar-socials > a {
          width: clamp(2rem, 9vw, 2.25rem);
          min-width: 2rem;
          height: clamp(2rem, 9vw, 2.25rem);
        }
        
        @media (min-width: 768px) {
          .sidebar-width {
            width: clamp(20rem, 90vw, 30rem);
          }
        }

        @media (min-width: 640px) {
          .sidebar-content-shell {
            padding-right: 2rem;
            padding-left: 2rem;
          }
        }
        
        .sidebar-link {
          font-size: clamp(1.125rem, 2vw, 1.5rem);
          font-weight: 300;
        }
        
        .close-button {
          top: max(20px, env(safe-area-inset-top, 0px));
          right: 20px;
          width: 40px;
          height: 40px;
        }
        
        .close-icon {
          width: 16px;
          height: 16px;
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
              <Link to="/" className="block" onClick={handleLogoClick}>
                <p className={`logo-text font-bold ${navTextClass} tracking-wide ${navShadowClass} m-0`}>
                  <span className="font-bold">Aref </span>
                  <span className="font-thin">Saboor</span>
                </p>
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
                
                // Special handling for Projects link with dropdown
                if (link.name === 'Projects') {
                  return (
                    <div key={link.id} className="relative flex items-center gap-1" ref={dropdownRef}>
                      <Link
                        to={link.path}
                        onClick={(e) => {
                          handlePageClick(e, link.path);
                          setIsDropdownOpen(false);
                        }}
                        className={`relative ${navTextClass} hover:text-teal-400 transition-all duration-300 font-light ${navShadowClass} group transform ${hoverEffect}`}
                        style={{ fontSize: 'clamp(0.9375rem, 1vw + 0.25rem, 1.125rem)' }}
                      >
                        {link.name}
                        <span
                          className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-opacity duration-300 ${
                            location.pathname === link.path
                              ? 'bg-teal-300 opacity-100'
                              : 'bg-teal-400 opacity-0 group-hover:opacity-100'
                          }`}
                          style={{ bottom: 'clamp(-1.25rem, -1.5vw, -1.5rem)' }}
                        />
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDropdownOpen(!isDropdownOpen);
                        }}
                        className={`${navTextClass} hover:text-teal-400 transition-all duration-300`}
                        aria-label="Toggle projects dropdown"
                      >
                        <svg 
                          className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div
                        className={`absolute top-full right-0 mt-3 w-64 overflow-hidden rounded-md border border-[#2A5457]/70 py-2 transition-[opacity,transform] duration-150 ease-out ${
                          isDropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
                        }`}
                        style={{
                          zIndex: zIndex.navDropdown,
                          backgroundColor: '#08191A',
                          /* the same 32px drafting mesh as the pages, inverted for a dark ground */
                          backgroundImage:
                            'repeating-linear-gradient(to right, rgba(255,255,255,.05) 0 1px, transparent 1px 32px),' +
                            'repeating-linear-gradient(to bottom, rgba(255,255,255,.04) 0 1px, transparent 1px 32px)',
                          boxShadow: '0 4px 10px rgba(8,25,26,.28), 0 30px 64px -20px rgba(8,25,26,.6)',
                        }}
                      >
                        {projectNav.map((pr) => (
                          <Link
                            key={pr.slug}
                            to={`/projects#${pr.slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setIsDropdownOpen(false);
                              if (location.pathname !== '/projects') {
                                window.location.href = `/projects#${pr.slug}`;
                              } else {
                                document.getElementById(pr.slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }
                            }}
                            className="block px-6 py-3 text-[15px] font-light text-[#DCE6E5] hover:bg-white/[.06] hover:text-teal-300 transition-colors duration-150"
                          >
                            {pr.name}
                          </Link>
                        ))}
                        <Link
                          to="/projects"
                          onClick={(e) => { handlePageClick(e, '/projects'); setIsDropdownOpen(false); }}
                          className="mt-2 block border-t border-white/12 px-6 pb-1 pt-4 text-[15px] font-medium text-teal-300 hover:bg-white/[.06] hover:text-teal-200 transition-colors duration-150"
                        >
                          All projects
                        </Link>
                      </div>
                    </div>
                  );
                }
                
                // Regular link for other navigation items
                return (
                  <Link
                    key={link.id}
                    to={link.path}
                    onClick={(e) => handlePageClick(e, link.path)}
                    className={`relative ${navTextClass} hover:text-teal-400 transition-all duration-300 font-light ${navShadowClass} group transform ${hoverEffect}`}
                    style={{ fontSize: 'clamp(0.9375rem, 1vw + 0.25rem, 1.125rem)' }}
                  >
                    {link.name}
                    <span 
                      className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-opacity duration-300 ${
                        location.pathname === link.path && link.path !== '/'
                          ? 'bg-teal-300 opacity-100' 
                          : 'bg-teal-400 opacity-0 group-hover:opacity-100'
                      }`}
                      style={{ bottom: 'clamp(-1.25rem, -1.5vw, -1.5rem)' }}
                    />
                  </Link>
                );
              })}
              <a
                href="https://arefsaboor.com"
                target="_blank"
                rel="noreferrer"
                className={`relative ${navTextClass} hover:text-teal-400 transition-all duration-300 font-light ${navShadowClass} group transform hover:-translate-y-1`}
                style={{ fontSize: 'clamp(0.9375rem, 1vw + 0.25rem, 1.125rem)' }}
              >
                Writing <ExternalIcon className="ext-i inline-block align-[-1px] ml-1 w-3 h-3 text-teal-400" />
                <span className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ bottom: 'clamp(-1.25rem, -1.5vw, -1.5rem)' }} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Burger Menu Button */}
      <button
        onClick={toggleMenu}
        className={`burger-button fixed flex items-center justify-center rounded-full transition-all duration-300 ease-in-out group z-50 ${
          isScrolled || isMobile ? 'scale-100 opacity-100 bg-[#0C2A2C]/55 backdrop-blur-sm hover:bg-[#0C2A2C]/75' : 'scale-0 opacity-0 pointer-events-none'
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
        className={`sidebar-overlay fixed inset-0 transition-opacity duration-200 ${
          (isOpen || isClosing) ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: zIndex.sidebarOverlay }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#08191A]/60 transition-opacity duration-200 ${
            isOpen && !isClosing ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={toggleMenu}
          aria-hidden="true"
        />

        {/* Sidebar Container */}
        <aside
          ref={sidebarRef}
          className={`sidebar-panel sidebar-width absolute top-0 right-0 bg-gradient-to-br from-[#08191A] via-[#0C2A2C] to-[#123B3D] shadow-2xl will-change-transform transition-transform duration-[260ms] ease-[cubic-bezier(.32,.72,0,1)] ${
            isOpen && !isClosing ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ zIndex: zIndex.sidebar }}
        >
          {/* The same 32px drafting mesh as the pages, inverted for a dark ground. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to right, rgba(255,255,255,.045) 0 1px, transparent 1px 32px),' +
                'repeating-linear-gradient(to bottom, rgba(255,255,255,.035) 0 1px, transparent 1px 32px)',
              backgroundSize: '32px 100%, 100% 32px',
              backgroundPosition: 'left top, left bottom',
            }}
          />

          {/* Sidebar Content */}
          <div 
            className={`relative z-[1] w-full h-full transition-opacity duration-150 overflow-hidden ${
              isOpen && !isClosing ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* Close Button */}
            <button
              ref={closeButtonRef}
              onClick={toggleMenu}
              className={`close-button absolute rounded-full border border-white/25 text-white/80 hover:text-white hover:border-white/50 transition-colors duration-150 flex items-center justify-center z-10 outline-none focus:ring-2 focus:ring-teal-300/60 ${
                isOpen && !isClosing ? 'opacity-100' : 'opacity-0'
              }`}
              aria-label="Close navigation menu"
            >
              <svg 
                className="close-icon relative z-20" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>

            {/* Menu Content */}
            <div className="sidebar-content-shell flex flex-col h-full gap-8">
              {/* Scrolls on its own so opening Projects can never move the footer. */}
              <div className="sidebar-scroll-region flex-1 min-h-0">
                {/* Brand */}
                <div 
                  className={`transition-opacity duration-200 mb-8 ${
                    isOpen && !isClosing ? 'opacity-100 delay-75' : 'opacity-0'
                  }`}
                >
                  <h2 className="font-bold text-white text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3">
                    <span className="font-bold">Aref </span>
                    <span className="font-thin">Saboor</span>
                  </h2>
                </div>

                {/* Navigation Links */}
                <nav 
                  className={`flex flex-col gap-0.5 transition-opacity duration-200 ${
                    isOpen && !isClosing ? 'opacity-100 delay-100' : 'opacity-0'
                  }`}
                  aria-label="Main navigation"
                >
                {navigationLinks.map((link) => {
                  // Special handling for Projects link with dropdown
                  if (link.name === 'Projects') {
                    return (
                      <div key={link.id} className="relative" ref={sidebarDropdownRef}>
                        <div className="flex items-center justify-between gap-3">
                          <Link
                            to={link.path}
                            onClick={(e) => {
                              handlePageClick(e, link.path);
                              setIsDropdownOpen(false);
                            }}
                            className="relative flex-1 py-2 text-white hover:text-teal-300 transition-colors duration-150 font-normal group text-[17px]"
                          >
                            {link.name}
                            <span 
                              className={`absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-opacity duration-300 ${
                                location.pathname === link.path 
                                  ? 'bg-teal-300 opacity-100' 
                                  : 'bg-teal-400 opacity-0 group-hover:opacity-100'
                              }`}
                              style={{ marginLeft: '-0.75rem' }}
                              aria-hidden="true"
                            />
                          </Link>
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsDropdownOpen(prev => !prev); }}
                            className="p-2 -mr-2 text-white/70 hover:text-teal-300 transition-colors duration-150"
                            aria-label="Toggle projects dropdown"
                            aria-expanded={isDropdownOpen}
                          >
                            <svg className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>

                        {/* Opens inside the scrolling nav column, so the footer never moves. */}
                        <div
                          className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-out ${
                            isDropdownOpen ? 'max-h-[420px] opacity-100 mt-1 mb-1' : 'max-h-0 opacity-0'
                          }`}
                        >
                          {/* Projects first — arefsaboor.com leads — with the catch-all
                              link parked at the bottom. */}
                          <div className="flex flex-col border-l border-teal-400/25 pl-3">
                            {projectNav.map((pr) => (
                              <Link
                                key={pr.slug}
                                to={`/projects#${pr.slug}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsDropdownOpen(false);
                                  toggleMenu();
                                  if (location.pathname !== '/projects') {
                                    window.location.href = `/projects#${pr.slug}`;
                                  } else {
                                    document.getElementById(pr.slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                  }
                                }}
                                className="block py-1.5 text-[14px] font-light text-white/75 hover:text-teal-300 transition-colors duration-150"
                              >
                                {pr.name}
                              </Link>
                            ))}
                            <Link
                              to="/projects"
                              onClick={(e) => { handlePageClick(e, '/projects'); setIsDropdownOpen(false); toggleMenu(); }}
                              className="mt-1 block border-t border-white/10 pt-2 text-[14px] font-normal text-teal-300/90 hover:text-teal-300 transition-colors duration-150"
                            >
                              All projects
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  
                  // Regular links for other navigation items
                  return (
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
                      className="relative block py-2 text-white hover:text-teal-300 transition-colors duration-150 font-normal group text-[17px]"
                    >
                      {link.name}
                      <span 
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-opacity duration-300 ${
                          location.pathname === link.path 
                            ? 'bg-teal-300 opacity-100' 
                            : 'bg-teal-400 opacity-0 group-hover:opacity-100'
                        }`}
                        style={{ marginLeft: '-0.75rem' }}
                        aria-hidden="true"
                      />
                    </Link>
                  );
                })}
                <a
                  href="https://arefsaboor.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={toggleMenu}
                  className="relative block py-2 text-teal-300 hover:text-white transition-colors duration-150 font-normal text-[17px]"
                >
                  Writing <ExternalIcon className="ext-i inline-block align-[-1px] ml-1 w-3 h-3" />
                </a>
                </nav>
              </div>

              {/* Bottom Section: Footer Info */}
              <div 
                className={`w-full min-w-0 flex-shrink-0 transition-opacity duration-200 ${
                  isOpen && !isClosing ? 'opacity-100 delay-100' : 'opacity-0'
                }`}
              >
                {/* Social Links — a 64px band whose 1px top rule is part of its
                    own height, so the rule sits on a mesh line. */}
                <div className="sidebar-socials h-16 border-t border-white/15 flex items-center justify-center">
                  {/* His own site, first and in the accent — same order and
                      emphasis as the site footer's mark row */}
                  <a
                    href="https://arefsaboor.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border border-teal-300/45 rounded-lg flex items-center justify-center text-teal-300 hover:border-teal-300 hover:text-teal-200 transition-colors duration-150"
                    aria-label="arefsaboor.com"
                    title="arefsaboor.com — my writing site"
                  >
                    <svg className="w-[17px] h-[17px]" fill="currentColor" viewBox="0 0 100 100" aria-hidden="true">
                      <path d="M49.947 0A50 50 0 0 0 0 50a50 50 0 0 0 50 50a50 50 0 0 0 50-50A50 50 0 0 0 50 0a50 50 0 0 0-.053 0zM52.5 5.682c5.268.896 10.302 5.236 14.268 12.437c1.278 2.321 2.42 4.927 3.408 7.75H52.5V5.682zm-5 .197v19.99H30.75c.988-2.823 2.13-5.429 3.408-7.75C37.89 11.341 42.571 7.102 47.5 5.88zM35.98 7.232c-2.324 2.352-4.41 5.22-6.203 8.475c-1.68 3.05-3.125 6.467-4.312 10.162H12.01c5.535-8.706 13.975-15.37 23.97-18.637zm29.41.463c9.398 3.413 17.32 9.868 22.6 18.174H75.455c-1.184-3.695-2.627-7.112-4.307-10.162c-1.676-3.045-3.613-5.749-5.757-8.012zM9.257 30.87h14.808c-1.245 5.162-2.008 10.76-2.203 16.631H5.072a44.79 44.79 0 0 1 4.184-16.63zm19.974 0H47.5V47.5H26.867c.212-5.935 1.043-11.554 2.363-16.63zm23.27 0h19.195c1.32 5.077 2.152 10.696 2.364 16.631H52.5V30.87zm24.355 0h13.89a44.79 44.79 0 0 1 4.181 16.63H79.053c-.194-5.872-.955-11.468-2.198-16.63zM5.072 52.5h16.762c.129 5.856.82 11.454 1.994 16.63H9.256A44.79 44.79 0 0 1 5.072 52.5zm21.762 0H47.5v16.63H28.98c-1.245-5.1-2.006-10.715-2.146-16.63zm25.666 0h21.592c-.14 5.915-.902 11.53-2.147 16.63H52.5V52.5zm26.576 0h15.852a44.79 44.79 0 0 1-4.184 16.63H77.09c1.17-5.177 1.857-10.775 1.986-16.63zM12.01 74.13h13.136c1.242 4.085 2.8 7.84 4.631 11.165c1.438 2.61 3.068 4.969 4.854 7.017c-9.407-3.41-17.336-9.869-22.621-18.181zm18.394 0H47.5v20.798c-.308-.017-.612-.048-.918-.07c-4.59-1.5-8.924-5.62-12.424-11.975c-1.428-2.594-2.692-5.537-3.754-8.752zm22.096 0h18.021c-1.06 3.216-2.325 6.159-3.753 8.753c-3.428 6.225-7.656 10.308-12.141 11.883a45.48 45.48 0 0 1-2.127.162V74.13zm23.275 0H87.99a45.06 45.06 0 0 1-21.228 17.641c1.604-1.92 3.075-4.094 4.386-6.476c1.831-3.325 3.388-7.08 4.627-11.164z"/>
                    </svg>
                  </a>
                  {/* GitHub */}
                  <a 
                    href="https://github.com/arefsaboor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border border-white/20 rounded-lg flex items-center justify-center hover:border-teal-300/70 hover:text-teal-300 transition-colors duration-150"
                    aria-label="GitHub"
                    title="View my GitHub profile"
                  >
                    <svg className="w-[17px] h-[17px] text-white/85" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </a>
                  {/* Medium */}
                  <a 
                    href="https://medium.com/@arefsaboor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border border-white/20 rounded-lg flex items-center justify-center hover:border-teal-300/70 hover:text-teal-300 transition-colors duration-150"
                    aria-label="Medium"
                    title="Read my articles on Medium"
                  >
                    <svg className="w-[17px] h-[17px] text-white/85" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a 
                    href="https://linkedin.com/in/arefsaboor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border border-white/20 rounded-lg flex items-center justify-center hover:border-teal-300/70 hover:text-teal-300 transition-colors duration-150"
                    aria-label="LinkedIn"
                    title="Connect on LinkedIn"
                  >
                    <svg className="w-[17px] h-[17px] text-white/85" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  {/* Behance */}
                  <a 
                    href="https://behance.net/arefsaboor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border border-white/20 rounded-lg flex items-center justify-center hover:border-teal-300/70 hover:text-teal-300 transition-colors duration-150"
                    aria-label="Behance"
                    title="View my work on Behance"
                  >
                    <svg className="w-[17px] h-[17px] text-white/85" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11.524h3.391c2.093 0 2.093-3.137 0-3.137H3v3.137zm0 4.163h3.616c3.066 0 3.066-3.653 0-3.653H3v3.653z"/>
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a 
                    href="https://facebook.com/arefsaboor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border border-white/20 rounded-lg flex items-center justify-center hover:border-teal-300/70 hover:text-teal-300 transition-colors duration-150"
                    aria-label="Facebook"
                    title="Follow me on Facebook"
                  >
                    <svg className="w-[17px] h-[17px] text-white/85" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a 
                    href="https://instagram.com/arefsaboor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border border-white/20 rounded-lg flex items-center justify-center hover:border-teal-300/70 hover:text-teal-300 transition-colors duration-150"
                    aria-label="Instagram"
                    title="Follow me on Instagram"
                  >
                    <svg className="w-[17px] h-[17px] text-white/85" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
                
                {/* Colophon — the matching 64px band */}
                <div className="sidebar-colophon min-h-16 border-t border-white/20 flex flex-col items-center justify-center gap-1 py-2">
                  <p className="m-0 text-[#9FBAB9] text-center text-xs">
                    © {new Date().getFullYear()} Aref Saboor. All rights reserved.
                  </p>
                  <p className="m-0 text-[#9FBAB9]/70 text-center text-xs">
                    Designed and built by{' '}
                    <a
                      href="https://arefsaboor.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-300 hover:text-teal-200 transition-colors duration-150"
                    >
                      Aref Saboor
                    </a>
                    .
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
