import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/Projects.json';
import PageLoader from '../components/PageLoader';
import CVPreviewModal from '../components/CVPreviewModal';
import cvPdf from '../assets/ArefSaboor_Resume_2026.pdf';

// Import project screenshots
import books2shelfDesktop from '../assets/books2shelf-screenshots/books2shelf-desktop.png';
import books2shelfTablet from '../assets/books2shelf-screenshots/books2shelf-tablet.png';
import books2shelfMobile from '../assets/books2shelf-screenshots/books2shelf-mobile.png';
import nirvanDesktop from '../assets/Nirvan-Screenshots/desktop-hero.png';
import nirvanTablet from '../assets/Nirvan-Screenshots/tablet-hero.png';
import nirvanMobile from '../assets/Nirvan-Screenshots/mobile-hero.png';
import portfolioDesktop from '../assets/Portfolio-Site-Screenshots/Home-Desktop.png';
import portfolioTablet from '../assets/Portfolio-Site-Screenshots/Home-Tablet.png';
import portfolioMobile from '../assets/Portfolio-Site-Screenshots/Home-Mobile.png';
import bestsellersDesktop from '../assets/bestsellers-screenshots/bestsellers-desktop.png';
import bestsellersTablet from '../assets/bestsellers-screenshots/bestsellers-tablet.png';
import bestsellersMobile from '../assets/bestsellers-screenshots/bestsellers-mobile.png';

const heroProjects = [
  {
    name: 'BOOKS2SHELF',
    subtitle: 'Digital Bookshelf App',
    description: 'Created a digital Bookshelf SPA with real-time book search and user authentication. Features Google Books API integration, Firebase Auth and Firestore database for seamless book management.',
    techs: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'Firebase', 'Google Books API'],
    desktop: books2shelfDesktop,
    tablet: books2shelfTablet,
    mobile: books2shelfMobile,
    url: 'books2shelf.arefsaboor.com',
    links: [
      { label: 'Vercel', href: 'https://books2shelf.vercel.app' },
      { label: 'Subdomain', href: 'https://books2shelf.arefsaboor.com' },
    ],
  },
  {
    name: 'PORTFOLIO',
    subtitle: 'Personal Custom Domain',
    description: 'Built a responsive Portfolio first in Framer (No-Code Designing) and then developed as SPA using React, Vite and Tailwind CSS. Features comprehensive skills & projects showcase.',
    techs: ['React', 'Vite', 'Tailwind CSS', 'JavaScript', 'Framer', 'Vercel'],
    desktop: portfolioDesktop,
    tablet: portfolioTablet,
    mobile: portfolioMobile,
    url: 'arefsaboor.com',
    links: [
      { label: 'Vercel', href: 'https://arefsortfolio.vercel.app' },
      { label: 'Custom Domain', href: 'https://www.arefsaboor.com' },
    ],
  },
  {
    name: 'NIRVAN',
    subtitle: 'An Ancient Peace To The Modern World',
    description: 'Crafted a High Fidelity Figma prototype (30+ screens) with comprehensive Design System, then implemented pixel-perfect UI from Figma to Code using HTML, CSS and JavaScript.',
    techs: ['HTML5', 'CSS3', 'JavaScript', 'Figma', 'Design Systems'],
    desktop: nirvanDesktop,
    tablet: nirvanTablet,
    mobile: nirvanMobile,
    url: 'nirvan.arefsaboor.com',
    links: [
      { label: 'Subdomain', href: 'https://nirvan.arefsaboor.com' },
      { label: 'Vercel', href: 'https://nirvan-vedic.vercel.app' },
    ],
  },
  {
    name: 'BESTSELLERS',
    subtitle: 'Modern Full-Stack E-commerce Bookstore',
    description: 'Production-ready online bookstore with real Stripe payments, rich browsing, reviews, wishlists, and a full admin dashboard for inventory, orders, and coupons.',
    techs: [
      'Next.js 15 (App Router)',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Prisma ORM',
      'PostgreSQL (Neon)',
      'Stripe',
      'NextAuth',
      'Resend',
      'Vercel',
    ],
    desktop: bestsellersDesktop,
    tablet: bestsellersTablet,
    mobile: bestsellersMobile,
    url: 'bestsellerss.arefsaboor.com',
    links: [
      { label: 'Vercel', href: 'https://bestsellerss.vercel.app' },
      { label: 'Subdomain', href: 'https://bestsellerss.arefsaboor.com' },
    ],
  },
];

