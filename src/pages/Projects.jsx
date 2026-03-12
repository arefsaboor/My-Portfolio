import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/Projects.json';
import PageLoader from '../components/PageLoader';
import CVPreviewModal from '../components/CVPreviewModal';
import cvPdf from '../assets/Aref_Saboor_CV.pdf';

function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

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
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              PROJECTS
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
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              RECENT WORKS
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Toggle between devices to see responsive designs in action
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 border-2 border-teal-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-teal-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-600 uppercase tracking-wide mb-1">Projects</p>
                  <p className="text-3xl font-bold text-teal-600">{projectsData.projects.length}</p>
                  <p className="text-xs text-gray-500 mt-1">Completed</p>
                </div>
                <div>
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-teal-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-teal-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-600 uppercase tracking-wide mb-1">Timeline</p>
                  <p className="text-3xl font-bold text-teal-600">2025 - 2026</p>
                  <p className="text-xs text-gray-500 mt-1">Active Years</p>
                </div>
                <div>
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-teal-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-teal-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-teal-600 uppercase tracking-wide mb-1">Technologies</p>
                  <p className="text-3xl font-bold text-teal-600">15+</p>
                  <p className="text-xs text-gray-500 mt-1">Tools Used</p>
                </div>
                <div>
                  <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {projectsData.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-teal-900 to-cyan-900 py-20 sm:py-24 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 font-light mb-10 max-w-2xl mx-auto">
            Let's collaborate and bring your ideas to life with clean code and beautiful design
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[#5eead4] text-[#0a3d35] font-medium rounded-full hover:bg-[#0d9488] hover:text-white transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Start a Project</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-medium rounded-full border-2 border-teal-400 hover:bg-teal-400/10 hover:border-teal-300 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>View My Skills</span>
            </Link>
            
            <button
              onClick={() => setIsCVModalOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-medium rounded-full border-2 border-teal-400 hover:bg-teal-400/10 hover:border-teal-300 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>View CV</span>
            </button>
          </div>
        </div>
      </section>
      
      {/* CV Preview Modal */}
      <CVPreviewModal 
        isOpen={isCVModalOpen} 
        onClose={() => setIsCVModalOpen(false)}
        pdfUrl={cvPdf}
      />
      
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
