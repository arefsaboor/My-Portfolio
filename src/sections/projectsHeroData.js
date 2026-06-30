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

const heroScreenshotsById = {
  1: { desktop: books2shelfDesktop, tablet: books2shelfTablet, mobile: books2shelfMobile },
  2: { desktop: portfolioDesktop, tablet: portfolioTablet, mobile: portfolioMobile },
  3: { desktop: nirvanDesktop, tablet: nirvanTablet, mobile: nirvanMobile },
  4: { desktop: bestsellersDesktop, tablet: bestsellersTablet, mobile: bestsellersMobile },
};

export const heroProjects = projectsData.projects
  .map((project) => {
    const screenshots = heroScreenshotsById[project.id];
    if (!screenshots) return null;

    const links = [
      project.liveUrl && { label: 'Visit Live', href: project.liveUrl },
      project.vercelUrl && { label: 'Live Vercel', href: project.vercelUrl },
    ].filter(Boolean);

    const primaryUrl = project.liveUrl || project.vercelUrl || project.githubUrl || '';
    const displayUrl = primaryUrl
      .replace(/^https?:\/\//, '')
      .replace(/\/$/, '');

    return {
      name: project.name.toUpperCase(),
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
