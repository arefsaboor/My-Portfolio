import { Link } from 'react-router-dom';
import { projects } from './sharedData';
import DeviceShowcase from './DeviceShowcase';
import LinkButtons from './LinkButtons';

export default function ProjectsListContent() {
  return (
    <div className="bg-white min-h-screen">
      <section className="py-16 sm:py-24 md:py-32 lg:py-40">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-12 sm:mb-20">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400 mb-5">My Work</p>
            <h2 className="font-light text-slate-900 tracking-tight" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}>All Projects</h2>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {projects.map((p, i) => (
              <div
                key={p.id}
                id={p.slug}
                className="rounded-2xl border border-slate-200 hover:border-teal-200 hover:shadow-lg transition-all duration-300 p-6 sm:p-8 lg:p-10 scroll-mt-28"
              >
                <div
                  className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.15fr_1fr] gap-8 md:gap-10 lg:gap-12 items-center ${
                    i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-[11px] font-semibold uppercase tracking-wide rounded-full border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Live
                      </span>
                      <span className="px-3 py-1 bg-teal-50 text-teal-700 text-[11px] font-semibold uppercase tracking-wide rounded-full border border-teal-100">{p.category}</span>
                      <span className="text-xs text-slate-400">{p.duration}</span>
                    </div>

                    <span className="text-5xl sm:text-6xl lg:text-7xl font-light text-slate-200 leading-none">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-slate-900 mt-3 mb-2">{p.name}</h3>
                    <p className="text-base sm:text-lg text-slate-500 mb-5">{p.subtitle}</p>
                    <p className="text-slate-600 leading-relaxed mb-6 max-w-lg">{p.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.technologies.map((t) => (
                        <span key={t} className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-lg border border-teal-100">{t}</span>
                      ))}
                    </div>

                    <ul className="space-y-2 mb-7">
                      {p.highlights.slice(0, 3).map((h) => (
                        <li key={h} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <span className="flex-shrink-0 w-4 h-4 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mt-0.5">
                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <LinkButtons project={p} tone="light" />
                  </div>

                  <DeviceShowcase project={p} tone="light" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16 py-12 sm:py-14 px-6 sm:px-10 rounded-2xl border border-teal-100 bg-teal-50/40">
            <h3 className="text-2xl sm:text-3xl font-light text-slate-900 mb-3">Have a project in mind?</h3>
            <p className="text-slate-500 mb-8">Clean code meets beautiful design.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors">
              Start a Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
