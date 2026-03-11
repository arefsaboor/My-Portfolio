import skillsData from '../data/skills.json';

function SkillsSection() {
  return (
    <>
      <style>{`
        .skills-modern-wrapper {
          background: linear-gradient(180deg, #ffffff 0%, #f9fafb 50%, #ffffff 100%);
          position: relative;
          overflow: hidden;
        }

        /* Header section */
        .skills-header {
          text-align: center;
          margin-bottom: clamp(3.5rem, 6vh, 5rem);
        }

        .skills-label {
          font-size: clamp(0.9375rem, 1.7vw, 1.0625rem);
          font-weight: 600;
          color: #0d9488;
          margin-bottom: 1rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .skills-modern-heading {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #111827;
          line-height: 1.2;
          margin-bottom: clamp(0.75rem, 1.5vh, 1rem);
          letter-spacing: -0.02em;
        }

        .skills-subheading {
          font-size: clamp(1.0625rem, 2vw, 1.25rem);
          line-height: 1.6;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
          font-weight: 400;
        }

        /* Category section */
        .category-section {
          margin-bottom: clamp(3rem, 5vh, 4rem);
        }

        .category-title {
          font-size: clamp(1.375rem, 2.5vw, 1.75rem);
          font-weight: 700;
          color: #1e293b;
          margin-bottom: clamp(1.5rem, 2.5vh, 2rem);
          text-align: center;
        }

        /* Skills grid - clean and minimal */
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(clamp(140px, 20vw, 180px), 1fr));
          gap: clamp(0.875rem, 1.5vw, 1.25rem);
          max-width: 900px;
          margin: 0 auto;
        }

        /* Individual skill tile - minimal design */
        .skill-tile {
          background: white;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          padding: clamp(1.25rem, 2vw, 1.5rem);
          text-align: center;
          transition: all 0.3s ease;
          cursor: default;
        }

        .skill-tile:hover {
          border-color: #0d9488;
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(13, 148, 136, 0.1);
        }

        .skill-name {
          font-size: clamp(0.9375rem, 1.6vw, 1.0625rem);
          font-weight: 600;
          color: #334155;
          line-height: 1.4;
        }

        .skill-tile:hover .skill-name {
          color: #0d9488;
        }

        @media (max-width: 640px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <section id="skills" className="skills-modern-wrapper py-20 md:py-28 relative">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          {/* Header */}
          <div className="skills-header">
            <div className="skills-label">Technologies</div>
            <h2 className="skills-modern-heading">
              Skills & Expertise
            </h2>
            <p className="skills-subheading">
              Tools and technologies I work with to bring ideas to life
            </p>
          </div>

          {/* Categories */}
          {skillsData.categories.map((category) => (
            <div key={category.id} className="category-section">
              <h3 className="category-title">{category.title}</h3>
              
              <div className="skills-grid">
                {category.skills.map((skill) => (
                  <div key={skill.id} className="skill-tile">
                    <div className="skill-name">{skill.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default SkillsSection;
