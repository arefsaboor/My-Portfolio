import { useState, useEffect } from 'react';
import heroTitles from '../data/HeroTitles.json';
import bulbIcon from '../bulb.svg';
import CVPreviewModal from '../components/CVPreviewModal';
import cvPdf from '../assets/Aref-Saboor_Resume_2026.pdf';
import { smoothScrollToId } from '../utils/smoothScroll';

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const titles = heroTitles.skills;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000); // Faster rotation - 3 seconds

    return () => clearInterval(interval);
  }, [titles.length]);

  // Handle CV button click - now shows modal on all devices
  const handleCVClick = () => {
    setIsCVModalOpen(true);
  };

  return (
    <section
      id="home"
      className="relative flex items-end"
      aria-label="Hero section"
      style={{ height: '100svh' }}
    >
      {/* SEO: Main heading for search engines */}
      <h1 className="sr-only">Aref Saboor - UX/UI Designer and Full Stack Developer based in Berlin</h1>
      
      {/* Screen reader live region for animated text */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        Currently highlighting: {titles[currentIndex]?.title}
      </div>

      {/* Single outpainted hero photograph; no masks or duplicate layers. */}
      <div 
        className="hero-background absolute inset-0 z-0 w-full h-full"
        style={{
          backgroundImage: 'url(/IMAGE_002-hero-outpainted.webp)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'scroll',
        }}
        role="img"
        aria-label="Portfolio hero background"
      ></div>
      <div className="hero-visual-overlay" aria-hidden="true" />
      
      <style>{`
        /* ── MOBILE FIRST ─────────────────────────────────────────────
           Base is the phone. Every min-width block below adds to it.
           This block used to be inverted: desktop values sat in the base
           and eight max-width queries clawed them back for phones. */
        #home {
          --hero-side-space: clamp(1.5rem, 3vw, 5rem);
          --hero-content-width: min(340px, calc(100vw - 3rem));
          --writing-note-space: 0rem;
          --hero-grid: repeating-linear-gradient(to right, rgba(94,234,212,.10) 0 1px, transparent 1px 34px),
                       repeating-linear-gradient(to bottom, rgba(94,234,212,.08) 0 1px, transparent 1px 34px);
          position: relative;
          isolation: isolate;
          display: flex;
          align-items: flex-end;
          height: 100svh;
          min-height: min(600px, 100svh);
          overflow: hidden;
          background-color: #081516;
          padding-bottom: calc(clamp(2.5rem, 5vh, 4rem) + var(--writing-note-space) + env(safe-area-inset-bottom));
        }
        /* a phone held sideways is shorter than 600px — let the hero be the
           viewport there instead of pushing its own content off-screen */
        @media (orientation: landscape) and (max-height: 620px) {
          #home { min-height: 0; }
        }

        .hero-background {
          background-size: cover !important;
          background-position: 77% top !important;
          background-repeat: no-repeat !important;
        }
        .hero-visual-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: linear-gradient(180deg,
            rgba(2,17,19,.64) 0%, rgba(2,17,19,.18) 13%, rgba(2,17,19,.08) 30%,
            rgba(2,17,19,.08) 50%, rgba(2,17,19,.58) 62%, rgba(2,17,19,.88) 78%, rgba(2,17,19,.94) 100%);
        }
        .hero-visual-overlay::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: var(--hero-grid);
          opacity: .5;
          -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,.5) 0%, transparent 28%, transparent 54%, #000 76%);
          mask-image: linear-gradient(180deg, rgba(0,0,0,.5) 0%, transparent 28%, transparent 54%, #000 76%);
        }
        .hero-visual-overlay::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(to right, rgba(8,36,40,.12) 0 1px, transparent 1px 34px),
                            repeating-linear-gradient(to bottom, rgba(8,36,40,.09) 0 1px, transparent 1px 34px);
          opacity: .24;
          -webkit-mask-image: linear-gradient(90deg, transparent 66%, rgba(0,0,0,.25) 86%, rgba(0,0,0,.5) 100%);
          mask-image: linear-gradient(90deg, transparent 66%, rgba(0,0,0,.25) 86%, rgba(0,0,0,.5) 100%);
        }

        /* ── hero content ───────────────────────────────────────────
           A two-column grid: icons in a fixed 30px gutter, every piece of text
           in the second column. That is what makes the arrow, bulb and globe
           share one edge while the rotating line, the name, the role, the
           tagline and the location share another. Rows with no icon leave the
           gutter empty. Actions come last, below everything. */
        .hero-wrap {
          display: grid; grid-template-columns: 22px 1fr; column-gap: 12px;
          align-items: start; width: 100%; max-width: var(--hero-content-width);
        }
        .hero-wrap > .ico { width: 22px; height: 20px; display: flex; align-items: center; justify-content: flex-start; }
        .hero-wrap > .ico img, .hero-wrap > .ico svg { width: 16px; height: 16px; display: block; }
        .hero-wrap > .txt { min-width: 0; }
        .h-skill { min-height: 22px; }
        .h-name {
          margin: 10px 0 0; line-height: 1; letter-spacing: .02em; color: #fff;
          font-size: clamp(1.55rem, 7.2vw, 2rem); white-space: nowrap;
        }
        /* a wrapping flex row: each role stays whole and the line breaks
           between them, never through "Full Stack Developer" */
        .h-role {
          margin: 8px 0 0; font-weight: 300; color: #5eead4;
          font-size: clamp(0.8125rem, 2vw, 1.5rem);
          display: flex; flex-wrap: nowrap; align-items: baseline; column-gap: clamp(.65rem, 2.5vw, .9rem);
        }
        .h-role > span { white-space: nowrap; }
        .h-role-sep {
          display: inline-block;
          width: 1px;
          height: .9em;
          flex: 0 0 1px;
          align-self: center;
          background: rgba(94, 234, 212, .55);
        }
        .h-say { margin: 0; color: rgba(255,255,255,.9); font-weight: 300; font-size: 14.5px; line-height: 1.5; max-width: 25ch; }
        .h-loc { margin: 0; color: rgba(255,255,255,.9); font-weight: 300; font-size: 14.5px; line-height: 1.62; }
        .r-say { margin-top: 16px; } .r-loc { margin-top: 10px; }
        /* one row, always: the two buttons share the column and shrink
           together rather than stacking */
        .hero-acts { display: flex; flex-wrap: nowrap; gap: 10px; margin-top: 18px; margin-bottom: 0; grid-column: 2; }
        .hero-acts > * { flex: 0 1 auto; min-width: 0; white-space: nowrap; }

        .hero-animated-box {
          margin-left: -.4rem;
          padding-left: .4rem;
          width: min(12rem, 100%);
          min-width: 0;
          max-width: 100%;
          min-height: 2rem;
          justify-self: start;
          background: linear-gradient(
            90deg,
            rgba(2, 17, 19, .88) 0%,
            rgba(2, 17, 19, .68) 46%,
            rgba(2, 17, 19, .28) 76%,
            transparent 100%
          ) !important;
        }
        .hero-animated-text {
          font-size: 0.7rem;
          font-style: italic;
          text-overflow: ellipsis;
        }

        .hero-main-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 16px;
          width: 100%;
          max-width: 100vw;
          box-sizing: border-box;
          margin: 0 auto;
          padding-left: calc(var(--hero-side-space) + env(safe-area-inset-left));
          padding-right: calc(var(--hero-side-space) + env(safe-area-inset-right));
          transform: translateY(.5rem);
        }

        .hero-writing-promo {
          position: absolute;
          left: 50%;
          bottom: calc(clamp(2.75rem, 5vh, 4.25rem) + env(safe-area-inset-bottom));
          z-index: 20;
          display: none;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: clamp(2rem, 3vw, 3.75rem);
          width: max-content;
          max-width: calc(100% - 3rem);
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          transform: translateX(-50%);
          isolation: isolate;
          pointer-events: none;
        }
        .hero-writing-promo::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 0;
          width: calc(100% + clamp(13rem, 28vw, 30rem));
          height: calc(100% + 1.5rem);
          transform: translate(-50%, -50%);
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(2, 17, 19, .4) 16%,
            rgba(2, 17, 19, .85) 50%,
            rgba(2, 17, 19, .4) 84%,
            transparent 100%
          );
          opacity: .94;
          pointer-events: none;
        }
        .hero-writing-lead {
          position: relative;
          z-index: 11;
          display: flex;
          align-items: center;
          gap: .65rem;
        }
        .hero-writing-feather {
          width: 1.35rem;
          height: 1.35rem;
          flex: 0 0 auto;
        }
        .hero-writing-intro {
          position: relative;
          z-index: 11;
          display: flex;
          flex-shrink: 0;
          align-items: center;
          color: #ffe0aa;
          text-align: center;
          -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 72%, rgba(0, 0, 0, .82) 88%, transparent 100%);
          mask-image: linear-gradient(to bottom, #000 0%, #000 72%, rgba(0, 0, 0, .82) 88%, transparent 100%);
        }
        .hero-writing-kicker {
          position: relative;
          z-index: 13;
          font-family: "Epilogue", "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(1.75rem, 2.35vw, 2.3rem);
          font-style: italic;
          font-weight: 200;
          line-height: 1.1;
          letter-spacing: .015em;
          white-space: nowrap;
        }
        .hero-writing-paper-link {
          position: relative;
          z-index: 20;
          display: inline-flex;
          flex-shrink: 0;
          box-sizing: border-box;
          align-items: center;
          justify-content: center;
          padding: 0;
          color: #fff;
          text-align: center;
          text-decoration: none;
          pointer-events: auto;
          transition: color .2s ease, text-shadow .2s ease;
        }
        .hero-writing-domain {
          display: inline-flex;
          font-family: "Epilogue", "Helvetica Neue", Arial, sans-serif;
          font-size: clamp(1rem, 1.15vw, 1.15rem);
          font-weight: 200;
          letter-spacing: 0.2em;
          line-height: 1;
        }
        .hero-writing-paper-link:hover,
        .hero-writing-paper-link:focus-visible {
          color: #fff;
          text-shadow: 0 4px 14px rgba(0, 0, 0, .72);
        }
        .hero-writing-paper-link:focus-visible {
          outline: 2px solid rgba(255, 218, 157, .92);
          outline-offset: 5px;
          border-radius: 2px;
        }

        /* ── scroll indicator ─────────────────────────────────────── */
        .scroll-text {
          font-size: 0.625rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #5eead4;
          text-shadow: 0 0 15px rgba(94, 234, 212, 0.6);
        }
        .scroll-border {
          width: 2.5rem;
          height: 3.75rem;
          border-width: 0.6px;
          border-color: #5eead4;
          box-shadow: 0 0 20px rgba(94, 234, 212, 0.5);
        }
        .scroll-dot {
          width: 0.2rem;
          height: 0.625rem;
          margin-top: 0.2rem;
          background-color: #5eead4;
          box-shadow: 0 0 18px rgba(94, 234, 212, 0.7);
        }
        .scroll-arrow {
          width: 1rem;
          height: 1rem;
          margin-bottom: 0.15rem;
          color: #5eead4;
          filter: drop-shadow(0 0 12px rgba(94, 234, 212, 0.6));
        }
        .scroll-gap { gap: 0.35rem; }
        .scroll-indicator-wrapper {
          display: none;
          cursor: pointer;
          transition: all 0.3s ease;
          background: none;
          border: none;
          margin-bottom: 0;
          padding: 0;
        }
        .scroll-indicator-wrapper:hover .scroll-border {
          border-color: #fbbf24;
          box-shadow: 0 0 25px rgba(251, 191, 36, 0.4), 0 0 35px rgba(251, 146, 60, 0.3), 0 0 45px rgba(96, 165, 250, 0.2);
        }
        .scroll-indicator-wrapper:hover .scroll-text {
          color: #fbbf24;
          text-shadow: 0 0 15px rgba(251, 191, 36, 0.6), 0 0 20px rgba(251, 146, 60, 0.3);
        }
        .scroll-indicator-wrapper:hover .scroll-dot {
          background-color: #fbbf24;
          box-shadow: 0 0 15px rgba(251, 191, 36, 0.6), 0 0 20px rgba(251, 146, 60, 0.4);
        }
        .scroll-indicator-wrapper:hover .scroll-arrow {
          color: #fbbf24;
          filter: drop-shadow(0 0 12px rgba(251, 191, 36, 0.6)) drop-shadow(0 0 18px rgba(251, 146, 60, 0.4)) drop-shadow(0 0 24px rgba(96, 165, 250, 0.2));
        }
        .scroll-indicator-wrapper:active { transform: scale(0.95); }

        /* ── buttons ──────────────────────────────────────────────── */
        .hero-cta-button, .hero-cta-button-secondary {
          padding: 8px 12px;
          font-size: 11px;
          font-weight: 500;
          line-height: 1;
          border-radius: 4px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 38px;
          /* colour only — nothing lifts, scales or moves on hover */
          transition: background-color .18s ease, border-color .18s ease, color .18s ease;
        }
        .hero-cta-button { background: #5eead4; color: #0a3d35; border: 1px solid #5eead4; }
        .hero-cta-button:hover { background: #0d9488; border-color: #0d9488; color: #fff; }
        .hero-cta-button-secondary {
          background: transparent; color: #fff;
          border: 1px solid rgba(94, 234, 212, .45);
        }
        .hero-cta-button-secondary:hover {
          background: rgba(5, 46, 44, .8);
          border-color: rgba(94, 234, 212, .8);
        }

        @keyframes scrollIndicator {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(12px); }
        }
        .scroll-indicator-animate { animation: scrollIndicator 3.2s ease-in-out infinite; }

        /* ── tall phones: match the deployed mobile rhythm ────────── */
        @media (min-height: 780px) {
          .h-name { margin-top: 16px; }
          .h-say { line-height: 1.62; }
          .r-say { margin-top: 26px; } .r-loc { margin-top: 14px; }
          .hero-acts { margin-top: 24px; }
        }

        /* ── 360px and up: room for the indicator beside the buttons ── */
        @media (min-width: 360px) {
          .scroll-indicator-wrapper { display: flex; }
        }

        /* ── 376px and up ─────────────────────────────────────────── */
        @media (min-width: 376px) {
          .hero-animated-box {
            width: min(13rem, 100%);
            min-width: 0;
            min-height: clamp(1.5rem, 4vh, 4rem);
          }
          .hero-animated-text { font-size: clamp(0.72rem, 1.15vw, 0.82rem); }
        }

        /* ── 768px and up: the wide treatment ─────────────────────── */
        @media (min-width: 768px) {
          .hero-background {
            background-position: center clamp(-52px, calc(76px - 10vh), -20px) !important;
          }
          .hero-visual-overlay {
            background: linear-gradient(90deg, rgba(2,17,19,.68) 0%, rgba(2,17,19,.52) 25%, rgba(2,17,19,.27) 42%, rgba(2,17,19,.07) 54%, transparent 66%);
          }
          .hero-visual-overlay::before {
            opacity: .62;
            -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 32%, rgba(0,0,0,.72) 43%, transparent 62%);
            mask-image: linear-gradient(90deg, #000 0%, #000 32%, rgba(0,0,0,.72) 43%, transparent 62%);
          }
          .hero-visual-overlay::after {
            opacity: .52;
            -webkit-mask-image: linear-gradient(90deg, transparent 48%, rgba(0,0,0,.08) 62%, rgba(0,0,0,.32) 76%, rgba(0,0,0,.72) 90%, #000 100%);
            mask-image: linear-gradient(90deg, transparent 48%, rgba(0,0,0,.08) 62%, rgba(0,0,0,.32) 76%, rgba(0,0,0,.72) 90%, #000 100%);
          }
          .h-name { margin-top: 30px; font-size: clamp(1.8rem, 4.8vw, 3.35rem); white-space: normal; }
          .h-role { margin-top: 12px; column-gap: clamp(1rem, 1.4vw, 1.4rem); }
          .h-say { max-width: 48ch; }
          .r-say { margin-top: 30px; }
          #home {
            --hero-content-width: min(560px, clamp(45vw, calc(19.5vw + 255px), 62vw));
          }
          .hero-wrap {
            grid-template-columns: 30px 1fr;
            column-gap: 16px;
            transform: translateY(-1.5rem);
          }
          .hero-wrap > .ico { width: 30px; height: 22px; }
          .hero-wrap > .ico img, .hero-wrap > .ico svg { width: 20px; height: 20px; }
          .hero-animated-box {
            margin-left: -.4rem;
            padding-left: .4rem;
            width: clamp(11rem, 22vw, 16rem);
            min-width: 0;
            min-height: clamp(2.25rem, 4.5vh, 3rem);
            justify-self: start;
            background: linear-gradient(
              90deg,
              rgba(2, 17, 19, .88) 0%,
              rgba(2, 17, 19, .68) 46%,
              rgba(2, 17, 19, .28) 76%,
              transparent 100%
            ) !important;
          }
          .hero-animated-text {
            font-size: clamp(0.75rem, 1.15vw, 1rem);
            font-style: italic;
          }
          .hero-main-container { transform: translateY(1.25rem); }
          .hero-acts { flex-wrap: wrap; gap: 12px; margin-top: 26px; margin-bottom: 0; }
          .hero-acts > * { flex: 0 0 auto; }
          .scroll-indicator-wrapper { margin-bottom: calc(44px + clamp(1.75rem, 2.35vw, 2.3rem)); }
          .scroll-indicator-animate { animation-duration: 2s; }
          .scroll-border { border-width: 1px; }
          .hero-cta-button, .hero-cta-button-secondary {
            padding: 10px 17px;
            font-size: 14px;
            min-height: 44px;
          }
        }

        /* ── tall desktop/tablet screens: the roomier rhythm ──────── */
        @media (min-width: 768px) and (min-height: 780px) {
          .h-name { margin-top: 34px; }
          .h-say { line-height: 1.62; }
          .r-say { margin-top: 34px; } .r-loc { margin-top: 14px; }
          .hero-acts { margin-top: 24px; }
        }

        /* ── 769px and up: the indicator at full size ─────────────── */
        @media (min-width: 769px) {
          .scroll-text { font-size: 0.875rem; }
          .scroll-border { width: 3.5rem; height: 5rem; }
          .scroll-dot { width: 0.25rem; height: 0.875rem; margin-top: 0.25rem; }
          .scroll-arrow { width: 1.5rem; height: 1.5rem; margin-bottom: 0.25rem; }
          .scroll-gap { gap: 0.5rem; }
        }

        /* ── 1024px and up: content lifts off the bottom edge ─────── */
        @media (min-width: 1024px) {
          .hero-background {
            background-position: center clamp(-38px, calc(-22px - 8vw + 10.8vh), -22px) !important;
          }
          #home {
            align-items: center;
            padding-top: 12vh;
            padding-bottom: 0;
          }
          .hero-main-container { max-width: 1800px; margin-top: 0; }
        }

        @media (min-width: 1536px) {
          #home { height: 100vh; padding-top: 14vh; }
        }

        /* ── keeping the face centred on tablets ────────────────────────────
           background-size: cover scales by WIDTH when the viewport is wider
           than the photo (1.2517:1) — the whole frame shows and the subject
           sits at its natural 62%, which is the desktop composition.

           When the viewport is NARROWER than that, cover scales by HEIGHT and
           the browser picks a horizontal slice. Centring the position centres
           the IMAGE, but the face lives at 62% of it, so on every portrait
           tablet the face drifted right (measured 70-72.5%) and the outpainted
           dark half filled the left.

           The image is 1.2517 wide per unit of height, so the face sits
           0.62 x 125.17 = 77.6% of the hero height from the image left edge.
           The hero is 100svh tall and full-bleed, so the offset that puts the
           face on the centre line is 50vw - 77.6svh — exact at ANY
           height-driven size, no per-device breakpoints.

           Both terms must be LENGTHS. A percentage here would not mean "half
           the container": in background-position a percentage resolves against
           (container - image), so calc(50% - 77.6svh) pushed the face off the
           right edge instead. Phones are excluded: that composition was
           already approved. */
        /* ── the writing note needs vertical room ──────────────────────────
           It sits below the hero block, so on a short screen it crowds the
           content: measured only 13px of clearance on a 1024x600 display
           against 84-124px on a normal desktop. Show it only from 700px of
           height, and only reserve its 5rem of padding when it is shown. */
        @media (min-width: 768px) and (min-height: 700px) {
          #home { --writing-note-space: 5rem; }
          .hero-writing-promo { display: flex; }
        }

        @media (min-width: 768px) and (max-aspect-ratio: 2700/2157) {
          .hero-background {
            background-position-x: calc(50vw - 77.6svh) !important;
          }

          /* The wide treatment washes the LEFT of the frame dark, because on a
             desktop the subject sits far right. Once the face is centred that
             wash falls straight across it — the mask over the face. Portrait
             tablets therefore take the phone's vertical treatment: dark at the
             foot for the text, clear where the face is. */
          .hero-visual-overlay {
            background: linear-gradient(180deg,
              rgba(2,17,19,.62) 0%, rgba(2,17,19,.16) 14%, rgba(2,17,19,.06) 32%,
              rgba(2,17,19,.06) 48%, rgba(2,17,19,.52) 62%, rgba(2,17,19,.86) 78%,
              rgba(2,17,19,.94) 100%);
          }
          .hero-visual-overlay::before {
            opacity: .5;
            -webkit-mask-image: linear-gradient(180deg, rgba(0,0,0,.5) 0%, transparent 28%, transparent 54%, #000 76%);
            mask-image: linear-gradient(180deg, rgba(0,0,0,.5) 0%, transparent 28%, transparent 54%, #000 76%);
          }
          .hero-visual-overlay::after {
            opacity: .24;
            -webkit-mask-image: linear-gradient(180deg, transparent 52%, rgba(0,0,0,.3) 74%, rgba(0,0,0,.6) 100%);
            mask-image: linear-gradient(180deg, transparent 52%, rgba(0,0,0,.3) 74%, rgba(0,0,0,.6) 100%);
          }

          /* A tablet is a big screen held close: vw-derived type that suits a
             1440px desktop reads far too small at 820px. Scale it to the width
             so a 12.9in iPad gets genuinely larger text than a Mini. */
          #home {
            --hero-content-width: min(760px, 84vw);
            align-items: flex-end;
            padding-top: 0;
          }
          .h-name { font-size: clamp(2.5rem, 6.4vw, 4.25rem); margin-top: 34px; }
          .h-role { font-size: clamp(1.05rem, 2.5vw, 1.75rem); margin-top: 16px; }
          .h-say, .h-loc { font-size: clamp(1rem, 1.9vw, 1.3rem); }
          .h-say { max-width: 34ch; }
          .r-say { margin-top: 34px; }
          .hero-animated-text { font-size: clamp(.85rem, 1.5vw, 1.05rem); }
          .hero-animated-box { min-height: clamp(2rem, 4.5vh, 3.25rem); }
        }

        /* The band needs far more room on a portrait tablet than on a desktop,
           because the hero block above it is itself tall. Below this height it
           is hidden and its reserved space released, so small tablets and the
           iPad Mini simply do not show it. */
        @media (min-width: 768px) and (max-aspect-ratio: 2700/2157) and (max-height: 1099px) {
          #home { --writing-note-space: 0rem; }
          .hero-writing-promo { display: none; }
        }

        /* Where it IS shown on a portrait tablet, give it real separation from
           the hero block rather than letting it sit right underneath. */
        @media (min-width: 768px) and (max-aspect-ratio: 2700/2157) and (min-height: 1100px) {
          #home { --writing-note-space: 8.5rem; padding-bottom: calc(clamp(2.5rem, 5vh, 4rem) + var(--writing-note-space) + env(safe-area-inset-bottom)); }
          .hero-writing-kicker { font-size: clamp(1.9rem, 3.4vw, 2.6rem); }
          .hero-writing-domain { font-size: clamp(1.05rem, 1.7vw, 1.3rem); }
        }

        /* Respect the user's motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .scroll-indicator-animate { animation: none; }
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Main Container with Content and Scroll Indicator */}
      <div className="hero-main-container relative z-10">
        <div className="hero-wrap">

          <span className="ico">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="text-white" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
            </svg>
          </span>
          <div className="txt h-skill relative hero-animated-box overflow-hidden flex items-center">
            {titles.map((item, index) => (
              <p
                key={item.id}
                className={`absolute hero-animated-text text-white font-normal transition-all duration-300 ease-in-out text-left whitespace-nowrap ${
                  index === currentIndex
                    ? 'translate-y-0 opacity-100'
                    : index === (currentIndex - 1 + titles.length) % titles.length
                      ? '-translate-y-full opacity-0'
                      : 'translate-y-full opacity-0'
                  }`}
              >
                {item.title}
              </p>
            ))}
          </div>

          <span />
          <div className="txt">
            <h2 className="h-name">
              <span className="font-bold">Aref </span>
              <span className="font-thin">Saboor</span>
            </h2>
            <p className="h-role">
              <span>UX/UI Designer</span>
              <span className="h-role-sep" aria-hidden="true" />
              <span>Full Stack Developer</span>
            </p>
          </div>

          <span className="ico r-say">
                <img src={bulbIcon} alt="" aria-hidden="true" style={{ filter: 'brightness(0) invert(1)' }} />
              </span>
              <p className="txt h-say r-say">
                Crafting designs that visually speak on screens.
              </p>

              <span className="ico r-loc">
                <img src="/globe.svg" alt="" aria-hidden="true" style={{ filter: 'brightness(0) invert(1)' }} />
              </span>
              <p className="txt h-loc r-loc">Based in Berlin</p>

              <div className="hero-acts">
                  <button onClick={() => smoothScrollToId('projects')} className="hero-cta-button" aria-label="View my projects">
                    Recent Works
                  </button>
                  <button onClick={handleCVClick} className="hero-cta-button-secondary" aria-label="Preview CV">
                    View Resume
                  </button>
              </div>

        </div>

        {/* Scroll indicator — one button; it used to be duplicated as a
            "mobile" and a "desktop" copy with identical markup, each hidden
            by CSS at the other's widths. */}
        <button
          onClick={() => smoothScrollToId('about')}
          className="scroll-indicator-wrapper flex flex-col items-center self-end scroll-indicator-animate scroll-gap"
          aria-label="Scroll to next section"
        >
          <span className="scroll-text font-light">Scroll</span>
          <div className="scroll-border border-teal-400/30 rounded-full flex flex-col items-center justify-between" style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
            <div className="scroll-dot bg-teal-400 rounded-full"></div>
            <svg className="scroll-arrow text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      </div>

      <div className="hero-writing-promo">
        <div className="hero-writing-lead">
          <img className="hero-writing-feather" src="/arefsaboor-feather.svg" alt="" aria-hidden="true" />
          <div className="hero-writing-intro">
            <span className="hero-writing-kicker">I also write.</span>
          </div>
        </div>

        <a
          className="hero-writing-paper-link"
          href="https://arefsaboor.com/"
          aria-label="Read Aref Saboor's writing at arefsaboor.com"
        >
          <span className="hero-writing-domain">AREFSABOOR.COM</span>
        </a>
      </div>

      {/* CV Preview Modal */}
      <CVPreviewModal 
        isOpen={isCVModalOpen} 
        onClose={() => setIsCVModalOpen(false)}
        pdfUrl={cvPdf}
      />
    </section>
  );
}

export default Hero;
