import { useState, useEffect } from 'react';
import ProjectsHero from '../sections/ProjectsHero';
import ProjectsListContent from './projects-list-content/ProjectsListContent';

function Projects() {
  const [isVisible, setIsVisible] = useState(false);

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
