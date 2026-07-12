import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AboutHero from '../sections/AboutHero';
import AboutContent from '../sections/AboutContent';
import CVPreviewModal from '../components/CVPreviewModal';
import CTASection from '../components/CTASection';
import detailedSkillsData from '../data/detailedSkills.json';
import { usePageMeta } from '../utils/usePageMeta';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  usePageMeta(
    'About Aref Saboor - UX/UI Designer & Full Stack Developer',
    "From video journalist to full-stack developer: Aref Saboor's story, background, training, and what makes his design-first approach different."
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  return (
    <>
      <div className="bg-white">
        <AboutHero isVisible={isVisible} />

        <div id="about-story">
          <AboutContent />
        </div>

        {/* Skills Section */}
        <section className="py-20 md:py-28 lg:py-32 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400 mb-6">My Expertise</p>
            <h2 className="font-light text-slate-900 tracking-tight leading-[1.05] mb-16" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              Skills and <span className="font-medium italic">Expertise</span>
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {detailedSkillsData.categories.map((cat) => (
                <div key={cat.id} className="space-y-6">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">{cat.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{cat.description}</p>
                  </div>
                  
                  <div className="space-y-3">
                    {cat.skills.map((skill) => (
                      <div key={skill.id} className="flex items-center">
                        <span className="text-sm text-slate-700 hover:text-slate-900 transition-colors cursor-default">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white py-20 md:py-28 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">
            <CTASection
              eyebrow="GET IN TOUCH"
              title="Ready to Build Something Great?"
              description="Have a project, role opportunity, or collaboration idea? Let's explore how we can work together to create exceptional digital experiences."
              primaryButtonText="Start a Project"
              primaryButtonHref="/contact"
              secondaryButton={{
                text: 'View Resume',
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              }}
              onSecondaryClick={() => setIsCVModalOpen(true)}
            />
          </div>
        </section>

        {/* CV Preview Modal */}
        <CVPreviewModal
          isOpen={isCVModalOpen}
          onClose={() => setIsCVModalOpen(false)}
        />
      </div>
    </>
  );
};

export default About;
