import { journeyIntro, timelineItems, differentIntro, credentials } from './aboutContentData';

function Row({ number, label, meta, current, title, description, tags, icon, alt }) {
  return (
    <div className="group grid grid-cols-1 sm:grid-cols-[90px_170px_1fr] lg:grid-cols-[110px_200px_1fr] gap-3 sm:gap-6 lg:gap-10 py-9 sm:py-10 border-t border-slate-200 first:border-t-0">
      <span className="text-4xl sm:text-5xl font-light text-slate-200 leading-none">{number}</span>

      <div>
        {icon ? (
          <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center mb-3">
            <img src={icon} alt={alt} className="w-7 h-7 object-contain" />
          </div>
        ) : null}
        <p className="text-sm font-semibold text-slate-900 uppercase tracking-wide">{label}</p>
        {meta && <p className="text-xs text-slate-400 mt-1">{meta}</p>}
        {current && (
          <span className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-teal-600">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            Now
          </span>
        )}
      </div>

      <div>
        <h3 className="text-xl sm:text-2xl font-light text-slate-900 mb-3 group-hover:text-teal-700 transition-colors">{title}</h3>
        <p className="text-slate-600 leading-relaxed max-w-2xl">{description}</p>
        {tags && tags.length > 0 && (
          <p className="text-sm text-slate-500 mt-4">
            {tags.map((t, idx) => (
              <span key={t}>{t}{idx < tags.length - 1 && <span className="mx-2 text-teal-500">/</span>}</span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}

export default function AboutContent() {
  return (
    <>
      <section className="py-20 md:py-28 lg:py-32 bg-white">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400 mb-6">{journeyIntro.badge}</p>
          <h2 className="font-light text-slate-900 tracking-tight leading-[1.05] mb-10" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            {journeyIntro.heading}<br /><span className="font-medium italic">{journeyIntro.headingHighlight}</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mb-4 border-t border-slate-200 pt-8">{journeyIntro.lead}</p>

          <div>
            {timelineItems.map((item, i) => (
              <Row
                key={item.title}
                number={String(i + 1).padStart(2, '0')}
                label={item.era}
                meta={item.meta}
                current={item.current}
                title={item.title}
                description={item.description}
                tags={item.tags}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 lg:py-32 bg-white">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-12">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400 mb-6">{differentIntro.badge}</p>
          <h2 className="font-light text-slate-900 tracking-tight mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            {differentIntro.heading}<span className="font-medium italic">{differentIntro.headingHighlight}</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mb-4 border-t border-slate-200 pt-8">{differentIntro.lead}</p>

          <div>
            {credentials.map((c, i) => (
              <Row
                key={c.title}
                number={String(i + 1).padStart(2, '0')}
                label={c.kicker}
                title={c.title}
                description={c.description}
                icon={c.icon}
                alt={c.alt}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
