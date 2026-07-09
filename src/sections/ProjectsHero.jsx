import { useState, useEffect, useRef } from 'react';
import { heroProjects } from './projectsHeroData';
import { smoothScrollToId } from '../utils/smoothScroll';

export default function ProjectsHero({ isVisible = true }) {
  // Clone-based infinite track: [last, 0, 1, 2, first]
  const SLIDE_COUNT = heroProjects.length;
  const extendedSlides = [heroProjects[SLIDE_COUNT - 1], ...heroProjects, heroProjects[0]];

  const [trackPos, setTrackPos] = useState(1); // 1 = real first slide
  const [hasTransition, setHasTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [contentWidth, setContentWidth] = useState(null);
  const contentRef = useRef(null);

  // Which real slide is active (for dots)
  const activeSlide = ((trackPos - 1) % SLIDE_COUNT + SLIDE_COUNT) % SLIDE_COUNT;

  // Measure the w-fit content block width to match pill nav width
  useEffect(() => {
    if (!contentRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        setContentWidth(entry.contentRect.width);
      }
    });
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);

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

  const scrollToProjects = () => {
    smoothScrollToId('projects-list');
  };

  return (
    <section
      id="projects-hero"
      className="relative w-full flex flex-col overflow-hidden"
      style={{ height: '100svh' }}
    >
      <style>{`
        .hero-laptop { width: min(48vw, 500px); }
        .hero-tablet { width: min(21vw, 245px); }
        .hero-phone  { width: min(12vw, 110px); }
        @media (min-width: 768px) {
          .hero-laptop { width: min(49vw, 500px); }
          .hero-tablet { width: min(22vw, 245px); }
          .hero-phone  { width: min(12vw, 110px); }
        }
        @media (min-width: 1280px) {
          .hero-laptop { width: min(35vw, 540px); }
          .hero-tablet { width: min(14vw, 245px); }
          .hero-phone  { width: min(8vw, 110px); }
        }
        @media (min-width: 1536px) {
          .hero-laptop { width: min(34vw, 520px); }
          .hero-tablet { width: min(14vw, 220px); }
          .hero-phone  { width: min(8vw, 100px); }
        }
        @media (max-height: 780px) and (min-width: 1024px) {
          .hero-laptop { width: min(29vw, 425px); }
          .hero-tablet { width: min(12vw, 180px); }
          .hero-phone  { width: min(7vw, 80px); }
        }
        @media (max-height: 650px) and (min-width: 1024px) {
          .hero-laptop { width: min(24vw, 360px); }
          .hero-tablet { width: min(10vw, 150px); }
          .hero-phone  { width: min(6vw, 70px); }
        }
      `}</style>

      {/* Background — spans entire section */}
      <div className="absolute inset-0 z-0 bg-white">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-100 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-100 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl"></div>
        </div>
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle, #0d9488 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      </div>

      {/* ── Carousel area — flex-1 so it fills all space above the fixed bottom strip ── */}
      <div
        className={`relative z-20 flex-1 overflow-hidden transition-opacity duration-500 ${isVisible && imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ paddingTop: 'calc(clamp(1.5rem, 3vh, 3rem) + clamp(3rem, 4vw + 0.5rem, 5rem))' }}
      >
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
                <div
                  ref={idx === 1 ? contentRef : undefined}
                  className="flex flex-col gap-4 xl:gap-5 w-fit max-w-[1250px] mx-auto"
                >

                {/* Top row — devices + right panel, both bottom-aligned */}
                <div className="flex flex-col xl:flex-row items-start xl:items-end justify-center gap-4 xl:gap-12">

                {/* Left — Device Showcase */}
                <div className="flex items-end justify-center xl:justify-start gap-0 flex-shrink-0 order-2 xl:order-1">
                  {/* Laptop */}
                  <div className="hero-laptop relative z-10 flex-shrink-0">
                    <div className="relative">
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
                            <img
                              src={project.desktop}
                              alt={`${project.name} Desktop`}
                              className="w-full h-auto"
                              style={{ display: 'block', imageRendering: 'high-quality', WebkitFontSmoothing: 'antialiased' }}
                              loading="lazy"
                              decoding="async"
                            />
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
                      <div className="bg-gradient-to-b from-slate-800 to-slate-950 rounded-lg lg:rounded-2xl p-[2px] lg:p-1.5 relative">
                        <div className="relative overflow-hidden rounded-md lg:rounded-xl bg-white">
                          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 lg:w-1.5 lg:h-1.5 bg-slate-950 rounded-full ring-1 ring-slate-800/50 z-10"></div>
                          <img
                            src={project.tablet}
                            alt={`${project.name} Tablet`}
                            className="w-full h-auto"
                            style={{ display: 'block', imageRendering: 'high-quality', WebkitFontSmoothing: 'antialiased' }}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="hero-phone relative z-30 flex-shrink-0 -ml-5 md:-ml-7 xl:-ml-10">
                    <div className="relative">
                      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-[0.4rem] lg:rounded-[1.2rem] p-[2px] lg:p-1 relative">
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
                          <img
                            src={project.mobile}
                            alt={`${project.name} Mobile`}
                            className="w-full h-auto"
                            style={{ display: 'block', imageRendering: 'high-quality', WebkitFontSmoothing: 'antialiased' }}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right — Heading + Subtitle + Techs + CTA buttons */}
                <div className="xl:max-w-sm 2xl:max-w-md order-1 xl:order-2 text-left">
                  <h2 className="text-lg sm:text-xl xl:text-2xl font-bold text-slate-900 mb-1 sm:mb-2 xl:mb-2">{project.name}</h2>
                  <p className="text-xs sm:text-sm xl:text-sm text-teal-600 mb-2 sm:mb-3 xl:mb-3 font-light">{project.subtitle}</p>
                  <div className="hidden xl:flex flex-wrap gap-1.5 py-3 my-3 border-t border-b border-slate-200">
                    {project.techs.map(tech => (
                      <span key={tech} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-700">{tech}</span>
                    ))}
                  </div>
                  <div className="hidden xl:flex gap-2.5">
                    {project.links.map((link, linkIdx) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold transition-colors duration-300 flex-1 whitespace-nowrap ${
                          linkIdx === 0
                            ? 'bg-teal-600 hover:bg-teal-500 text-white'
                            : 'bg-white border border-slate-200 hover:border-teal-300 text-slate-600 hover:text-teal-700'
                        }`}
                      >
                        <span>{link.label}</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    ))}
                  </div>
                </div>

                </div>{/* end top row */}

                {/* Separator */}
                <div className="w-0 min-w-full h-px bg-slate-200"></div>

                {/* Description */}
                <p className="text-xs sm:text-sm xl:text-base text-slate-600 font-light leading-relaxed w-0 min-w-full">{project.description}</p>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Pill nav: prev • dots • next — static, never slides ── */}
      <div
        className="relative z-30 flex-shrink-0 flex justify-center px-4 sm:px-6 lg:px-12 xl:px-20 pt-0 pb-5 sm:pb-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex items-center gap-3 rounded-full p-2 justify-between bg-white shadow-sm border border-slate-200"
          style={contentWidth ? { width: contentWidth } : { width: '100%' }}
        >
          <button
            onClick={() => { setHasTransition(true); setTrackPos(p => p - 1); }}
            className="flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all duration-300 border border-slate-200"
            aria-label="Previous project"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            {heroProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => { setHasTransition(true); setTrackPos(i + 1); }}
                className={`transition-all duration-300 rounded-full ${
                  i === activeSlide
                    ? 'w-5 h-2 bg-teal-600'
                    : 'w-2 h-2 bg-slate-200 hover:bg-slate-300'
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => { setHasTransition(true); setTrackPos(p => p + 1); }}
            className="flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all duration-300 border border-slate-200"
            aria-label="Next project"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Explore Projects CTA — outside carousel, never slides ── */}
      <div className="relative z-30 flex-shrink-0 flex justify-center pt-3 sm:pt-4 pb-6 sm:pb-8">
        <button
          onClick={scrollToProjects}
          className="inline-flex items-center gap-2 sm:gap-3 bg-teal-600 hover:bg-teal-500 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-md font-semibold text-sm transition-colors duration-300"
          aria-label="Scroll to projects"
        >
          <span className="text-[10px] sm:text-sm tracking-wide">EXPLORE PROJECTS</span>
          <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
