import { useState, useEffect } from 'react';

function Loader({ onComplete }) {
  const greetings = [
    'Hello',
    'سلام',
    'Bonjour',
    '你好',
    'Hallo'
  ];

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (currentIndex === -1) {
      // Initial delay before first word appears
      const timer = setTimeout(() => {
        setCurrentIndex(0);
      }, 150);
      return () => clearTimeout(timer);
    } else if (currentIndex === 0) {
      // First word (Hello): 600ms
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else if (currentIndex === 1) {
      // Second word (سلام): 600ms - same as first to be visible
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else if (currentIndex > 1 && currentIndex < greetings.length - 1) {
      // Middle words: long enough to actually read - 400ms
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else if (currentIndex === greetings.length - 1) {
      // Last word (Hallo): 600ms
      const timer = setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else if (currentIndex === greetings.length) {
      // All text animations complete, last text swiping up
      // Then fade out entire screen
      const waitTimer = setTimeout(() => {
        setFadeOut(true);
        // After screen fade animation, hide and call onComplete
        const hideTimer = setTimeout(() => {
          setIsVisible(false);
          onComplete();
        }, 600);
        return () => clearTimeout(hideTimer);
      }, 400);
      return () => clearTimeout(waitTimer);
    }
  }, [currentIndex, greetings.length, onComplete]);

  if (!isVisible) return null;

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

        .loader-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          overflow: hidden;   /* the blurred blobs are wider than the viewport */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(140deg, #08191A 0%, #0C2A2C 48%, #123B3D 100%);
        }

        .loader-overlay.fade-out {
          animation: fadeOutUp 0.6s ease-out forwards;
        }

        /* Animated Background Pattern */
        .loader-bg-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.28;
          pointer-events: none;
        }

        .loader-blob {
          position: absolute;
          border-radius: 50%;
          mix-blend-mode: screen;
          filter: blur(64px);
          animation: blob 7s infinite ease-in-out;
        }

        .loader-blob-1 {
          top: 25%;
          left: 25%;
          width: 24rem;
          height: 24rem;
          background-color: #2E7A7D;
        }

        .loader-blob-2 {
          top: 33.333333%;
          right: 25%;
          width: 24rem;
          height: 24rem;
          background-color: #3E9295;
          animation-delay: 2s;
        }

        .loader-blob-3 {
          bottom: 25%;
          left: 50%;
          width: 24rem;
          height: 24rem;
          background-color: #928EA5;
          animation-delay: 4s;
        }

        .loader-gradient-overlay {
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(to right,  rgba(255,255,255,.05) 0 1px, transparent 1px 34px),
            repeating-linear-gradient(to bottom, rgba(255,255,255,.04) 0 1px, transparent 1px 34px),
            linear-gradient(to top, rgba(8,25,26,.55) 0%, rgba(8,25,26,.22) 50%, transparent 100%);
          pointer-events: none;
        }

        .loader-text-container {
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

        .loader-text {
          position: absolute;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 300;
          color: #F2F7F6;
          text-align: center;
          font-family: "Epilogue", "Helvetica Neue", Arial, sans-serif;
          letter-spacing: 0.02em;
          padding: 0;
          margin: 0;
          line-height: 1;
          display: flex;
          align-items: center;
          gap: clamp(0.75rem, 1.5vw, 1rem);
        }

        /* White dot before text - larger */
        .loader-text::before {
          content: '';
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          background-color: #3E9295;
          flex-shrink: 0;
        }

        /* Default transition for middle words - super fast */
        .loader-text {
          transition: all 0.1s ease-in-out;
        }

        /* First word animation - faster */
        .loader-text.first.current,
        .loader-text.first.previous {
          transition: all 0.4s ease-in-out;
        }

        /* Last word animation - faster, same as first */
        .loader-text.last.current,
        .loader-text.last.previous {
          transition: all 0.4s ease-in-out;
        }

        /* First text states - swipe from bottom */
        .loader-text.first.current {
          opacity: 1;
          transform: translateY(0);
        }

        .loader-text.first.previous {
          opacity: 0;
          transform: translateY(-100%);
        }

        .loader-text.first.next {
          opacity: 0;
          transform: translateY(100%);
        }

        /* Last text states - swipe from bottom */
        .loader-text.last.current {
          opacity: 1;
          transform: translateY(0);
        }

        .loader-text.last.previous {
          opacity: 0;
          transform: translateY(-100%);
        }

        .loader-text.last.next {
          opacity: 0;
          transform: translateY(100%);
        }

        /* Middle texts - fade in place (no swipe movement) */
        .loader-text:not(.first):not(.last).current {
          opacity: 1;
          transform: translateY(0);
        }

        .loader-text:not(.first):not(.last).previous {
          opacity: 0;
          transform: translateY(0);
        }

        .loader-text:not(.first):not(.last).next {
          opacity: 0;
          transform: translateY(0);
        }

        /* Make texts appear independently - delay appearance to avoid overlap */
        /* First word appears immediately, no delay */
        .loader-text.first.current {
          transition-delay: 0s;
        }

        /* Second word delays 0.4s (waiting for first word's exit) - fade in place */
        .loader-text.second.current {
          transition-delay: 0.4s;
        }

        /* Middle texts fade in place - no delay needed */
        .loader-text:not(.first):not(.second):not(.last).current {
          transition-delay: 0s;
        }

        /* Last word delays for smooth sequence */
        .loader-text.last.current {
          transition-delay: 0s;
        }

        /* No delay for exit animations */
        .loader-text.previous {
          transition-delay: 0s !important;
        }
      `}</style>

      <div className={`loader-overlay ${fadeOut ? 'fade-out' : ''}`}>
        {/* Animated Background Pattern */}
        <div className="loader-bg-pattern">
          <div className="loader-blob loader-blob-1"></div>
          <div className="loader-blob loader-blob-2"></div>
          <div className="loader-blob loader-blob-3"></div>
        </div>

        {/* Gradient Overlay */}
        <div className="loader-gradient-overlay"></div>


        <div className="loader-text-container">
          {greetings.map((greeting, index) => (
            <div
              key={index}
              className={`loader-text ${
                index === 0 ? 'first' : ''
              } ${
                index === 1 ? 'second' : ''
              } ${
                index === greetings.length - 1 ? 'last' : ''
              } ${
                index === currentIndex
                  ? 'current'
                  : index === currentIndex - 1
                    ? 'previous'
                    : 'next'
              }`}
            >
              {greeting}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Loader;
