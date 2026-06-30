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
import icon1 from '../../assets/svg-icons/1-Node.svg';
import icon2 from '../../assets/svg-icons/2-Next.js.svg';
import icon3 from '../../assets/svg-icons/3-Vite.svg';
import icon4 from '../../assets/svg-icons/4-JS.svg';
import icon5 from '../../assets/svg-icons/5-TS.svg';
import icon6 from '../../assets/svg-icons/6-React.svg';
import icon7 from '../../assets/svg-icons/7-HTML.svg';
import icon8 from '../../assets/svg-icons/8-CSS.svg';
import icon9 from '../../assets/svg-icons/9-Postman.svg';
import icon10 from '../../assets/svg-icons/10-Docker.svg';
import icon11 from '../../assets/svg-icons/11-GitHub.svg';
import icon12 from '../../assets/svg-icons/12-Firebase.svg';
import icon13 from '../../assets/svg-icons/13-Vercel.svg';
import icon14 from '../../assets/svg-icons/14-Tailwind.svg';
import icon15 from '../../assets/svg-icons/15-Figma.svg';
import icon16 from '../../assets/svg-icons/16-Vector.svg';
import icon17 from '../../assets/svg-icons/17-VsCode.svg';
import icon18 from '../../assets/svg-icons/18-Microsoft Office.svg';
import icon19 from '../../assets/svg-icons/19-Premiere.svg';
import icon20 from '../../assets/svg-icons/20-Illustrator.svg';
import icon21 from '../../assets/svg-icons/21-Photoshop.svg';

export const techIcons = [
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
  { value: '100%', label: 'Ready for My First Role' },
];

const thumbByName = {
  'Books|2|Shelf': books2shelfDesktop,
  'Portfolio': portfolioDesktop,
  'Nirvan': nirvanDesktop,
  'Bestsellers': bestsellersDesktop,
};

const screensByName = {
  'Books|2|Shelf': { desktop: books2shelfDesktop, tablet: books2shelfTablet, mobile: books2shelfMobile },
  'Portfolio': { desktop: portfolioDesktop, tablet: portfolioTablet, mobile: portfolioMobile },
  'Nirvan': { desktop: nirvanDesktop, tablet: nirvanTablet, mobile: nirvanMobile },
  'Bestsellers': { desktop: bestsellersDesktop, tablet: bestsellersTablet, mobile: bestsellersMobile },
};

export const featuredProjects = [...projectsData.projects]
  .sort((a, b) => {
    if (a.name === 'Bestsellers' && b.name !== 'Bestsellers') return -1;
    if (b.name === 'Bestsellers' && a.name !== 'Bestsellers') return 1;
    return a.id - b.id;
  })
  .map((p) => ({
    id: p.id,
    name: p.name,
    subtitle: p.subtitle,
    description: p.description,
    tags: p.tags,
    technologies: p.technologies,
    liveUrl: p.liveUrl,
    thumb: thumbByName[p.name],
    screens: screensByName[p.name],
  }));

export const contactDetails = [
  { label: 'Drop me a line', value: 'arefsaboor.m@gmail.com', href: 'mailto:arefsaboor.m@gmail.com', sub: 'You can also drop me direct emails' },
  { label: 'Based in', value: 'Berlin, Germany', sub: 'Open to remote & worldwide projects' },
  { label: 'Call Me', value: '+49 (0) 174 781 76 11', href: 'tel:+4917478176611', sub: 'You can also WhatsApp me!' },
];
