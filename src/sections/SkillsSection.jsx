import skillsData from '../data/skills.json';

function SkillsSection() {
  // Technology color mappings for visual interest
  const techColors = {
    // Frontend
    'React': { bg: '#61DAFB20', border: '#61DAFB', text: '#61DAFB', gradient: 'linear-gradient(135deg, #61DAFB15, #61DAFB25)' },
    'JavaScript': { bg: '#F7DF1E20', border: '#F7DF1E', text: '#F0DB4F', gradient: 'linear-gradient(135deg, #F7DF1E15, #F7DF1E25)' },
    'TypeScript': { bg: '#3178C620', border: '#3178C6', text: '#3178C6', gradient: 'linear-gradient(135deg, #3178C615, #3178C625)' },
    'HTML5': { bg: '#E34F2620', border: '#E34F26', text: '#E34F26', gradient: 'linear-gradient(135deg, #E34F2615, #E34F2625)' },
    'CSS3': { bg: '#1572B620', border: '#1572B6', text: '#1572B6', gradient: 'linear-gradient(135deg, #1572B615, #1572B625)' },
    'Tailwind CSS': { bg: '#06B6D420', border: '#06B6D4', text: '#06B6D4', gradient: 'linear-gradient(135deg, #06B6D415, #06B6D425)' },
    'Bootstrap': { bg: '#7952B320', border: '#7952B3', text: '#7952B3', gradient: 'linear-gradient(135deg, #7952B315, #7952B325)' },
    'Vite': { bg: '#646CFF20', border: '#646CFF', text: '#646CFF', gradient: 'linear-gradient(135deg, #646CFF15, #646CFF25)' },
    'MUI': { bg: '#007FFF20', border: '#007FFF', text: '#007FFF', gradient: 'linear-gradient(135deg, #007FFF15, #007FFF25)' },
    'Chakra': { bg: '#319EAA20', border: '#319EAA', text: '#319EAA', gradient: 'linear-gradient(135deg, #319EAA15, #319EAA25)' },
    
    // Backend
    'Node.js': { bg: '#33993320', border: '#339933', text: '#339933', gradient: 'linear-gradient(135deg, #33993315, #33993325)' },
    'Next.js': { bg: '#00000020', border: '#000000', text: '#000000', gradient: 'linear-gradient(135deg, #00000015, #00000025)' },
    'Express.js': { bg: '#00000020', border: '#404040', text: '#404040', gradient: 'linear-gradient(135deg, #40404015, #40404025)' },
    'MongoDB': { bg: '#47A24820', border: '#47A248', text: '#47A248', gradient: 'linear-gradient(135deg, #47A24815, #47A24825)' },
    'PostgreSQL': { bg: '#33679120', border: '#336791', text: '#336791', gradient: 'linear-gradient(135deg, #33679115, #33679125)' },
    'Firebase': { bg: '#FFCA2820', border: '#FFCA28', text: '#FFA000', gradient: 'linear-gradient(135deg, #FFCA2815, #FFCA2825)' },
    'Firestore': { bg: '#FFCA2820', border: '#FFCA28', text: '#FFA000', gradient: 'linear-gradient(135deg, #FFCA2815, #FFCA2825)' },
    'Prisma': { bg: '#2D374820', border: '#5A67D8', text: '#5A67D8', gradient: 'linear-gradient(135deg, #5A67D815, #5A67D825)' },
    'REST APIs': { bg: '#00979020', border: '#009790', text: '#009790', gradient: 'linear-gradient(135deg, #00979015, #00979025)' },
    'JSON APIs': { bg: '#00000020', border: '#5A5A5A', text: '#5A5A5A', gradient: 'linear-gradient(135deg, #5A5A5A15, #5A5A5A25)' },
    'Google APIs': { bg: '#4285F420', border: '#4285F4', text: '#4285F4', gradient: 'linear-gradient(135deg, #4285F415, #4285F425)' },
    'Authentication': { bg: '#10B98120', border: '#10B981', text: '#10B981', gradient: 'linear-gradient(135deg, #10B98115, #10B98125)' },
    
    // Design Tools
    'Figma': { bg: '#F24E1E20', border: '#F24E1E', text: '#F24E1E', gradient: 'linear-gradient(135deg, #F24E1E15, #F24E1E25)' },
    'Framer': { bg: '#0055FF20', border: '#0055FF', text: '#0055FF', gradient: 'linear-gradient(135deg, #0055FF15, #0055FF25)' },
    'Adobe Photoshop': { bg: '#31A8FF20', border: '#31A8FF', text: '#31A8FF', gradient: 'linear-gradient(135deg, #31A8FF15, #31A8FF25)' },
    'Adobe Illustrator': { bg: '#FF9A0020', border: '#FF9A00', text: '#FF9A00', gradient: 'linear-gradient(135deg, #FF9A0015, #FF9A0025)' },
    'UI / UX': { bg: '#8B5CF620', border: '#8B5CF6', text: '#8B5CF6', gradient: 'linear-gradient(135deg, #8B5CF615, #8B5CF625)' },
    'Prototyping': { bg: '#EC489920', border: '#EC4899', text: '#EC4899', gradient: 'linear-gradient(135deg, #EC489915, #EC489925)' },
    'Design Systems': { bg: '#F59E0B20', border: '#F59E0B', text: '#F59E0B', gradient: 'linear-gradient(135deg, #F59E0B15, #F59E0B25)' },
    'Responsive Design': { bg: '#3B82F620', border: '#3B82F6', text: '#3B82F6', gradient: 'linear-gradient(135deg, #3B82F615, #3B82F625)' },
    'No-Code': { bg: '#8B5CF620', border: '#9333EA', text: '#9333EA', gradient: 'linear-gradient(135deg, #9333EA15, #9333EA25)' },
    'Prompt Designing': { bg: '#06B6D420', border: '#14B8A6', text: '#14B8A6', gradient: 'linear-gradient(135deg, #14B8A615, #14B8A625)' },
    'Prompt Coding': { bg: '#10B98120', border: '#14B8A6', text: '#14B8A6', gradient: 'linear-gradient(135deg, #14B8A615, #14B8A625)' },
    
    // Dev Tools
    'Git': { bg: '#F0502820', border: '#F05028', text: '#F05028', gradient: 'linear-gradient(135deg, #F0502815, #F0502825)' },
    'GitHub': { bg: '#18171720', border: '#181717', text: '#181717', gradient: 'linear-gradient(135deg, #18171715, #18171725)' },
    'VS Code': { bg: '#007ACC20', border: '#007ACC', text: '#007ACC', gradient: 'linear-gradient(135deg, #007ACC15, #007ACC25)' },
    'Cursor': { bg: '#000AFF20', border: '#000AFF', text: '#000AFF', gradient: 'linear-gradient(135deg, #000AFF15, #000AFF25)' },
    'Vercel': { bg: '#00000020', border: '#000000', text: '#000000', gradient: 'linear-gradient(135deg, #00000015, #00000025)' },
    'npm': { bg: '#CB000020', border: '#CB0000', text: '#CB0000', gradient: 'linear-gradient(135deg, #CB000015, #CB000025)' },
    'Chrome DevTools': { bg: '#4285F420', border: '#4285F4', text: '#4285F4', gradient: 'linear-gradient(135deg, #4285F415, #4285F425)' },
    'Strapi': { bg: '#2E7EEA20', border: '#2E7EEA', text: '#2E7EEA', gradient: 'linear-gradient(135deg, #2E7EEA15, #2E7EEA25)' },
    'Docker': { bg: '#2496ED20', border: '#2496ED', text: '#2496ED', gradient: 'linear-gradient(135deg, #2496ED15, #2496ED25)' },
    'Postman': { bg: '#FF6C3720', border: '#FF6C37', text: '#FF6C37', gradient: 'linear-gradient(135deg, #FF6C3715, #FF6C3725)' },
    
    // Default for skills without specific color
    'default': { bg: '#0d948820', border: '#0d9488', text: '#0d9488', gradient: 'linear-gradient(135deg, #f0fdfa, #e0f2fe)' }
  };

  const getSkillColor = (skillName) => {
    return techColors[skillName] || techColors['default'];
  };

  return (
    <>
      <style>{`
        .skills-professional-wrapper {
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }

        .skills-professional-wrapper::before {
          content: '';
          position: absolute;
          top: -300px;
          left: -300px;
          width: 700px;
          height: 700px;
          background: transparent;
          pointer-events: none;
        }

        .skills-professional-wrapper::after {
          content: '';
          position: absolute;
          bottom: -250px;
          right: -250px;
          width: 600px;
          height: 600px;
          background: transparent;
          pointer-events: none;
        }

        /* Header section */
        .skills-professional-header {
          text-align: center;
          margin-bottom: clamp(5rem, 8vh, 7rem);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 1;
        }

        .skills-professional-heading {
          font-size: clamp(2.75rem, 5.5vw, 4rem);
          font-weight: 900;
          color: #0f172a;
          line-height: 1.1;
          margin-bottom: clamp(1.5rem, 3vh, 2rem);
          letter-spacing: -0.03em;
        }

        .skills-professional-heading .gradient-text {
          color: #0d9488;
        }

        .skills-professional-subheading {
          font-size: clamp(1.25rem, 2.3vw, 1.5rem);
          line-height: 1.6;
          color: #475569;
          font-weight: 400;
        }

        /* Category section */
        .category-professional-section {
          margin-bottom: clamp(4.5rem, 7vh, 6rem);
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 1;
        }

        .category-professional-section:last-of-type {
          margin-bottom: 0;
        }

        /* Category header */
        .category-header-card {
          background: #ffffff;
          padding: clamp(1.75rem, 3vw, 2.25rem) clamp(2rem, 3.5vw, 3rem);
          border-radius: 1.25rem 1.25rem 0 0;
          border: 1px solid #e2e8f0;
          border-bottom: none;
          position: relative;
          overflow: hidden;
        }

        .category-header-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: #0d9488;
        }

        .category-professional-title {
          font-size: clamp(1.625rem, 2.8vw, 2.125rem);
          font-weight: 800;
          color: #0f172a;
          margin: 0;
          letter-spacing: 0.1em;
          text-align: center;
          text-transform: uppercase;
        }

        /* Skills grid container */
        .skills-grid-container {
          background: white;
          padding: clamp(2.5rem, 4vw, 3.5rem);
          border-radius: 0 0 1.25rem 1.25rem;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
        }

        /* Skills grid */
        .skills-professional-grid {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(0.875rem, 1.5vw, 1.125rem);
          justify-content: center;
        }

        /* Individual skill badge - enhanced pill style */
        .skill-professional-card {
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 50px;
          padding: clamp(0.875rem, 1.5vw, 1.125rem) clamp(1.5rem, 2.5vw, 2rem);
          display: inline-flex;
          align-items: center;
          gap: 0.875rem;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: default;
          position: relative;
          overflow: hidden;
        }

        .skill-professional-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--accent-color);
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 0;
        }

        .skill-professional-card:hover {
          transform: translateY(-5px) scale(1.05);
          border-color: var(--accent-color);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }

        .skill-professional-card:hover::before {
          opacity: 0.05;
        }

        .skill-icon-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .skill-professional-name {
          font-size: clamp(0.9375rem, 1.6vw, 1.0625rem);
          font-weight: 700;
          color: #334155;
          line-height: 1;
          white-space: nowrap;
          position: relative;
          z-index: 1;
          letter-spacing: -0.01em;
        }

        @media (max-width: 640px) {
          .skills-professional-grid {
            gap: 0.75rem;
          }

          .skill-professional-card {
            padding: 0.75rem 1.25rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .skill-professional-card:hover {
            transform: none;
          }
        }
      `}</style>

      <section className="skills-professional-wrapper py-20 md:py-28 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="skills-professional-header">
            <h2 className="skills-professional-heading">
              <span className="gradient-text">Technical</span> Expertise
            </h2>
            <p className="skills-professional-subheading">
              A comprehensive blend of design expertise and modern development technologies
            </p>
          </div>

          {/* Skills by Category */}
          {skillsData.categories.map((category, catIndex) => (
            <div key={catIndex} className="category-professional-section">
              <div className="category-header-card">
                <h3 className="category-professional-title">
                  {category.title}
                </h3>
              </div>
              
              <div className="skills-grid-container">
                <div className="skills-professional-grid">
                  {category.skills.map((skill, skillIndex) => {
                    const colors = getSkillColor(skill.name);
                    return (
                      <div 
                        key={skillIndex} 
                        className="skill-professional-card"
                        style={{ '--accent-color': colors.border }}
                      >
                        <div 
                          className="skill-icon-dot"
                          style={{ background: colors.border }}
                        ></div>
                        <span className="skill-professional-name">{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default SkillsSection;
