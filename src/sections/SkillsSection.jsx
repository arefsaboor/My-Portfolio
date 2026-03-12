import skillsData from '../data/skills.json';

function SkillsSection() {
  // Sticky note colors for each category
  const stickyColors = [
    { base: '#fef08a', gradient: '#fef3c7' }, // yellow - Design
    { base: '#fecaca', gradient: '#fecdd3' }, // pink - Frontend
    { base: '#bae6fd', gradient: '#dbeafe' }, // blue - Backend
    { base: '#bbf7d0', gradient: '#dcfce7' }, // green - Tools
  ];

  return (
    <>
      <style>{`
        .skills-sticky-wrapper {
          background: 
            radial-gradient(circle at 15% 20%, rgba(254, 240, 138, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 85% 80%, rgba(186, 230, 253, 0.08) 0%, transparent 40%),
            linear-gradient(180deg, #fafafa 0%, #f5f5f5 50%, #fafafa 100%);
          position: relative;
        }

        /* Subtle texture overlay */
        .skills-sticky-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 3px,
              rgba(0,0,0,0.01) 3px,
              rgba(0,0,0,0.01) 4px
            );
          pointer-events: none;
        }

        /* Header section */
        .skills-sticky-header {
          text-align: center;
          margin-bottom: clamp(4rem, 7vh, 6rem);
        }

        .skills-sticky-heading {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #111827;
          line-height: 1.2;
          margin-bottom: clamp(0.75rem, 1.5vh, 1rem);
          letter-spacing: -0.02em;
        }

        .skills-sticky-subheading {
          font-size: clamp(1.0625rem, 2vw, 1.25rem);
          line-height: 1.6;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
          font-weight: 400;
        }

        /* Category section */
        .category-sticky-section {
          margin-bottom: clamp(4rem, 6vh, 5rem);
        }

        /* Category title */
        .category-title-wrapper {
          margin-bottom: clamp(2rem, 3.5vh, 3rem);
        }

        .category-sticky-title {
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 1rem 0;
        }

        .category-divider {
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #14b8a6, #5eead4);
          border-radius: 2px;
        }

        /* Sticky notes grid */
        .sticky-notes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(clamp(120px, 18vw, 160px), 1fr));
          gap: clamp(2rem, 3vw, 3rem);
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 clamp(1rem, 2vw, 2rem);
        }

        /* Individual sticky note */
        .sticky-note {
          background: linear-gradient(135deg, var(--sticky-base) 0%, var(--sticky-gradient) 100%);
          padding: clamp(1.5rem, 3vw, 2rem);
          box-shadow: 
            0 1px 3px rgba(0,0,0,0.08),
            0 4px 8px rgba(0,0,0,0.06),
            0 8px 16px rgba(0,0,0,0.04),
            inset 0 1px 0 rgba(255,255,255,0.5);
          position: relative;
          cursor: default;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform: rotate(var(--rotation));
          min-height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 2px;
          border: 1px solid rgba(0,0,0,0.04);
        }

        /* Dynamic width based on text length */
        .sticky-note.short {
          max-width: 150px;
          justify-self: center;
        }

        /* Stacked paper effect */
        .sticky-note::before {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: 3px;
          bottom: 3px;
          background: inherit;
          border-radius: inherit;
          opacity: 0.4;
          z-index: -1;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        /* Push pin */
        .sticky-note::after {
          content: '';
          position: absolute;
          top: 12px;
          right: 16px;
          width: 12px;
          height: 12px;
          background: radial-gradient(circle at 30% 30%, #cbd5e1, #94a3b8);
          border-radius: 50%;
          box-shadow: 
            0 1px 2px rgba(0,0,0,0.2),
            inset -1px -1px 2px rgba(0,0,0,0.15),
            inset 1px 1px 1px rgba(255,255,255,0.7);
          z-index: 5;
        }

        /* Curled corner */
        .sticky-note .curl-corner {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 0 0 24px 24px;
          border-color: transparent transparent rgba(0,0,0,0.08) transparent;
          transition: all 0.4s ease;
        }

        .sticky-note:hover {
          transform: rotate(0deg) translateY(-10px) scale(1.05);
          box-shadow: 
            0 4px 8px rgba(0,0,0,0.1),
            0 12px 24px rgba(0,0,0,0.1),
            0 20px 40px rgba(0,0,0,0.08),
            inset 0 1px 0 rgba(255,255,255,0.6);
          z-index: 10;
        }

        .sticky-note:hover .curl-corner {
          border-width: 0 0 36px 36px;
          border-color: transparent transparent rgba(0,0,0,0.12) transparent;
        }

        /* Skill text */
        .skill-sticky-name {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: clamp(0.9375rem, 1.8vw, 1.125rem);
          font-weight: 600;
          color: #1e293b;
          text-align: center;
          line-height: 1.4;
          position: relative;
          z-index: 2;
          text-shadow: 0 1px 1px rgba(255,255,255,0.8);
        }

        .sticky-note.short .skill-sticky-name {
          font-size: clamp(0.875rem, 1.6vw, 1rem);
        }

        /* Paper texture */
        .sticky-note .paper-texture {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.012) 2px,
              rgba(0,0,0,0.012) 3px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(0,0,0,0.008) 2px,
              rgba(0,0,0,0.008) 3px
            );
          pointer-events: none;
          border-radius: inherit;
        }

        @media (max-width: 768px) {
          .sticky-notes-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: clamp(1.5rem, 4vw, 2rem);
          }
          
          .sticky-note.short {
            max-width: none;
          }
          
          .sticky-note {
            min-height: 110px;
            padding: clamp(1.25rem, 3vw, 1.5rem);
          }

          .sticky-note::after {
            width: 10px;
            height: 10px;
            top: 10px;
            right: 12px;
          }

          .category-sticky-section {
            margin-bottom: clamp(3rem, 5vh, 4rem);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sticky-note {
            transform: rotate(0deg);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          
          .sticky-note:hover {
            transform: translateY(-6px);
          }
        }
      `}</style>

      <section id="skills" className="skills-sticky-wrapper py-20 md:py-28 relative">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          {/* Header */}
          <div className="skills-sticky-header">
            <h2 className="skills-sticky-heading">
              Skills & Expertise
            </h2>
            <p className="skills-sticky-subheading">
              Tools and technologies I work with to bring ideas to life
            </p>
          </div>

          {/* Categories with Sticky Notes */}
          {skillsData.categories.map((category, categoryIndex) => {
            const colorSet = stickyColors[categoryIndex % stickyColors.length];
            
            return (
              <div key={category.id} className="category-sticky-section">
                {/* Category Title */}
                <div className="category-title-wrapper">
                  <h3 className="category-sticky-title">{category.title}</h3>
                  <div className="category-divider"></div>
                </div>
                
                {/* Sticky Notes Grid */}
                <div className="sticky-notes-grid">
                  {category.skills.map((skill, skillIndex) => {
                    // Varied rotation for natural look
                    const rotationValue = ((skillIndex % 9) - 4) * 1.8;
                    
                    // Determine size based on text length
                    const textLength = skill.name.length;
                    const sizeClass = textLength <= 6 ? 'short' : '';
                    
                    return (
                      <div 
                        key={skill.id} 
                        className={`sticky-note ${sizeClass}`}
                        style={{
                          '--sticky-base': colorSet.base,
                          '--sticky-gradient': colorSet.gradient,
                          '--rotation': `${rotationValue}deg`
                        }}
                      >
                        <div className="paper-texture"></div>
                        <div className="curl-corner"></div>
                        <div className="skill-sticky-name">{skill.name}</div>
                      </div>
                    );
                  })}
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
