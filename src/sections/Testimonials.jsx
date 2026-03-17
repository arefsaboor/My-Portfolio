function Testimonials() {
  const modules = [
    {
      id: 1,
      number: "01",
      title: "Product Design",
      duration: "4 Months",
      description: "Mastered UI/UX design principles, from low to high-fidelity design. Learned user research methodologies, project management strategies, and product design thinking. Built interactive prototypes in Figma and Framer.",
      technologies: ["Figma", "Framer", "UI/UX Design", "Prototyping"],
    },
    {
      id: 2,
      number: "02",
      title: "Web Fundamentals",
      duration: "3 Months",
      description: "Built a solid foundation in web development with HTML5, CSS3, and modern JavaScript. Learned responsive design, CSS frameworks like Bootstrap, TypeScript basics, and core internet functionality principles.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    },
    {
      id: 3,
      number: "03",
      title: "Frontend Frameworks",
      duration: "2.5 Months",
      description: "Developed modern web applications using React, Angular, and Vue.js. Mastered component-based architecture, Next.js for full-stack React, Tailwind CSS, headless CMS integration with Strapi, and deployment workflows.",
      technologies: ["React", "Next.js", "Tailwind CSS", "Angular"],
    },
    {
      id: 4,
      number: "04",
      title: "Backend Development",
      duration: "2.5 Months",
      description: "Created full-stack applications with backend integration. Worked with Node.js runtime, Express.js framework, database management, authentication systems, and performance optimization techniques.",
      technologies: ["Node.js", "Express.js", "MongoDB", "Authentication"],
    }
  ];

  return (
    <>
      <style>{`
        .learning-wrapper {
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }

        .learning-wrapper::before {
          content: '';
          position: absolute;
          top: -150px;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 500px;
          background: transparent;
          pointer-events: none;
        }

        /* Header section */
        .learning-header {
          text-align: center;
          margin-bottom: clamp(4rem, 6vh, 5rem);
          position: relative;
          z-index: 1;
        }

        .learning-badge {
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

        .learning-heading {
          font-size: clamp(2.75rem, 5.5vw, 4rem);
          font-weight: 900;
          color: #0f172a;
          line-height: 1.1;
          margin-bottom: clamp(1.5rem, 3vh, 2rem);
          letter-spacing: -0.03em;
        }

        .learning-heading .highlight {
          color: #0d9488;
        }

        .learning-subheading {
          font-size: clamp(1.25rem, 2.3vw, 1.5rem);
          line-height: 1.6;
          color: #475569;
          max-width: 720px;
          margin: 0 auto;
          font-weight: 400;
        }

        /* Modules grid - 2x2 layout */
        .modules-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(2rem, 3vw, 3rem);
          max-width: 1100px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .modules-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        /* Individual module card */
        .module-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 1.5rem;
          padding: clamp(2.5rem, 4vw, 3rem);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .module-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: #0d9488;
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .module-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          border-color: #d1fae5;
        }

        .module-card:hover::before {
          transform: scaleY(1);
        }

        /* Module header with number */
        .module-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f3f4f6;
        }

        .module-number-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.375rem 0.75rem;
          background: #f9fafb;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .module-duration {
          font-size: 0.8125rem;
          color: #9ca3af;
          font-weight: 500;
        }

        .module-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex-grow: 1;
        }

        .module-title {
          font-size: clamp(1.375rem, 2.2vw, 1.625rem);
          font-weight: 700;
          color: #111827;
          margin: 0;
          line-height: 1.3;
        }

        /* Module description */
        .module-description {
          font-size: clamp(0.9375rem, 1.6vw, 1rem);
          line-height: 1.7;
          color: #6b7280;
          margin: 0;
        }

        /* Technologies tags */
        .module-technologies {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
          padding-top: 0.5rem;
        }

        .tech-tag {
          padding: 0.5rem 1rem;
          background: #f0fdfa;
          border: 1px solid #ccfbf1;
          border-radius: 8px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #0d9488;
          transition: all 0.2s ease;
        }

        .module-card:hover .tech-tag {
          background: #ccfbf1;
          border-color: #99f6e4;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .module-card {
            transition: none;
          }

          .module-card:hover {
            transform: none;
          }
        }
      `}</style>

      <section className="learning-wrapper py-20 md:py-28 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="learning-header">
            <div className="learning-badge">My Curriculum</div>
            <h2 className="learning-heading">
              Learning <span className="highlight">Journey</span>
            </h2>
            <p className="learning-subheading">
              12-month intensive curriculum covering design, frontend, and backend development
            </p>
          </div>

          {/* Modules Grid */}
          <div className="modules-grid">
            {modules.map((module) => (
              <div key={module.id} className="module-card">
                {/* Module Header */}
                <div className="module-header">
                  <span className="module-number-badge">Module {module.number}</span>
                  <span className="module-duration">{module.duration}</span>
                </div>

                {/* Module Content */}
                <div className="module-content">
                  <h3 className="module-title">{module.title}</h3>
                  
                  <p className="module-description">
                    {module.description}
                  </p>

                  {/* Technologies */}
                  <div className="module-technologies">
                    {module.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonials;