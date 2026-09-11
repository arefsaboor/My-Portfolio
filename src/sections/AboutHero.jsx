import AboutPhoto from '../assets/AboutHero-Portrait.jpg';
import ExternalIcon from '../components/ExternalIcon';

export default function AboutHero() {
  return (
    <section className="ab-hero textured" style={{ background: 'var(--paper)' }}>
      <div className="shell">
        <div className="ab-split">

          <h1 className="ab-name"><b>Aref</b> Saboor</h1>

          <figure className="ab-plate">
            <img src={AboutPhoto} alt="Aref Saboor, photographed in Berlin" />
          </figure>

          <div className="ab-body">
            <p className="ab-lead">
              Before I began designing interfaces, I learned to pay attention through a camera and through books.
            </p>
            <p className="ab-sub">
              I spent years as a video journalist — including work with the <strong>Bundeswehr</strong> — and
              earned my living as a graphic designer, before training as a developer. That work taught me to
              prepare thoroughly, compose carefully, and take responsibility for details.
            </p>
            <p className="ab-sub">
              I also write. Essays in Persian and English live at{' '}
              <a className="ab-site" href="https://arefsaboor.com" target="_blank" rel="noreferrer">
                arefsaboor.com<ExternalIcon />
              </a>{' '}
              — my official site, and where the habit of looking closely comes from. It shapes how I read a
              brief: stay with a problem longer, look for its structure, distrust the first easy answer.
            </p>

            <div className="ab-facts">
              <div className="ab-fact">
                <p>Based in</p>
                <p>Berlin, Germany<br />Open to New<br />Opportunities</p>
              </div>
              <div className="ab-fact">
                <p>Background</p>
                <p>Video Journalism<br />&amp; Graphic Design</p>
              </div>
              <div className="ab-fact">
                <p>Practice</p>
                <p>UX/UI Design<br />&amp; Full-Stack<br />Development</p>
              </div>
              <div className="ab-fact">
                <p>I also write</p>
                <p>
                  Essays In<br />Persian &amp; English<br />
                  <a className="ab-site" href="https://arefsaboor.com" target="_blank" rel="noreferrer">
                    arefsaboor.com<ExternalIcon />
                  </a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
