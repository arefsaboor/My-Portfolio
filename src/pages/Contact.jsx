import { useState, useEffect } from 'react';
import SocialIconLink from '../components/SocialIconLink';
import FormStatus from '../components/FormStatus';
import { contactMethods, socialLinks } from '../data/contactData';
import { usePageMeta } from '../utils/usePageMeta';
import './contact.css';

/* Markup transcribed literally from the approved concept
   (public/design-concepts/portfolio-contact.html) — same elements, same class
   names, same order. The form's submit, honeypot and status handling are the
   page's existing logic, untouched. */

// A real sequence, so the numbering carries information.
const NEXT_STEPS = [
  { n: '01', title: 'You write', note: 'A few lines about the role or the work. No cover letter needed.' },
  { n: '02', title: 'I reply',   note: 'Usually within 24 hours, in English or German.' },
  { n: '03', title: 'We talk',   note: 'A call, or a coffee if you are in Berlin.' },
];

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '' // honeypot: left empty by real users, hidden from view
  });
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  usePageMeta(
    'Contact Aref Saboor | Design & Development',
    'Write to Aref Saboor about a role, collaboration, or thoughtful digital product. Based in Berlin and available for remote work.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus({ submitting: false, submitted: true, error: null });
      setFormData({ name: '', email: '', message: '', website: '' });

      setTimeout(() => {
        setStatus({ submitting: false, submitted: false, error: null });
      }, 5000);

    } catch (error) {
      setStatus({
        submitting: false,
        submitted: false,
        error: error.message || 'Failed to send message. Please try again.'
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="pf-contact">
      <section
        className="ct textured"
        style={{
          background: 'var(--paper)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity .7s ease'
        }}
      >
        <div className="shell">

          {/* Three direct grid children. Stacked on phones; from 1040px the
              headline takes the left column (over the contact details) and the
              paragraph the right (over the form), so both sit on the same
              vertical grid lines as the columns beneath them. */}
          <header className="ct-head op-head">
            <p className="eyebrow">Contact / Berlin</p>
            <div className="op-cols">
              <h1 className="ct-title op-title">A conversation can begin simply.</h1>
              <div className="op-aside">
                <p className="op-say">
                  If you are considering a role, collaboration, or piece of work that values
                  clear thinking and careful execution, write to me. A few honest lines are enough.
                </p>
                <p className="op-say">
                  I reply in English or German, usually within a day.
                </p>
              </div>
            </div>
          </header>

          <div className="ct-split">

            <aside className="ct-aside">
              {contactMethods.map((method) => (
                <div key={method.label} className="ct-method">
                  <p className="ct-kick">{method.kicker}</p>
                  {method.href ? (
                    <a className="ct-val" href={method.href}>{method.value}</a>
                  ) : (
                    <p className="ct-val">{method.value}</p>
                  )}
                  <p className="ct-note">{method.note}</p>
                </div>
              ))}

              <div className="ct-next">
                <p className="ct-kick">What happens next</p>
                <ol className="ct-steps">
                  {NEXT_STEPS.map((step) => (
                    <li key={step.n}>
                      <span className="numchip">{step.n}</span>
                      <div>
                        <b>{step.title}</b>
                        <span>{step.note}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="ct-else">
                <p className="ct-kick">Elsewhere</p>
                <div className="ct-socs">
                  {socialLinks.map((link) => (
                    <SocialIconLink key={link.label} link={link} />
                  ))}
                </div>
              </div>
            </aside>

            <div className="ct-form">
              <div className="ct-form-head">
                <h2 className="ct-form-title">Write a message</h2>
                <span className="ct-req mono">All fields required</span>
              </div>

              <form onSubmit={handleSubmit}>
                <FormStatus status={status} />

                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
                />

                <div className="ct-fields">
                  <div>
                    <label className="ct-label" htmlFor="name">Your name</label>
                    <input className="ct-input" id="name" name="name" type="text"
                      value={formData.name} onChange={handleChange} required placeholder="Your name" />
                  </div>
                  <div>
                    <label className="ct-label" htmlFor="email">Your email</label>
                    <input className="ct-input" id="email" name="email" type="email"
                      value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="ct-label" htmlFor="message">Your message</label>
                    <textarea className="ct-input" id="message" name="message" rows="6"
                      value={formData.message} onChange={handleChange} required
                      placeholder="A role, a collaboration, an idea, or a question…" />
                  </div>
                </div>

                <button className="ct-send" type="submit" disabled={status.submitting}
                  style={status.submitting ? { cursor: 'not-allowed', opacity: 0.6 } : undefined}>
                  {status.submitting ? 'Sending…' : 'Send Message'}
                  {!status.submitting && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
