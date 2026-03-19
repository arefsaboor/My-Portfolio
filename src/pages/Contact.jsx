import { useState, useEffect } from 'react';
import PageLoader from '../components/PageLoader';
import { smoothScrollToId } from '../utils/smoothScroll';

const Contact = ({ showPageLoader = true, showHeroSection = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showLoader, setShowLoader] = useState(showPageLoader);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  // Smooth scroll to contact form
  const scrollToForm = () => {
    smoothScrollToId('contact-form-section');
  };

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

      // Success
      setStatus({ submitting: false, submitted: true, error: null });
      setFormData({ name: '', email: '', message: '' });

      // Reset success message after 5 seconds
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
      {showLoader && <PageLoader pageName="Contact" onComplete={() => setShowLoader(false)} />}
      <div className="bg-white">
      {/* Hero Section - Only shown on standalone Contact page */}
      {showHeroSection && (
        <section 
          id="contact-hero"
          className="relative w-full flex items-end overflow-hidden contact-hero-section"
          style={{ height: '100svh' }}
        >
          <style>{`
            #contact-hero {
              padding-bottom: clamp(2.5rem, 5vh, 4rem);
              overflow: hidden;
            }

            .contact-hero-section .hero-bg {
              background-position: 50% 50%;
              transform: scale(1.05);
              transform-origin: 50% 50%;
            }
            
            @media (max-width: 768px) {
              .contact-hero-section .hero-bg {
                background-position: 50% 50%;
                transform-origin: 50% 50%;
                transform: scale(1.1);
              }
            }

            /* Fine-tune email icon position on very small screens (e.g. iPhone SE) */
            @media (max-width: 400px) {
              .contact-hero-email {
                width: 14rem;
                height: 14rem;
                top: 48%;
                transform: translate(-50%, -52%) scale(0.9);
              }
            }
          `}</style>
          
          {/* Background - Gradient Pattern */}
          <div 
            className="hero-bg absolute inset-0 z-0 bg-gradient-to-br from-teal-800 via-cyan-800 to-blue-800"
          >
            {/* Email Icon with Checkmark */}
            <div className="contact-hero-email absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 lg:w-[28rem] lg:h-[28rem] z-[20] opacity-30">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Envelope body - centered */}
                <rect x="40" y="80" width="120" height="85" rx="6" fill="#14b8a6" stroke="#0d9488" strokeWidth="2" />
                
                {/* Envelope flap - front triangle */}
                <path d="M40 80 L100 120 L160 80" fill="#0d9488" stroke="#0d7c70" strokeWidth="2" strokeLinejoin="round" />
                
                {/* Envelope flap lines for depth */}
                <line x1="40" y1="80" x2="40" y2="165" stroke="#0d7c70" strokeWidth="2" />
                <line x1="160" y1="80" x2="160" y2="165" stroke="#0d7c70" strokeWidth="2" />
                
                {/* Checkmark badge - top center */}
                <circle cx="100" cy="55" r="22" fill="#10b981" stroke="#059669" strokeWidth="2" />
                <path d="M89 55 L97 63 L111 47" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent z-[10]"></div>
          </div>

          {/* Content - Bottom Left */}
          <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20">
            <div className={`max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                GET IN TOUCH
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-light max-w-2xl leading-relaxed mb-8">
                Have a project in mind? Let's discuss your vision and create something exceptional together.
              </p>
              
              {/* Scroll Indicator */}
              <button
                onClick={scrollToForm}
                className="group flex items-center gap-3 text-white/80 hover:text-white transition-all duration-300"
                aria-label="Scroll to contact form"
              >
                <span className="text-sm font-medium tracking-wide">SCROLL</span>
                <svg 
                  className="w-5 h-5 animate-bounce" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Contact Form Section */}
      <section id="contact-form-section" className="py-20 sm:py-24 lg:py-32 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            
            {/* Left: Contact Information */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Let's Work Together
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Share a bit about your product, audience and challenges.
                  The more context you give, the better I can suggest a solution that fits.
                </p>
              </div>
              
              {/* Contact Details */}
              <div className="space-y-4 lg:space-y-6">
                <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white border-2 border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">Drop me a line</p>
                    <a href="mailto:info@arefsaboor.com" className="text-gray-900 font-semibold hover:text-teal-600 transition-colors text-lg block">
                      info@arefsaboor.com
                    </a>
                    <p className="text-sm text-gray-600 mt-1">You can also drop me direct emails</p>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white border-2 border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <img src="/globe.svg" alt="Globe" className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">Based in</p>
                    <p className="text-gray-900 font-semibold text-lg">Berlin, Germany</p>
                    <p className="text-sm text-gray-600 mt-1">Open to remote & worldwide projects</p>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white border-2 border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-teal-800 uppercase tracking-wider mb-1">Call Me</p>
                    <p className="text-gray-900 font-semibold text-lg">+49 (0) 174 781 76 11</p>
                    <p className="text-sm text-gray-600 mt-1">You can also WhatsApp me!</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-bold text-gray-900 mb-4">You can also find me here:</p>
                <div className="flex flex-wrap gap-3">
                  {/* 1. GitHub */}
                  <a 
                    href="https://github.com/arefsaboor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 border-2 border-gray-300 rounded-xl flex items-center justify-center hover:border-teal-600 transition-all hover:scale-110 hover:rotate-6"
                    aria-label="GitHub"
                    title="View my GitHub profile"
                  >
                    <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </a>
                  {/* 2. Medium */}
                  <a 
                    href="https://medium.com/@arefsaboor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 border-2 border-gray-300 rounded-xl flex items-center justify-center hover:border-teal-600 transition-all hover:scale-110 hover:rotate-6"
                    aria-label="Medium"
                    title="Read my articles on Medium"
                  >
                    <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                    </svg>
                  </a>
                  {/* 3. LinkedIn */}
                  <a 
                    href="https://linkedin.com/in/arefsaboor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 border-2 border-gray-300 rounded-xl flex items-center justify-center hover:border-teal-600 transition-all hover:scale-110 hover:rotate-6"
                    aria-label="LinkedIn"
                    title="Connect on LinkedIn"
                  >
                    <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  {/* 4. Behance */}
                  <a 
                    href="https://behance.net/arefsaboor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 border-2 border-gray-300 rounded-xl flex items-center justify-center hover:border-teal-600 transition-all hover:scale-110 hover:rotate-6"
                    aria-label="Behance"
                    title="View my work on Behance"
                  >
                    <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11.524h3.391c2.093 0 2.093-3.137 0-3.137H3v3.137zm0 4.163h3.616c3.066 0 3.066-3.653 0-3.653H3v3.653z"/>
                    </svg>
                  </a>
                  {/* 5. Facebook */}
                  <a 
                    href="https://facebook.com/arefsaboor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 border-2 border-gray-300 rounded-xl flex items-center justify-center hover:border-teal-600 transition-all hover:scale-110 hover:rotate-6"
                    aria-label="Facebook"
                    title="Follow me on Facebook"
                  >
                    <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  {/* 6. Instagram */}
                  <a 
                    href="https://instagram.com/arefsaboor" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-12 h-12 border-2 border-gray-300 rounded-xl flex items-center justify-center hover:border-teal-600 transition-all hover:scale-110 hover:rotate-6"
                    aria-label="Instagram"
                    title="Follow me on Instagram"
                  >
                    <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-3">
              <div className="relative bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
                
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full blur-3xl opacity-50 -ml-20 -mb-20"></div>
                
                <div className="relative z-10">
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">Send a Message</h3>
                    <p className="text-gray-600">Fill out the form below and drop your words, I'll get back to you as soon as possible.</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Success Message */}
                    {status.submitted && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 text-green-800 px-5 py-4 rounded-2xl flex items-start gap-3 shadow-lg animate-fadeIn">
                        <svg className="w-6 h-6 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <div>
                          <p className="font-semibold">Message sent successfully!</p>
                          <p className="text-sm text-green-700 mt-1">Thank you for reaching out. I'll respond within 24 hours.</p>
                        </div>
                      </div>
                    )}

                    {/* Error Message */}
                    {status.error && (
                      <div className="bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-300 text-red-800 px-5 py-4 rounded-2xl flex items-start gap-3 shadow-lg animate-fadeIn">
                        <svg className="w-6 h-6 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                        </svg>
                        <div>
                          <p className="font-semibold">Oops! Something went wrong</p>
                          <p className="text-sm text-red-700 mt-1">{status.error}</p>
                        </div>
                      </div>
                    )}

                    {/* Name Field */}
                    <div className="group">
                      <label htmlFor="name" className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        What's your name? <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white outline-none transition-all text-gray-900 placeholder-gray-400 group-hover:border-gray-300"
                        placeholder="Enter your name..."
                      />
                    </div>

                    {/* Email Field */}
                    <div className="group">
                      <label htmlFor="email" className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        Where should I reply? <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white outline-none transition-all text-gray-900 placeholder-gray-400 group-hover:border-gray-300"
                        placeholder="Enter your email address..."
                      />
                    </div>

                    {/* Message Field */}
                    <div className="group">
                      <label htmlFor="message" className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        How can I help you? <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:bg-white outline-none transition-all resize-none text-gray-900 placeholder-gray-400 group-hover:border-gray-300"
                        placeholder="Share your ideas, goals, timeline, or any questions you have. The more details you provide, the better I can help you."
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status.submitting}
                      className={`group w-full px-8 py-5 bg-teal-600 text-white font-bold rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg ${
                        status.submitting 
                          ? 'opacity-60 cursor-not-allowed' 
                          : 'hover:bg-teal-700 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]'
                      }`}
                    >
                      {status.submitting ? (
                        <>
                          <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending your message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </button>
                    
                    <p className="text-center text-xs text-gray-500 pt-2">
                      By submitting this form, you agree to receive email responses. Your data is handled with care and never shared.
                    </p>
                  </form>
                </div>
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
