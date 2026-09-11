import { timelineItems, credentials } from './aboutContentData';

export default function AboutContent() {
  return (
    <>
      <section
        className="textured"
        style={{ background: 'var(--band)', borderTop: '1px solid var(--rule)', padding: 'clamp(56px,9vw,128px) 0' }}
      >
        <div className="shell">
          <div style={{ maxWidth: '780px', marginBottom: 'clamp(34px,5vw,60px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p className="eyebrow">Professional path</p>
            <h2 className="d">From visual storytelling to product building.</h2>
            <p style={{ margin: 0, maxWidth: '62ch', fontSize: '16px', fontWeight: 300, lineHeight: 1.7, color: 'var(--soft)' }}>
              My path into technology was not conventional. It gave me a trained eye for communication,
              composition and clarity — skills I now apply to every interface and product decision.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {timelineItems.map((item, i) => (
              <article key={item.title} className="tl">
                <span className="numchip mono">{String(i + 1).padStart(2, '0')}</span>
                <div className="tl-era">
                  <p className="tl-label">{item.era}</p>
                  <p className="tl-meta mono">{item.meta}</p>
                  {item.current && <p className="tl-now mono"><i />Now</p>}
                </div>
                <div className="tl-body">
                  <h3 className="tl-title">{item.title}</h3>
                  <p className="tl-desc">{item.description}</p>
                  {item.tags?.length > 0 && (
                    <p className="tl-tags mono">
                      {item.tags.map((t, k) => (
                        <span key={t} style={{ color: 'inherit', margin: 0 }}>
                          {t}{k < item.tags.length - 1 && <span> / </span>}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="textured"
        style={{ background: 'var(--paper)', borderTop: '1px solid var(--rule)', padding: 'clamp(56px,9vw,128px) 0' }}
      >
        <div className="shell">
          <div style={{ maxWidth: '780px', marginBottom: 'clamp(34px,5vw,60px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p className="eyebrow">What I bring to a team</p>
            <h2 className="d">More than a technical checklist.</h2>
            <p style={{ margin: 0, maxWidth: '62ch', fontSize: '16px', fontWeight: 300, lineHeight: 1.7, color: 'var(--soft)' }}>
              A professional background that makes design and engineering work better together.
            </p>
          </div>

          <div className="creds">
            {credentials.map((c, i) => (
              <article key={c.title} className="cred">
                <div className="cred-top">
                  <span className="cred-ico"><img src={c.icon} alt={c.alt} /></span>
                  <span className="numchip mono">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="eyebrow" style={{ marginTop: '22px' }}>{c.kicker}</p>
                <h3 className="cred-title">{c.title}</h3>
                <p className="cred-desc">{c.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
