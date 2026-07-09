import { useState } from 'react';
import skillsData from '../../data/skills.json';
import { techIcons, learningModules, aboutStats, featuredProjects, contactDetails } from './sharedData';
import { useContactForm } from './useContactForm';

function Heading({ eyebrow, children }) {
  return (
    <div className="text-center mb-16">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-teal-600 mb-4">{eyebrow}</p>
      <h2 className="font-black text-slate-800 tracking-tight" style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)' }}>{children}</h2>
    </div>
  );
}

const neu = 'bg-[#eef1f0] shadow-[8px_8px_20px_#d1d5d4,-8px_-8px_20px_#ffffff]';
const cardBorder = 'border border-teal-600/40';
const neuInset = 'bg-[#eef1f0] shadow-[inset_4px_4px_10px_#d1d5d4,inset_-4px_-4px_10px_#ffffff]';

function TechIconBadge({ icon }) {
  return (
    <div className={`${neu} rounded-lg p-4 flex flex-col items-center gap-2 w-24 flex-shrink-0`}>
      <img src={icon.src} alt={icon.alt} className="w-8 h-8" loading="lazy" />
      <span className="text-[10px] text-slate-500 font-medium text-center">{icon.name}</span>
    </div>
  );
}

const deviceTabs = [
  { id: 'desktop', label: 'Desktop' },
  { id: 'tablet', label: 'Tablet' },
  { id: 'mobile', label: 'Mobile' },
];

