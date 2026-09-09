import { useState } from 'react';
import { projects } from './sharedData';
import ExternalIcon from '../../components/ExternalIcon';

/* Markup transcribed literally from the approved concept
   (public/design-concepts/portfolio-projects.html). Content is unchanged —
   every field still comes from Projects.json via sharedData.js, in the same
   Bestsellers-first order, with the same slug anchors. */

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

/* Each project was shot on all three devices; the row lets you switch between
   them. The plate keeps its box whatever is inside it and the image is
   `object-fit: contain`, so switching never crops the shot and never reflows
   the row. */
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
                  <div className="af-screen"><img src={project.screens.tablet} alt={`${project.name} on tablet`} loading="lazy" decoding="async" ref={setShotRatio} /></div>
                </div>
              </div>
            )}
            {view === 'mobile' && (
              <div className="af af-pho">
                <div className="af-body">
                  <span className="af-notch" />
                  <div className="af-screen"><img src={project.screens.mobile} alt={`${project.name} on mobile`} loading="lazy" decoding="async" ref={setShotRatio} /></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </figure>
    </div>
  );
}

export default function ProjectsListContent() {
  return (
    <>
      <section className="pj-archive textured" id="pj-archive">
        <div className="shell-wide">
          <header className="pj-head op-head">
            <p className="eyebrow">Project archive / {String(projects.length).padStart(2, '0')} entries</p>
            <div className="op-cols">
              <h2 className="pj-htitle op-title">Five projects. Five different kinds of responsibility.</h2>
              <div className="op-aside">
                <p className="op-say">
                  Each entry shows more than a finished screen: what had to be understood,
                  what was built, and where design decisions meet technical ones.
                </p>
                <p className="op-say">
                  They are ordered by what they demanded rather than by date — the constraint
                  that shaped each one is the part worth reading.
                </p>
              </div>
            </div>
          </header>

          {projects.map((p, i) => (
            <article className={`pj-row${i % 2 ? ' flip' : ''}`} id={p.slug} key={p.id}>
              <div className="pj-row-head">
                <p className="pj-rn mono">
                  <span className="numchip">{String(i + 1).padStart(2, '0')}</span> {p.category}
                </p>
                <p className="pj-role mono">{p.role} · {p.year}</p>
              </div>

              <div className="pj-row-id">
                <h3 className="pj-rname">{p.name}</h3>
                <p className="pj-rsub">{p.subtitle}</p>
              </div>

              <div className="pj-row-mid">
                <DevicePlate project={p} />
                <div className="pj-read">
                  <p className="pj-lead">{p.description}</p>
                  <div className="pj-qa">
                    <div>
                      <p className="pj-k">The question</p>
                      <p>{p.challenge}</p>
                    </div>
                    <div>
                      <p className="pj-k">The response</p>
                      <p>{p.solution}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pj-row-foot">
                <div>
                  <p className="pj-k">What is in the work</p>
                  <ul className="pj-hl">
                    {p.highlights.slice(0, 4).map((h) => (
                      <li key={h}><span aria-hidden="true">—</span><span>{h}</span></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="pj-k">Built with</p>
                  <p className="pj-tech mono">{p.technologies.join(' · ')}</p>
                  <LinkRow project={p} className="pj-links foot" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pj-end textured">
        <div className="shell-wide">
          <div className="pj-endgrid">
            <div>
              <p className="eyebrow">Next conversation</p>
              <h2 className="pj-endtitle" style={{ marginTop: '18px' }}>
                Tell me what needs to be understood, designed, or built.
              </h2>
            </div>
            <a className="linkline" href="mailto:arefsaboor.m@gmail.com">
              arefsaboor.m@gmail.com<ExternalIcon />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
