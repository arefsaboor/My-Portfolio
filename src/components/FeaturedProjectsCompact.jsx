import { Link } from 'react-router-dom';
import projectsData from '../data/Projects.json';

// Import desktop screenshots
import books2shelfDesktop from '../assets/books2shelf-screenshots/books2shelf-desktop.png';
import portfolioDesktop from '../assets/Portfolio-Site-Screenshots/Home-Desktop.png';
import nirvanDesktop from '../assets/Nirvan-Screenshots/desktop-hero.png';

// Map JSON paths to imported images
const screenshotMap = {
  '/books2shelf-screenshots/books2shelf-desktop.png': books2shelfDesktop,
  '/Portfolio-Site-Screenshots/Home-Desktop.png': portfolioDesktop,
  '/Nirvan-Screenshots/desktop-hero.png': nirvanDesktop,
};

function FeaturedProjectsCompact() {
  // Show only first 3 projects
  const featuredProjects = projectsData.projects.slice(0, 3);

  // Get actual image path from mapping
  const getImage = (path) => screenshotMap[path] || path;

  return (
    <>
      <style>{`
        .featured-projects-compact {
          background: #f8fafc;
          position: relative;
          overflow: hidden;
        }

        .featured-projects-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .featured-projects-header {
          text-align: center;
          margin-bottom: clamp(3rem, 5vh, 4rem);
        }

        .featured-badge {
          display: inline-block;
          padding: 0.625rem 1.5rem;
          background: #0d9488;
          color: white;
          font-size: clamp(0.8125rem, 1.3vw, 0.875rem);
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-radius: 50px;
          margin-bottom: clamp(1.5rem, 3vh, 2rem);
          box-shadow: 0 4px 20px rgba(13, 148, 136, 0.25);
        }

        .featured-heading {
          font-size: clamp(2.25rem, 4.5vw, 3.25rem);
          font-weight: 900;
          color: #0f172a;
          line-height: 1.1;
          margin-bottom: clamp(1rem, 2vh, 1.5rem);
          letter-spacing: -0.03em;
        }

        .featured-heading .highlight {
          color: #0d9488;
        }

        .featured-subheading {
          font-size: clamp(1rem, 1.8vw, 1.125rem);
          line-height: 1.6;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }

        .featured-projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        @media (max-width: 768px) {
          .featured-projects-grid {
            grid-template-columns: 1fr;
          }
        }

        .featured-project-card {
          background: white;
          border-radius: 1.25rem;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .featured-project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(13, 148, 136, 0.12);
          border-color: #14b8a6;
        }

        .featured-project-thumbnail {
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          background: #e2e8f0;
        }

        .featured-project-content {
          padding: 1.75rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .featured-project-name {
          font-size: 1.375rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }

        .featured-project-subtitle {
          font-size: 0.9375rem;
          color: #64748b;
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .featured-tech-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
          margin-bottom: 1.25rem;
        }

        .featured-tech-badge {
          font-size: 0.75rem;
          padding: 0.375rem 0.75rem;
          background: #f1f5f9;
          color: #475569;
          border-radius: 0.5rem;
          font-weight: 600;
          letter-spacing: 0.01em;
        }

        .featured-project-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }

        .featured-demo-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #475569;
          margin-bottom: 0.25rem;
        }

        .featured-demo-buttons {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.5rem;
        }

        .featured-link-btn {
          flex: 1;
          padding: 0.625rem 1rem;
          border-radius: 0.625rem;
          font-size: 0.875rem;
          font-weight: 600;
          text-align: center;
          transition: all 0.2s ease;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.375rem;
        }

        .featured-link-btn.vercel {
          background: #0d9488;
          color: #ffffff;
        }

        .featured-link-btn.vercel:hover {
          background: #0f766e;
        }

        .featured-link-btn.subdomain {
          background: #0d9488;
          color: #ffffff;
        }

        .featured-link-btn.subdomain:hover {
          background: #0f766e;
        }

        .featured-view-all {
          text-align: center;
        }

        .featured-view-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: #0f172a;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 0.75rem;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(15, 23, 42, 0.2);
        }

        .featured-view-all-btn:hover {
          background: #1e293b;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(15, 23, 42, 0.25);
        }

        @media (prefers-reduced-motion: reduce) {
          .featured-project-card:hover,
          .featured-view-all-btn:hover {
            transform: none;
          }
        }
      `}</style>

      <section className="featured-projects-compact py-16 sm:py-20 lg:py-24">
        <div className="featured-projects-container px-6 sm:px-8 lg:px-12">
          
          {/* Header */}
          <div className="featured-projects-header">
            <h2 className="featured-heading">
              Selected <span className="highlight">Projects</span>
            </h2>
            <p className="featured-subheading">
              Real projects that demonstrate design thinking, technical execution, and attention to detail
            </p>
          </div>

          {/* Projects Grid */}
          <div className="featured-projects-grid">
            {featuredProjects.map((project) => (
              <div key={project.id} className="featured-project-card">
                <img 
                  src={getImage(project.screenshots.desktop)} 
                  alt={`${project.name} screenshot`}
                  className="featured-project-thumbnail"
                  loading="lazy"
                />
                <div className="featured-project-content">
                  <h3 className="featured-project-name">{project.name}</h3>
                  <p className="featured-project-subtitle">{project.subtitle}</p>
                  
                  {/* Tech Stack - show all */}
                  <div className="featured-tech-stack">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="featured-tech-badge">{tech}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="featured-project-links">
                    <div className="featured-demo-label">Live Demo:</div>
                    <div className="featured-demo-buttons">
                      <a 
                        href={project.vercelUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="featured-link-btn vercel"
                      >
                        <span>Vercel</span>
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="featured-link-btn subdomain"
                      >
                        <span>{project.id === 2 ? 'Custom Domain' : 'Subdomain'}</span>
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Projects Link */}
          <div className="featured-view-all">
            <Link to="/projects" className="featured-view-all-btn">
              View All Projects
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}

export default FeaturedProjectsCompact;
