import { useEffect, useState, useRef } from 'react';

function Info({ variant = 'home' }) {
  const [statValues, setStatValues] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setStatValues([1, 3, 15, 100]);
      return undefined;
    }

    // Create IntersectionObserver to trigger animation when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            const targets = [1, 3, 15, 100];
            const duration = 1200;
            let animationFrame;
            const start = performance.now();

            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
              setStatValues(targets.map((target) => Math.round(target * eased)));
              if (progress < 1) {
                animationFrame = requestAnimationFrame(tick);
              }
            };

            animationFrame = requestAnimationFrame(tick);
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <>
      <style>{`
        .about-section-wrapper {
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }

        .about-section-wrapper::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: transparent;
          pointer-events: none;
        }

        .about-section-wrapper::after {
          content: '';
          position: absolute;
          bottom: -150px;
          left: -150px;
          width: 500px;
          height: 500px;
          background: transparent;
          pointer-events: none;
        }

        .about-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Header Section */
        .about-header {
          text-align: center;
          margin-bottom: clamp(4rem, 7vh, 6rem);
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .about-badge {
          display: inline-block;
          padding: 0.625rem 1.5rem;
          background: #0d9488;
          color: white;
          font-size: clamp(0.8125rem, 1.3vw, 0.875rem);
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-radius: 50px;
          margin-bottom: clamp(1.5rem, 3vh, 2rem);
          box-shadow: 0 4px 20px rgba(13, 148, 136, 0.25);
        }

        .about-heading {
          font-size: clamp(2.75rem, 5.5vw, 4rem);
          font-weight: 900;
          color: #0f172a;
          line-height: 1.1;
          margin-bottom: clamp(1.5rem, 3vh, 2rem);
          letter-spacing: -0.03em;
        }

        .about-heading .highlight {
          color: #0d9488;
        }

        .about-subheading {
          font-size: clamp(1.25rem, 2.3vw, 1.625rem);
          line-height: 1.6;
          color: #475569;
          font-weight: 400;
          max-width: 720px;
          margin: 0 auto;
        }

        .about-subheading-secondary {
          font-size: clamp(0.95rem, 1.7vw, 1.0625rem);
          line-height: 1.6;
          color: #94a3b8;
          max-width: 720px;
          margin: 1rem auto 0 auto;
        }

        /* Main Content Layout */
        .about-content {
          display: flex;
          flex-direction: column;
          gap: clamp(2.5rem, 4vw, 3rem);
          margin-bottom: clamp(4rem, 6vh, 5rem);
        }

        /* Story Section - Full Width */
        .about-story {
          background: white;
          padding: clamp(2.5rem, 4vw, 3.5rem);
          border-radius: 1.5rem;
          border: 1px solid #e2e8f0;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
          position: relative;
        }

        .about-story::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: #0d9488;
          border-radius: 1.5rem 1.5rem 0 0;
        }

        .about-story-title {
          font-size: clamp(1.5rem, 2.5vw, 1.875rem);
          font-weight: 800;
          color: #0f172a;
          margin-bottom: clamp(1.25rem, 2.5vh, 1.75rem);
          letter-spacing: -0.01em;
        }

        .about-story-text {
          font-size: clamp(1.0625rem, 1.8vw, 1.125rem);
          line-height: 1.8;
          color: #64748b;
          margin-bottom: 1.5rem;
        }

        .about-story-text:last-child {
          margin-bottom: 0;
        }

        /* Timeline (page variant) */
        .about-timeline {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.5rem;
          margin-top: 2.5rem;
        }

        .about-timeline-item {
          padding: 1.5rem 1.75rem;
          border-radius: 1rem;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .about-timeline-label {
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }

        .about-timeline-text {
          font-size: 0.9875rem;
          line-height: 1.6;
          color: #64748b;
        }

        @media (max-width: 900px) {
          .about-timeline {
            grid-template-columns: 1fr;
          }
        }

        /* Stats Grid */
        .about-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .about-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .stat-card {
          background: white;
          padding: clamp(2rem, 3.5vw, 2.5rem);
          border-radius: 1.25rem;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 35px rgba(13, 148, 136, 0.15);
          border-color: #14b8a6;
        }

        .stat-number {
          font-size: clamp(2.25rem, 4.5vw, 3rem);
          font-weight: 900;
          color: #0d9488;
          line-height: 1;
          margin-bottom: 0.75rem;
          display: block;
        }

        .stat-label {
          font-size: clamp(0.875rem, 1.5vw, 1rem);
          color: #64748b;
          font-weight: 600;
          line-height: 1.4;
        }

        /* Strengths Section */
        .about-strengths {
          margin-top: clamp(4rem, 6vh, 5rem);
        }

        .strengths-title {
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 800;
          color: #0f172a;
          margin-bottom: clamp(2.5rem, 4vh, 3.5rem);
          text-align: center;
          letter-spacing: -0.02em;
        }

        .strengths-title .highlight {
          color: #0d9488;
        }

        .strengths-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(1.5rem, 3vw, 2rem);
          max-width: 1000px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .strengths-grid {
            grid-template-columns: 1fr;
          }
        }

        .strength-card {
          background: #ffffff;
          padding: clamp(2.5rem, 4vw, 3rem);
          border-radius: 1.25rem;
          border: 1px solid #e2e8f0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .strength-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: #0d9488;
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .strength-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(13, 148, 136, 0.15);
          border-color: #14b8a6;
        }

        .strength-card:hover::before {
          transform: scaleX(1);
        }

        .strength-text {
          font-size: clamp(1.0625rem, 1.8vw, 1.1875rem);
          line-height: 1.7;
          color: #475569;
          font-weight: 500;
        }

        @media (prefers-reduced-motion: reduce) {
          .stat-card:hover,
          .strength-card:hover {
            transform: none;
          }
        }
      `}</style>

      <section id="about" className="about-section-wrapper py-20 md:py-28 lg:py-32" ref={sectionRef}>
        <div className="about-container px-6 sm:px-8 lg:px-12">
          
          {/* Header */}
          <div className="about-header">
            <div className="about-badge">Who I Am</div>
            <h2 className="about-heading">
              <span className="highlight">Design-First</span> Developer
            </h2>
            <p className="about-subheading">
              Where visual storytelling meets technical execution,<br />
              building websites that don't just work, but captivate.
            </p>
            {variant === 'page' && (
              <p className="about-subheading-secondary">
                From Bundeswehr and video journalism to web development –
                a career change that brings strong visuals, structure and story into every interface.
              </p>
            )}
          </div>

          {/* Main Content */}
          <div className="about-content">
            {/* Story - Full Width */}
            <div className="about-story">
              <h3 className="about-story-title">My Journey</h3>
              <p className="about-story-text">
                I'm a <strong>professional video journalist</strong> and <strong>graphic designer</strong> who discovered the power of combining visual arts with code. For years, I've mastered visual communication, composition, color theory, and storytelling through media production.
              </p>
              {variant === 'page' && (
                <p className="about-story-text">
                  After completing an intensive <strong>12-month Weiterbildung</strong> in product design and full-stack development, I'm now seeking my first role where I can leverage this unique background.
                </p>
              )}
              <p className="about-story-text">
                <strong>I don't just code — I craft visual experiences.</strong> My websites stand out because design excellence isn't something I learned from tutorials; it's what I bring professionally.
              </p>

              {variant === 'page' && (
                <div className="about-timeline">
                  <div className="about-timeline-item">
                    <div className="about-timeline-label">Before Tech</div>
                    <p className="about-timeline-text">
                      Worked in the Bundeswehr and as a video journalist, learning structure, discipline and how to tell stories that keep people watching.
                    </p>
                  </div>
                  <div className="about-timeline-item">
                    <div className="about-timeline-label">The Transition</div>
                    <p className="about-timeline-text">
                      Completed a 12-month product design and full-stack development Weiterbildung, bringing my visual skills into modern web tools and workflows.
                    </p>
                  </div>
                  <div className="about-timeline-item">
                    <div className="about-timeline-label">Today</div>
                    <p className="about-timeline-text">
                      I focus on design-driven front-end development, creating portfolio-level experiences and real projects that connect visuals, content and interaction.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Stats - Full Width Row */}
            <div className="about-stats">
              <div className="stat-card">
                <span className="stat-number">{statValues[0]} Year</span>
                <span className="stat-label">
                  Product Design &<br />
                  Dev Training
                </span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{statValues[1]}+</span>
                <span className="stat-label">
                  Web & Design<br />
                  Projects Shipped
                </span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{statValues[2]}+</span>
                <span className="stat-label">
                  Tools & Tech<br />
                  Used In Projects
                </span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{statValues[3]}%</span>
                <span className="stat-label">
                  Focus On<br />
                  Visual Quality
                </span>
              </div>
            </div>
          </div>

          {/* Strengths - shown only on full About page to avoid repeating everything on Home */}
          {variant === 'page' && (
            <div className="about-strengths">
              <h3 className="strengths-title">What Makes Me <span className="highlight">Different</span></h3>
              <div className="strengths-grid">
                <div className="strength-card">
                  <p className="strength-text">
                    <strong>Years of design experience</strong> shape every interface I build — not theoretical knowledge, real professional work.
                  </p>
                </div>
                <div className="strength-card">
                  <p className="strength-text">
                    <strong>Video journalism background</strong> means I understand visual storytelling, pacing, and audience engagement deeply.
                  </p>
                </div>
                <div className="strength-card">
                  <p className="strength-text">
                    <strong>Natural aesthetic sense</strong> for composition, color harmony, typography, and visual hierarchy from years of practice.
                  </p>
                </div>
                <div className="strength-card">
                  <p className="strength-text">
                    <strong>Design-development bridge</strong> — I speak both languages fluently and can execute entire projects independently.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}

export default Info;
