import { Link } from 'react-router-dom';

function Info() {
    return (
        <section id="info" className="bg-teal-800">
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center flex flex-col items-center py-20">
                        {/* Rectangle Box with Corner Dots */}
                        <div className="relative inline-block border-2 border-teal-400 px-8 py-10 mb-20">
                            {/* Top Left Dot */}
                            <div className="absolute -top-2 -left-2 w-4 h-4 bg-teal-400 rounded-full"></div>
                            {/* Top Right Dot */}
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-teal-400 rounded-full"></div>
                            {/* Bottom Left Dot */}
                            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-teal-400 rounded-full"></div>
                            {/* Bottom Right Dot */}
                            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-teal-400 rounded-full"></div>

                            <h1 className="text-4xl md:text-5xl font-semibold py-2 text-white">
                                Crafting Responsive &</h1>
                            <h1 className="text-4xl md:text-5xl font-semibold py-2 text-white">
                                User-Centered Design</h1>
                        </div>

                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                            Giving visual identity to ideas, products and brands in the digital world. <br></br>I craft designs that visually speak on screens. :)
                        </p>
                    </div>
                </div>
            </div>

            {/* Quote Section - Full Width at Bottom */}
            <div className="w-full bg-teal-900 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
                    <div className="flex items-center justify-center gap-6 md:gap-8">
                        {/* Left Quote Icon */}
                        <svg className="w-12 h-12 md:w-16 md:h-16 text-white flex-shrink-0 transform rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path fillRule="evenodd" d="M6 6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3H5a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2H6Zm9 0a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3h-1a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
                        </svg>

                        <p className="text-lg md:text-xl text-white italic font-light max-w-4xl text-center">
                            As a self-skilled graphic designer, I enthusiastically<br></br> combine the visual designs into interactive <br></br>and responsive user experience.
                        </p>

                        {/* Right Quote Icon */}
                        <svg className="w-12 h-12 md:w-16 md:h-16 text-white flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path fillRule="evenodd" d="M6 6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3H5a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2H6Zm9 0a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3h-1a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3Z" clipRule="evenodd" />
                        </svg>
                    </div>

                    {/* About Me Button */}
                    <Link to="/about" className="flex items-center justify-center bg-teal-400 hover:bg-teal-500 text-teal-950 font-semibold w-32 h-32 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                        About Me
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Info;
