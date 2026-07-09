import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';

function NotFound() {
  usePageMeta(
    'Page Not Found | Aref Saboor',
    'The page you are looking for does not exist. Return to the homepage.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white pt-28 lg:pt-36 pb-24 min-h-[60vh] flex items-center">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400 mb-6">404</p>
        <h1 className="font-light text-slate-900 tracking-tight mb-4" style={{ fontSize: 'clamp(2.25rem, 6vw, 4rem)' }}>
          Page Not Found
        </h1>
        <p className="text-lg text-slate-500 mb-10 max-w-md mx-auto">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
