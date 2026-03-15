// Import technology icons
import icon1 from '../assets/svg-icons/1-Node.svg';
import icon2 from '../assets/svg-icons/2-Next.js.svg';
import icon3 from '../assets/svg-icons/3-Vite.svg';
import icon4 from '../assets/svg-icons/4-JS.svg';
import icon5 from '../assets/svg-icons/5-TS.svg';
import icon6 from '../assets/svg-icons/6-React.svg';
import icon7 from '../assets/svg-icons/7-HTML.svg';
import icon8 from '../assets/svg-icons/8-CSS.svg';
import icon9 from '../assets/svg-icons/9-Postman.svg';
import icon10 from '../assets/svg-icons/10-Docker.svg';
import icon11 from '../assets/svg-icons/11-GitHub.svg';
import icon12 from '../assets/svg-icons/12-Firebase.svg';
import icon13 from '../assets/svg-icons/13-Vercel.svg';
import icon14 from '../assets/svg-icons/14-Tailwind.svg';
import icon15 from '../assets/svg-icons/15-Figma.svg';
import icon16 from '../assets/svg-icons/16-Vector.svg';
import icon17 from '../assets/svg-icons/17-VsCode.svg';
import icon18 from '../assets/svg-icons/18-Microsoft Office.svg';
import icon19 from '../assets/svg-icons/19-Premiere.svg';
import icon20 from '../assets/svg-icons/20-Illustrator.svg';
import icon21 from '../assets/svg-icons/21-Photoshop.svg';

function IconsSection() {
  // Array of 21 technology icons
  const techIcons = [
    { src: icon1, alt: 'Node.js', name: 'Node.js' },
    { src: icon2, alt: 'Next.js', name: 'Next.js' },
    { src: icon3, alt: 'Vite', name: 'Vite' },
    { src: icon4, alt: 'JavaScript', name: 'JavaScript' },
    { src: icon5, alt: 'TypeScript', name: 'TypeScript' },
    { src: icon6, alt: 'React', name: 'React' },
    { src: icon7, alt: 'HTML5', name: 'HTML5' },
    { src: icon8, alt: 'CSS3', name: 'CSS3' },
    { src: icon9, alt: 'Postman', name: 'Postman' },
    { src: icon10, alt: 'Docker', name: 'Docker' },
    { src: icon11, alt: 'GitHub', name: 'GitHub' },
    { src: icon12, alt: 'Firebase', name: 'Firebase' },
    { src: icon13, alt: 'Vercel', name: 'Vercel' },
    { src: icon14, alt: 'Tailwind CSS', name: 'Tailwind' },
    { src: icon15, alt: 'Figma', name: 'Figma' },
    { src: icon16, alt: 'Vector', name: 'Vector' },
    { src: icon17, alt: 'VS Code', name: 'VS Code' },
    { src: icon18, alt: 'Microsoft Office', name: 'MS Office' },
    { src: icon19, alt: 'Premiere Pro', name: 'Premiere' },
    { src: icon20, alt: 'Illustrator', name: 'Illustrator' },
    { src: icon21, alt: 'Photoshop', name: 'Photoshop' },
  ];

  return (
    <>
      <style>{`
        .icons-section-wrapper {
          width: 100%;
          overflow: hidden;
          padding: 4rem 0;
          background: #ffffff;
        }

        .icons-heading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          font-size: clamp(0.875rem, 1.2vw, 1rem);
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 2rem;
          text-align: center;
        }

        .icons-heading::before,
        .icons-heading::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        @media (max-width: 640px) {
          .icons-heading {
            gap: 0.75rem;
          }
        }

        .icon-scroll-track {
          display: flex;
          gap: 24px;
          animation: scroll-infinite 70s linear infinite;
          will-change: transform;
        }

        .icon-scroll-item {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .icon-scroll-item:hover {
          transform: scale(1.15);
        }

        .icon-scroll-item img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: brightness(0) saturate(100%) invert(49%) sepia(72%) saturate(447%) hue-rotate(131deg) brightness(94%) contrast(90%);
          opacity: 1;
          transition: opacity 0.3s ease;
        }

        .icon-scroll-item:hover img {
          opacity: 1;
        }

        @keyframes scroll-infinite {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        /* Ensure same speed on all devices */
        @media (max-width: 768px) {
          .icon-scroll-track {
            animation: scroll-infinite 70s linear infinite;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .icon-scroll-track {
            animation: none !important;
          }
        }
      `}</style>

      <section className="icons-section-wrapper">        <div className="icons-heading">Technologies I Work With</div>        <div className="icon-scroll-track">
          {[...Array(4)].flatMap((_, setIndex) =>
            techIcons.map((icon, iconIndex) => (
              <div key={`icon-${setIndex}-${iconIndex}`} className="icon-scroll-item">
                <img src={icon.src} alt={icon.alt} loading="lazy" />
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default IconsSection;
