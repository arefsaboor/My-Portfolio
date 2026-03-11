import { useState, useEffect } from 'react';

function PageLoader({ pageName, onComplete }) {
  const [textState, setTextState] = useState('hidden-below'); // Start from below
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Step 1: Text swipes up from below (0.6s transition)
    const appearTimer = setTimeout(() => {
      setTextState('visible');
    }, 100);

    // Step 2: Text stays visible for a moment
    const stayTimer = setTimeout(() => {
      setTextState('hidden-above'); // Swipe up and disappear
    }, 1000);

    // Step 3: After text swipes up, fade out the entire screen
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      // Hide loader after fade animation
      const hideTimer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(hideTimer);
    }, 1600);

    return () => {
      clearTimeout(appearTimer);
      clearTimeout(stayTimer);
      clearTimeout(fadeTimer);
    };
  }, [onComplete]);

  return (
    <>
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

        @keyframes fadeOutUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-100%);
          }
        }

        .page-loader-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to bottom right, #0f172a 0%, #134e4a 50%, #164e63 100%);
        }

        .page-loader-overlay.fade-out {
          animation: fadeOutUp 0.8s ease-out forwards;
        }

        /* Animated Background Pattern */
        .page-loader-bg-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.2;
          pointer-events: none;
        }

        .page-loader-blob {
          position: absolute;
          border-radius: 50%;
          mix-blend-mode: multiply;
          filter: blur(64px);
          animation: blob 7s infinite ease-in-out;
        }

        .page-loader-blob-1 {
          top: 25%;
          left: 25%;
          width: 24rem;
          height: 24rem;
          background-color: #2dd4bf;
        }

        .page-loader-blob-2 {
          top: 33.333333%;
          right: 25%;
          width: 24rem;
          height: 24rem;
          background-color: #22d3ee;
          animation-delay: 2s;
        }

        .page-loader-blob-3 {
          bottom: 25%;
          left: 50%;
          width: 24rem;
          height: 24rem;
          background-color: #c084fc;
          animation-delay: 4s;
        }

        .page-loader-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%);
          pointer-events: none;
        }

        .page-loader-text-container {
          position: relative;
          height: auto;
          min-height: clamp(2rem, 5vw, 3.5rem);
          width: 100%;
          max-width: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          z-index: 10;
          padding: 0;
          margin: 0;
        }

        .page-loader-text {
          position: absolute;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 400;
          color: white;
          text-align: center;
          font-family: system-ui, -apple-system, sans-serif;
          letter-spacing: 0.02em;
          padding: 0;
          margin: 0;
          line-height: 1;
          display: flex;
          align-items: center;
          gap: clamp(0.75rem, 1.5vw, 1rem);
          transition: all 0.6s ease-in-out;
        }

        /* White dot before text */
        .page-loader-text::before {
          content: '';
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          background-color: white;
          flex-shrink: 0;
        }

        /* Text animation - swipe from bottom */
        .page-loader-text.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .page-loader-text.hidden-below {
          opacity: 0;
          transform: translateY(100%);
        }

        .page-loader-text.hidden-above {
          opacity: 0;
          transform: translateY(-100%);
        }
      `}</style>

      <div className={`page-loader-overlay ${fadeOut ? 'fade-out' : ''}`}>
        {/* Animated Background Pattern */}
        <div className="page-loader-bg-pattern">
          <div className="page-loader-blob page-loader-blob-1"></div>
          <div className="page-loader-blob page-loader-blob-2"></div>
          <div className="page-loader-blob page-loader-blob-3"></div>
        </div>

        {/* Gradient Overlay */}
        <div className="page-loader-gradient-overlay"></div>

        <div className="page-loader-text-container">
          <div className={`page-loader-text ${textState}`}>
            {pageName}
          </div>
        </div>
      </div>
    </>
  );
}

export default PageLoader;
