import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AboutHero from '../sections/AboutHero';
import AboutContent from '../sections/AboutContent';
import CVPreviewModal from '../components/CVPreviewModal';
import detailedSkillsData from '../data/detailedSkills.json';
import { usePageMeta } from '../utils/usePageMeta';
import './about.css';
import TechMarquee from '../components/TechMarquee';

/* A literal transcription of the About design concept. Every padding, gap,
 * size, weight and colour lives in about.css, moved across byte-for-byte and
 * scoped under .pf-about. To change the design: change the concept, re-run the
 * move. Nothing here depends on tailwind.config.js. */

const About = () => {
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  usePageMeta(
    'About Aref Saboor — Design-led Web Development',
    "From video journalist to full-stack developer: Aref Saboor's story, background, training, and what makes his design-first approach different."
  );

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="pf-about">
      <AboutHero />
      <div id="about-story">
        <AboutContent />
      </div>

      {/* ══ SKILLS ══ */}
      <section
        className="sk-band textured"
        style={{ padding: 'clamp(56px,9vw,128px) 0' }}
      >
        <div className="shell">
          <div style={{ maxWidth: '780px', marginBottom: 'clamp(30px,4vw,48px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p className="eyebrow">Areas of contribution</p>
            <h2 className="d">What I actually work with.</h2>
          </div>
          <div className="skills">
            {detailedSkillsData.categories.map((cat) => (
              <div className="sk" key={cat.id}>
                <h3 className="sk-title">{cat.title}</h3>
                <p className="sk-desc">{cat.description}</p>
                <ul className="sk-list">
                  {cat.skills.map((s) => <li key={s.id}>{s.name}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <TechMarquee />
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section
        className="textured"
        style={{ background: 'var(--wash)', borderTop: '1px solid var(--rule)', padding: 'clamp(52px,8vw,112px) 0 clamp(56px,9vw,128px)' }}
      >
        <div className="shell">
          <div className="card-lg cta">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p className="eyebrow">Let&rsquo;s talk</p>
              <h2 className="d" style={{ maxWidth: '700px', lineHeight: '.96' }}>Looking for a design-led developer?</h2>
              <p style={{ margin: 0, maxWidth: '56ch', fontSize: '16px', fontWeight: 300, lineHeight: 1.7, color: 'var(--soft)' }}>
                I&rsquo;m open to roles and collaborations where thoughtful design and capable engineering
                belong in the same conversation.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', flexShrink: 0 }}>
              <Link to="/contact" className="btn" style={{ background: 'var(--ink)', color: '#fff', boxShadow: 'var(--sh-md)' }}>
                Start a conversation <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
              <button
                type="button"
                onClick={() => setIsCVModalOpen(true)}
                className="btn"
                style={{ border: '1px solid var(--rule)', color: 'var(--ink)', background: 'transparent', cursor: 'pointer' }}
              >
                View Resume
              </button>
            </div>
          </div>
        </div>
      </section>

      <CVPreviewModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
    </main>
  );
};

export default About;
