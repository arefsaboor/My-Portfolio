import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Section({ title, children }) {
  return (
    <section className="border-t border-slate-200 pt-8">
      <h2 className="text-xl font-semibold text-slate-900 mb-4">{title}</h2>
      <div className="text-slate-600 leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

function Impressum() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white pt-28 lg:pt-36 pb-20">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors mb-8 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <h1 className="font-light text-slate-900 tracking-tight mb-3" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}>
          Impressum
        </h1>
        <p className="text-slate-500 text-lg mb-12">Legal Information</p>

        <div className="space-y-8">
          <Section title="Angaben gemäß § 5 TMG">
            <p className="font-medium text-slate-900">Aref Saboor</p>
            <p>Berlin, Germany</p>
          </Section>

          <Section title="Kontakt">
            <p>
              <span className="text-slate-400">Telefon:</span>{' '}
              <a href="tel:+4917478176611" className="text-teal-600 hover:text-teal-700 transition-colors">
                +49 (0) 174 781 76 11
              </a>
            </p>
            <p>
              <span className="text-slate-400">E-Mail:</span>{' '}
              <a href="mailto:arefsaboor.m@gmail.com" className="text-teal-600 hover:text-teal-700 transition-colors">
                arefsaboor.m@gmail.com
              </a>
            </p>
            <p>
              <span className="text-slate-400">Website:</span>{' '}
              <a href="https://arefsaboor.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700 transition-colors">
                arefsaboor.com
              </a>
            </p>
          </Section>

          <Section title="EU-Streitschlichtung">
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 transition-colors break-all"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              <br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </Section>

          <Section title="Verbraucherstreitbeilegung / Universalschlichtungsstelle">
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </Section>

          <Section title="Haftung für Inhalte">
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
          </Section>

          <Section title="Urheberrecht">
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
          </Section>
        </div>
      </div>
    </div>
  );
}

export default Impressum;
