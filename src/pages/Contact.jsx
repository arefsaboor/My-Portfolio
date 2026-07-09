import { useState, useEffect } from 'react';
import SocialIconLink from '../components/SocialIconLink';
import FormStatus from '../components/FormStatus';
import { contactMethods, socialLinks } from '../data/contactData';
import { usePageMeta } from '../utils/usePageMeta';

const methodIcons = {
  Email: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Location: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Phone: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
};

const inputClass = 'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white outline-none transition-all text-slate-900 placeholder-slate-400';

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
    "Contact Aref Saboor | Let's Work Together",
    'Get in touch with Aref Saboor for your next web design or development project. Based in Berlin, available for remote and worldwide work.'
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
    <>
      <div className="bg-white">
        <section className={`pt-28 lg:pt-32 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] lg:min-h-[calc(100vh-8rem)]">
            <div className="px-6 sm:px-12 lg:pl-16 lg:pr-12 py-12 lg:py-20 flex flex-col justify-between">
              <div>
                <h1 className="font-light text-slate-900 tracking-tight leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 3.25rem)' }}>
                  Let's Work <span className="font-medium italic">Together</span>
                </h1>
                <p className="text-lg text-slate-500 leading-relaxed mb-10">
                  Share a bit about your product, audience and challenges &mdash; the more context you give, the better I can suggest a solution that fits.
                </p>

                <div className="space-y-6">
                  {contactMethods.map((m) => (
                    <div key={m.label} className="flex items-start gap-4 border-t border-slate-200 pt-5">
                      <span className="w-10 h-10 shrink-0 rounded-full bg-white border border-slate-200 flex items-center justify-center text-teal-600">
                        {methodIcons[m.label]}
                      </span>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">{m.kicker}</p>
                        {m.href ? (
                          <a href={m.href} className="text-slate-900 font-semibold hover:text-teal-600 transition-colors">{m.value}</a>
                        ) : (
                          <p className="text-slate-900 font-semibold">{m.value}</p>
                        )}
                        <p className="text-sm text-slate-400 mt-0.5">{m.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-10 lg:pt-0">
                <p className="text-xs font-semibold text-slate-900 uppercase tracking-wide mb-4">Find me here</p>
                <div className="flex gap-3">
                  {socialLinks.map((link) => (
                    <SocialIconLink key={link.label} link={link} className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-teal-600 hover:border-teal-300 hover:-translate-y-0.5 transition-all" />
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-12 lg:px-12 py-12 lg:py-20 flex items-center">
              <div className="w-full max-w-2xl mx-auto">
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 sm:p-10">
                  <h2 className="text-2xl font-light text-slate-900 mb-1">Send a Message</h2>
                  <p className="text-slate-500 mb-8">I'll get back to you as soon as possible.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <FormStatus status={status} />
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute -left-[9999px] w-px h-px overflow-hidden"
                    />
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">Name</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="you@example.com" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">Message</label>
                      <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows="6" className={`${inputClass} resize-none`} placeholder="Tell me about your project..." />
                    </div>
                    <button
                      type="submit"
                      disabled={status.submitting}
                      className={`group w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white font-medium rounded-lg transition-all duration-300 ${status.submitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-teal-600 hover:-translate-y-0.5 hover:shadow-lg'}`}
                    >
                      {status.submitting ? 'Sending...' : 'Send Message'}
                      {!status.submitting && (
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
