import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../utils/usePageMeta';
import './utility.css';

/* Markup transcribed literally from the approved concept
   (public/design-concepts/portfolio-utility.html). */

function NotFound() {
  usePageMeta(
    'Page Not Found | Aref Saboor',
    'The page you are looking for does not exist. Return to the homepage.'
  );

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="pf-utility">
      <div className="nf textured">
        <div className="ut-shell nf-in">
          <p className="nf-code mono">Error 404</p>
          <h1 className="nf-title">This page does not exist.</h1>
          <p className="nf-lead">
            The address may have changed, or the page was never here.
            Everything else is still where you left it.
          </p>
          <Link className="nf-btn" to="/">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
                 strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 19l-7-7 7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
