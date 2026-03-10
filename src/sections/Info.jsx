import { Link } from 'react-router-dom';

function Info() {
  const stats = [
    { number: '3+', label: 'Years Experience' },
    { number: '15+', label: 'Projects Completed' },
    { number: '98%', label: 'Client Satisfaction' }
  ];

  return (
    <>
      <style>{`
        .info-modern-wrapper {
          background: linear-gradient(180deg, #ffffff 0%, #f8fffe 50%, #ffffff 100%);
          position: relative;
          overflow: hidden;
        }

        .info-modern-wrapper::before {
          content: '';
          position: absolute;
          top: -30%;
          right: -20%;
          width: 60%;
          height: 60%;
          background: radial-gradient(circle, rgba(94, 234, 212, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Stat cards */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: clamp(1.5rem, 3vw, 2.5rem);
          margin-bottom: clamp(4rem, 8vh, 6rem);
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          border: 2px solid rgba(94, 234, 212, 0.15);
          border-radius: 1.75rem;
          padding: clamp(2rem, 4vw, 3rem);
          text-align: center;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(94, 234, 212, 0.05) 0%, rgba(13, 148, 136, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .stat-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(94, 234, 212, 0.4);
          box-shadow: 0 20px 60px rgba(13, 148, 136, 0.15);
        }

        .stat-card:hover::before {
          opacity: 1;
        }

        .stat-number {
          font-size: clamp(3rem, 6vw, 4.5rem);
          font-weight: 900;
          background: linear-gradient(135deg, #0d9488 0%, #5eead4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }

        .stat-label {
          font-size: clamp(1rem, 1.8vw, 1.25rem);
          font-weight: 600;
          color: #374151;
          position: relative;
          z-index: 1;
        }

        /* Content section */
        .info-content-box {
          background: white;
          border-radius: 2rem;
          padding: clamp(3rem, 6vw, 5rem);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.08);
          max-width: 900px;
          margin: 0 auto;
        }

        .info-modern-heading {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          background: linear-gradient(135deg, #0a3d35 0%, #0d9488 50%, #5eead4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
          margin-bottom: clamp(1.5rem, 3vh, 2rem);
          text-align: center;
        }

        .info-modern-text {
          font-size: clamp(1.125rem, 2vw, 1.375rem);
          line-height: 1.8;
          color: #4b5563;
          margin-bottom: clamp(2rem, 4vh, 3rem);
          text-align: center;
        }

        /* Expertise pills */
        .expertise-grid {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: clamp(2.5rem, 5vh, 3.5rem);
        }

        .expertise-pill {
          padding: 0.875rem 1.75rem;
          background: linear-gradient(135deg, rgba(94, 234, 212, 0.1) 0%, rgba(13, 148, 136, 0.1) 100%);
          border: 2px solid rgba(13, 148, 136, 0.2);
          border-radius: 9999px;
          font-size: clamp(0.9375rem, 1.7vw, 1.0625rem);
          font-weight: 600;
          color: #0d9488;
          transition: all 0.3s ease;
          cursor: default;
        }

        .expertise-pill:hover {
          background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%);
          color: white;
          border-color: transparent;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(13, 148, 136, 0.3);
        }

        /* CTA button */
        .info-modern-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: clamp(1.125rem, 2.2vw, 1.5rem) clamp(2.5rem, 5vw, 3.5rem);
          background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%);
          color: white;
          font-size: clamp(1.0625rem, 2vw, 1.25rem);
          font-weight: 700;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 6px 28px rgba(13, 148, 136, 0.35);
          position: relative;
          overflow: hidden;
          border: 2px solid transparent;
        }

        .info-modern-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .info-modern-cta:hover::before {
          opacity: 1;
        }

        .info-modern-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(13, 148, 136, 0.45);
          border-color: rgba(94, 234, 212, 0.6);
        }

        .info-modern-cta span {
          position: relative;
          z-index: 1;
        }

        .info-modern-cta svg {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .info-modern-cta:hover svg {
          transform: translateX(5px);
        }

        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section id="info" className="info-modern-wrapper py-24 md:py-32 relative">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 relative z-10">
          {/* Stats Cards */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="info-content-box">
            <h2 className="info-modern-heading">
              Design Meets Development
            </h2>
            <p className="info-modern-text">
              Bridging creativity and code to build digital experiences that are both beautiful and functional. 
              Every pixel has purpose, every interaction tells a story.
            </p>

            {/* Expertise Pills */}
            <div className="expertise-grid">
              <div className="expertise-pill">UX/UI Design</div>
              <div className="expertise-pill">Frontend Development</div>
              <div className="expertise-pill">Responsive Design</div>
              <div className="expertise-pill">Prototyping</div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link to="/about" className="info-modern-cta">
                <span>Discover My Journey</span>
                <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Info;
