import { Link } from 'react-router-dom';

function Footer() {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/arefsaboor',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'Medium',
      url: 'https://arefsaboor.medium.com',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/arefsaboor/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Behance',
      url: 'https://www.behance.net/arefsaboor',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/arefsaboor/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/arefsaboor.az/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white pt-20 pb-8 mt-auto overflow-hidden">
      <style>{`
        .globe-icon {
          filter: brightness(0) saturate(100%) invert(61%) sepia(8%) saturate(434%) hue-rotate(183deg) brightness(91%) contrast(87%);
          transition: filter 0.3s ease;
        }
        .location-item {
          color: rgb(156 163 175);
          transition: color 0.3s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .location-item:hover {
            color: rgb(45 212 191);
          }
          .location-item:hover .globe-icon {
            filter: brightness(0) saturate(100%) invert(68%) sepia(46%) saturate(826%) hue-rotate(131deg) brightness(93%) contrast(101%);
          }
        }
      `}</style>
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              <span className="font-bold">AREF </span>
              <span className="font-thin">SABOOR</span>
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
              Crafting designs that visually speak on screens!<br />
              Giving visual identity to ideas, products and brands<br />
              in the digital world.
            </p>
            
            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-teal-500/10 border border-gray-700 hover:border-teal-500/50 flex items-center justify-center text-gray-400 hover:text-teal-400 transition-all duration-300 hover:scale-110 hover:rotate-6"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-base font-semibold mb-6 text-gray-300 uppercase tracking-wider">Quick Links</h4>
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-400 hover:text-teal-400 transition-all duration-300 w-fit group flex items-center gap-2 relative">
                <span className="w-2 h-2 rounded-full bg-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                Home
              </Link>
              <Link to="/projects" className="text-gray-400 hover:text-teal-400 transition-all duration-300 w-fit group flex items-center gap-2 relative">
                <span className="w-2 h-2 rounded-full bg-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                Projects
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-teal-400 transition-all duration-300 w-fit group flex items-center gap-2 relative">
                <span className="w-2 h-2 rounded-full bg-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                About
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-teal-400 transition-all duration-300 w-fit group flex items-center gap-2 relative">
                <span className="w-2 h-2 rounded-full bg-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                Contact
              </Link>
              <Link to="/impressum" className="text-gray-400 hover:text-teal-400 transition-all duration-300 w-fit group flex items-center gap-2 relative">
                <span className="w-2 h-2 rounded-full bg-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                Impressum
              </Link>
            </div>
          </div>

          {/* Connect Section */}
          <div className="lg:col-span-4">
            <h4 className="text-base font-semibold mb-6 text-gray-300 uppercase tracking-wider">Get In Touch</h4>
            <div className="space-y-4 mb-8">
              <a 
                href="mailto:info@arefsaboor.com" 
                className="flex items-center gap-3 text-gray-400 hover:text-teal-400 transition-all duration-300 group"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span className="text-sm">info@arefsaboor.com</span>
              </a>
              <a 
                href="tel:+4917478176611" 
                className="flex items-center gap-3 text-gray-400 hover:text-teal-400 transition-all duration-300 group"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm">+49 (0) 174 781 76 11</span>
              </a>
              <div className="flex items-center gap-3 transition-all duration-300 location-item">
                <img 
                  src="/globe.svg" 
                  alt="Globe" 
                  className="w-5 h-5 globe-icon"
                />
                <span className="text-sm">Based in Berlin, Germany</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 pt-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Aref Saboor. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
