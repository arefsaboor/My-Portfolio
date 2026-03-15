import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/Projects.json';

function ProjectsSection() {
  return (
    <section id="projects" className="relative py-20 md:py-28 lg:py-32 overflow-hidden" style={{ background: '#ffffff' }}>
      
      <div className="relative max-w-[1536px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div style={{
            display: 'inline-block',
            padding: '0.625rem 1.5rem',
            background: '#0d9488',
            color: 'white',
            fontSize: 'clamp(0.8125rem, 1.3vw, 0.875rem)',
            fontWeight: '700',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            borderRadius: '50px',
            marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
            boxShadow: '0 4px 20px rgba(13, 148, 136, 0.25)'
          }}>
            Portfolio
          </div>
          <h2 style={{
            fontSize: 'clamp(2.75rem, 5.5vw, 4rem)',
            fontWeight: '900',
            color: '#0f172a',
            lineHeight: '1.1',
            marginBottom: 'clamp(1.5rem, 3vh, 2rem)',
            letterSpacing: '-0.03em'
          }}>
            Featured <span style={{ color: '#0d9488' }}>Projects</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore live demos with device switching — see how each project adapts across desktop, tablet, and mobile
          </p>
        </div>
        
        {/* Projects Grid */}
        <div className="space-y-16 sm:space-y-20 lg:space-y-24">
          {projectsData.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
      </div>
      
      {/* Custom Animations */}
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -20px) scale(1.05);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.95);
          }
          75% {
            transform: translate(20px, 20px) scale(1.05);
          }
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
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
    </section>
  );
}

export default ProjectsSection;
