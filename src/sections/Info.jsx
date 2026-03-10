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
        `}</style>
        <section id="info" className="relative bg-white py-24 md:py-32 mt-0 info-section-margin z-20">
            <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
                {/* Main Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Crafting Responsive &<br />
                        User-Centered Design
                    </h2>
                    <div className="w-20 h-1 bg-teal-500 mx-auto mb-8"></div>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Giving visual identity to ideas, products and brands in the digital world. 
                        I craft designs that visually speak on screens.
                    </p>
                </div>

                {/* Quote Section */}
                <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-12">
                    <div className="flex items-start justify-center gap-4 mb-6">
                        <svg className="w-10 h-10 md:w-12 md:h-12 text-teal-500 flex-shrink-0 transform rotate-180 opacity-40" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M6 6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3H5a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2H6Zm9 0a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3h-1a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xl md:text-2xl text-gray-700 italic font-light text-center leading-relaxed max-w-4xl">
                            As a self-skilled graphic designer, I enthusiastically combine visual designs into interactive and responsive user experiences.
                        </p>
                        <svg className="w-10 h-10 md:w-12 md:h-12 text-teal-500 flex-shrink-0 opacity-40" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M6 6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3H5a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2H6Zm9 0a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3h-1a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                {/* About Me Button */}
                <div className="text-center">
                    <Link 
                        to="/about" 
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                        Learn More About Me
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
