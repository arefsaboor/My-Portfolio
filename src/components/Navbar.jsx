import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-black/60 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-2xl font-bold bg-white bg-clip-text text-transparent tracking-wide">
                <span className="font-bold">AREF </span>
                <span className="font-thin">SABOOR</span>
              </h1>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to="/" className="relative text-white hover:text-teal-400 transition-all duration-300 font-medium hover:scale-110 hover:-translate-y-1 group">
                Home
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
              
              <Link to="/projects" className="relative text-white hover:text-teal-400 transition-all duration-300 font-medium hover:scale-110 hover:-translate-y-1 group">
                Projects
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>

              <Link to="/about" className="relative text-white hover:text-teal-400 transition-all duration-300 font-medium hover:scale-110 hover:-translate-y-1 group">
                About
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>

              <Link to="/contact" className="relative text-white hover:text-teal-400 transition-all duration-300 font-medium hover:scale-110 hover:-translate-y-1 group">
                Contact
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-teal-400 hover:bg-teal-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-teal-900 shadow-lg">
            <Link to="/" onClick={() => setIsOpen(false)} className="block w-full text-left px-3 py-2 text-white hover:text-teal-400 hover:bg-teal-800 rounded-md font-medium">
              Home
            </Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block w-full text-left px-3 py-2 text-white hover:text-teal-400 hover:bg-teal-800 rounded-md font-medium">
              About
            </Link>
            <Link to="/projects" onClick={() => setIsOpen(false)} className="block w-full text-left px-3 py-2 text-white hover:text-teal-400 hover:bg-teal-800 rounded-md font-medium">
              Projects
            </Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block w-full text-left px-3 py-2 text-white hover:text-teal-400 hover:bg-teal-800 rounded-md font-medium">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
