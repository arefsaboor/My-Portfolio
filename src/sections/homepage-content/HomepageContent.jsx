import { useState } from 'react';
import { Link } from 'react-router-dom';
import skillsData from '../../data/skills.json';
import CTASection from '../../components/CTASection';
import { techIcons, aboutStats, featuredProjects } from './sharedData';

function Heading({ eyebrow, children }) {
  return (
    <div className="mb-12">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400 mb-4">{eyebrow}</p>
      <h2 className="font-light text-slate-900 tracking-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>{children}</h2>
    </div>
  );
}

function TechIconBadge({ icon }) {
  return (
    <div className="rounded-lg p-4 flex flex-col items-center gap-2 w-24 flex-shrink-0 border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors">
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
      <div className="flex w-full gap-1 p-2 rounded-lg mb-8 border border-slate-200 bg-slate-50 hover:bg-white transition-colors">
        {deviceTabs.map((d) => (
          <button
            key={d.id}
            onClick={() => setDevice(d.id)}
            className={`flex-1 px-4 py-3 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
              device === d.id ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="h-auto flex items-center justify-center group">
        {device === 'desktop' && (
          <div className="w-full rounded-xl p-3 border border-slate-200 bg-slate-50 shadow-lg group-hover:shadow-2xl transition-all duration-300 origin-center">
            <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg mb-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400/70" />
                <span className="w-3 h-3 rounded-full bg-amber-400/70" />
                <span className="w-3 h-3 rounded-full bg-green-400/70" />
              </div>
              <div className="flex-1 text-xs text-slate-400 bg-slate-50 rounded px-3 py-1 truncate font-mono">{project.liveUrl?.replace('https://', '')}</div>
            </div>
            <img src={project.screens.desktop} alt={`${project.name} desktop view`} className="w-full h-auto rounded-lg border border-slate-200" loading="lazy" />
          </div>
        )}
        {device === 'tablet' && (
          <div className="bg-slate-900 rounded-[2rem] p-2 shadow-2xl group-hover:shadow-3xl transition-all duration-300 origin-center">
            <div className="relative flex items-center justify-center">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-600 ring-2 ring-slate-700 z-10" />
              <img src={project.screens.tablet} alt={`${project.name} tablet view`} className="h-[500px] w-auto object-contain rounded-2xl" loading="lazy" />
            </div>
          </div>
        )}
        {device === 'mobile' && (
          <div className="bg-slate-900 rounded-[2.2rem] p-2 shadow-2xl group-hover:shadow-3xl transition-all duration-300 origin-center relative">
            <span className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-2.5 rounded-full bg-black z-10" />
            <span className="absolute -left-[2px] top-[28%] w-[3px] h-8 bg-slate-700 rounded-r" />
            <span className="absolute -right-[2px] top-[24%] w-[3px] h-11 bg-slate-700 rounded-l" />
            <div className="relative flex items-center justify-center">
              <img src={project.screens.mobile} alt={`${project.name} mobile view`} className="h-[500px] w-auto object-contain rounded-[1.6rem]" loading="lazy" />
            </div>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-slate-600" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function HomepageContent() {
  return (
    <div className="bg-white">

      {/* About */}
      <section id="about" className="py-20 md:py-28 lg:py-32">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <Heading eyebrow="Who I Am">Design-First Developer</Heading>
          <div className="rounded-xl p-10 border border-slate-200 bg-slate-50/50 mb-8">
            <p className="text-xl text-slate-600 leading-relaxed mb-4">
              I&apos;m a <strong className="text-slate-800">video journalist</strong> and <strong className="text-slate-800">self-learned graphic designer</strong> who discovered the power of combining visual arts with code.
            </p>
            <p className="text-xl text-slate-600 leading-relaxed">Combining <strong className="text-slate-800">visual design intuition</strong> with modern <strong className="text-slate-800">full-stack development</strong> skills.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {aboutStats.map((s) => (
              <div key={s.label} className="rounded-lg p-6 text-center border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="text-2xl font-light text-slate-900">{s.value}</div>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillsData.categories.map((cat) => (
              <div key={cat.id} className="rounded-xl p-8 border border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                <h3 className="text-xl font-light text-slate-900 mb-1">{cat.title}</h3>
                <p className="text-sm text-slate-500 mb-5">{cat.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <span key={s.id} className="text-sm font-medium text-slate-700 px-4 py-2 rounded-full bg-slate-100 border border-slate-200">{s.name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech logos marquee - full width, between two horizontal lines */}
        <div className="w-full border-t border-b border-slate-200 py-10 mt-16 overflow-hidden">
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

      {/* Projects */}
      <section id="projects" className="py-20 md:py-28 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <Heading eyebrow="Portfolio">Featured Projects</Heading>
          <div className="space-y-20 lg:space-y-32">
            {featuredProjects.map((p, idx) => {
              const projectNum = String(idx + 1).padStart(2, '0');
              
              return (
                <div key={p.id} className="relative">
                  {/* Accent line between projects */}
                  {idx > 0 && <div className="absolute -top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />}
                  
                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Info Section */}
                    <div>
                      <div className="mb-6 flex items-center gap-4">
                        <span className="text-6xl sm:text-7xl font-light text-slate-200 leading-none">{projectNum}</span>
                        <div>
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-900 mb-1 hover:text-teal-600 transition-colors cursor-default">{p.name}</h3>
                          <p className="text-base text-slate-500">{p.subtitle}</p>
                        </div>
                      </div>

                      {/* Accent line */}
                      <div className="w-12 h-1 bg-teal-500/60 rounded-full mb-6" />

                      {/* Project description */}
                      <p className="text-slate-600 leading-relaxed mb-8">{p.description}</p>

                      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">Built With</p>
                      <div className="flex flex-wrap gap-2 mb-10">
                        {p.technologies.map((t) => (
                          <span key={t} className="text-xs font-medium text-slate-700 px-3.5 py-2 rounded-lg bg-slate-100 border border-slate-200 hover:border-teal-300 hover:bg-slate-50 transition-all cursor-default">{t}</span>
                        ))}
                      </div>

                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-teal-600 hover:translate-x-1 transition-all group shadow-sm hover:shadow-md"
                      >
                        <span>View Live Project</span>
                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </a>
                    </div>

                    {/* Device Showcase */}
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/10 to-slate-300/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative rounded-2xl overflow-hidden">
                        <DeviceShowcase project={p} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="text-center mt-16 lg:mt-20">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-teal-600 transition-colors group text-lg"
          >
            View All Projects
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 md:py-28 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <CTASection
            eyebrow="GET IN TOUCH"
            title="Let's Work Together"
            description="Have a project, a role, or just want to connect? I'm currently open to new opportunities and would love to hear from you."
            primaryButtonText="Start a Conversation"
            primaryButtonHref="/contact"
          />
        </div>
      </section>
    </div>
  );
}
