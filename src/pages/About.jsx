import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLoader from '../components/PageLoader';
import SkillsSection from '../sections/SkillsSection';
import WebImage from '../assets/Web-Image-Full.jpg';
import CVPreviewModal from '../components/CVPreviewModal';
import cvPdf from '../assets/Aref_Saboor_CV.pdf';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Smooth scroll to next section
  const scrollToContent = () => {
    const target = document.getElementById('about-story');
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const duration = 800;
    let start = null;

    const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animation = (currentTime) => {
      if (!start) start = currentTime;
      const progress = Math.min((currentTime - start) / duration, 1);
      window.scrollTo(0, window.pageYOffset + (targetPosition - window.pageYOffset) * easeInOutQuad(progress));
      if (progress < 1) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  return (
    <>
      {showLoader && <PageLoader pageName="About" onComplete={() => setShowLoader(false)} />}
      <div className="bg-white">
      {/* Hero Section - Full Screen Immersive */}
      <section 
        id="about-hero"
        className="relative w-full flex items-end overflow-hidden about-hero-section"
        style={{ minHeight: '100vh' }}
      >
        <style>{`
          .about-hero-section .hero-bg {
            background-position: 35% 30%;
            transform: scale(1.05);
            transform-origin: 35% 30%;
          }
          
          @media (min-width: 769px) and (max-width: 1024px) {
            .about-hero-section .hero-bg {
              background-position: 10% 30%;
              transform-origin: 10% 30%;
              transform: scale(1.05);
            }
          }
          
          @media (max-width: 768px) {
            .about-hero-section .hero-bg {
              background-position: 18% 30%;
              transform-origin: 18% 30%;
              transform: scale(1.05);
            }
          }
        `}</style>
        
        {/* Background Image */}
        <div 
          className="hero-bg absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${WebImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>

        {/* Content - Bottom Left */}
        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 pb-16 sm:pb-20 lg:pb-24">
          <div className={`max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block mb-4">
              <span className="text-teal-400 text-sm font-semibold tracking-widest uppercase">Get to know me</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              About Me
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 font-light max-w-2xl leading-relaxed mb-8">
              From video journalism to web development — crafting digital experiences with purpose and creativity.
            </p>
            
            {/* Scroll Indicator */}
            <button
              onClick={scrollToContent}
              className="group flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300"
              aria-label="Scroll to content"
            >
              <span className="text-sm font-medium tracking-wide">Scroll to explore</span>
              <svg 
                className="w-5 h-5 animate-bounce" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="about-story" className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Heading */}
            <div>
              <div className="inline-block mb-4">
                <span className="text-teal-600 text-sm font-semibold tracking-widest uppercase">My Journey</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                From Storytelling to Digital Craft
              </h2>
              <div className="w-20 h-1 bg-teal-600 rounded-full"></div>
            </div>

            {/* Right: Story Card */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 sm:p-10 shadow-xl border border-gray-100">
              <div className="border-l-4 border-teal-600 pl-6 space-y-4">
                <p className="text-lg text-gray-700 leading-relaxed">
                  I am a <span className="font-semibold text-gray-900">Video Journalist</span> and a former <span className="font-semibold text-gray-900">Bundeswehr employee</span>. After a career change, I recently joined the competitive world of Web Designing and Development.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  As a <span className="font-semibold text-gray-900">self-skilled Graphic Designer</span>, I enthusiastically combine visual designs into interactive and responsive user experiences, bringing stories to life through code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Values/Approach Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-teal-600 text-sm font-semibold tracking-widest uppercase">How I Work</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              My Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Combining design thinking with technical excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors duration-300">
                <svg className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">User-Centered Design</h3>
              <p className="text-gray-600 leading-relaxed">
                Every project starts with understanding user needs, creating intuitive interfaces that solve real problems.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors duration-300">
                <svg className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Clean Code</h3>
              <p className="text-gray-600 leading-relaxed">
                Writing maintainable, scalable code with modern best practices and pixel-perfect implementation.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors duration-300">
                <svg className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast & Responsive</h3>
              <p className="text-gray-600 leading-relaxed">
                Optimized performance across all devices, ensuring smooth experiences for every user.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Resume + Contact */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Resume Download Card */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 sm:p-10 shadow-lg border border-teal-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Resume</h3>
                  <p className="text-gray-600">Get detailed overview of my skills and experience</p>
                </div>
              </div>
              <button 
                onClick={() => setIsCVModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View CV
              </button>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 sm:p-10 shadow-lg border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Let's Work Together</h3>
                  <p className="text-gray-600">Open to new projects and opportunities</p>
                </div>
              </div>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Get In Touch
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* CV Preview Modal */}
      <CVPreviewModal 
        isOpen={isCVModalOpen} 
        onClose={() => setIsCVModalOpen(false)}
        pdfUrl={cvPdf}
      />
      </div>
    </>
  );
};

export default About;
