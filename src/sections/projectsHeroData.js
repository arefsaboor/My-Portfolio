import projectsData from '../data/Projects.json';

import books2shelfDesktop from '../assets/books2shelf-screenshots/books2shelf-desktop.webp';
import books2shelfTablet from '../assets/books2shelf-screenshots/books2shelf-tablet.webp';
import books2shelfMobile from '../assets/books2shelf-screenshots/books2shelf-mobile.webp';
import nirvanDesktop from '../assets/Nirvan-Screenshots/desktop-hero.webp';
import nirvanTablet from '../assets/Nirvan-Screenshots/tablet-hero.webp';
import nirvanMobile from '../assets/Nirvan-Screenshots/mobile-hero.webp';
import portfolioDesktop from '../assets/Portfolio-Site-Screenshots/Home-Desktop.webp';
import portfolioTablet from '../assets/Portfolio-Site-Screenshots/Home-Tablet.webp';
import portfolioMobile from '../assets/Portfolio-Site-Screenshots/Home-Mobile.webp';
import bestsellersDesktop from '../assets/bestsellers-screenshots/bestsellers-desktop.webp';
import bestsellersTablet from '../assets/bestsellers-screenshots/bestsellers-tablet.webp';
import bestsellersMobile from '../assets/bestsellers-screenshots/bestsellers-mobile.webp';
import arefsaboorComDesktop from '../assets/arefsaboor-com-screenshots/arefsaboor-com-desktop.webp';
import arefsaboorComTablet from '../assets/arefsaboor-com-screenshots/arefsaboor-com-tablet.webp';
import arefsaboorComMobile from '../assets/arefsaboor-com-screenshots/arefsaboor-com-mobile.webp';

const heroScreenshotsById = {
  1: { desktop: books2shelfDesktop, tablet: books2shelfTablet, mobile: books2shelfMobile },
  2: { desktop: portfolioDesktop, tablet: portfolioTablet, mobile: portfolioMobile },
  3: { desktop: nirvanDesktop, tablet: nirvanTablet, mobile: nirvanMobile },
  4: { desktop: bestsellersDesktop, tablet: bestsellersTablet, mobile: bestsellersMobile },
  5: { desktop: arefsaboorComDesktop, tablet: arefsaboorComTablet, mobile: arefsaboorComMobile },
};

// Display order, shared by the carousel and the archive so a project carries
// the same number in both: arefsaboor.com leads, then Bestsellers, then by id.
const FEATURED = ['arefsaboor.com', 'Bestsellers'];
const rank = (p) => {
  const i = FEATURED.indexOf(p.name);
  return i === -1 ? FEATURED.length : i;
};
const byDisplayOrder = (a, b) => rank(a) - rank(b) || a.id - b.id;

export const heroProjects = [...projectsData.projects]
  .sort(byDisplayOrder)
  .map((project) => {
    const screenshots = heroScreenshotsById[project.id];
    if (!screenshots) return null;

    // The approved carousel panel shows every link a project has, matching the
    // archive rows below — not just the two live deployments.
    const links = [
      project.liveUrl && { label: 'Visit Live', href: project.liveUrl },
      project.vercelUrl && { label: 'Live Vercel', href: project.vercelUrl },
      project.githubUrl && { label: 'GitHub', href: project.githubUrl },
      project.figmaUrl && { label: 'Figma', href: project.figmaUrl },
    ].filter(Boolean);

    const primaryUrl = project.liveUrl || project.vercelUrl || project.githubUrl || '';
    const displayUrl = primaryUrl
      .replace(/^https?:\/\//, '')
      .replace(/\/$/, '');

    return {
      name: project.name,
      category: project.category,
      year: project.year,
      subtitle: project.subtitle,
      description: project.description,
      techs: project.technologies || [],
      desktop: screenshots.desktop,
      tablet: screenshots.tablet,
      mobile: screenshots.mobile,
      url: displayUrl,
      links,
    };
  })
  .filter(Boolean);
