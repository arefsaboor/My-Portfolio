import { useState, useEffect } from 'react';
import projectsData from '../data/Projects.json';

function ProjectsSection() {
  const [previewProject, setPreviewProject] = useState(null);
  const [loadedIframes, setLoadedIframes] = useState({});
  const [blockedIframes, setBlockedIframes] = useState({});

  const openPreview = (project) => {
    if (project.liveUrl) {
      setPreviewProject(project);
    }
  };

  const closePreview = () => {
    setPreviewProject(null);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && previewProject) {
        closePreview();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [previewProject]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (previewProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [previewProject]);

  // Backup timeout detection for iframes that don't trigger onError (CSP blocks)
  useEffect(() => {
    const timers = [];
    
    projectsData.projects.forEach(project => {
      if (project.liveUrl && !loadedIframes[project.id] && !blockedIframes[project.id]) {
        const timer = setTimeout(() => {
          if (!loadedIframes[project.id]) {
            setBlockedIframes(prev => ({ ...prev, [project.id]: true }));
          }
        }, 20000); // 20 second timeout for slower mobile connections
        timers.push(timer);
      }
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [loadedIframes, blockedIframes]);

  return (
    <>
      <style>{`
        .projects-modern-wrapper {
          background: linear-gradient(180deg, #ffffff 0%, #f8fffe 25%, #ecfdf5 50%, #f8fffe 75%, #ffffff 100%);
          position: relative;
          overflow: hidden;
        }

        .projects-modern-wrapper::before {
          content: '';
          position: absolute;
          top: -20%;
          right: -15%;
          width: 50%;
          height: 50%;
          background: radial-gradient(circle, rgba(94, 234, 212, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Simple heading */
        .projects-modern-heading {
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 900;
          text-align: center;
          background: linear-gradient(135deg, #0a3d35 0%, #0d9488 50%, #5eead4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
          margin-bottom: clamp(4rem, 8vh, 6rem);
        }

        /* Project cards grid - Single column for max width */
        .projects-modern-grid {
          display: grid;
          gap: clamp(3rem, 6vh, 5rem);
          max-width: 1600px;
          margin: 0 auto;
        }

        /* Project card - visual-first with MAXIMUM viewport */
        .project-modern-card {
          background: white;
          border-radius: 2.5rem;
          overflow: hidden;
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 3px solid rgba(94, 234, 212, 0.15);
        }

        .project-modern-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 32px 80px rgba(13, 148, 136, 0.2);
          border-color: rgba(94, 234, 212, 0.4);
        }

        /* Large hero image with preview overlay - MAXIMIZED */
        .project-image-container {
          width: 100%;
          height: clamp(500px, 70vh, 900px);
          overflow: hidden;
          position: relative;
          cursor: pointer;
          background: #f3f4f6;
        }

        /* Live website thumbnail iframe - FULL VIEWPORT */
        .project-thumbnail-iframe {
          width: 100%;
          height: 100%;
          border: none;
          pointer-events: none;
          transform: scale(1);
          transform-origin: center top;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-modern-card:hover .project-thumbnail-iframe {
          transform: scale(1.05);
        }

        /* Loading state for iframe thumbnails */
        .thumbnail-loading {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f8fffe 0%, #ecfdf5 100%);
          color: #0d9488;
          font-size: 1rem;
          font-weight: 600;
          transition: opacity 0.3s ease;
          gap: 1rem;
        }

        .thumbnail-loading-spinner {
          width: 2.5rem;
          height: 2.5rem;
          border: 3px solid rgba(13, 148, 136, 0.2);
          border-top-color: #0d9488;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        /* Fallback for projects without live URL or blocked iframes */
        .thumbnail-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #5eead4 100%);
          color: white;
          padding: 2rem;
          gap: 1.5rem;
        }

        .thumbnail-fallback-icon {
          width: 4rem;
          height: 4rem;
          opacity: 0.9;
        }

        .thumbnail-fallback-title {
          font-size: clamp(1.5rem, 3vw, 2.25rem);
          font-weight: 900;
          text-align: center;
          line-height: 1.2;
        }

        .thumbnail-fallback-subtitle {
          font-size: clamp(0.875rem, 1.5vw, 1rem);
          opacity: 0.9;
          text-align: center;
        }

        /* Preview overlay badge */
        .preview-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(13, 148, 136, 0) 0%, rgba(13, 148, 136, 0.9) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .project-image-container:hover .preview-overlay {
          opacity: 1;
        }

        .preview-badge {
          padding: 1rem 2rem;
          background: white;
          color: #0d9488;
          border-radius: 9999px;
          font-size: clamp(1rem, 1.8vw, 1.125rem);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          transform: translateY(10px);
          transition: all 0.3s ease;
        }

        .project-image-container:hover .preview-badge {
          transform: translateY(0);
        }

        /* Live Preview Modal */
        .preview-modal {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1rem, 2vw, 2rem);
          animation: fadeIn 0.3s ease;
          backdrop-filter: blur(8px);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .preview-modal-content {
          width: 100%;
          max-width: 1400px;
          height: 90vh;
          background: white;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 24px 96px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .preview-modal-header {
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .preview-modal-title {
          font-size: clamp(1.125rem, 2vw, 1.5rem);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .preview-close-btn {
          width: 2.5rem;
          height: 2.5rem;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .preview-close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(90deg);
        }

        .preview-iframe-container {
          flex: 1;
          width: 100%;
          position: relative;
          background: #f3f4f6;
        }

        .preview-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .preview-loading {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          font-size: 1.125rem;
          color: #6b7280;
          font-weight: 600;
        }

        .preview-loading-spinner {
          width: 2.5rem;
          height: 2.5rem;
          border: 3px solid rgba(13, 148, 136, 0.2);
          border-top-color: #0d9488;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-right: 1rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Responsive adjustments for mobile */
        @media (max-width: 768px) {
          .project-image-container {
            height: clamp(400px, 60vh, 600px);
          }
        }

        @media (min-width: 1920px) {
          .project-image-container {
            height: clamp(600px, 60vh, 1000px);
          }
        }

        /* Project info - minimal */
        .project-info-minimal {
          padding: clamp(2rem, 4vw, 3rem);
        }

        .project-name-minimal {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 900;
          background: linear-gradient(135deg, #0a3d35 0%, #0d9488 70%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }

        .project-subtitle-minimal {
          font-size: clamp(1.125rem, 2vw, 1.375rem);
          color: #6b7280;
          font-weight: 500;
          margin-bottom: clamp(1.5rem, 3vh, 2rem);
        }

        /* Tech badges - inline */
        .tech-badges-inline {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: clamp(1.5rem, 3vh, 2rem);
        }

        .tech-badge-minimal {
          padding: 0.5rem 1rem;
          background: rgba(94, 234, 212, 0.1);
          color: #0d9488;
          border-radius: 9999px;
          font-size: clamp(0.875rem, 1.6vw, 0.9375rem);
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .tech-badge-minimal:hover {
          background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%);
          color: white;
          transform: translateY(-2px);
        }

        /* Action buttons */
        .project-actions-minimal {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .project-btn-minimal {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          border-radius: 9999px;
          font-size: clamp(0.9375rem, 1.7vw, 1.0625rem);
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .project-btn-primary {
          background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%);
          color: white;
          box-shadow: 0 4px 16px rgba(13, 148, 136, 0.3);
        }

        .project-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(13, 148, 136, 0.4);
        }

        .project-btn-secondary {
          background: white;
          color: #0d9488;
          border: 2px solid rgba(13, 148, 136, 0.3);
        }

        .project-btn-secondary:hover {
          background: rgba(94, 234, 212, 0.1);
          border-color: #0d9488;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .project-actions-minimal {
            flex-direction: column;
          }

          .project-btn-minimal {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <section id="projects" className="projects-modern-wrapper py-24 md:py-32 relative">
        <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 relative z-10">
          {/* Simple Heading */}
          <h2 className="projects-modern-heading">
            Featured Work
          </h2>

          {/* Projects Grid */}
          <div className="projects-modern-grid">
            {projectsData.projects.map((project) => (
              <article key={project.id} className="project-modern-card">
                {/* Live Website Thumbnail with Preview */}
                <div 
                  className="project-image-container"
                  onClick={() => openPreview(project)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Preview ${project.name} live website`}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      openPreview(project);
                    }
                  }}
                >
                  {/* Loading State */}
                  {project.liveUrl && !loadedIframes[project.id] && !blockedIframes[project.id] && (
                    <div className="thumbnail-loading">
                      <div className="thumbnail-loading-spinner"></div>
                      <span>Loading live preview...</span>
                    </div>
                  )}
                  
                  {/* Live Website Thumbnail */}
                  {project.liveUrl && !blockedIframes[project.id] ? (
                    <iframe
                      src={project.liveUrl}
                      className="project-thumbnail-iframe"
                      title={`${project.name} thumbnail`}
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                      onLoad={() => setLoadedIframes(prev => ({ ...prev, [project.id]: true }))}
                      onError={() => setBlockedIframes(prev => ({ ...prev, [project.id]: true }))}
                      style={{ 
                        opacity: loadedIframes[project.id] ? 1 : 0,
                        display: blockedIframes[project.id] ? 'none' : 'block'
                      }}
                    />
                  ) : null}
                  
                  {/* Fallback for blocked or unavailable iframes */}
                  {(!project.liveUrl || blockedIframes[project.id]) && (
                    <div className="thumbnail-fallback">
                      <svg className="thumbnail-fallback-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <div className="thumbnail-fallback-title">{project.name}</div>
                      <div className="thumbnail-fallback-subtitle">{project.category}</div>
                    </div>
                  )}
                  
                  {/* Preview Overlay */}
                  {project.liveUrl && (
                    <div className="preview-overlay">
                      <div className="preview-badge">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Live Preview
                      </div>
                    </div>
                  )}
                </div>

                {/* Minimal Info */}
                <div className="project-info-minimal">
                  <h3 className="project-name-minimal">{project.name}</h3>
                  <p className="project-subtitle-minimal">{project.subtitle}</p>

                  {/* Tech Stack - Quick View */}
                  <div className="tech-badges-inline">
                    {project.technologies.slice(0, 5).map((tech, index) => (
                      <span key={index} className="tech-badge-minimal">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="tech-badge-minimal">
                        +{project.technologies.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="project-actions-minimal">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn-minimal project-btn-primary"
                      >
                        <span>View Live</span>
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn-minimal project-btn-secondary"
                      >
                        <span>GitHub</span>
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    )}
                    {project.figmaUrl && (
                      <a
                        href={project.figmaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn-minimal project-btn-secondary"
                      >
                        <span>Design</span>
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" />
                          <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" />
                          <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" />
                          <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" />
                          <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" />
                        </svg>
                      </a>
                    )}
                    {project.caseStudyUrl && (
                      <a
                        href={project.caseStudyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-btn-minimal project-btn-secondary"
                      >
                        <span>Case Study</span>
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Live Preview Modal */}
        {previewProject && (
          <div 
            className="preview-modal" 
            onClick={closePreview}
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-modal-title"
          >
            <div 
              className="preview-modal-content" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="preview-modal-header">
                <div className="preview-modal-title" id="preview-modal-title">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  {previewProject.name} - Live Preview
                </div>
                <button 
                  className="preview-close-btn" 
                  onClick={closePreview}
                  aria-label="Close preview"
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="preview-iframe-container">
                <iframe
                  src={previewProject.liveUrl}
                  className="preview-iframe"
                  title={`${previewProject.name} live preview`}
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-downloads"
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                  allow="fullscreen"
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default ProjectsSection;
