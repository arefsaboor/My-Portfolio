import { Link } from 'react-router-dom';
import { projects } from './sharedData';
import DeviceShowcase from './DeviceShowcase';
import LinkButtons from './LinkButtons';
import CTASection from '../../components/CTASection';

export default function ProjectsListContent() {
  return (
    <div className="bg-white min-h-screen">
      <section className="py-16 sm:py-24 md:py-32 lg:py-40">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-16 sm:mb-24">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400 mb-5">My Work</p>
            <h2 className="font-light text-slate-900 tracking-tight" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}>All Projects</h2>
          </div>

          <div className="space-y-20 lg:space-y-32">
            {projects.map((p, i) => {
              const projectNum = String(i + 1).padStart(2, '0');
              
              return (
                <div
                  key={p.id}
                  id={p.slug}
                  className="relative scroll-mt-28"
                >
                  {/* Accent line between projects */}
                  {i > 0 && <div className="absolute -top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />}

                  <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Info Section */}
                    <div>
                      {/* Project Number, Title, Subtitle in a row */}
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

                      {/* Status badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-8">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-[11px] font-semibold uppercase tracking-wide rounded-full border border-green-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          Live
                        </span>
                        <span className="px-3 py-1 bg-teal-50 text-teal-700 text-[11px] font-semibold uppercase tracking-wide rounded-full border border-teal-100">{p.category}</span>
                        <span className="text-xs text-slate-400">{p.year}</span>
                      </div>

                      {/* Built With */}
                      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">Built With</p>
                      <div className="flex flex-wrap gap-2 mb-10">
                        {p.technologies.map((t) => (
                          <span key={t} className="text-xs font-medium text-slate-700 px-3.5 py-2 rounded-lg bg-slate-100 border border-slate-200 hover:border-teal-300 hover:bg-slate-50 transition-all cursor-default">{t}</span>
                        ))}
                      </div>

                      {/* Highlights */}
                      {p.highlights && p.highlights.length > 0 && (
                        <>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">Highlights</p>
                          <ul className="space-y-2 mb-8">
                            {p.highlights.slice(0, 3).map((h) => (
                              <li key={h} className="flex items-start gap-2.5 text-sm text-slate-600">
                                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mt-0.5">
                                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </span>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      <LinkButtons project={p} tone="light" />
                    </div>

                    {/* Device Showcase */}
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/10 to-slate-300/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative rounded-2xl overflow-hidden">
                        <DeviceShowcase project={p} tone="light" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 sm:mt-16">
            <CTASection
              title="Have a Project in Mind?"
              description="Whether you need a custom web application, design overhaul, or technical consultation — I'm here to help bring your vision to life."
              primaryButtonText="Let's Talk"
              primaryButtonHref="/contact"
              variant="minimal"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
