import skillsData from '../data/skills.json';

function SkillsSection() {
  // Category colors
  const categoryColors = {
    1: { bg: 'rgba(94, 234, 212, 0.08)', border: 'rgba(13, 148, 136, 0.2)', hover: 'rgba(13, 148, 136, 0.1)' },
    2: { bg: 'rgba(59, 130, 246, 0.08)', border: 'rgba(59, 130, 246, 0.2)', hover: 'rgba(59, 130, 246, 0.1)' },
    3: { bg: 'rgba(168, 85, 247, 0.08)', border: 'rgba(168, 85, 247, 0.2)', hover: 'rgba(168, 85, 247, 0.1)' },
    4: { bg: 'rgba(245, 158, 11, 0.08)', border: 'rgba(245, 158, 11, 0.2)', hover: 'rgba(245, 158, 11, 0.1)' }
  };

  return (
    <>
      <style>{`
        .skills-modern-wrapper {
          background: linear-gradient(180deg, #ffffff 0%, #f8fffe 30%, #ecfdf5 50%, #f8fffe 70%, #ffffff 100%);
          position: relative;
          overflow: hidden;
        }

        .skills-modern-wrapper::before {
          content: '';
          position: absolute;
          top: -25%;
          left: -15%;
          width: 50%;
          height: 50%;
          background: radial-gradient(circle, rgba(94, 234, 212, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Simple centered heading */
        .skills-modern-heading {
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 900;
          text-align: center;
          background: linear-gradient(135deg, #0a3d35 0%, #0d9488 50%, #5eead4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
          margin-bottom: clamp(3rem, 6vh, 5rem);
        }

        /* Category section */
        .category-modern-section {
          margin-bottom: clamp(3rem, 6vh, 4.5rem);
        }

        .category-modern-title {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          color: #111827;
          margin-bottom: clamp(1.5rem, 3vh, 2rem);
          text-align: center;
        }

        /* Skills bento grid */
        .skills-bento-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(clamp(140px, 22vw, 180px), 1fr));
          gap: clamp(1rem, 2vw, 1.5rem);
          justify-items: center;
        }

        /* Individual skill tile - clean and simple */
        .skill-tile {
          width: 100%;
          aspect-ratio: 1;
          background: white;
          border: 2px solid var(--tile-border);
          border-radius: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
          position: relative;
          overflow: hidden;
        }

        .skill-tile::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--tile-bg);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .skill-tile:hover {
          transform: translateY(-6px) scale(1.05);
          border-color: var(--tile-border);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
        }

        .skill-tile:hover::before {
          opacity: 1;
        }

        .skill-tile-name {
          font-size: clamp(1rem, 1.8vw, 1.125rem);
          font-weight: 700;
          color: #111827;
          text-align: center;
          position: relative;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .skill-tile:hover .skill-tile-name {
          color: #0d9488;
        }

        @media (max-width: 640px) {
          .skills-bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <section id="skills" className="skills-modern-wrapper py-24 md:py-32 relative">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 relative z-10">
          {/* Simple Heading */}
          <h2 className="skills-modern-heading">
            Technology Stack
          </h2>

          {/* Categories */}
          {skillsData.categories.map((category) => {
            const colors = categoryColors[category.id];
            return (
              <div key={category.id} className="category-modern-section">
                <h3 className="category-modern-title">{category.title}</h3>
                
                <div className="skills-bento-grid">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="skill-tile"
                      style={{
                        '--tile-bg': colors.bg,
                        '--tile-border': colors.border,
                        '--tile-hover': colors.hover
                      }}
                    >
                      <div className="skill-tile-name">{skill.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default SkillsSection;
