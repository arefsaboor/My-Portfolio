import { Link } from 'react-router-dom';
import { socialLinks } from '../data/contactData';
import readingSvg from '../assets/interests/Reading.svg';
import writingSvg from '../assets/interests/Writing.svg';
import joggingSvg from '../assets/interests/Jogging.svg';
import yogaSvg from '../assets/interests/Yoga.svg';
import learningSvg from '../assets/interests/Learning.svg';

function Footer() {
  return (
    <footer className="relative bg-teal-950 text-white mt-auto overflow-hidden">
      <style>{`
        .footer-link {
          position: relative;
          display: inline-block;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: white;
          transition: width 0.3s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .footer-link:hover::after {
            width: 100%;
          }
        }
      `}</style>

      {/* CTA Section */}
      <div className="border-b border-teal-600/50 py-12 md:py-14">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-light text-white mb-2">
                Ready for your next project?
              </h2>
              <p className="text-teal-50 text-sm md:text-base">
                Let's build something exceptional together.
              </p>
            </div>
            <a 
              href="mailto:arefsaboor.m@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-colors duration-300 whitespace-nowrap"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12">
            
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <h3 className="font-light text-white text-lg mb-3">Aref Saboor</h3>
              <p className="text-teal-50 text-sm leading-relaxed">
                UX/UI Designer & Full Stack Developer based in Berlin.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-sm font-semibold mb-4 text-white">Navigation</h4>
              <div className="flex flex-col space-y-3">
                <Link to="/" className="footer-link text-teal-50 hover:text-white transition-colors duration-300 text-sm">
                  Home
                </Link>
                <Link to="/projects" className="footer-link text-teal-50 hover:text-white transition-colors duration-300 text-sm">
                  Projects
                </Link>
                <Link to="/about" className="footer-link text-teal-50 hover:text-white transition-colors duration-300 text-sm">
                  About
                </Link>
                <Link to="/contact" className="footer-link text-teal-50 hover:text-white transition-colors duration-300 text-sm">
                  Contact
                </Link>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold mb-4 text-white">Resources</h4>
              <div className="flex flex-col space-y-3">
                <a href="https://medium.com/@arefsaboor" target="_blank" rel="noopener noreferrer" className="footer-link text-teal-50 hover:text-white transition-colors duration-300 text-sm">
                  Blog
                </a>
                <a href="/Resume_Aref_Saboor.pdf" target="_blank" rel="noopener noreferrer" className="footer-link text-teal-50 hover:text-white transition-colors duration-300 text-sm">
                  CV
                </a>
                <Link to="/impressum" className="footer-link text-teal-50 hover:text-white transition-colors duration-300 text-sm">
                  Impressum
                </Link>
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-sm font-semibold mb-4 text-white">Connect</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-teal-50 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Berlin, Germany</span>
                </div>
                <a 
                  href="mailto:arefsaboor.m@gmail.com" 
                  className="flex items-center gap-2 text-teal-50 hover:text-white transition-colors duration-300 text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-teal-600/50 pt-8 mb-8">
            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white text-white hover:text-teal-600 flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Interests Section */}
            <div className="mb-8">
              <p className="text-xs font-medium uppercase tracking-wider text-teal-50 mb-8 text-center">Beyond the Keyboard</p>
              <div className="flex flex-wrap justify-center gap-10">
                {/* Reading */}
                <div className="flex flex-col items-center gap-3">
                  <img src={readingSvg} alt="Reading" className="w-10 h-10" style={{ filter: 'invert(1)' }} />
                  <span className="text-xs text-teal-50 font-medium">Reading</span>
                </div>

                {/* Writing */}
                <div className="flex flex-col items-center gap-3">
                  <img src={writingSvg} alt="Writing" className="w-10 h-10" style={{ filter: 'invert(1)' }} />
                  <span className="text-xs text-teal-50 font-medium">Writing</span>
                </div>

                {/* Jogging */}
                <div className="flex flex-col items-center gap-3">
                  <img src={joggingSvg} alt="Jogging" className="w-10 h-10" style={{ filter: 'invert(1)' }} />
                  <span className="text-xs text-teal-50 font-medium">Jogging</span>
                </div>

                {/* Yoga */}
                <div className="flex flex-col items-center gap-3">
                  <img src={yogaSvg} alt="Yoga" className="w-10 h-10" style={{ filter: 'invert(1)' }} />
                  <span className="text-xs text-teal-50 font-medium">Yoga</span>
                </div>

                {/* Learning */}
                <div className="flex flex-col items-center gap-3">
                  <img src={learningSvg} alt="Learning" className="w-10 h-10" style={{ filter: 'invert(1)' }} />
                  <span className="text-xs text-teal-50 font-medium">Learning</span>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="text-center pt-8">
              <p className="text-teal-100 text-xs">
                © {new Date().getFullYear()} Aref Saboor. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
