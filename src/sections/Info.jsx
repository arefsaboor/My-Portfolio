import { Link } from 'react-router-dom';

function Info() {
    return (
        <>
        <style>{`
          /* Info section overlap only when Hero layout switches to desktop */
          .info-section-margin {
            margin-top: 0;
          }
          
          @media (min-width: 1536px) {
            .info-section-margin {
              margin-top: -10rem;
            }
          }

          /* Gradient background animation */
          .info-gradient-bg {
            background: linear-gradient(135deg, #ffffff 0%, #f8fffe 50%, #f0fdfa 100%);
            position: relative;
            overflow: hidden;
          }

          .info-gradient-bg::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(94, 234, 212, 0.08) 0%, transparent 70%);
            pointer-events: none;
          }

          /* Modern heading with gradient text */
          .info-heading {
            font-size: clamp(2.25rem, 5vw, 4rem);
            font-weight: 800;
            line-height: 1.15;
            background: linear-gradient(135deg, #0a3d35 0%, #0d9488 50%, #5eead4 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: clamp(1.5rem, 3vh, 2rem);
          }

          /* Animated accent line */
          .info-accent-line {
            width: clamp(4rem, 8vw, 6rem);
            height: 0.25rem;
            background: linear-gradient(90deg, #5eead4, #0d9488);
            margin: 0 auto clamp(2rem, 4vh, 3rem);
            border-radius: 9999px;
            box-shadow: 0 2px 10px rgba(94, 234, 212, 0.3);
          }

          /* Description text with better spacing */
          .info-description {
            font-size: clamp(1.125rem, 2vw, 1.375rem);
            line-height: 1.8;
            color: #374151;
            max-width: 48rem;
            margin: 0 auto;
          }

          /* Modern quote card with glassmorphism effect */
          .info-quote-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(94, 234, 212, 0.2);
            border-radius: 1.5rem;
            padding: clamp(2rem, 4vw, 3.5rem);
            margin: clamp(3rem, 6vh, 5rem) auto clamp(3rem, 6vh, 4rem);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
            position: relative;
            transition: all 0.3s ease;
          }

          .info-quote-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 48px rgba(94, 234, 212, 0.15);
            border-color: rgba(94, 234, 212, 0.4);
          }

          /* Decorative quote marks */
          .info-quote-mark {
            position: absolute;
            font-size: clamp(4rem, 8vw, 6rem);
            font-family: Georgia, serif;
            color: rgba(94, 234, 212, 0.15);
            font-weight: 700;
            line-height: 1;
          }

          .info-quote-mark.opening {
            top: clamp(1rem, 2vw, 1.5rem);
            left: clamp(1rem, 2vw, 2rem);
          }

          .info-quote-mark.closing {
            bottom: clamp(1rem, 2vw, 1.5rem);
            right: clamp(1rem, 2vw, 2rem);
          }

          .info-quote-text {
            font-size: clamp(1.125rem, 2.2vw, 1.5rem);
            line-height: 1.8;
            color: #1f2937;
            font-weight: 400;
            position: relative;
            z-index: 1;
          }

          /* Premium CTA button */
          .info-cta-button {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: clamp(1rem, 2vw, 1.25rem) clamp(2rem, 4vw, 3rem);
            background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%);
            color: white;
            font-size: clamp(1rem, 1.8vw, 1.125rem);
            font-weight: 600;
            border-radius: 9999px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(13, 148, 136, 0.3);
            border: 2px solid transparent;
            text-decoration: none;
            position: relative;
            overflow: hidden;
          }

          .info-cta-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .info-cta-button:hover::before {
            opacity: 1;
          }

          .info-cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 30px rgba(13, 148, 136, 0.4);
            border-color: rgba(94, 234, 212, 0.5);
          }

          .info-cta-button:active {
            transform: translateY(0);
          }

          .info-cta-button span {
            position: relative;
            z-index: 1;
          }

          .info-cta-arrow {
            position: relative;
            z-index: 1;
            transition: transform 0.3s ease;
          }

          .info-cta-button:hover .info-cta-arrow {
            transform: translateX(4px);
          }

          /* Highlight badges */
          .info-badges {
            display: flex;
            justify-content: center;
            gap: clamp(1rem, 2vw, 1.5rem);
            flex-wrap: wrap;
            margin-top: clamp(3rem, 5vh, 4rem);
          }

          .info-badge {
            padding: clamp(0.75rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 2rem);
            background: white;
            border: 2px solid rgba(94, 234, 212, 0.3);
            border-radius: 9999px;
            font-size: clamp(0.875rem, 1.5vw, 1rem);
            font-weight: 600;
            color: #0d9488;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
          }

          .info-badge:hover {
            transform: translateY(-2px);
            border-color: #5eead4;
            box-shadow: 0 4px 20px rgba(94, 234, 212, 0.2);
            background: rgba(94, 234, 212, 0.05);
          }
        `}</style>
        <section id="info" className="info-gradient-bg relative py-24 md:py-32 mt-0 info-section-margin z-20">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
                {/* Main Heading with Gradient */}
                <div className="text-center mb-0">
                    <h2 className="info-heading">
                        Crafting Responsive &<br />
                        User-Centered Design
                    </h2>
                    <div className="info-accent-line"></div>
                    <p className="info-description">
                        Giving visual identity to ideas, products and brands in the digital world. 
                        I craft designs that visually speak on screens.
                    </p>
                </div>

                {/* Highlight Badges */}
                <div className="info-badges">
                    <div className="info-badge">UX/UI Design</div>
                    <div className="info-badge">Full Stack Development</div>
                    <div className="info-badge">Responsive Design</div>
                </div>

                {/* Premium Quote Card */}
                <div className="info-quote-card">
                    <span className="info-quote-mark opening" aria-hidden="true">"</span>
                    <span className="info-quote-mark closing" aria-hidden="true">"</span>
                    <p className="info-quote-text text-center">
                        As a self-skilled graphic designer, I enthusiastically combine visual designs into interactive and responsive user experiences.
                    </p>
                </div>

                {/* Premium CTA Button */}
                <div className="text-center">
                    <Link 
                        to="/about" 
                        className="info-cta-button"
                        aria-label="Learn more about my background and experience"
                    >
                        <span>Learn More About Me</span>
                        <svg className="info-cta-arrow" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
        </>
    );
}

export default Info;
