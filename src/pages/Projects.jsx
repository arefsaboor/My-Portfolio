import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/Projects.json';
import PageLoader from '../components/PageLoader';

function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  // Smooth scroll to projects section
  const scrollToProjects = () => {
    const target = document.getElementById('projects-list');
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
      {showLoader && <PageLoader pageName="Projects" onComplete={() => setShowLoader(false)} />}
      <div className="bg-white">
      {/* Hero Section - Full Screen Immersive */}
      <section 
        id="projects-hero"
        className="relative w-full flex items-end overflow-hidden projects-hero-section"
        style={{ minHeight: '100vh' }}
      >
        <style>{`
          .projects-hero-section .hero-bg {
            background-position: 50% 50%;
            transform: scale(1.05);
            transform-origin: 50% 50%;
          }
          
          @media (max-width: 768px) {
            .projects-hero-section .hero-bg {
              background-position: 50% 50%;
              transform-origin: 50% 50%;
              transform: scale(1.1);
            }
          }
        `}</style>
        
        {/* Background - Gradient Pattern */}
        <div 
          className="hero-bg absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-900"
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
        </div>

        {/* Content - Bottom Left */}
        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 pb-16 sm:pb-20 lg:pb-24">
          <div className={`max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block mb-4">
              <span className="text-teal-300 text-sm font-semibold tracking-widest uppercase">Portfolio Showcase</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              My Projects
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 font-light max-w-2xl leading-relaxed mb-8">
              Crafting beautifully responsive and user-centered design that deserves to be displayed on screens.
            </p>
            
            {/* Scroll Indicator */}
            <button
              onClick={scrollToProjects}
              className="group flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300"
              aria-label="Scroll to projects"
            >
              <span className="text-sm font-medium tracking-wide">Explore projects</span>
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
      
      {/* Projects List Section */}
      <section id="projects-list" className="relative bg-gradient-to-b from-white via-gray-50 to-white py-20 sm:py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-teal-600 text-sm font-semibold tracking-widest uppercase">Featured Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Projects Portfolio
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Toggle between devices to see responsive designs in action
            </p>
          </div>

          {/* Projects Grid */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {projectsData.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Custom Animations */}
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
        
        .animate-blob {
          animation: blob 7s infinite ease-in-out;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      </div>
    </>
  );
}

export default Projects;
