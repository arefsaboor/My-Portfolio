import ExternalIcon from '../components/ExternalIcon';
import writingSiteDesktop from '../assets/arefsaboor-com-screenshots/arefsaboor-com-desktop.webp';
import writingSiteMobile from '../assets/arefsaboor-com-screenshots/arefsaboor-com-mobile.webp';

/* The writing site, argued as a practice rather than as a fifth project card.
   Copy is Aref's own, carried over from the earlier version of this section;
   only the styling was rebuilt on the current design system. */

export default function WritingSiteBridge() {
  return (
    <section className="sec textured" style={{ background: 'var(--wash)', borderTop: '1px solid var(--rule)' }}>
      <div className="shell-wide">

        <div className="wb-head op-head">
          <p className="eyebrow">Another practice</p>
          <div className="op-cols">
            <h2 className="d op-title">I also write.</h2>
            <div className="wb-cols">
              <p>
                Reading and writing form a separate part of my life. At arefsaboor.com I write in
                Persian and English about books, memory, society, and questions I cannot resolve quickly.
              </p>
              <p>
                That work is separate from this portfolio, but it shapes how I approach design and code:
                I stay with a problem longer, look for its structure, and distrust the first easy answer.
              </p>
            </div>
          </div>
        </div>

        <a
          className="wb-plate"
          href="https://arefsaboor.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit arefsaboor.com, Aref Saboor's Persian and English writing site"
        >
          <figure>
            <div className="wb-shot">
              <picture>
                <source media="(max-width: 639px)" srcSet={writingSiteMobile} />
                <img src={writingSiteDesktop} alt="The homepage of arefsaboor.com" loading="lazy" decoding="async" />
              </picture>
            </div>
            <figcaption className="wb-cap">
              <div>
                <p className="wb-cap-nm">arefsaboor.com</p>
                <p className="wb-cap-sub">Essays and notes in Persian and English</p>
              </div>
              <span className="linkline">Visit the writing site<ExternalIcon /></span>
            </figcaption>
          </figure>
        </a>

      </div>
    </section>
  );
}
