import { useState, useEffect } from 'react';
import PageLoader from '../components/PageLoader';
import Hero from '../sections/Hero';
import Info from '../sections/Info';
import SkillsSection from '../sections/SkillsSection';
import ProjectsSection from '../sections/ProjectsSection';
import Contact from '../pages/Contact';

function Home({ showPageLoader = false, onLoaderComplete }) {
  const [showLoader, setShowLoader] = useState(showPageLoader);

  useEffect(() => {
    // Update loader state when prop changes
    if (showPageLoader) {
      setShowLoader(true);
    }
  }, [showPageLoader]);

  const handleLoaderComplete = () => {
    setShowLoader(false);
    if (onLoaderComplete) {
      onLoaderComplete();
    }
  };

  return (
    <>
      {showLoader && <PageLoader pageName="Home" onComplete={handleLoaderComplete} />}
      <Hero />
      <Info />
      <SkillsSection />
      <ProjectsSection />
      <Contact showPageLoader={false} showHeroSection={false} />
    </>
  );
}

export default Home;
