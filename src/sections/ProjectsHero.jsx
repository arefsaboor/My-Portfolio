import { useState, useEffect } from 'react';
import { heroProjects } from './projectsHeroData';
import { smoothScrollToId } from '../utils/smoothScroll';
import ExternalIcon from '../components/ExternalIcon';

/* Markup transcribed literally from the approved concept
   (public/design-concepts/portfolio-projects.html). The carousel's behaviour is
   unchanged from the previous version of this file: clone-based infinite track,
   5500ms auto-advance, hover-to-hold on the nav strip, full preload before
   reveal, and the instant snap from clone to real slide on transition end. */

const AUTO_MS = 5500;

export default function ProjectsHero({ isVisible = true }) {
  // Clone-based infinite track: [last, 0, 1, 2, 3, first]
  const SLIDE_COUNT = heroProjects.length;
  const extendedSlides = [heroProjects[SLIDE_COUNT - 1], ...heroProjects, heroProjects[0]];

  const [trackPos, setTrackPos] = useState(1); // 1 = real first slide
  const [hasTransition, setHasTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Which real slide is active (for the numbered nav)
  const activeSlide = ((trackPos - 1) % SLIDE_COUNT + SLIDE_COUNT) % SLIDE_COUNT;

  // Preload every screenshot before the carousel is revealed so images never
  // pop in mid-slide (browsers skip off-screen images even with loading=eager)
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

  // Re-enable the CSS transition after an instant clone-snap (one paint cycle)
  useEffect(() => {
    if (!hasTransition) {
      const t = setTimeout(() => setHasTransition(true), 30);
      return () => clearTimeout(t);
    }
  }, [hasTransition]);

  // Continuous auto-advance — always forward
  useEffect(() => {
    if (isPaused || !isVisible) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      setHasTransition(true);
      setTrackPos(p => p + 1);
    }, AUTO_MS);
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

  const go = (n) => { setHasTransition(true); setTrackPos(n); };

  return (
    <section className="pj-hero textured" id="projects-hero">
      <h1 className="sr-only">Selected projects by Aref Saboor</h1>

      <div className="shell pj-topbar">
        <p className="eyebrow" style={{ margin: 0 }}>Recent Works / 2024—2026</p>
        <p className="mono" style={{ margin: 0, fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          Auto-advancing · hover to hold
        </p>
      </div>

      <div
        className="pj-viewport"
        style={{ opacity: isVisible && imagesLoaded ? 1 : 0, transition: 'opacity .5s ease' }}
      >
        <div
          className="pj-track"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${trackPos * 100}%)`,
            transition: hasTransition ? 'transform 1.1s cubic-bezier(0.65, 0, 0.35, 1)' : 'none',
          }}
        >
          {extendedSlides.map((project, idx) => {
            const realIndex = ((idx - 1) % SLIDE_COUNT + SLIDE_COUNT) % SLIDE_COUNT;
            return (
              <div className="pj-slidewrap" key={idx} aria-hidden={idx !== trackPos}>
                <div className="shell">
                  <div className="pj-slide">

                    <div className="pj-devices">
                      <div className="pj-laptop">
                        <div className="pj-lid">
                          <div className="pj-bar">
                            <span className="pj-dot" /><span className="pj-dot" /><span className="pj-dot" />
                            <span className="pj-url mono">{project.url}</span>
                          </div>
                          <div className="pj-screen">
                            <img src={project.desktop} alt={`${project.name} on desktop`} loading="lazy" decoding="async" />
                          </div>
                        </div>
                        <div className="pj-base" />
                      </div>
                      <div className="pj-tablet">
                        <div className="pj-tbody">
                          <span className="pj-cam" />
                          <img src={project.tablet} alt={`${project.name} on tablet`} loading="lazy" decoding="async" />
                        </div>
                      </div>
                      <div className="pj-phone">
                        <div className="pj-pbody">
                          <span className="pj-notch" />
                          <img src={project.mobile} alt={`${project.name} on mobile`} loading="lazy" decoding="async" />
                        </div>
                      </div>
                    </div>

                    <div className="pj-panel">
                      <p className="pj-count mono">
                        {String(realIndex + 1).padStart(2, '0')} <span>/ {String(SLIDE_COUNT).padStart(2, '0')}</span>
                        &nbsp;·&nbsp; {project.category} &nbsp;·&nbsp; {project.year}
                      </p>
                      <h2 className="pj-title">{project.name}</h2>
                      <p className="pj-sub">{project.subtitle}</p>
                      <p className="pj-desc">{project.description}</p>
                      <p className="pj-tech mono">{project.techs.join(' · ')}</p>
                      <div className="pj-links">
                        {project.links.map((link) => (
                          <a className="linkline" key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                            {link.label}<ExternalIcon />
                          </a>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="shell">
        <div
          className="pj-nav"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button className="pj-arrow" onClick={() => go(trackPos - 1)} aria-label="Previous project">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="pj-dots">
            {heroProjects.map((_, i) => (
              <button
                key={i}
                className={`pj-dotbtn mono${i === activeSlide ? ' on' : ''}`}
                onClick={() => go(i + 1)}
                aria-label={`Go to project ${i + 1}`}
                aria-current={i === activeSlide ? 'true' : undefined}
              >
                {String(i + 1).padStart(2, '0')}
              </button>
            ))}
          </div>
          <button className="pj-arrow" onClick={() => go(trackPos + 1)} aria-label="Next project">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div className="pj-jump">
        <button
          className="linkline"
          onClick={() => smoothScrollToId('projects-list')}
          style={{ border: 0, background: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Explore the project archive
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ width: '15px', height: '15px' }}>
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
