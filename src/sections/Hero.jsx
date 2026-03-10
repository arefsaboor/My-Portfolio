import { useState, useEffect } from 'react';
import heroTitles from '../data/HeroTitles.json';

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const titles = heroTitles.skills;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [titles.length]);

  // Smooth scroll with optimized easing
  const smoothScrollTo = (targetId) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; // 0.8 seconds - faster and smoother
    let start = null;

    // Smoother easing function - less extreme than cubic
    const easeInOutQuad = (t) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

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

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-end"
      aria-label="Hero section"
      style={{ minHeight: '100vh', minHeight: '100svh' }}
    >
      {/* SEO: Main heading for search engines */}
      <h1 className="sr-only">Aref Saboor - UX/UI Designer and Full Stack Developer based in Berlin</h1>
      
      {/* Screen reader live region for animated text */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        Currently highlighting: {titles[currentIndex]?.title}
      </div>

      {/* Background Image with Responsive Positioning - WebP optimized */}
      <picture className="hero-background absolute inset-0 z-0">
        <source srcSet="/IMAGE_002.webp" type="image/webp" />
        <source srcSet="/IMAGE_002.jpg" type="image/jpeg" />
        <div 
          className="hero-background absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/IMAGE_002.jpg)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'scroll',
            backgroundPosition: '65% 20%'
          }}
          role="img"
          aria-label="Portfolio hero background"
        ></div>
      </picture>
      
      <style>{`
        /* Base: Mobile-first approach - content at bottom */
        #home {
          padding-bottom: clamp(4rem, 8vh, 6rem);
        }
        
        .hero-background {
          background-position: 65% 20% !important;
          transform: scale(1.15);
          transform-origin: 65% 20%;
        }
        
        /* Desktop: Large screens 1536px+ - content at top */
        @media (min-width: 1536px) {
          #home {
            min-height: 140vh !important;
            align-items: flex-start !important;
            padding-top: 50vh;
            padding-bottom: 0;
          }
          
          .hero-background {
            background-position: 75% 18% !important;
            transform: none;
            transform-origin: initial;
          }
          
          .hero-main-container {
            margin-top: -18vh;
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
          max-width: 1800px;
          margin: 0 auto;
          padding-left: clamp(1.5rem, 3vw, 5rem);
          padding-right: clamp(1.5rem, 3vw, 5rem);
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
        }
        
        .hero-animated-box {
          min-width: clamp(11.25rem, 30vw, 18.75rem);
          min-height: clamp(1.5rem, 4vh, 4rem);
        }
        
        .hero-animated-text {
          font-size: clamp(0.875rem, 1.5vw, 1.25rem);
        }
        
        .hero-main-heading {
          font-size: clamp(1.125rem, 4vw, 3rem);
        }
        
        .scroll-text {
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .hero-cta-button {
          margin-top: clamp(1.5rem, 3vh, 2.5rem);
          margin-left: calc(clamp(1.25rem, 2vw, 2.5rem) + clamp(0.75rem, 2vw, 2rem));
          min-height: clamp(1.5rem, 4vh, 4rem);
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
        
        .scroll-border {
          width: 3.5rem;
          height: 5rem;
          border-width: 2px;
        }
        
        .scroll-dot {
          width: 0.25rem;
          height: 0.875rem;
          margin-top: 0.25rem;
        }
        
        .scroll-arrow {
          width: 1rem;
          height: 1rem;
          margin-bottom: 0.25rem;
        }
        
        .scroll-gap {
          gap: 0.5rem;
        }
        
        .scroll-indicator-wrapper {
          cursor: pointer;
          transition: all 0.3s ease;
          background: none;
          border: none;
          padding: 0;
        }
        
        .scroll-indicator-wrapper:hover .scroll-border {
          border-color: #5eead4;
          box-shadow: 0 0 20px rgba(94, 234, 212, 0.6);
        }
        
        .scroll-indicator-wrapper:hover .scroll-text {
          color: #5eead4;
        }
        
        .scroll-indicator-wrapper:hover .scroll-dot {
          background-color: #5eead4;
          box-shadow: 0 0 10px rgba(94, 234, 212, 0.8);
        }
        
        .scroll-indicator-wrapper:hover .scroll-arrow {
          color: #5eead4;
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
          <div className="relative hero-content-box hero-animated-box overflow-hidden bg-gradient-to-r from-gray-900/80 via-teal-950/50 to-transparent backdrop-blur-sm flex items-center border-l-2 border-teal-400/50">
            {titles.map((item, index) => (
              <p
                key={item.id}
                className={`absolute hero-animated-text text-white font-normal transition-all duration-500 ease-in-out text-left whitespace-nowrap ${
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
          <div className="hero-content-box bg-gradient-to-r from-gray-900/80 via-teal-950/50 to-transparent backdrop-blur-sm flex items-center border-l-2 border-teal-400/50">
            <h2 className="hero-main-heading text-white animate-fade-in-delay font-medium leading-none" style={{ paddingTop: 'clamp(0.15rem, 1vh, 1.5rem)', paddingBottom: 'clamp(0.15rem, 1vh, 1.5rem)' }}>
              UX/UI Designer
            </h2>
          </div>
        </div>
        <div className="flex items-center hero-content-gap hero-content-row-gap">
          <svg className="hero-icon text-white transition-transform hover:scale-110 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <div className="hero-content-box bg-gradient-to-r from-gray-900/80 via-teal-950/50 to-transparent backdrop-blur-sm flex items-center border-l-2 border-teal-400/50">
            <h2 className="hero-main-heading text-white animate-fade-in-delay font-medium leading-none" style={{ paddingTop: 'clamp(0.15rem, 1vh, 1.5rem)', paddingBottom: 'clamp(0.15rem, 1vh, 1.5rem)' }}>
              Full Stack Developer
            </h2>
          </div>
        </div>
        </div>
        
        {/* Based in Berlin */}
        <div>
        <div className="flex items-center hero-content-gap hero-content-row-gap">
          <img src="/globe.svg" alt="Location icon" className="hero-icon transition-transform hover:scale-110 duration-300" style={{ filter: 'brightness(0) invert(1)' }} />
          <div className="relative hero-content-box hero-animated-box overflow-hidden bg-gradient-to-r from-gray-900/80 via-teal-950/50 to-transparent backdrop-blur-sm flex items-center border-l-2 border-teal-400/50">
            <p className="hero-animated-text text-white font-normal whitespace-nowrap">
              Based in Berlin
            </p>
          </div>
        </div>
        
        {/* Call to Action */}
        <button 
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          className="hero-cta-button"
          aria-label="View my projects"
        >
          View My Work
        </button>
        </div>
        </div>

        {/* Scroll Indicator - Mobile */}
        <button 
          onClick={() => smoothScrollTo('info')}
          className="mobile-scroll-indicator scroll-indicator-wrapper flex flex-col items-center self-end scroll-indicator-animate scroll-gap"
          aria-label="Scroll to next section"
        >
          <span className="scroll-text font-light">Scroll</span>
          <div className="scroll-border border-white/30 rounded-full flex flex-col items-center justify-between" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
            <div className="scroll-dot bg-teal-400 rounded-full"></div>
            <svg className="scroll-arrow text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Scroll Indicator - Desktop */}
        <button 
          onClick={() => smoothScrollTo('info')}
          className="desktop-scroll-indicator scroll-indicator-wrapper flex flex-col items-center self-end scroll-indicator-animate scroll-gap"
          aria-label="Scroll to next section"
        >
          <span className="scroll-text font-light">Scroll</span>
          <div className="scroll-border border-white/30 rounded-full flex flex-col items-center justify-between" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
            <div className="scroll-dot bg-teal-400 rounded-full"></div>
            <svg className="scroll-arrow text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      </div>
    </section>
  );
}

export default Hero;
