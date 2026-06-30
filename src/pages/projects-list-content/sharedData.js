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

const screensById = {
  1: { desktop: books2shelfDesktop, tablet: books2shelfTablet, mobile: books2shelfMobile },
  2: { desktop: portfolioDesktop, tablet: portfolioTablet, mobile: portfolioMobile },
  3: { desktop: nirvanDesktop, tablet: nirvanTablet, mobile: nirvanMobile },
  4: { desktop: bestsellersDesktop, tablet: bestsellersTablet, mobile: bestsellersMobile },
};

const slugById = {
  1: 'books2shelf',
  2: 'portfolio',
  3: 'nirvan',
  4: 'bestsellers',
};

export const projects = [...projectsData.projects]
  .sort((a, b) => {
    if (a.name === 'Bestsellers' && b.name !== 'Bestsellers') return -1;
    if (b.name === 'Bestsellers' && a.name !== 'Bestsellers') return 1;
    return a.id - b.id;
  })
  .map((p) => ({
    ...p,
    screens: screensById[p.id],
    slug: slugById[p.id],
  }));