function DeviceShowcase({ project }) {
  const [device, setDevice] = useState('desktop');

  return (
    <div>
      <div className={`${neu} flex w-full gap-1 p-1.5 rounded-lg mb-7`}>
        {deviceTabs.map((d) => (
          <button
            key={d.id}
            onClick={() => setDevice(d.id)}
            className={`flex-1 px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wide transition-all ${
              device === d.id ? 'bg-teal-600 text-white shadow-md' : 'text-slate-500 hover:text-teal-600'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="h-[460px] flex items-center justify-center">
        {device === 'desktop' && (
          <div className={`${neu} rounded-lg p-2.5 w-full max-w-lg`}>
            <div className="flex items-center gap-3 px-3 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              </div>
              <div className="flex-1 text-[10px] text-slate-400 bg-white/60 rounded px-3 py-1 truncate">{project.liveUrl?.replace('https://', '')}</div>
            </div>
            <img src={project.screens.desktop} alt={`${project.name} desktop view`} className="w-full h-auto rounded-md" loading="lazy" />
          </div>
        )}
        {device === 'tablet' && (
          <div className="bg-slate-900 rounded-[1rem] p-1.5 h-[440px] w-fit shadow-xl">
            <div className="relative h-full flex items-center justify-center">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-slate-600 ring-1 ring-slate-700 z-10" />
              <img src={project.screens.tablet} alt={`${project.name} tablet view`} className="h-full w-auto object-cover rounded-[0.5rem]" loading="lazy" />
            </div>
          </div>
        )}
        {device === 'mobile' && (
          <div className="bg-slate-900 rounded-[1.4rem] p-1.5 h-[440px] w-fit shadow-xl relative">
            <span className="absolute top-2 left-1/2 -translate-x-1/2 w-9 h-2 rounded-full bg-black z-10" />
            <span className="absolute -left-[1px] top-[28%] w-[2px] h-7 bg-slate-700 rounded-r" />
            <span className="absolute -right-[1px] top-[24%] w-[2px] h-10 bg-slate-700 rounded-l" />
            <div className="relative h-full flex items-center justify-center">
              <img src={project.screens.mobile} alt={`${project.name} mobile view`} className="h-full w-auto object-cover rounded-[1rem]" loading="lazy" />
            </div>
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-[3px] rounded-full bg-slate-600" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function HomepageContent() {
  const { formData, status, handleChange, handleSubmit } = useContactForm();

  return (
    <div className="bg-[#eef1f0]">
      <style>{`
        @keyframes v2MarqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .v2-marquee-track {
          animation: v2MarqueeScroll 55s linear infinite;
          width: max-content;
        }
        @media (prefers-reduced-motion: reduce) {
          .v2-marquee-track {
            animation: none;
          }
        }
      `}</style>

      {/* About */}
      <section id="about" className="py-20 md:py-28 lg:py-32">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <Heading eyebrow="Who I Am">Design-First Developer</Heading>
          <div className={`${neu} ${cardBorder} rounded-xl p-10 mb-8`}>
            <p className="text-xl text-slate-600 leading-relaxed mb-4">
              I&apos;m a <strong className="text-slate-800">video journalist</strong> and <strong className="text-slate-800">self-learned graphic designer</strong> who discovered the power of combining visual arts with code.
            </p>
            <p className="text-xl text-slate-600 leading-relaxed"><strong className="text-teal-600">I don&apos;t just code — I craft visual experiences.</strong></p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {aboutStats.map((s) => (
              <div key={s.label} className={`${neu} ${cardBorder} rounded-lg p-6 text-center`}>
                <div className="text-2xl font-black text-teal-600">{s.value}</div>
                <div className="text-xs text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 md:py-28 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          <Heading eyebrow="What I Bring">Technical Expertise</Heading>
          <div className="grid sm:grid-cols-2 gap-8">
            {skillsData.categories.map((cat) => (
              <div key={cat.id} className={`${neu} ${cardBorder} rounded-xl p-8`}>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{cat.title}</h3>
                <p className="text-sm text-slate-500 mb-5">{cat.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <span key={s.id} className={`${neuInset} text-sm font-medium text-teal-700 px-4 py-2 rounded-full`}>{s.name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech logos marquee - full width, between two horizontal lines */}
        <div className="w-full border-t border-b border-teal-600/40 py-10 mt-16 overflow-hidden">
          <div className="flex gap-5 v2-marquee-track">
            <div className="flex gap-5 flex-shrink-0">
              {techIcons.map((icon) => <TechIconBadge key={`a-${icon.name}`} icon={icon} />)}
            </div>
            <div className="flex gap-5 flex-shrink-0">
              {techIcons.map((icon) => <TechIconBadge key={`b-${icon.name}`} icon={icon} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Journey */}
      <section className="py-20 md:py-28 lg:py-32">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <Heading eyebrow="My Curriculum">Learning Journey</Heading>
          <div className="grid sm:grid-cols-2 gap-6">
            {learningModules.map((m) => (
              <div key={m.id} className={`${neu} ${cardBorder} rounded-xl p-8`}>
                <div className={`${neuInset} inline-block px-3 py-1 rounded-full text-xs font-bold text-teal-600 uppercase tracking-wide mb-4`}>{m.duration}</div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{m.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 md:py-28 lg:py-32">
        <div className="max-w-[1300px] mx-auto px-6 sm:px-8 lg:px-12">
          <Heading eyebrow="Portfolio">Featured Projects</Heading>
          <div className="space-y-10">
            {featuredProjects.map((p) => (
              <div key={p.id} className={`${neu} ${cardBorder} rounded-xl p-8 sm:p-10 grid lg:grid-cols-[1fr_auto_1.3fr] gap-10 lg:gap-10 items-center`}>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-2">{p.name}</h3>
                  <p className="text-base text-slate-500 mb-7">{p.subtitle}</p>

                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400 mb-3">Built With</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.technologies.map((t) => (
                      <span key={t} className={`${neuInset} text-xs font-medium text-teal-700 px-3 py-1.5 rounded-full`}>{t}</span>
                    ))}
                  </div>

                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors shadow-md"
                  >
                    View Live Project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </a>
                </div>

                <div className="hidden lg:block w-px self-stretch bg-slate-300/80" />

                <DeviceShowcase project={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 md:py-28 lg:py-32">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <Heading eyebrow="Get In Touch">Let&apos;s Work Together</Heading>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="space-y-5">
              {contactDetails.map((c) => (
                <div key={c.label} className={`${neu} ${cardBorder} rounded-lg p-5`}>
                  <p className="text-xs text-teal-600 uppercase tracking-wide mb-1">{c.label}</p>
                  {c.href ? <a href={c.href} className="text-slate-800 font-bold">{c.value}</a> : <p className="text-slate-800 font-bold">{c.value}</p>}
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className={`${neu} ${cardBorder} rounded-xl p-8 space-y-4`}>
              {status.submitted && <p className="text-teal-700 bg-teal-50 px-4 py-3 rounded-xl text-sm">Message sent! I&apos;ll respond within 24 hours.</p>}
              {status.error && <p className="text-red-700 bg-red-50 px-4 py-3 rounded-xl text-sm">{status.error}</p>}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] w-px h-px overflow-hidden"
              />
              <label htmlFor="home-contact-name" className="sr-only">Your name</label>
              <input id="home-contact-name" type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" className={`${neuInset} w-full px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-teal-400 outline-none bg-[#eef1f0]`} />
              <label htmlFor="home-contact-email" className="sr-only">Your email</label>
              <input id="home-contact-email" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Your email" className={`${neuInset} w-full px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-teal-400 outline-none bg-[#eef1f0]`} />
              <label htmlFor="home-contact-message" className="sr-only">Your message</label>
              <textarea id="home-contact-message" name="message" value={formData.message} onChange={handleChange} required rows="4" placeholder="Your message" className={`${neuInset} w-full px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-teal-400 outline-none resize-none bg-[#eef1f0]`} />
              <button type="submit" disabled={status.submitting} className="w-full px-8 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-60 shadow-lg">
                {status.submitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