function Projects() {
  // Clone-based infinite track: [last, 0, 1, 2, first]
  const SLIDE_COUNT = heroProjects.length;
  const extendedSlides = [heroProjects[SLIDE_COUNT - 1], ...heroProjects, heroProjects[0]];

  const [isVisible, setIsVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [trackPos, setTrackPos] = useState(1); // 1 = real first slide
  const [hasTransition, setHasTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Which real slide is active (for dots)
  const activeSlide = ((trackPos - 1) % SLIDE_COUNT + SLIDE_COUNT) % SLIDE_COUNT;

  // Preload every screenshot before the carousel is revealed so images
  // never pop-in mid-slide (browsers skip off-screen images even with loading=eager)
  useEffect(() => {
    const srcs = heroProjects.flatMap(p => [p.desktop, p.tablet, p.mobile]);
    let done = 0;
    srcs.forEach(src => {
      const img = new Image();
      img.onload = img.onerror = () => {
        done++;
        if (done === srcs.length) setImagesLoaded(true);
      };
      img.src = src;
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle hash navigation to specific projects
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const hashMap = {
          '#books2shelf': 'project-1',
          '#nirvan': 'project-3',
          '#bestsellers': 'project-4'
        };
        const elementId = hashMap[hash];
        if (elementId) {
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }, 500);
    }
  }, []);

  // Re-enable CSS transition after instant clone-snap (one paint cycle)
  useEffect(() => {
    if (!hasTransition) {
      const t = setTimeout(() => setHasTransition(true), 30);
      return () => clearTimeout(t);
    }
  }, [hasTransition]);

  // Continuous auto-advance — never stops, always forward
  useEffect(() => {
    if (isPaused || !isVisible) return;
    const id = setInterval(() => {
      setHasTransition(true);
      setTrackPos(p => p + 1);
    }, 5500);
    return () => clearInterval(id);
  }, [isPaused, isVisible]);

  // Snap from clone positions to real positions without visible animation
  const handleTransitionEnd = (e) => {
    if (e.propertyName !== 'transform') return;
    if (trackPos === 0) {
      setHasTransition(false);
      setTrackPos(SLIDE_COUNT);
    } else if (trackPos === SLIDE_COUNT + 1) {
      setHasTransition(false);
      setTrackPos(1);
    }
  };

  // Smooth scroll to projects section
  const scrollToProjects = () => {
    const target = document.getElementById('projects-list');
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const duration = 800;
    let start = null;

    const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animation = (currentTime) => {
      if (!start) start = currentTime;
      const progress = Math.min((currentTime - start) / duration, 1);
      window.scrollTo(0, window.pageYOffset + (targetPosition - window.pageYOffset) * easeInOutQuad(progress));
      if (progress < 1) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  return (
    <>
      {showLoader && <PageLoader pageName="Projects" onComplete={() => {
        setShowLoader(false);
        setIsVisible(true);
      }} />}
      <div className="bg-white">
      {/* Hero Section - Full Screen Immersive */}
      <section 
        id="projects-hero"
        className="relative w-full flex items-end overflow-hidden projects-hero-section"
        style={{ height: '100svh' }}
      >
        <style>{`
          #projects-hero {
            padding-bottom: clamp(2.5rem, 5vh, 4rem);
            overflow: hidden;
          }
          .hero-laptop { width: min(56vw, 600px); }
          .hero-tablet { width: min(25vw, 290px); }
          .hero-phone  { width: min(14vw, 130px); }
          @media (min-width: 768px) {
            .hero-laptop { width: min(58vw, 600px); }
            .hero-tablet { width: min(26vw, 290px); }
            .hero-phone  { width: min(14vw, 130px); }
          }
          @media (min-width: 1280px) {
            .hero-laptop { width: min(41vw, 640px); }
            .hero-tablet { width: min(16vw, 290px); }
            .hero-phone  { width: min(9vw, 130px); }
          }
          @media (min-width: 1536px) {
            .hero-laptop { width: min(44vw, 680px); }
            .hero-tablet { width: min(18vw, 290px); }
            .hero-phone  { width: min(11vw, 130px); }
          }
        `}</style>
        
        {/* Background - Dark with Cyan Center */}
        <div 
          className="hero-bg absolute inset-0 z-0 bg-gradient-to-b from-slate-900 via-cyan-700 to-slate-900"
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #5eead4 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
          
          {/* Multi-Device Showcase — Infinite Sliding Track */}
          <div className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ${isVisible && imagesLoaded ? 'opacity-100' : 'opacity-0'}`}>
            {/* Track: clone-padded [last,0,1,2,first], GPU-composited translateX */}
            <div
              onTransitionEnd={handleTransitionEnd}
              style={{
                display: 'flex',
                width: `${extendedSlides.length * 100}%`,
                height: '100%',
                transform: `translateX(calc(-${trackPos} * (100% / ${extendedSlides.length})))`,
                transition: hasTransition ? 'transform 1.1s cubic-bezier(0.65, 0, 0.35, 1)' : 'none',
                willChange: 'transform',
              }}
            >
              {extendedSlides.map((project, idx) => (
                <div
                  key={idx}
                  style={{ width: `${100 / extendedSlides.length}%`, flexShrink: 0, height: '100%' }}
                  className="flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-20"
                >
                  {/* Per-slide split layout */}
                  <div className="flex flex-col xl:flex-row items-start xl:items-end justify-center gap-4 xl:gap-12 w-fit xl:w-fit max-w-[1600px] mx-auto">

                    {/* Left Side - Device Showcase */}
                    <div className="flex items-end justify-center xl:justify-start gap-0 flex-shrink-0 order-2 xl:order-1">

                      {/* Laptop */}
                      <div className="hero-laptop relative z-10 flex-shrink-0">
                        <div className="relative" style={{ boxShadow: '-15px 25px 40px rgba(0,0,0,0.3)' }}>
                          <div className="relative bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 rounded-t-lg lg:rounded-t-xl pt-[2px] lg:pt-1 px-[2px] lg:px-1 pb-0">
                            <div className="relative bg-slate-950 rounded-t-md lg:rounded-t-lg p-[1px] lg:p-1">
                              <div className="bg-slate-800 rounded-t-md px-1.5 lg:px-2 py-1 lg:py-1.5 flex items-center gap-1 lg:gap-1.5 mt-0.5 lg:mt-1">
                                <div className="flex gap-1 lg:gap-1.5">
                                  <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-red-500"></div>
                                  <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-yellow-500"></div>
                                  <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-green-500"></div>
                                </div>
                                <div className="flex-1 bg-slate-700 rounded text-[5px] lg:text-[7px] text-slate-400 px-2 py-0.5 ml-1 truncate">
                                  {project.url}
                                </div>
                              </div>
                              <div className="relative overflow-hidden bg-white">
                                <img src={project.desktop} alt={`${project.name} Desktop`} className="w-full h-auto" style={{ display: 'block', imageRendering: 'high-quality', WebkitFontSmoothing: 'antialiased' }} loading="eager" decoding="sync" />
                              </div>
                            </div>
                          </div>
                          <div className="relative">
                            <div className="h-px bg-slate-950"></div>
                            <div className="h-1 lg:h-3 rounded-b-lg lg:rounded-b-xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900" style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.08)' }}></div>
                          </div>
                        </div>
                      </div>

                      {/* Tablet */}
                      <div className="hero-tablet relative z-20 flex-shrink-0 -ml-7 md:-ml-10 xl:-ml-16">
                        <div className="relative">
                          <div className="bg-gradient-to-b from-slate-800 to-slate-950 rounded-lg lg:rounded-2xl p-[2px] lg:p-1.5 relative" style={{ boxShadow: '-12px 20px 35px rgba(0,0,0,0.3)' }}>
                            <div className="relative overflow-hidden rounded-md lg:rounded-xl bg-white">
                              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 lg:w-1.5 lg:h-1.5 bg-slate-950 rounded-full ring-1 ring-slate-800/50 z-10"></div>
                              <img src={project.tablet} alt={`${project.name} Tablet`} className="w-full h-auto" style={{ display: 'block', imageRendering: 'high-quality', WebkitFontSmoothing: 'antialiased' }} loading="eager" decoding="sync" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="hero-phone relative z-30 flex-shrink-0 -ml-5 md:-ml-7 xl:-ml-10">
                        <div className="relative">
                          <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-[0.4rem] lg:rounded-[1.2rem] p-[2px] lg:p-1 relative" style={{ boxShadow: '-8px 15px 30px rgba(0,0,0,0.3)' }}>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 lg:w-8 h-1.5 lg:h-2 bg-black rounded-full z-10 flex items-center justify-center px-1">
                              <div className="flex items-center justify-between w-full">
                                <div className="w-0.5 h-0.5 lg:w-1 lg:h-1 bg-slate-900 rounded-full"></div>
                                <div className="flex-1 mx-0.5 h-0.5 bg-slate-900 rounded-full"></div>
                              </div>
                            </div>
                            <div className="absolute left-0 top-[20%] w-0.5 h-3 lg:h-4 bg-slate-950 rounded-r"></div>
                            <div className="absolute left-0 top-[35%] w-0.5 h-4 lg:h-5 bg-slate-950 rounded-r"></div>
                            <div className="absolute right-0 top-[25%] w-0.5 h-5 lg:h-6 bg-slate-950 rounded-l"></div>
                            <div className="relative overflow-hidden rounded-[0.3rem] lg:rounded-[1rem] bg-white">
                              <img src={project.mobile} alt={`${project.name} Mobile`} className="w-full h-auto" style={{ display: 'block', imageRendering: 'high-quality', WebkitFontSmoothing: 'antialiased' }} loading="eager" decoding="sync" />
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Right Side - Project Description */}
                    <div className="xl:max-w-xs 2xl:max-w-sm order-1 xl:order-2 text-left">
                      <div className="p-0">
                        <h2 className="text-xl sm:text-2xl xl:text-4xl font-bold text-white mb-1 sm:mb-2 xl:mb-3">{project.name}</h2>
                        <p className="text-sm sm:text-base xl:text-xl text-teal-100 mb-1 sm:mb-3 xl:mb-6 font-light">{project.subtitle}</p>
                        <p className="hidden sm:block text-sm xl:text-lg text-white/90 leading-relaxed mb-3 xl:mb-6">{project.description}</p>
                        <div className="hidden xl:flex flex-wrap gap-2 mb-6">
                          {project.techs.map(tech => (
                            <span key={tech} className="px-3 py-1 bg-slate-700/80 border border-white/20 rounded-full text-sm text-white">{tech}</span>
                          ))}
                        </div>
                        <div className="hidden xl:flex gap-3">
                          {project.links.map(link => (
                            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-300 flex-1 whitespace-nowrap">
                              <span>{link.label}</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradient Overlays - Top and Bottom for Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/0 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/0 to-transparent pointer-events-none"></div>
        </div>

        {/* ── Slide Navigation — single static strip, always below carousel on all devices ── */}
        <div
          className="absolute z-20 left-0 right-0 flex justify-center items-center gap-5"
          style={{ bottom: 'clamp(11rem, 23vh, 15rem)' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            onClick={() => { setHasTransition(true); setTrackPos(p => p - 1); }}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Previous project"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {heroProjects.map((_, i) => (
            <button
              key={i}
              onClick={() => { setHasTransition(true); setTrackPos(i + 1); }}
              className={`rounded-full transition-all duration-300 ${
                i === activeSlide ? 'w-7 h-3 bg-teal-400' : 'w-3 h-3 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
          <button
            onClick={() => { setHasTransition(true); setTrackPos(p => p + 1); }}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Next project"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Content - Bottom Center */}
        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Horizontal Line */}
            <div className="w-full h-px bg-white/20 mb-3 sm:mb-8"></div>
            
            <p className="text-xs sm:text-lg lg:text-xl text-white/90 font-light max-w-4xl leading-relaxed mb-4 sm:mb-8">
              Real projects solving real problems — from concept to polished, production-ready code
            </p>
            
            {/* CTA Button */}
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 sm:gap-3 bg-teal-600 hover:bg-teal-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md font-semibold transition-colors duration-300"
              aria-label="Scroll to projects"
            >
              <span className="text-[10px] sm:text-sm tracking-wide">EXPLORE PROJECTS</span>
              <svg 
                className="w-5 h-5 animate-bounce" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </section>
      
      {/* Projects List Section */}
      <section id="projects-list" className="relative bg-gradient-to-b from-white via-gray-50 to-white py-20 sm:py-24 lg:py-32">
        <div className="max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              RECENT WORKS
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Toggle between devices to see responsive designs in action
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 border-2 border-teal-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-teal-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-600 uppercase tracking-wide mb-1">Projects</p>
                  <p className="text-3xl font-bold text-teal-600">{projectsData.projects.length}</p>
                  <p className="text-xs text-gray-500 mt-1">Completed</p>
                </div>
                <div>
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-teal-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-teal-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-600 uppercase tracking-wide mb-1">Timeline</p>
                  <p className="text-3xl font-bold text-teal-600">2025 - 2026</p>
                  <p className="text-xs text-gray-500 mt-1">Active Years</p>
                </div>
                <div>
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-teal-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-teal-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-600 uppercase tracking-wide mb-1">Technologies</p>
                  <p className="text-3xl font-bold text-teal-600">15+</p>
                  <p className="text-xs text-gray-500 mt-1">Tools Used</p>
                </div>
                <div>
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {[...projectsData.projects]
              .sort((a, b) => {
                if (a.name === 'Bestsellers' && b.name !== 'Bestsellers') return -1;
                if (b.name === 'Bestsellers' && a.name !== 'Bestsellers') return 1;
                return a.id - b.id;
              })
              .map((project) => (
                <div key={project.id} id={`project-${project.id}`}>
                  <ProjectCard project={project} />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            Have a Project in Mind?
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 font-light mb-10 max-w-2xl mx-auto lg:whitespace-nowrap">
            Let's collaborate and bring your ideas to life with clean code and beautiful design
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 w-full max-w-xs sm:w-56 h-14 bg-[#5eead4] text-[#0a3d35] font-medium rounded-full hover:bg-[#0d9488] hover:text-white transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Start a Project</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 w-full max-w-xs sm:w-56 h-14 bg-transparent text-white font-medium rounded-full border-2 border-teal-400 hover:bg-teal-400/10 hover:border-teal-300 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>View My Skills</span>
            </Link>
            
            <button
              onClick={() => setIsCVModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 w-full max-w-xs sm:w-56 h-14 bg-transparent text-white font-medium rounded-full border-2 border-teal-400 hover:bg-teal-400/10 hover:border-teal-300 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>View Resume</span>
            </button>
          </div>
        </div>
      </section>
      
      {/* CV Preview Modal */}
      <CVPreviewModal 
        isOpen={isCVModalOpen} 
        onClose={() => setIsCVModalOpen(false)}
        pdfUrl={cvPdf}
      />
      
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
          animation: blob 7s infinite ease-in-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      </div>
    </>
  );
}

export default Projects;
