import Hero from '../sections/Hero';
import HomepageContent from '../sections/homepage-content/HomepageContent';
import { usePageMeta } from '../utils/usePageMeta';

function Home() {
  usePageMeta(
    'Aref Saboor - UX/UI Designer & Full Stack Developer | Berlin',
    'Portfolio of Aref Saboor, a UX/UI designer and full-stack developer based in Berlin. Explore featured projects, skills, and get in touch.'
  );

  return (
    <>
      <Hero />
      <HomepageContent />
    </>
  );
}

export default Home;
