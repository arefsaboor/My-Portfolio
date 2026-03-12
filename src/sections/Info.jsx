import { Link } from 'react-router-dom';
import ReadingIcon from '../assets/interests/Reading.svg';
import WritingIcon from '../assets/interests/Writing.svg';
import JoggingIcon from '../assets/interests/Jogging.svg';
import YogaIcon from '../assets/interests/Yoga.svg';

function Info() {
  const interests = [
    {
      icon: ReadingIcon,
      name: 'Reading',
      description: 'Exploring new ideas through books'
    },
    {
      icon: WritingIcon,
      name: 'Writing',
      description: 'Crafting stories and thoughts'
    },
    {
      icon: JoggingIcon,
      name: 'Jogging',
      description: 'Staying active and healthy'
    },
    {
      icon: YogaIcon,
      name: 'Yoga',
      description: 'Finding balance and mindfulness'
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
          text-align: left;
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
          margin: 0;
          font-weight: 500;
        }

        /* Approach section */
        .approach-box {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 253, 250, 0.9) 100%);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(94, 234, 212, 0.2);
          border-radius: 2rem;
          padding: clamp(3rem, 5vw, 4rem);
          text-align: left;
          margin-bottom: clamp(3rem, 5vh, 4rem);
          position: relative;
        }

        .approach-text {
          font-size: clamp(1.25rem, 2.5vw, 1.75rem);
          line-height: 1.8;
          color: #475569;
          font-weight: 400;
          margin: 0;
        }

        .quote-icon {
          font-size: clamp(3.5rem, 6vw, 5rem);
          color: #0d9488;
          opacity: 0.2;
          display: flex;
          justify-content: center;
          margin: 0 auto;
        }

        .quote-icon-top {
          margin-bottom: clamp(1.5rem, 3vh, 2rem);
        }

        .quote-icon-bottom {
          margin-top: clamp(1.5rem, 3vh, 2rem);
          transform: rotate(180deg);
        }

        /* Interests section */
        .interests-section {
          margin-top: clamp(3rem, 5vh, 4rem);
          margin-bottom: clamp(3rem, 5vh, 4rem);
        }

        .interests-heading {
          font-size: clamp(1rem, 1.8vw, 1.125rem);
          font-weight: 700;
          color: #0d9488;
          margin-bottom: 2rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-align: center;
        }

        .interests-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: clamp(1.5rem, 3vw, 2rem);
          max-width: 800px;
          margin: 0 auto;
        }

        .interest-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: clamp(1.5rem, 2.5vw, 2rem);
          background: white;
          border: 2px solid rgba(20, 184, 166, 0.1);
          border-radius: 1.25rem;
          transition: all 0.3s ease;
        }

        .interest-card:hover {
          transform: translateY(-4px);
          border-color: rgba(20, 184, 166, 0.3);
          box-shadow: 0 8px 24px rgba(13, 148, 136, 0.1);
        }

        .interest-icon {
          width: clamp(48px, 8vw, 64px);
          height: clamp(48px, 8vw, 64px);
          margin-bottom: 1rem;
          transition: transform 0.3s ease;
        }

        .interest-card:hover .interest-icon {
          transform: scale(1.1);
        }

        .interest-name {
          font-size: clamp(1.0625rem, 1.8vw, 1.25rem);
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.375rem;
        }

        .interest-description {
          font-size: clamp(0.875rem, 1.6vw, 1rem);
          color: #6b7280;
          line-height: 1.5;
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
          .interests-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
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
                My Journey
              </h2>
              <p className="info-subheading">
                From video journalism to web development — crafting digital experiences with purpose and creativity.
              </p>
            </div>

            {/* Approach Statement */}
            <div className="approach-box">
              <div className="quote-icon quote-icon-top">"</div>
              <p className="approach-text">
                After years in video journalism and as a former Bundeswehr employee, I made a bold career change into the competitive world of web design and development. Now, I bring stories to life through code, combining my self-taught graphic design skills with cutting-edge development.
              </p>
              <div className="quote-icon quote-icon-bottom">"</div>
            </div>

            {/* Personal Interests */}
            <div className="interests-section">
              <h3 className="interests-heading">Personal Interests</h3>
              <div className="interests-grid">
                {interests.map((interest, index) => (
                  <div key={index} className="interest-card">
                    <img 
                      src={interest.icon} 
                      alt={interest.name} 
                      className="interest-icon"
                    />
                    <h4 className="interest-name">{interest.name}</h4>
                    <p className="interest-description">{interest.description}</p>
                  </div>
                ))}
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
