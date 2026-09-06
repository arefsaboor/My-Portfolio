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

const screensById = {
  1: { desktop: books2shelfDesktop, tablet: books2shelfTablet, mobile: books2shelfMobile },
  2: { desktop: portfolioDesktop, tablet: portfolioTablet, mobile: portfolioMobile },
  3: { desktop: nirvanDesktop, tablet: nirvanTablet, mobile: nirvanMobile },
  4: { desktop: bestsellersDesktop, tablet: bestsellersTablet, mobile: bestsellersMobile },
  5: { desktop: arefsaboorComDesktop, tablet: arefsaboorComTablet, mobile: arefsaboorComMobile },
};

const slugById = {
  1: 'books2shelf',
  2: 'portfolio',
  3: 'nirvan',
  4: 'bestsellers',
  5: 'arefsaboor-com',
};

// Display order, shared by the carousel and the archive so a project carries
// the same number in both: arefsaboor.com leads, then Bestsellers, then by id.
const FEATURED = ['arefsaboor.com', 'Bestsellers'];
const rank = (p) => {
  const i = FEATURED.indexOf(p.name);
  return i === -1 ? FEATURED.length : i;
};
const byDisplayOrder = (a, b) => rank(a) - rank(b) || a.id - b.id;

export const projects = [...projectsData.projects]
  .sort(byDisplayOrder)
  .map((p) => ({
    ...p,
    screens: screensById[p.id],
    slug: slugById[p.id],
  }));
