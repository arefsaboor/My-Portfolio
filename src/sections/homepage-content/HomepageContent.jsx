import { useState } from 'react';
import ExternalIcon from '../../components/ExternalIcon';
import WritingSiteBridge from '../WritingSiteBridge';
import { Link } from 'react-router-dom';
import { featuredProjects } from './sharedData';
import './homepage.css';

/* A literal transcription of the four page sections in
 * arefsaboor.com/public/design-concepts/portfolio-homepage.html.
 *
 * Same class names, same inline styles, same numbers. Nothing here goes
 * through tailwind.config.js — the styling lives in homepage.css, moved
 * across byte-for-byte. Where the concept hardcoded four project cards this
 * maps over featuredProjects; the markup it emits per card is identical.
 *
 * To change the design: change the concept page first, then move it again.
 */

const disciplines = [
  {
    mark: '01',
    title: 'I make products understandable.',
    text: 'User flows, interface hierarchy and visual systems that make a complicated product feel considered from the first interaction.',
    detail: 'UX/UI Design · Figma · Design Systems',
  },
  {
    mark: '02',
    title: 'I turn the design into the real thing.',
    text: 'Responsive, accessible frontend work with the same attention to detail that shaped the interface in the first place.',
    detail: 'React · Next.js · TypeScript · Tailwind CSS',
  },
  {
    mark: '03',
    title: 'I can take it beyond the screen.',
    text: 'When a product needs data, authentication, payments or an admin workflow, I can build the system behind the interface too.',
    detail: 'Node.js · PostgreSQL · Prisma · Stripe · Firebase',
  },
];

/* The archive's device plate, ported from ProjectsListContent so the homepage
   cards read the same: real browser chrome on desktop, a camera dot on tablet,
   a notch on phone. The plate keeps its box whatever is inside it and the image
   is object-fit:contain, so switching view never crops or reflows the row. */
/* The laptop's screen slot takes the screenshot's own aspect ratio, so no
   capture is ever letterboxed or cropped. A ref callback rather than onLoad:
   the shots are preloaded, so by the time React attaches a handler the image
   is already complete and onLoad would never fire. */
function setShotRatio(img) {
  if (!img) return;
  const apply = () => {
    const af = img.closest('.af');
    if (af && img.naturalWidth) af.style.setProperty('--shot-ar', img.naturalWidth / img.naturalHeight);
  };
  if (img.complete) apply();
  else img.addEventListener('load', apply, { once: true });
}

const VIEWS = [['desktop', 'Desktop'], ['tablet', 'Tablet'], ['mobile', 'Mobile']];

const LINKS = [
  ['liveUrl', 'Visit Live'],
  ['vercelUrl', 'Live Vercel'],
  ['githubUrl', 'GitHub'],
  ['figmaUrl', 'Figma'],
];

function LinkRow({ project, className = 'pj-links' }) {
  return (
    <div className={className}>
      {LINKS.filter(([key]) => project[key]).map(([key, label]) => (
        <a className="linkline" key={label} href={project[key]} target="_blank" rel="noopener noreferrer">
          {label}<ExternalIcon />
        </a>
      ))}
    </div>
  );
}

