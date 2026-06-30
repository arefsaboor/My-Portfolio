import { useState, useEffect } from 'react';
import PageLoader from '../components/PageLoader';
import ProjectsHero from '../sections/ProjectsHero';
import ProjectsListContent from './projects-list-content/ProjectsListContent';

function Projects() {
  const [showLoader, setShowLoader] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setIsVisible(true);
  };

  return (
    <>
      {showLoader && <PageLoader pageName="Projects" onComplete={handleLoaderComplete} />}
      <ProjectsHero isVisible={isVisible} />
      <div id="projects-list">
        <ProjectsListContent />
      </div>
    </>
  );
}

export default Projects;
