import { useState } from 'react';
import { Link } from 'react-router-dom';
import readingIcon from '../assets/interests/Reading.svg';
import writingIcon from '../assets/interests/Writing.svg';
import joggingIcon from '../assets/interests/Jogging.svg';
import yogaIcon from '../assets/interests/Yoga.svg';
import { socialLinks } from '../data/contactData';
import CVPreviewModal from './CVPreviewModal';
import '../sections/homepage-content/homepage.css';

/* A literal transcription of the footer in
 * arefsaboor.com/public/design-concepts/portfolio-homepage.html — "the spread".
 *
 * Two facing pages divided by a full-height rule: identity, description and
 * marks on the left; the index in three columns on the right, with the
 * interests taking a register along its foot so the columns are never left
 * hanging in empty space. Both pages stretch to the same height so the rule
 * runs the full spread, and the colophon spans beneath both.
 *
 * To change it: edit the concept page, then re-run the move.
 */

const GLOBE =
  'M49.947 0A50 50 0 0 0 0 50a50 50 0 0 0 50 50a50 50 0 0 0 50-50A50 50 0 0 0 50 0a50 50 0 0 0-.053 0zM52.5 5.682c5.268.896 10.302 5.236 14.268 12.437c1.278 2.321 2.42 4.927 3.408 7.75H52.5V5.682zm-5 .197v19.99H30.75c.988-2.823 2.13-5.429 3.408-7.75C37.89 11.341 42.571 7.102 47.5 5.88zM35.98 7.232c-2.324 2.352-4.41 5.22-6.203 8.475c-1.68 3.05-3.125 6.467-4.312 10.162H12.01c5.535-8.706 13.975-15.37 23.97-18.637zm29.41.463c9.398 3.413 17.32 9.868 22.6 18.174H75.455c-1.184-3.695-2.627-7.112-4.307-10.162c-1.676-3.045-3.613-5.749-5.757-8.012zM9.257 30.87h14.808c-1.245 5.162-2.008 10.76-2.203 16.631H5.072a44.79 44.79 0 0 1 4.184-16.63zm19.974 0H47.5V47.5H26.867c.212-5.935 1.043-11.554 2.363-16.63zm23.27 0h19.195c1.32 5.077 2.152 10.696 2.364 16.631H52.5V30.87zm24.355 0h13.89a44.79 44.79 0 0 1 4.181 16.63H79.053c-.194-5.872-.955-11.468-2.198-16.63zM5.072 52.5h16.762c.129 5.856.82 11.454 1.994 16.63H9.256A44.79 44.79 0 0 1 5.072 52.5zm21.762 0H47.5v16.63H28.98c-1.245-5.1-2.006-10.715-2.146-16.63zm25.666 0h21.592c-.14 5.915-.902 11.53-2.147 16.63H52.5V52.5zm26.576 0h15.852a44.79 44.79 0 0 1-4.184 16.63H77.09c1.17-5.177 1.857-10.775 1.986-16.63zM12.01 74.13h13.136c1.242 4.085 2.8 7.84 4.631 11.165c1.438 2.61 3.068 4.969 4.854 7.017c-9.407-3.41-17.336-9.869-22.621-18.181zm18.394 0H47.5v20.798c-.308-.017-.612-.048-.918-.07c-4.59-1.5-8.924-5.62-12.424-11.975c-1.428-2.594-2.692-5.537-3.754-8.752zm22.096 0h18.021c-1.06 3.216-2.325 6.159-3.753 8.753c-3.428 6.225-7.656 10.308-12.141 11.883a45.48 45.48 0 0 1-2.127.162V74.13zm23.275 0H87.99a45.06 45.06 0 0 1-21.228 17.641c1.604-1.92 3.075-4.094 4.386-6.476c1.831-3.325 3.388-7.08 4.627-11.164z';

function Footer() {
  const [isCVOpen, setIsCVOpen] = useState(false);

  return (
    <footer className="pf-footer textured mt-auto">
      <div className="shell">
        <div className="f-pages">

          {/* left page — who, where, and the marks */}
          <div className="f-left">
            <p className="f-av mono"><i /> Open to work · Berlin, Germany</p>
            <p className="f-nm"><b>Aref</b> Saboor</p>
            <p className="f-say">
              UX/UI design and full-stack development, informed by a background in
              visual journalism and an ongoing practice of reading and writing.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="f-socs">
                {/* his own site, ahead of the platforms and in the accent */}
                <a className="f-site" href="https://arefsaboor.com" target="_blank" rel="noreferrer"
                   aria-label="arefsaboor.com — Aref Saboor's official site" title="arefsaboor.com">
                  <svg viewBox="0 0 100 100" aria-hidden="true"><path d={GLOBE} /></svg>
                </a>
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d={s.path} /></svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* right page — the index, with the interests along its foot */}
          <div className="f-right">
            <div className="f-cols">
              <div>
                <nav className="f-lk" aria-label="Footer navigation">
                  <Link to="/">Home</Link>
                  <Link to="/projects">Projects</Link>
                  <Link to="/about">About</Link>
                  <Link to="/contact">Contact</Link>
                </nav>
              </div>
              <div>
                <div className="f-lk">
                  <a className="f-ex" href="https://arefsaboor.com" target="_blank" rel="noreferrer">Writing</a>
                  <a href="https://medium.com/@arefsaboor" target="_blank" rel="noreferrer">Medium</a>
                  <button type="button" className="f-btn" onClick={() => setIsCVOpen(true)}>Resume</button>
                  <Link to="/impressum">Impressum</Link>
                </div>
              </div>
              <div>
                <div className="f-lk">
                  <a href="mailto:arefsaboor.m@gmail.com">Email</a>
                  <a href="https://linkedin.com/in/arefsaboor" target="_blank" rel="noreferrer">LinkedIn</a>
                  <a href="https://github.com/arefsaboor" target="_blank" rel="noreferrer">GitHub</a>
                  <a className="f-ex" href="https://arefsaboor.com" target="_blank" rel="noreferrer">arefsaboor.com</a>
                </div>
              </div>
            </div>

            <div className="f-beyond">
              <p className="f-lbl">Beyond the keyboard</p>
              <div className="f-inl">
                {[
                  { label: 'Reading', icon: readingIcon },
                  { label: 'Writing', icon: writingIcon, href: 'https://arefsaboor.com' },
                  { label: 'Jogging', icon: joggingIcon },
                  { label: 'Yoga',    icon: yogaIcon },
                ].map(({ label, icon, href }) => {
                  const inner = (
                    <>
                      <img src={icon} alt="" aria-hidden="true" className="f-ico" />
                      {label}
                    </>
                  );
                  return href ? (
                    <a key={label} className="f-ex" href={href} target="_blank" rel="noreferrer">{inner}</a>
                  ) : (
                    <span key={label}>{inner}</span>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        <div className="f-colo mono">
          <span>© {new Date().getFullYear()} Aref Saboor. All rights reserved.</span>
          <span>
            Designed and built by{' '}
            <a href="https://arefsaboor.com" target="_blank" rel="noreferrer">Aref Saboor</a>.
          </span>
        </div>
      </div>

      <CVPreviewModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </footer>
  );
}

export default Footer;