function DevicePlate({ project }) {
  const [view, setView] = useState('desktop');
  const url = (project.liveUrl || project.vercelUrl || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
  return (
    <div className="pj-shots">
      <div className="pj-views" role="tablist" aria-label={`${project.name} screenshots`}>
        {VIEWS.map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={view === key}
            className={`pj-view mono${view === key ? ' on' : ''}`}
            onClick={() => setView(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <figure className="pj-plate">
        <div className="pj-plate-in">
          <div className="pj-dev-wrap">
            {view === 'desktop' && (
              <div className="af af-lap">
                <div className="af-lid">
                  <div className="af-bar">
                    <span className="af-dot" /><span className="af-dot" /><span className="af-dot" />
                    <span className="af-url mono">{url}</span>
                  </div>
                  <div className="af-screen"><img src={project.screens.desktop} alt={`${project.name} on desktop`} loading="lazy" decoding="async" ref={setShotRatio} /></div>
                </div>
                <div className="af-base" />
              </div>
            )}
            {view === 'tablet' && (
              <div className="af af-tab">
                <div className="af-body">
                  <span className="af-cam" />
                  <div className="af-screen"><img src={project.screens.tablet} alt={`${project.name} on tablet`} loading="lazy" decoding="async" /></div>
                </div>
              </div>
            )}
            {view === 'mobile' && (
              <div className="af af-pho">
                <div className="af-body">
                  <span className="af-notch" />
                  <div className="af-screen"><img src={project.screens.mobile} alt={`${project.name} on mobile`} loading="lazy" decoding="async" /></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </figure>
    </div>
  );
}

export default function HomepageContent() {
  return (
    <main className="pf-home">

      {/* ══ STATEMENT ══ */}
      <section id="about" className="textured sec" style={{ background: 'var(--paper)' }}>
        <div className="shell">
          <div className="card-lg stmt op-head">
            {/* the opener label: a tinted plate with its own hairline, then a
                deliberate drop before the two columns begin */}
            <p className="eyebrow">A design-first developer</p>

            <div className="op-cols">
              <h2 className="d op-title">
                I use design to ask the right questions—then code to make the answer work.
              </h2>

              <div className="op-aside">
                <p className="op-say">
                  A background in visual journalism and graphic design, brought to digital products.
                </p>
                <p className="op-say">
                  Years behind a camera and in a cutting room taught me to look before I build:
                  to ask what a thing is for, what it is competing with for attention, and what
                  can be taken away without losing the point.
                </p>
                <p className="op-say">
                  I still work that way. The design question and the engineering question get
                  answered together rather than in sequence — which is usually why the finished
                  thing holds up.
                </p>
                <Link to="/about" className="linkline op-link">
                  More about my approach <span style={{ color: 'var(--accent)' }}>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ RECENT WORKS ══ */}
      <section id="projects" className="textured sec" style={{ background: 'var(--band)', borderTop: '1px solid var(--rule)' }}>
        <div className="shell-wide">
          <div className="op-head sec-gap">
            <p className="eyebrow">Recent Works</p>
            <div className="op-cols">
              <h2 className="d op-title">A closer look at what I build.</h2>
              <div className="op-aside">
                <p className="op-say">
                  A short selection rather than an archive. Each one is a working product with
                  its own constraints — payments and accounts, bilingual publishing, a public
                  API, a design system carried through to the code.
                </p>
                <p className="op-say">
                  Every entry below sets out what the problem was, what I decided, and what it
                  took to build — not just the screen it ended up as.
                </p>
              </div>
            </div>
          </div>

          <div className="proj-stack">
            {featuredProjects.map((project, i) => (
              <article className={`pj-row${i % 2 ? ' flip' : ''}`} key={project.id}>
                <div className="pj-row-head">
                  <p className="pj-rn mono">
                    <span className="numchip">{String(i + 1).padStart(2, '0')}</span> {project.category}
                  </p>
                  <p className="pj-role mono">{project.role} · {project.year}</p>
                </div>

                <div className="pj-row-id">
                  <h3 className="pj-rname">{project.name}</h3>
                  <p className="pj-rsub">{project.subtitle}</p>
                </div>

                <div className="pj-row-mid">
                  <DevicePlate project={project} />
                  <div className="pj-read">
                    <p className="pj-lead">{project.description}</p>
                    <div className="pj-qa">
                      <div>
                        <p className="pj-k">The question</p>
                        <p>{project.challenge}</p>
                      </div>
                      <div>
                        <p className="pj-k">The response</p>
                        <p>{project.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pj-row-foot">
                  <div>
                    <p className="pj-k">What is in the work</p>
                    <ul className="pj-hl">
                      {project.highlights.slice(0, 4).map((h) => (
                        <li key={h}><span aria-hidden="true">—</span><span>{h}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="pj-k">Built with</p>
                    <p className="pj-tech mono">{project.technologies.join(' · ')}</p>
                    <LinkRow project={project} className="pj-links foot" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="sec-gap-top" style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/projects" className="linkline" style={{ borderBottomColor: 'var(--accent)' }}>
              Explore all projects <span style={{ color: 'var(--accent)' }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ ANOTHER PRACTICE — the writing site ══ */}
      <WritingSiteBridge />

      {/* ══ HOW I CONTRIBUTE ══ */}
      <section className="textured sec" style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)' }}>
        <div className="shell">
          <div className="op-head sec-gap-sm">
            <p className="eyebrow">How I contribute</p>
            <div className="op-cols">
              <h2 className="d op-title">Useful at the beginning, and still useful at launch.</h2>
              <div className="op-aside">
                <p className="op-say">
                  Three things I am usually asked to do. They overlap more than the labels
                  suggest — the judgement that shapes an interface is the same one that decides
                  what the API should return.
                </p>
                <p className="op-say">
                  Being able to work across all three is what keeps a decision from being handed
                  over the wall and quietly reinterpreted.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {disciplines.map((d) => (
              <article key={d.mark} className="disc">
                <span className="numchip mono" style={{ background: 'var(--inset)', color: 'var(--accent)', border: '1px solid var(--rule)' }}>{d.mark}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
                  <h3 className="disc-t">{d.title}</h3>
                  <p className="t-body" style={{ margin: 0, maxWidth: '580px', fontWeight: 300, lineHeight: 1.65, color: 'var(--soft)' }}>{d.text}</p>
                </div>
                <p className="mono tech" style={{ margin: 0, fontSize: '12px', lineHeight: 1.8, color: 'var(--muted)' }}>{d.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OPEN TO OPPORTUNITIES ══ */}
      <section className="textured sec" style={{ background: 'var(--wash)', borderTop: '1px solid var(--rule)' }}>
        <div className="shell">
          <div className="card-lg cta">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p className="eyebrow">Open to opportunities</p>
              <h2 className="d cta-t" style={{ maxWidth: '700px' }}>Let’s make something clear, useful and well-made.</h2>
            </div>
            <Link to="/contact" className="btn" style={{ flexShrink: 0, background: 'var(--ink)', color: '#fff', boxShadow: 'var(--sh-md)' }}>
              Start a conversation <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
