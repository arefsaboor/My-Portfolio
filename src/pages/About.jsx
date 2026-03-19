import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLoader from '../components/PageLoader';
import WebImage from '../assets/Web-Image-Full.jpg';
import CVPreviewModal from '../components/CVPreviewModal';
import { smoothScrollToId } from '../utils/smoothScroll';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  // Smooth scroll to next section
  const scrollToContent = () => {
    smoothScrollToId('about-story');
  };

  return (
    <>
      {showLoader && <PageLoader pageName="About" onComplete={() => { setShowLoader(false); setIsVisible(true); }} />}
      <div className="bg-white">
      {/* Hero Section - Full Screen Immersive */}
      <section 
        id="about-hero"
        className="relative w-full flex items-end lg:items-center overflow-hidden about-hero-section pt-12 md:pt-16 lg:pt-20"
        style={{ minHeight: '100vh' }}
      >
        <style>{`
          .about-hero-section .hero-bg {
            background-position: 35% 30%;
            transform: scale(1.05);
            transform-origin: 35% 30%;
          }
          
          @media (min-width: 769px) and (max-width: 1024px) {
            .about-hero-section .hero-bg {
              background-position: 10% 30%;
              transform-origin: 10% 30%;
              transform: scale(1.05);
            }
          }
          
          @media (max-width: 768px) {
            .about-hero-section .hero-bg {
              background-position: 18% 30%;
              transform-origin: 18% 30%;
              transform: scale(1.05);
            }
          }

          /* Scroll Indicator Styles */
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
          
          /* About hero heading */
          .about-hero-heading {
            line-height: 1.2;
          }
          
          @media (min-width: 1024px) {
            .about-hero-heading {
              line-height: 0.8;
            }
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
          
          @media (prefers-reduced-motion: reduce) {
            .scroll-indicator-animate {
              animation: none;
            }
          }

          /* Reversed Scroll Indicator Styles */
          .scroll-indicator-reversed .scroll-text-reversed {
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #5eead4;
            text-shadow: 0 0 15px rgba(94, 234, 212, 0.6);
          }
          
          @media (max-width: 768px) {
            .scroll-indicator-reversed .scroll-text-reversed {
              font-size: 0.625rem;
            }
          }
          
          .scroll-indicator-reversed .scroll-border-reversed {
            width: 3.5rem;
            height: 5rem;
            border-width: 1px;
            border-color: #5eead4;
            box-shadow: 0 0 20px rgba(94, 234, 212, 0.5);
          }
          
          @media (max-width: 768px) {
            .scroll-indicator-reversed .scroll-border-reversed {
              width: 2.5rem;
              height: 3.75rem;
            }
          }
          
          .scroll-indicator-reversed .scroll-dot-reversed {
            width: 0.25rem;
            height: 0.875rem;
            margin-top: 0.25rem;
            background-color: #5eead4;
            box-shadow: 0 0 18px rgba(94, 234, 212, 0.7);
          }
          
          @media (max-width: 768px) {
            .scroll-indicator-reversed .scroll-dot-reversed {
              width: 0.2rem;
              height: 0.625rem;
              margin-top: 0.2rem;
            }
          }
          
          .scroll-indicator-reversed .scroll-arrow-reversed {
            width: 1.5rem;
            height: 1.5rem;
            margin-bottom: 0.25rem;
            color: #5eead4;
            filter: drop-shadow(0 0 12px rgba(94, 234, 212, 0.6));
          }
          
          @media (max-width: 768px) {
            .scroll-indicator-reversed .scroll-arrow-reversed {
              width: 1rem;
              height: 1rem;
              margin-bottom: 0.15rem;
            }
          }
          
          .scroll-indicator-reversed:hover .scroll-border-reversed {
            border-color: #fbbf24;
            box-shadow: 0 0 25px rgba(251, 191, 36, 0.4), 0 0 35px rgba(251, 146, 60, 0.3), 0 0 45px rgba(96, 165, 250, 0.2);
          }
          
          .scroll-indicator-reversed:hover .scroll-text-reversed {
            color: #fbbf24;
            text-shadow: 0 0 15px rgba(251, 191, 36, 0.6), 0 0 20px rgba(251, 146, 60, 0.3);
          }
          
          .scroll-indicator-reversed:hover .scroll-dot-reversed {
            background-color: #fbbf24;
            box-shadow: 0 0 15px rgba(251, 191, 36, 0.6), 0 0 20px rgba(251, 146, 60, 0.4);
          }
          
          .scroll-indicator-reversed:hover .scroll-arrow-reversed {
            color: #fbbf24;
            filter: drop-shadow(0 0 12px rgba(251, 191, 36, 0.6)) drop-shadow(0 0 18px rgba(251, 146, 60, 0.4)) drop-shadow(0 0 24px rgba(96, 165, 250, 0.2));
          }
          
          .scroll-indicator-reversed:active {
            transform: scale(0.95);
          }

          /* Hero content box styles - copied from hero section */
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
        `}</style>
        
        {/* Background Image */}
        <div 
          className="hero-bg absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${WebImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Gradient Overlay - Limited to bottom content area - Hidden on desktop */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent lg:hidden" style={{ height: '50vh' }}></div>
        </div>

        {/* Content - Bottom Left on mobile, Right Center on desktop */}
        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 pb-16 sm:pb-20 flex justify-between lg:justify-end items-end lg:items-center gap-4 sm:gap-6">
          <div className={`flex-1 lg:flex-initial pr-2 sm:pr-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ width: 'clamp(320px, 45vw, 700px)' }}>
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-4 sm:mb-6 about-hero-heading">
              <span className="font-bold lg:block lg:mb-1">AREF </span>
              <span className="font-thin lg:block">SABOOR</span>
            </h1>

            {/* Tagline - Mobile Only */}
            <div className="lg:hidden hero-content-box border-l-2 border-teal-400/70" style={{ marginTop: 'clamp(1rem, 2vh, 1.5rem)', paddingTop: 'clamp(0.75rem, 1.5vh, 1.25rem)', paddingBottom: 'clamp(0.75rem, 1.5vh, 1.25rem)', paddingLeft: 'clamp(0.75rem, 2vw, 1.5rem)', paddingRight: 'clamp(0.75rem, 2vw, 1.5rem)', background: 'linear-gradient(to right, rgba(17, 24, 39, 0.95) 0%, rgba(17, 24, 39, 0.85) 50%, rgba(17, 24, 39, 0.6) 70%, rgba(17, 24, 39, 0.3) 85%, transparent 95%, transparent 100%)', boxSizing: 'border-box' }}>
              <p className="text-white/90 font-light leading-relaxed" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
                Writer & Journalist turned Web Developer. :)<br />
                I don't just build websites, I create visual experiences that tell stories and captivate audiences.
              </p>
            </div>

            {/* Journey Box - Desktop Only */}
            <div className="hidden lg:block hero-content-box border-t-2 border-teal-400/70 relative" style={{ marginTop: 'clamp(1rem, 2vh, 1.5rem)', paddingTop: 'clamp(2.5rem, 4vh, 3.5rem)', paddingBottom: 'clamp(6rem, 9vh, 8rem)', paddingLeft: 'clamp(0.75rem, 2vw, 1.5rem)', paddingRight: 'clamp(0.75rem, 2vw, 1.5rem)', background: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.88) 0%, rgba(17, 24, 39, 0.84) 30%, rgba(17, 24, 39, 0.8) 40%, rgba(17, 24, 39, 0.75) 50%, rgba(17, 24, 39, 0.7) 58%, rgba(17, 24, 39, 0.64) 64%, rgba(17, 24, 39, 0.57) 70%, rgba(17, 24, 39, 0.5) 75%, rgba(17, 24, 39, 0.42) 79%, rgba(17, 24, 39, 0.34) 83%, rgba(17, 24, 39, 0.26) 86%, rgba(17, 24, 39, 0.2) 89%, rgba(17, 24, 39, 0.14) 91%, rgba(17, 24, 39, 0.09) 93%, rgba(17, 24, 39, 0.05) 95%, rgba(17, 24, 39, 0.02) 97%, transparent 100%)', width: '85%', boxSizing: 'border-box', boxShadow: '0 -10px 20px -10px rgba(0, 0, 0, 0.5)' }}>
              <h3 className="text-teal-400 font-semibold mb-3 relative z-10" style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)', letterSpacing: '0.1em' }}>MY JOURNEY</h3>
              <p className="text-white font-light leading-relaxed relative z-10" style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)', lineHeight: '1.6' }}>
                I am a Video Journalist and a former Bundeswehr employee. After a change of career I recently joined the competitive world of Web Designing/Development. As a Self-Skilled Graphic Designer, I enthusiastically combine the visual designs into interactive and responsive user experience.
              </p>
            </div>

            {/* Scroll Indicator - Below text box - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:flex justify-end mt-8">
              <button 
                onClick={scrollToContent}
                className="scroll-indicator-reversed scroll-indicator-wrapper flex flex-col items-center scroll-indicator-animate scroll-gap"
                aria-label="Scroll to content"
              >
                <span className="scroll-text-reversed font-light">Scroll</span>
                <div className="scroll-border-reversed border-teal-400/30 rounded-full flex flex-col items-center justify-between" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                  <div className="scroll-dot-reversed bg-teal-400 rounded-full"></div>
                  <svg className="scroll-arrow-reversed text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* Scroll Indicator - Hidden on desktop */}
          <button 
            onClick={scrollToContent}
            className="scroll-indicator-wrapper flex flex-col items-center self-end scroll-indicator-animate scroll-gap lg:hidden"
            aria-label="Scroll to content"
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
      </section>

      {/* Wave Separator */}
      <div className="relative h-24 bg-white">
        <svg className="absolute bottom-0 w-full h-24" preserveAspectRatio="none" viewBox="0 0 1440 74" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 74L60 67.8C120 61.7 240 49.3 360 43.2C480 37 600 37 720 41.1C840 45.3 960 53.7 1080 53.7C1200 53.7 1320 45.3 1380 41.1L1440 37V74H1380C1320 74 1200 74 1080 74C960 74 840 74 720 74C600 74 480 74 360 74C240 74 120 74 60 74H0Z" fill="#f8fafc"/>
        </svg>
      </div>

      {/* Career Journey Timeline - Unique to About Page */}
      <section id="about-story" className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <span className="section-badge">The Full Story</span>
            <h2 className="section-heading">
              From Storyteller to <span className="section-heading-highlight">Interface Craftsman</span>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-xl text-gray-600 leading-relaxed">
              My path from a military environment as a video journalist to web development wasn't typical, 
              but it gave me something most developers don't have: a professional eye for visual storytelling.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* Timeline Item 1 */}
              <div className="relative pl-8 border-l-4 border-teal-200">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-teal-600 border-4 border-white shadow-lg"></div>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-sm font-bold text-teal-600 uppercase tracking-wider">Bundeswehr</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-600">Structure & Discipline</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Discipline Oriented</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    As a Video Journalist worked with Bundeswehr, learning the importance of structure, attention to detail, 
                    and disciplined execution—qualities that now define how I approach every line of code.
                  </p>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative pl-8 border-l-4 border-teal-200">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-teal-600 border-4 border-white shadow-lg"></div>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-sm font-bold text-teal-600 uppercase tracking-wider">Video Journalism</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-600">Visual Communication Mastery</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Professional Visual Storyteller</h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-4">
                    Worked professionally as a video journalist and graphic designer, mastering composition, 
                    color theory, typography, and the art of keeping audiences engaged through visual narratives.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">Adobe Suite Expert</span>
                    <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">Visual Design</span>
                    <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">Brand Identity</span>
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative pl-8 border-l-4 border-teal-200">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-teal-600 border-4 border-white shadow-lg"></div>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-sm font-bold text-teal-600 uppercase tracking-wider">Career Transition</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-600">12-Month Intensive Training</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Full-Stack Development Weiterbildung</h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-4">
                    Completed an intensive 12-month program covering product design, UX/UI principles, 
                    and full-stack development. Combined my design background with technical skills to 
                    become a developer who truly understands visual excellence.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">HTML & CSS</span>
                    <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">JavaScript</span>
                    <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">React & Next.js</span>
                    <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">Node.js & Express</span>
                    <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">MongoDB & PostgreSQL</span>
                    <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">Tailwind CSS</span>
                  </div>
                </div>
              </div>

              {/* Timeline Item 4 - Current */}
              <div className="relative pl-8">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 border-4 border-white shadow-lg animate-pulse"></div>
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-teal-200">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-sm font-bold text-teal-700 uppercase tracking-wider">Now</span>
                    <span className="text-sm text-teal-600">•</span>
                    <span className="text-sm text-teal-600">Ready for New Opportunities</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Seeking My First Tech Role</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Looking for a position where I can bring my unique combination: professional-grade design skills, 
                    storytelling ability, and modern web development expertise. I don't just code websites—I craft 
                    experiences that captivate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Me Different - Personal Values */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <span className="section-badge">What Sets Me Apart</span>
            <h2 className="section-heading">
              Beyond the <span className="section-heading-highlight">Code</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto lg:whitespace-nowrap">
              The unique strengths I bring from journalism and design to web development
            </p>
          </div>

          {/* Combined Credentials Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 - IHK-CERTIFIED Full-Stack Developer */}
            <div className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group hover:-translate-y-1">
              <div className="flex flex-col items-center mb-6">
                <div className="w-14 h-14 flex items-center justify-center mb-4">
                  <img src="/IHK-logo.svg" alt="IHK Logo" className="w-12 h-12 object-contain" />
                </div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">IHK-Certified</p>
                <p className="text-lg font-bold text-gray-900">Full-Stack Developer</p>
              </div>
              <p className="text-gray-600 leading-relaxed text-center">
                My IHK certification validates my full-stack development expertise. From React to Node.js, 
                from databases to deployment—I build complete, production-ready web applications.
              </p>
            </div>

            {/* Card 2 - SELF-LEARNED Graphic Designer */}
            <div className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group hover:-translate-y-1">
              <div className="flex flex-col items-center mb-6">
                <div className="w-14 h-14 flex items-center justify-center mb-4">
                  <img src="/Pentool.svg" alt="Graphic Design" className="w-12 h-12 object-contain" />
                </div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Self-Learned</p>
                <p className="text-lg font-bold text-gray-900">Graphic Designer</p>
              </div>
              <p className="text-gray-600 leading-relaxed text-center">
                Self-taught in graphic design, I earned my living creating professional visual content for years. 
                Every interface I build reflects this real-world design experience.
              </p>
            </div>

            {/* Card 3 - EXPERIENCED Video Journalist */}
            <div className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group hover:-translate-y-1">
              <div className="flex flex-col items-center mb-6">
                <div className="w-14 h-14 flex items-center justify-center mb-4">
                  <img src="/VideoCut.svg" alt="Video Journalism" className="w-12 h-12 object-contain" />
                </div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Experienced</p>
                <p className="text-lg font-bold text-gray-900">Video Journalist</p>
              </div>
              <p className="text-gray-600 leading-relaxed text-center">
                Years as a video journalist trained my eye for composition, spacing, and visual balance. 
                I spot misalignments and contrast issues that others overlook.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Unified with Projects Page */}
      <section className="relative bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-900 py-20 sm:py-24 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 font-light mb-10 max-w-3xl mx-auto lg:whitespace-nowrap">
            Creating exceptional digital experiences through freelance, remote & hybrid collaboration
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 w-full max-w-xs sm:w-56 h-14 bg-[#5eead4] text-[#0a3d35] font-medium rounded-full hover:bg-[#0d9488] hover:text-white transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-300"
            >
              <span>Start a Project</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <button
              onClick={() => setIsCVModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 w-full max-w-xs sm:w-56 h-14 bg-transparent text-white font-medium rounded-full border-2 border-teal-400 hover:bg-teal-400/10 hover:border-teal-300 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>View Resume</span>
            </button>

            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 w-full max-w-xs sm:w-56 h-14 bg-transparent text-white font-medium rounded-full border-2 border-teal-400 hover:bg-teal-400/10 hover:border-teal-300 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-300"
            >
              <span>View My Projects</span>
            </Link>
          </div>
        </div>

        {/* Custom Animations */}
        <style>{`
          @keyframes blob {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            25% {
              transform: translate(20px, -20px) scale(1.1);
            }
            50% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            75% {
              transform: translate(20px, 20px) scale(1.05);
            }
          }
          
          .animate-blob {
            animation: blob 7s infinite;
          }
          
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </section>
      
      {/* CV Preview Modal */}
      <CVPreviewModal 
        isOpen={isCVModalOpen} 
        onClose={() => setIsCVModalOpen(false)}
      />
      </div>
    </>
  );
};

export default About;
