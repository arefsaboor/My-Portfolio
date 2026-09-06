import projectsData from './Projects.json';

/* Light nav-only view of the projects: names + anchors, no screenshot imports,
   so pulling this into the Navbar does not drag the image bundle onto every
   page. Slugs and order match the Projects page. */
const slugById = {
  1: 'books2shelf',
  2: 'portfolio',
  3: 'nirvan',
  4: 'bestsellers',
  5: 'arefsaboor-com',
};

const FEATURED = ['arefsaboor.com', 'Bestsellers'];
const rank = (p) => {
  const i = FEATURED.indexOf(p.name);
  return i === -1 ? FEATURED.length : i;
};

export const projectNav = [...projectsData.projects]
  .sort((a, b) => rank(a) - rank(b) || a.id - b.id)
  .map((p) => ({ name: p.name, slug: slugById[p.id] }))
  .filter((p) => p.slug);
