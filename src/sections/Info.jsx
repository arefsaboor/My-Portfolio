import { Link } from 'react-router-dom';

function Info() {
  const values = [
    {
      title: 'From Storytelling to Code',
      description: 'Video journalist background gives me a unique perspective on crafting narratives through digital experiences.'
    },
    {
      title: 'Self-Taught Designer',
      description: 'Enthusiastically combining visual design skills with interactive and responsive user experiences.'
    },
    {
      title: 'Bundeswehr Experience',
      description: 'Discipline, precision, and attention to detail—values that define every project I build.'
    }
  ];

  return (
    <>
      <style>{`
        .info-modern-wrapper {
          background: linear-gradient(180deg, #ffffff 0%, #f0fdfa 30%, #ccfbf1 50%, #f0fdfa 70%, #ffffff 100%);
          position: relative;
          overflow: hidden;
        }

        .info-modern-wrapper::before,
        .info-modern-wrapper::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          opacity: 0.4;
          pointer-events: none;
        }

        .info-modern-wrapper::before {
          top: -20%;
          right: -15%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(94, 234, 212, 0.15) 0%, transparent 70%);
          animation: float 20s ease-in-out infinite;
        }

        .info-modern-wrapper::after {
          bottom: -15%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, transparent 70%);
          animation: float 25s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 30px) scale(1.1); }
        }

        /* Main content section */
        .info-content-section {
          max-width: 1100px;
          margin: 0 auto;
        }

        .info-heading-box {
          text-align: center;
          margin-bottom: clamp(4rem, 6vh, 5rem);
        }

        .info-modern-heading {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          background: linear-gradient(135deg, #0a3d35 0%, #0d9488 40%, #14b8a6 70%, #5eead4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.15;
          margin-bottom: clamp(1rem, 2vh, 1.5rem);
          letter-spacing: -0.02em;
        }

        .info-subheading {
          font-size: clamp(1.125rem, 2.2vw, 1.5rem);
          line-height: 1.6;
          color: #475569;
          max-width: 700px;
          margin: 0 auto;
          font-weight: 500;
        }

        /* Values grid */
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: clamp(1.5rem, 3vw, 2rem);
          margin-bottom: clamp(4rem, 6vh, 5rem);
        }

        .value-card {
          background: white;
          border: 2px solid rgba(20, 184, 166, 0.1);
          border-radius: 1.5rem;
          padding: clamp(2rem, 3vw, 2.5rem);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .value-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(94, 234, 212, 0.05) 0%, rgba(13, 148, 136, 0.08) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .value-card:hover {
          transform: translateY(-8px);
          border-color: rgba(20, 184, 166, 0.3);
          box-shadow: 0 16px 48px rgba(13, 148, 136, 0.12);
        }

        .value-card:hover::before {
          opacity: 1;
        }

        .value-title {
          font-size: clamp(1.25rem, 2.2vw, 1.5rem);
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.75rem;
          position: relative;
          z-index: 1;
        }

        .value-description {
          font-size: clamp(1rem, 1.8vw, 1.125rem);
          line-height: 1.7;
          color: #6b7280;
          position: relative;
          z-index: 1;
        }

        /* Approach section */
        .approach-box {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 253, 250, 0.9) 100%);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(94, 234, 212, 0.2);
          border-radius: 2rem;
          padding: clamp(3rem, 5vw, 4rem);
          text-align: center;
          margin-bottom: clamp(3rem, 5vh, 4rem);
        }

        .approach-label {
          font-size: clamp(1rem, 1.8vw, 1.125rem);
          font-weight: 700;
          color: #0d9488;
          margin-bottom: 1.5rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .approach-text {
          font-size: clamp(1.25rem, 2.5vw, 1.75rem);
          line-height: 1.8;
          color: #475569;
          font-weight: 400;
          max-width: 850px;
          margin: 0 auto;
          position: relative;
        }

        .quote-icon {
          font-size: clamp(2rem, 3vw, 2.5rem);
          color: #0d9488;
          opacity: 0.3;
          position: absolute;
        }

        .quote-icon-left {
          top: -10px;
          left: -30px;
        }

        .quote-icon-right {
          bottom: -10px;
          right: -30px;
        }

        .approach-highlight {
          background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
        }

        /* CTA section */
        .cta-box {
          text-align: center;
        }

        .info-modern-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: clamp(120px, 15vw, 160px);
          height: clamp(120px, 15vw, 160px);
          background: #0d9488;
          color: white;
          font-size: clamp(0.9rem, 1.6vw, 1rem);
          font-weight: 600;
          border-radius: 50%;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .info-modern-cta:hover {
          background: #0a6b62;
          transform: translateY(-2px) scale(1.05);
        }

        @media (max-width: 768px) {
          .values-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section id="info" className="info-modern-wrapper py-24 md:py-32 relative">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 relative z-10">
          {/* Main Content */}
          <div className="info-content-section">
            {/* Heading */}
            <div className="info-heading-box">
              <h2 className="info-modern-heading">
                Full Stack Developer | UX/UI Designer
              </h2>
              <p className="info-subheading">
                I have a passion for keeping balance between the beauty of Design and a friendly User Experience.
              </p>
            </div>

            {/* Values Grid */}
            <div className="values-grid">
              {values.map((value, index) => (
                <div key={index} className="value-card">
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
              ))}
            </div>

            {/* Approach Statement */}
            <div className="approach-box">
              <h3 className="approach-label">My Journey</h3>
              <div style={{ position: 'relative' }}>
                <span className="quote-icon quote-icon-left">"</span>
                <p className="approach-text">
                  After years in video journalism and as a former Bundeswehr employee, I made a bold career change into the competitive world of web design and development. Now, I bring stories to life through code, combining my self-taught graphic design skills with cutting-edge development.
                </p>
                <span className="quote-icon quote-icon-right">"</span>
              </div>
            </div>

            {/* CTA */}
            <div className="cta-box">
              <Link to="/about" className="info-modern-cta">
                About Me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Info;
