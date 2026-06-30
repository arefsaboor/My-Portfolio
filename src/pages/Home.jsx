import { useState, useEffect } from 'react';
import PageLoader from '../components/PageLoader';
import Hero from '../sections/Hero';
import HomepageContent from '../sections/homepage-content/HomepageContent';

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
      <HomepageContent />
    </>
  );
}

export default Home;
