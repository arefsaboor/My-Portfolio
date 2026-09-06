import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import './utility.css';

/* Markup transcribed literally from the approved concept
   (public/design-concepts/portfolio-utility.html). Every word of the German
   legal text is unchanged from the previous version of this file — it is a
   statutory notice, so nothing in it was reworded. */

const BackArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 19l-7-7 7-7m-7 7h18" />
  </svg>
);

function Impressum() {
  usePageMeta(
    'Impressum | Aref Saboor',
    'Legal information (Impressum) for arefsaboor.de, in accordance with German TMG §5.'
  );

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="pf-utility">
      <div className="ut-page textured">
        <div className="ut-shell">
          <Link className="linkline ut-back" to="/"><BackArrow />Back to Home</Link>

          <header className="ut-head">
            <p className="eyebrow">Legal / TMG § 5</p>
            <h1 className="ut-title">Impressum</h1>
            <p className="ut-lead">
              Legal information for arefsaboor.de, provided in accordance with German telemedia law.
            </p>
          </header>

          <div className="ut-secs">
            <section className="ut-sec">
              <h2 className="ut-h">Angaben gemäß § 5 TMG</h2>
              <p className="ut-name">Aref Saboor</p>
              <p>Berlin, Germany</p>
            </section>

            <section className="ut-sec">
              <h2 className="ut-h">Kontakt</h2>
              <p><span className="ut-lbl">Telefon:</span> <a href="tel:+4917478176611">+49 (0) 174 781 76 11</a></p>
              <p><span className="ut-lbl">E-Mail:</span> <a href="mailto:arefsaboor.m@gmail.com">arefsaboor.m@gmail.com</a></p>
              <p><span className="ut-lbl">Website:</span> <a href="https://arefsaboor.de" target="_blank" rel="noopener noreferrer">arefsaboor.de</a></p>
            </section>

            <section className="ut-sec">
              <h2 className="ut-h">EU-Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                <a className="brk" href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                  https://ec.europa.eu/consumers/odr/
                </a>
                <br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            <section className="ut-sec">
              <h2 className="ut-h">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section className="ut-sec">
              <h2 className="ut-h">Haftung für Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
                Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche
                Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte
                umgehend entfernen.
              </p>
            </section>

            <section className="ut-sec">
              <h2 className="ut-h">Urheberrecht</h2>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind
                nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf
                dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
                beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
                trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
                entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
                Inhalte umgehend entfernen.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Impressum;
