import { Link } from 'react-router-dom';

function CTASection({ 
  eyebrow = null,
  title, 
  description, 
  primaryButtonText = 'Start a Project',
  primaryButtonHref = '/contact',
  secondaryButton = null,
  onSecondaryClick = null,
  variant = 'default' 
}) {
  const containerClasses = variant === 'minimal' 
    ? 'text-center py-12 sm:py-14 px-6 sm:px-10'
    : 'text-center py-16 sm:py-18 px-6 sm:px-10 rounded-2xl border border-teal-100 bg-teal-50/30';

  return (
    <div className={containerClasses}>
      {eyebrow && (
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-teal-600 mb-3 sm:mb-4">
          {eyebrow}
        </p>
      )}
      
      <h2 className="font-light text-slate-900 tracking-tight mb-4 sm:mb-6" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
        {title}
      </h2>
      
      <p className="text-slate-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          to={primaryButtonHref}
          className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-teal-600 transition-all duration-300 hover:shadow-lg"
        >
          <span>{primaryButtonText}</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>

        {secondaryButton && (
          secondaryButton.href ? (
            <a
              href={secondaryButton.href}
              target={secondaryButton.target || '_self'}
              rel={secondaryButton.target === '_blank' ? 'noopener noreferrer' : ''}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-white text-slate-700 font-medium rounded-lg border border-slate-300 hover:border-teal-400 hover:text-teal-600 transition-all duration-300 hover:shadow-md"
            >
              {secondaryButton.icon && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {secondaryButton.icon}
                </svg>
              )}
              <span>{secondaryButton.text}</span>
            </a>
          ) : (
            <button
              onClick={onSecondaryClick}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-white text-slate-700 font-medium rounded-lg border border-slate-300 hover:border-teal-400 hover:text-teal-600 transition-all duration-300 hover:shadow-md"
            >
              {secondaryButton.icon && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {secondaryButton.icon}
                </svg>
              )}
              <span>{secondaryButton.text}</span>
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default CTASection;
