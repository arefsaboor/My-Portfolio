import projectsData from '../../data/Projects.json';
import books2shelfDesktop from '../../assets/books2shelf-screenshots/books2shelf-desktop.webp';
import books2shelfTablet from '../../assets/books2shelf-screenshots/books2shelf-tablet.webp';
import books2shelfMobile from '../../assets/books2shelf-screenshots/books2shelf-mobile.webp';
import nirvanDesktop from '../../assets/Nirvan-Screenshots/desktop-hero.webp';
import nirvanTablet from '../../assets/Nirvan-Screenshots/tablet-hero.webp';
import nirvanMobile from '../../assets/Nirvan-Screenshots/mobile-hero.webp';
import portfolioDesktop from '../../assets/Portfolio-Site-Screenshots/Home-Desktop.webp';
import portfolioTablet from '../../assets/Portfolio-Site-Screenshots/Home-Tablet.webp';
import portfolioMobile from '../../assets/Portfolio-Site-Screenshots/Home-Mobile.webp';
import bestsellersDesktop from '../../assets/bestsellers-screenshots/bestsellers-desktop.webp';
import bestsellersTablet from '../../assets/bestsellers-screenshots/bestsellers-tablet.webp';
import bestsellersMobile from '../../assets/bestsellers-screenshots/bestsellers-mobile.webp';
import arefsaboorComDesktop from '../../assets/arefsaboor-com-screenshots/arefsaboor-com-desktop.webp';
import arefsaboorComTablet from '../../assets/arefsaboor-com-screenshots/arefsaboor-com-tablet.webp';
import arefsaboorComMobile from '../../assets/arefsaboor-com-screenshots/arefsaboor-com-mobile.webp';
import icon1 from '../../assets/svg-icons/1-Node.svg';
import icon2 from '../../assets/svg-icons/2-Next.js.svg';
import icon3 from '../../assets/svg-icons/3-Vite.svg';
import icon4 from '../../assets/svg-icons/4-JS.svg';
import icon5 from '../../assets/svg-icons/5-TS.svg';
import icon6 from '../../assets/svg-icons/6-React.svg';
import icon7 from '../../assets/svg-icons/7-HTML.svg';
import icon8 from '../../assets/svg-icons/8-CSS.svg';
import icon10 from '../../assets/svg-icons/10-Docker.svg';
import icon11 from '../../assets/svg-icons/11-GitHub.svg';
import icon12 from '../../assets/svg-icons/12-Firebase.svg';
import icon13 from '../../assets/svg-icons/13-Vercel.svg';
import icon14 from '../../assets/svg-icons/14-Tailwind.svg';
import icon15 from '../../assets/svg-icons/15-Figma.svg';
import icon20 from '../../assets/svg-icons/20-Illustrator.svg';
import icon21 from '../../assets/svg-icons/21-Photoshop.svg';

export const techIcons = [
  { src: icon6, alt: 'React', name: 'React' },
  { src: icon2, alt: 'Next.js', name: 'Next.js' },
  { src: icon5, alt: 'TypeScript', name: 'TypeScript' },
  { src: icon4, alt: 'JavaScript', name: 'JavaScript' },
  { src: icon14, alt: 'Tailwind CSS', name: 'Tailwind' },
  { src: icon1, alt: 'Node.js', name: 'Node.js' },
  { src: icon15, alt: 'Figma', name: 'Figma' },
  { src: icon7, alt: 'HTML5', name: 'HTML5' },
  { src: icon8, alt: 'CSS3', name: 'CSS3' },
  { src: icon3, alt: 'Vite', name: 'Vite' },
  { src: icon12, alt: 'Firebase', name: 'Firebase' },
  { src: icon11, alt: 'GitHub', name: 'GitHub' },
  { src: icon13, alt: 'Vercel', name: 'Vercel' },
  { src: icon10, alt: 'Docker', name: 'Docker' },
  { src: icon20, alt: 'Illustrator', name: 'Illustrator' },
  { src: icon21, alt: 'Photoshop', name: 'Photoshop' },
];

