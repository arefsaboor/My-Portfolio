import { useState, useEffect } from 'react';
import heroTitles from '../data/HeroTitles.json';
import bulbIcon from '../bulb.svg';
import CVPreviewModal from '../components/CVPreviewModal';
import cvPdf from '../assets/Aref_Saboor_CV.pdf';

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const titles = heroTitles.skills;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000); // Faster rotation - 3 seconds

    return () => clearInterval(interval);
  }, [titles.length]);

  // Subtle parallax effect for hero background on scroll
  useEffect(() => {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const handleScroll = () => {
      const y = window.scrollY;
      const clamped = Math.min(y * 0.2, 80); // limit movement
      setParallaxOffset(clamped);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll helper for consistent behavior
  const smoothScrollTo = (targetId) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 900; // slightly slower, smoother
    let start = null;

    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuad(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  // Scroll to About section (used by both scroll indicators)
  const handleScrollToAbout = () => {
    smoothScrollTo('about');
  };

  // Handle CV button click - now shows modal on all devices
  const handleCVClick = () => {
    setIsCVModalOpen(true);
  };

  return (
    <section
      id="home"
      className="relative flex items-end"
      aria-label="Hero section"
      style={{ height: '100svh' }}
    >
      {/* SEO: Main heading for search engines */}
      <h1 className="sr-only">Aref Saboor - UX/UI Designer and Full Stack Developer based in Berlin</h1>
      
      {/* Screen reader live region for animated text */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        Currently highlighting: {titles[currentIndex]?.title}
      </div>

      {/* Background Image with Responsive Positioning - WebP optimized */}
      <div 
        className="hero-background absolute inset-0 z-0 w-full h-full"
        style={{
          backgroundImage: 'url(/IMAGE_002.webp), url(/IMAGE_002.jpg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll',
          backgroundPosition: `65% ${20 + parallaxOffset * 0.05}%`,
          transition: 'background-position 0.05s linear'
        }}
        role="img"
        aria-label="Portfolio hero background"
      ></div>
      
      <style>{`
        /* Base: Mobile-first approach - content at bottom */
        #home {
          padding-bottom: clamp(2.5rem, 5vh, 4rem);
          overflow: hidden;
        }
        
        .hero-background {
          background-position: 65% 20% !important;
        }
        
        /* Desktop: Large screens 1536px+ - content nearly centered (slightly below) */
        @media (min-width: 1536px) {
          #home {
            height: 100vh !important;
            align-items: center !important;
            padding-top: 14vh;
            padding-bottom: 0;
          }
          
          .hero-background {
            background-position: 75% 18% !important;
          }
          
          .hero-main-container {
            margin-top: 0;
          }
        }
        
        /* Medium desktop screens - nearly centered */
        @media (min-width: 1024px) and (max-width: 1535px) {
          #home {
            align-items: center !important;
            padding-top: 12vh;
            padding-bottom: 0;
          }
          
          .hero-main-container {
            margin-top: 0;
          }
        }
        
        /* Intermediate desktop sizes */
        @media (min-width: 1400px) and (max-width: 1535px) {
          .hero-background {
            background-position: 70% 18% !important;
          }
        }
        
        @keyframes scrollIndicator {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(12px);
          }
        }
        
        .scroll-indicator-animate {
          animation: scrollIndicator 2s ease-in-out infinite;
        }
        
        /* Hide desktop scroll indicator until layout switches */
        .desktop-scroll-indicator {
          display: none !important;
        }
        
        /* Show mobile scroll indicator until layout switches */
        .mobile-scroll-indicator {
          display: flex !important;
        }
        
        @media (min-width: 1536px) {
          .desktop-scroll-indicator {
            display: flex !important;
          }
          
          .mobile-scroll-indicator {
            display: none !important;
          }
        }
        
        /* Fluid sizing with clamp() */
        .hero-content-wrapper {
          padding-left: clamp(1.5rem, 3vw, 5rem);
          padding-right: clamp(1.5rem, 3vw, 5rem);
        }
        
        .hero-main-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
          max-width: 100vw;
          box-sizing: border-box;
          margin: 0 auto;
          padding-left: clamp(1.5rem, 3vw, 5rem);
          padding-right: clamp(1.5rem, 3vw, 5rem);
          position: relative;
          z-index: 5;
        }
        
        @media (min-width: 1024px) {
          .hero-main-container {
            max-width: 1800px;
          }
        }
        
        .hero-icon {
          width: clamp(1.25rem, 2vw, 2.5rem);
          height: clamp(1.25rem, 2vw, 2.5rem);
          flex-shrink: 0;
        }
        
        .hero-content-gap {
          gap: clamp(0.75rem, 2vw, 2rem);
        }
        
        .hero-content-row-gap {
          margin-bottom: clamp(0.5rem, 1vh, 1rem);
        }
        
        .hero-content-box {
          padding-left: clamp(0.75rem, 2vw, 1.5rem);
          padding-right: clamp(0.75rem, 2vw, 1.5rem);
          max-width: 100%;
          overflow: hidden;
        }
        
        .hero-animated-box {
          min-width: clamp(9rem, 30vw, 18.75rem);
          max-width: 100%;
          min-height: clamp(1.5rem, 4vh, 4rem);
        }
        
        @media (max-width: 375px) {
          .hero-animated-box {
            min-width: 8rem;
          }
        }
        
        .hero-animated-text {
          font-size: clamp(0.875rem, 1.5vw, 1.25rem);
          text-overflow: ellipsis;
        }
        
        @media (max-width: 375px) {
          .hero-animated-text {
            font-size: 0.8rem;
          }
        }
        
        .hero-main-heading {
          font-size: clamp(1.125rem, 4vw, 3rem);
        }
        
        @media (max-width: 375px) {
          .hero-main-heading {
            font-size: 1rem;
          }
        }
        
        .scroll-text {
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #5eead4;
          text-shadow: 0 0 15px rgba(94, 234, 212, 0.6);
        }
        
        @media (max-width: 768px) {
          .scroll-text {
            font-size: 0.625rem;
          }
        }
        
        .hero-cta-button {
          min-height: clamp(1.5rem, 4vh, 4rem);
          width: 180px;
          padding-left: clamp(1.5rem, 2vw, 1.5rem);
          padding-right: clamp(1.5rem, 2vw, 1.5rem);
          background: #5eead4;
          color: #0a3d35;
          font-size: clamp(0.875rem, 1.5vw, 1.125rem);
          font-weight: 500;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        
        .hero-cta-button:hover {
          background: #0d9488;
          color: white;
          transform: translateY(-1px);
        }
        
        .hero-cta-button:active {
          transform: translateY(0);
        }
        
        .hero-cta-button-secondary {
          min-height: clamp(1.5rem, 4vh, 4rem);
          width: 180px;
          padding-top: 0;
          padding-bottom: 0;
          padding-left: clamp(1.5rem, 2vw, 1.5rem);
          padding-right: clamp(1.5rem, 2vw, 1.5rem);
          background: transparent;
          color: white;
          font-size: clamp(0.875rem, 1.5vw, 1.125rem);
          font-weight: 500;
          line-height: 1;
          border-radius: 9999px;
          border: 2px solid #5eead4;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 640px) {
          .hero-cta-button-secondary {
            border-width: 1px;
          }
        }
        
        .hero-cta-button-secondary:hover {
          background: rgba(5, 46, 44, 0.8);
          border-color: #14b8a6;
          transform: translateY(-1px);
        }
        
        .hero-cta-button-secondary:active {
          transform: translateY(0);
        }
        
        .scroll-border {
          width: 3.5rem;
          height: 5rem;
          border-width: 1px;
          border-color: #5eead4;
          box-shadow: 0 0 20px rgba(94, 234, 212, 0.5);
        }
        
        @media (max-width: 768px) {
          .scroll-border {
            width: 2.5rem;
            height: 3.75rem;
          }
        }
        
        .scroll-dot {
          width: 0.25rem;
          height: 0.875rem;
          margin-top: 0.25rem;
          background-color: #5eead4;
          box-shadow: 0 0 18px rgba(94, 234, 212, 0.7);
        }
        
        @media (max-width: 768px) {
          .scroll-dot {
            width: 0.2rem;
            height: 0.625rem;
            margin-top: 0.2rem;
          }
        }
        
        .scroll-arrow {
          width: 1.5rem;
          height: 1.5rem;
          margin-bottom: 0.25rem;
          color: #5eead4;
          filter: drop-shadow(0 0 12px rgba(94, 234, 212, 0.6));
        }
        
        @media (max-width: 768px) {
          .scroll-arrow {
            width: 1rem;
            height: 1rem;
            margin-bottom: 0.15rem;
          }
        }
        
        .scroll-gap {
          gap: 0.5rem;
        }
        
        @media (max-width: 768px) {
          .scroll-gap {
            gap: 0.35rem;
          }
        }
        
        .scroll-indicator-wrapper {
          cursor: pointer;
          transition: all 0.3s ease;
          background: none;
          border: none;
          padding: 0;
          position: relative;
          z-index: 100;
        }
        
        /* Mobile specific - ensure button is always tappable */
        @media (max-width: 1535px) {
          .mobile-scroll-indicator {
            position: relative;
            z-index: 999;
          }
        }
        
        .scroll-indicator-wrapper:hover .scroll-border {
          border-color: #fbbf24;
          box-shadow: 0 0 25px rgba(251, 191, 36, 0.4), 0 0 35px rgba(251, 146, 60, 0.3), 0 0 45px rgba(96, 165, 250, 0.2);
        }
        
        .scroll-indicator-wrapper:hover .scroll-text {
          color: #fbbf24;
          text-shadow: 0 0 15px rgba(251, 191, 36, 0.6), 0 0 20px rgba(251, 146, 60, 0.3);
        }
        
        .scroll-indicator-wrapper:hover .scroll-dot {
          background-color: #fbbf24;
          box-shadow: 0 0 15px rgba(251, 191, 36, 0.6), 0 0 20px rgba(251, 146, 60, 0.4);
        }
        
        .scroll-indicator-wrapper:hover .scroll-arrow {
          color: #fbbf24;
          filter: drop-shadow(0 0 12px rgba(251, 191, 36, 0.6)) drop-shadow(0 0 18px rgba(251, 146, 60, 0.4)) drop-shadow(0 0 24px rgba(96, 165, 250, 0.2));
        }
        
        .scroll-indicator-wrapper:active {
          transform: scale(0.95);
        }
        
        /* Respect user's motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .scroll-indicator-animate {
            animation: none;
          }
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }


      `}</style>

      {/* Main Container with Content and Scroll Indicator */}
      <div className="hero-main-container relative z-10">
        {/* Hero Content */}
        <div>
        <div>
        <div className="flex items-center hero-content-gap hero-content-row-gap">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="hero-icon text-white transition-transform hover:scale-110 duration-300" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
          </svg>
          <div className="relative hero-content-box hero-animated-box overflow-hidden flex items-center border-l-2 border-teal-400/50" style={{ background: 'linear-gradient(to right, rgba(17, 24, 39, 0.9) 0%, rgba(17, 24, 39, 0.6) 60%, rgba(17, 24, 39, 0.2) 75%, transparent 90%, transparent 100%)' }}>
            {titles.map((item, index) => (
              <p
                key={item.id}
                className={`absolute hero-animated-text text-white font-normal transition-all duration-300 ease-in-out text-left whitespace-nowrap ${
                  index === currentIndex
                    ? 'translate-y-0 opacity-100'
                    : index === (currentIndex - 1 + titles.length) % titles.length
                      ? '-translate-y-full opacity-0'
                      : 'translate-y-full opacity-0'
                  }`}
              >
                {item.title}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-center hero-content-gap hero-content-row-gap">
          <svg className="hero-icon text-white transition-transform hover:scale-110 duration-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path fillRule="evenodd" d="M15.514 3.293a1 1 0 0 0-1.415 0L12.151 5.24a.93.93 0 0 1 .056.052l6.5 6.5a.97.97 0 0 1 .052.056L20.707 9.9a1 1 0 0 0 0-1.415l-5.193-5.193ZM7.004 8.27l3.892-1.46 6.293 6.293-1.46 3.893a1 1 0 0 1-.603.591l-9.494 3.355a1 1 0 0 1-.98-.18l6.452-6.453a1 1 0 0 0-1.414-1.414l-6.453 6.452a1 1 0 0 1-.18-.98l3.355-9.494a1 1 0 0 1 .591-.603Z" clipRule="evenodd" />
          </svg>
          <div className="hero-content-box flex items-center border-l-2 border-teal-400/50" style={{ background: 'linear-gradient(to right, rgba(17, 24, 39, 0.9) 0%, rgba(17, 24, 39, 0.6) 60%, rgba(17, 24, 39, 0.2) 75%, transparent 90%, transparent 100%)' }}>
            <h2 className="hero-main-heading text-white animate-fade-in-delay font-medium leading-none" style={{ paddingTop: 'clamp(0.15rem, 1vh, 1.5rem)', paddingBottom: 'clamp(0.15rem, 1vh, 1.5rem)' }}>
              UX/UI Designer
            </h2>
          </div>
        </div>
        <div className="flex items-center hero-content-gap hero-content-row-gap">
          <svg className="hero-icon text-white transition-transform hover:scale-110 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <div className="hero-content-box flex items-center border-l-2 border-teal-400/50" style={{ background: 'linear-gradient(to right, rgba(17, 24, 39, 0.9) 0%, rgba(17, 24, 39, 0.6) 60%, rgba(17, 24, 39, 0.2) 75%, transparent 90%, transparent 100%)' }}>
            <h2 className="hero-main-heading text-white animate-fade-in-delay font-medium leading-none" style={{ paddingTop: 'clamp(0.15rem, 1vh, 1.5rem)', paddingBottom: 'clamp(0.15rem, 1vh, 1.5rem)' }}>
              Full Stack Developer
            </h2>
          </div>
        </div>
        </div>
        
        {/* Tagline - Hidden on mobile */}
        <div className="hidden md:flex items-center hero-content-gap hero-content-row-gap" style={{ marginTop: 'clamp(1rem, 2vh, 1.5rem)' }}>
          <img src={bulbIcon} alt="Idea icon" className="hero-icon transition-transform hover:scale-110 duration-300" style={{ filter: 'brightness(0) saturate(100%) invert(81%) sepia(55%) saturate(471%) hue-rotate(343deg) brightness(101%) contrast(98%)' }} />
          <div className="hero-content-box flex items-center border-l-2 border-teal-400/70" style={{ paddingTop: 'clamp(0.5rem, 1vh, 1rem)', paddingBottom: 'clamp(0.5rem, 1vh, 1rem)', background: 'linear-gradient(to right, rgba(17, 24, 39, 0.95) 0%, rgba(17, 24, 39, 0.85) 50%, rgba(17, 24, 39, 0.6) 70%, rgba(17, 24, 39, 0.3) 85%, transparent 95%, transparent 100%)' }}>
            <p className="text-white/90 font-light leading-relaxed" style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)', maxWidth: '600px' }}>
              Writer & Journalist turned Web Developer. :)<br />
              I don't just build websites, I create visual experiences<br />
              that tell stories and captivate audiences.
            </p>
          </div>
        </div>
        
        {/* Based in Berlin */}
        <div>
        <div className="flex items-center hero-content-gap hero-content-row-gap">
          <img src="/globe.svg" alt="Location icon" className="hero-icon transition-transform hover:scale-110 duration-300" style={{ filter: 'brightness(0) invert(1)' }} />
          <div className="relative hero-content-box hero-animated-box overflow-hidden flex items-center border-l-2 border-teal-400/50" style={{ background: 'linear-gradient(to right, rgba(17, 24, 39, 0.9) 0%, rgba(17, 24, 39, 0.6) 60%, rgba(17, 24, 39, 0.2) 75%, transparent 90%, transparent 100%)' }}>
            <p className="hero-animated-text text-white font-normal whitespace-nowrap">
              Based in Berlin
            </p>
          </div>
        </div>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4" style={{ marginTop: 'clamp(1.5rem, 3vh, 2.5rem)', marginLeft: 'calc(clamp(1.25rem, 2vw, 2.5rem) + clamp(0.75rem, 2vw, 2rem))' }}>
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="hero-cta-button"
            aria-label="View my projects"
          >
            Recent Works
          </button>
          
          <button 
            onClick={handleCVClick}
            className="hero-cta-button-secondary"
            aria-label="Preview CV"
          >
            Resume
          </button>
        </div>
        </div>
        </div>

        {/* Scroll Indicator - Mobile */}
        <button 
          onClick={handleScrollToAbout}
          className="mobile-scroll-indicator scroll-indicator-wrapper flex flex-col items-center self-end scroll-indicator-animate scroll-gap"
          aria-label="Scroll to next section"
          type="button"
          style={{ 
            minWidth: '60px', 
            minHeight: '80px',
            padding: '8px'
          }}
        >
          <span className="scroll-text font-light">Scroll</span>
          <div className="scroll-border border-teal-400/30 rounded-full flex flex-col items-center justify-between" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
            <div className="scroll-dot bg-teal-400 rounded-full"></div>
            <svg className="scroll-arrow text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Scroll Indicator - Desktop */}
        <button 
          onClick={handleScrollToAbout}
          className="desktop-scroll-indicator scroll-indicator-wrapper flex flex-col items-center self-end scroll-indicator-animate scroll-gap"
          aria-label="Scroll to next section"
          type="button"
        >
          <span className="scroll-text font-light">Scroll</span>
          <div className="scroll-border border-teal-400/30 rounded-full flex flex-col items-center justify-between" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
            <div className="scroll-dot bg-teal-400 rounded-full"></div>
            <svg className="scroll-arrow text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      </div>

      {/* CV Preview Modal */}
      <CVPreviewModal 
        isOpen={isCVModalOpen} 
        onClose={() => setIsCVModalOpen(false)}
        pdfUrl={cvPdf}
      />
    </section>
  );
}

export default Hero;
