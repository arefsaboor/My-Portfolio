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

const FEATURED = ['arefsaboor.com', 'Bestsellers'];
const rank = (p) => {
  const i = FEATURED.indexOf(p.name);
  return i === -1 ? FEATURED.length : i;
};

export const featuredProjects = [...projectsData.projects]
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

