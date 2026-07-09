import { useState, useEffect } from 'react';
import ProjectsHero from '../sections/ProjectsHero';
import ProjectsListContent from './projects-list-content/ProjectsListContent';
import { usePageMeta } from '../utils/usePageMeta';

function Projects() {
  const [isVisible, setIsVisible] = useState(false);

  usePageMeta(
    'Projects | Aref Saboor - Portfolio',
    'A showcase of full-stack and frontend projects by Aref Saboor, including Bestsellers, Books2Shelf, Nirvan, and this portfolio site.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  return (
    <>
      <ProjectsHero isVisible={isVisible} />
      <div id="projects-list">
        <ProjectsListContent />
      </div>
    </>
  );
}

export default Projects;
