import AboutPhoto from '../assets/AboutHero-Portrait.jpg';
import { smoothScrollToId } from '../utils/smoothScroll';

const heroContent = {
  tagline: "I don't just build websites, I create visual experiences that tell stories and captivate audiences.",
  journey:
    '"I am a Video Journalist and a former Bundeswehr employee. After a change of career I recently joined the competitive world of Web Designing/Development. As a Self-Skilled Graphic Designer, I enthusiastically combine visual design into interactive, responsive user experiences."',
};

function Fact({ label, children }) {
  return (
    <div>
      <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-xs font-semibold text-slate-900 leading-snug">{children}</p>
    </div>
  );
}

function MyStoryButton({ className = '' }) {
  return (
    <button
      onClick={() => smoothScrollToId('about-story')}
      className={`inline-flex items-center gap-2 text-sm font-semibold text-slate-900 uppercase tracking-wide hover:text-teal-600 transition-colors ${className}`}
    >
      My Story
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
    </button>
  );
}

export default function AboutHero({ isVisible }) {
  return (
    <section id="about-hero" className="bg-white pt-20 lg:pt-0">
      <div className={`flex flex-col lg:grid lg:grid-cols-2 lg:min-h-screen transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="h-[62vh] sm:h-[68vh] lg:h-auto">
          <img
            src={AboutPhoto}
            alt="Aref Saboor"
            className="w-full h-full object-cover"
            style={{ objectPosition: '50% 18%' }}
          />
        </div>

        <div className="flex items-center px-6 sm:px-12 lg:px-16 lg:border-l border-slate-200 py-10 lg:pt-32 lg:pb-10">
          <div className="max-w-lg w-full">
            <h1 className="leading-none tracking-tight whitespace-nowrap mb-3" style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}>
              <span className="font-bold text-slate-900">Aref </span>
              <span className="font-thin text-slate-900">Saboor</span>
            </h1>
            <p className="font-thin text-slate-500 mb-8 whitespace-nowrap" style={{ fontSize: 'clamp(0.8125rem, 2.4vw, 1.625rem)' }}>
              UX/UI Designer
              <span className="text-teal-600 mx-2" style={{ fontSize: '1.2em', lineHeight: 0 }}>&middot;</span>
              Full Stack Developer
            </p>

            <MyStoryButton className="lg:hidden mb-10" />

            <p className="text-lg text-slate-500 leading-relaxed mb-6 border-t border-slate-200 pt-6">{heroContent.tagline}</p>
            <p className="text-slate-600 leading-relaxed italic mb-10">{heroContent.journey}</p>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 xl:gap-6 mb-10 border-t border-slate-200 pt-6">
              <Fact label="Background">
                Writer,<span className="hidden xl:inline"> </span><br className="xl:hidden" />
                Journalist<br />
                &amp; Graphic Designer
              </Fact>
              <Fact label="Training">
                1-Year<span className="hidden xl:inline"> </span><br className="xl:hidden" />
                Intensive<br />
                Web Development
              </Fact>
              <Fact label="Focus">
                Design Driven<br />
                Developer<span className="hidden xl:inline"> </span><br className="xl:hidden" />
                (Frontend)
              </Fact>
            </div>

            <MyStoryButton className="hidden lg:inline-flex" />
          </div>
        </div>
      </div>
    </section>
  );
}
