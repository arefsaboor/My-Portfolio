import { useState, useEffect } from 'react';
import ProjectsHero from '../sections/ProjectsHero';
import ProjectsListContent from './projects-list-content/ProjectsListContent';
import { usePageMeta } from '../utils/usePageMeta';
import './projects.css';

function Projects() {
  const [isVisible, setIsVisible] = useState(false);

  usePageMeta(
    'Projects | Aref Saboor - Portfolio',
    'A showcase of full-stack and frontend projects by Aref Saboor, including Bestsellers, Books2Shelf, Nirvan, arefsaboor.com, and this portfolio site.'
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  return (
    <main className="pf-projects">
      <ProjectsHero isVisible={isVisible} />
      <div id="projects-list">
        <ProjectsListContent />
      </div>
    </main>
  );
}

export default Projects;
