import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AboutHero from '../sections/AboutHero';
import AboutContent from '../sections/AboutContent';
import CVPreviewModal from '../components/CVPreviewModal';
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

        {/* CTA Section */}
        <section className="bg-white py-20 md:py-28 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">
            <div className="text-center py-14 sm:py-16 px-6 sm:px-10 rounded-2xl border border-teal-100 bg-teal-50/40">
              <h2 className="font-light text-slate-900 tracking-tight mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
                Ready to Work Together?
              </h2>
              <p className="text-lg sm:text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
                Let's build something exceptional together.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
                >
                  <span>Start a Project</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

                <button
                  onClick={() => setIsCVModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-white text-slate-700 font-medium rounded-lg border border-slate-300 hover:border-teal-400 hover:text-teal-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>View Resume</span>
                </button>

                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-white text-slate-700 font-medium rounded-lg border border-slate-300 hover:border-teal-400 hover:text-teal-600 transition-colors"
                >
                  <span>View All Projects</span>
                </Link>
              </div>
            </div>
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
