import { useState, useEffect } from 'react';
import heroTitles from '../data/HeroTitles.json';

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const titles = heroTitles.skills;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 1400); 

    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center"
      style={{
        backgroundImage: 'url(/hero-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll'
      }}
    >
      {/* Content */}
      <div className="relative z-10 w-full mt-20">
        <div className="px-4 sm:px-6 lg:px-16 xl:px-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-8 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-white flex-shrink-0" style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.8))' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
              </svg>
              <div className="relative h-12 md:h-16 overflow-hidden bg-gradient-to-r from-black/80 to-transparent max-w-full sm:w-96 px-4 flex items-center flex-grow">
                {titles.map((item, index) => (
                  <p
                    key={item.id}
                    className={`absolute text-xl md:text-2xl text-white font-normal py-2 transition-all duration-300 ease-out text-left ${index === currentIndex
                      ? 'translate-y-0 opacity-100'
                      : index === (currentIndex - 1 + titles.length) % titles.length
                        ? '-translate-y-full opacity-0'
                        : 'translate-y-full opacity-0'
                      }`}
                  >
                    {item.title}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-8 mb-4">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-white flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.8))' }}>
                <path fillRule="evenodd" d="M15.514 3.293a1 1 0 0 0-1.415 0L12.151 5.24a.93.93 0 0 1 .056.052l6.5 6.5a.97.97 0 0 1 .052.056L20.707 9.9a1 1 0 0 0 0-1.415l-5.193-5.193ZM7.004 8.27l3.892-1.46 6.293 6.293-1.46 3.893a1 1 0 0 1-.603.591l-9.494 3.355a1 1 0 0 1-.98-.18l6.452-6.453a1 1 0 0 0-1.414-1.414l-6.453 6.452a1 1 0 0 1-.18-.98l3.355-9.494a1 1 0 0 1 .591-.603Z" clipRule="evenodd" />
              </svg>
              <div className="bg-gradient-to-r from-black/80 to-transparent max-w-full sm:w-96 px-4 py-6 flex items-center justify-start flex-grow">
                <p className="text-xl md:text-7xl text-white animate-fade-in-delay font-semibold leading-none">
                  Designer
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8 mb-4">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.8))' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <div className="bg-gradient-to-r from-black/80 to-transparent max-w-full sm:w-96 px-4 py-6 flex items-center justify-start flex-grow">
                <p className="text-xl md:text-7xl text-white animate-fade-in-delay font-semibold leading-none">
                  Developer
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8 mb-10">
              <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0"></div>
              <div className="flex items-center justify-start gap-3 sm:gap-4 px-4 sm:px-6 py-3 bg-gradient-to-r from-black/80 to-transparent max-w-full sm:w-96 text-white font-semibold text-sm sm:text-base flex-grow">
                <span>Based in Berlin</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'scaleAnimation 2.5s ease-in-out infinite' }}>
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <style>{`
                  @keyframes scaleAnimation {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.7); }
                  }
                `}</style>
              </div>
            </div>
            <div className="flex items-center gap-8 mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0"></div>
              <div className="flex flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 sm:px-8 py-3 bg-teal-400 text-teal-950 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
                >
                  Recent Works
                </button>
                <button
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 sm:px-8 py-3 bg-transparent border-2 border-teal-400 text-white hover:bg-teal-400 hover:text-teal-950 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
