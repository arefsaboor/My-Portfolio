import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Impressum() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white">
      {/* Header */}
      <div className="pt-32 pb-12 px-6 sm:px-8 lg:px-16 xl:px-20">
        <div className="max-w-3xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors mb-8 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Impressum
          </h1>
          <p className="text-gray-400 text-lg">Legal Information</p>
        </div>
      </div>

      {/* Content */}
      <div className="pb-20 px-6 sm:px-8 lg:px-16 xl:px-20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800/50 rounded-2xl p-8 sm:p-10 space-y-8 border border-gray-700/50">
            
            {/* Information according to § 5 TMG */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Angaben gemäß § 5 TMG
              </h2>
              <div className="text-gray-300 space-y-2">
                <p className="font-medium text-white">Aref Saboor</p>
                <p>Berlin, Germany</p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Kontakt
              </h2>
              <div className="text-gray-300 space-y-2">
                <p>
                  <span className="text-gray-400">Telefon:</span>{' '}
                  <a href="tel:+4917478176611" className="text-teal-400 hover:text-teal-300 transition-colors">
                    +49 (0) 174 781 76 11
                  </a>
                </p>
                <p>
                  <span className="text-gray-400">E-Mail:</span>{' '}
                  <a href="mailto:info@arefsaboor.com" className="text-teal-400 hover:text-teal-300 transition-colors">
                    info@arefsaboor.com
                  </a>
                </p>
                <p>
                  <span className="text-gray-400">Website:</span>{' '}
                  <a href="https://arefsaboor.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition-colors">
                    arefsaboor.com
                  </a>
                </p>
              </div>
            </section>

            {/* EU Dispute Resolution */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                EU-Streitschlichtung
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                <a 
                  href="https://ec.europa.eu/consumers/odr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 transition-colors break-all"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                <br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            {/* Consumer Dispute Resolution */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Verbraucherstreitbeilegung / Universalschlichtungsstelle
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            {/* Liability for Content */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Haftung für Inhalte
              </h2>
              <p className="text-gray-300 leading-relaxed">
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

            {/* Copyright */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Urheberrecht
              </h2>
              <p className="text-gray-300 leading-relaxed">
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
    </div>
  );
}

export default Impressum;