export const learningModules = [
  {
    id: 1,
    number: '01',
    title: 'Product Design',
    duration: '4 Months',
    description: 'Mastered UI/UX design principles, from low to high-fidelity design. Learned user research methodologies, project management strategies, and product design thinking.',
    technologies: ['Figma', 'Framer', 'UI/UX Design', 'Prototyping'],
  },
  {
    id: 2,
    number: '02',
    title: 'Web Fundamentals',
    duration: '3 Months',
    description: 'Built a solid foundation in web development with HTML5, CSS3, and modern JavaScript. Learned responsive design and core internet functionality principles.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
  },
  {
    id: 3,
    number: '03',
    title: 'Frontend Frameworks',
    duration: '2.5 Months',
    description: 'Developed modern web applications using React, Angular, and Vue.js. Mastered component-based architecture, Next.js, Tailwind CSS, and deployment workflows.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Angular'],
  },
  {
    id: 4,
    number: '04',
    title: 'Backend Development',
    duration: '2.5 Months',
    description: 'Created full-stack applications with backend integration. Worked with Node.js, Express.js, database management, authentication, and performance optimization.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Authentication'],
  },
];

export const aboutStats = [
  { value: '1 Year', label: 'Full-Stack Training' },
  { value: '3+', label: 'Live Projects' },
  { value: '15+', label: 'Technologies' },
  { value: 'Now', label: 'Available to Work' },
];

const thumbByName = {
  'Books|2|Shelf': books2shelfDesktop,
  'Portfolio': portfolioDesktop,
  'Nirvan': nirvanDesktop,
  'Bestsellers': bestsellersDesktop,
  'arefsaboor.com': arefsaboorComDesktop,
};

const screensByName = {
  'Books|2|Shelf': { desktop: books2shelfDesktop, tablet: books2shelfTablet, mobile: books2shelfMobile },
  'Portfolio': { desktop: portfolioDesktop, tablet: portfolioTablet, mobile: portfolioMobile },
  'Nirvan': { desktop: nirvanDesktop, tablet: nirvanTablet, mobile: nirvanMobile },
  'Bestsellers': { desktop: bestsellersDesktop, tablet: bestsellersTablet, mobile: bestsellersMobile },
  'arefsaboor.com': { desktop: arefsaboorComDesktop, tablet: arefsaboorComTablet, mobile: arefsaboorComMobile },
};

// Same display order as the Projects page (see projectsHeroData.js), so a
// project carries the same number on the homepage, the carousel and the archive.
const FEATURED = ['arefsaboor.com', 'Bestsellers'];
const rank = (p) => {
  const i = FEATURED.indexOf(p.name);
  return i === -1 ? FEATURED.length : i;
};

export const featuredProjects = [...projectsData.projects]
  // arefsaboor.com gets its own section on this page (WritingSiteBridge), so it
  // is not repeated as a project card here. It stays 01 in the Projects archive.
  .filter((p) => p.name !== 'arefsaboor.com')
  .sort((a, b) => rank(a) - rank(b) || a.id - b.id)
  .map((p) => ({
    id: p.id,
    name: p.name,
    subtitle: p.subtitle,
    category: p.category,
    role: p.role,
    year: p.year,
    description: p.description,
    challenge: p.challenge,
    solution: p.solution,
    highlights: p.highlights,
    tags: p.tags,
    technologies: p.technologies,
    liveUrl: p.liveUrl,
    vercelUrl: p.vercelUrl,
    githubUrl: p.githubUrl,
    figmaUrl: p.figmaUrl,
    thumb: thumbByName[p.name],
    screens: screensByName[p.name],
  }));

export const contactDetails = [
  { label: 'Drop me a line', value: 'arefsaboor.m@gmail.com', href: 'mailto:arefsaboor.m@gmail.com', sub: 'You can also drop me direct emails' },
  { label: 'Based in', value: 'Berlin, Germany', sub: 'Open to remote & worldwide projects' },
];
