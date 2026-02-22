import { Link } from 'react-router-dom';
import SkillsSection from '../sections/SkillsSection';
import WebImage from '../assets/Web-Image-Full.jpg';

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section with Full Width Image and Card */}
      <section className="relative w-full h-screen">
        <div className="absolute inset-0">
          <img 
            src={WebImage} 
            alt="Web Development" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card on Right Side */}
        <div className="relative h-full flex items-center justify-end px-4 sm:px-6 lg:px-16">
          <div className="flex flex-col max-w-lg mr-0 md:mr-12">
            {/* Name and Title */}
            <div className="mb-8 bg-gradient-to-r from-teal-600/80 to-transparent p-6 rounded-lg">
              <h1 className="text-5xl md:text-6xl text-white mb-2">
                <span className="font-bold tracking-wider">AREF </span>
                <span className="font-thin tracking-widest">SABOOR</span>
              </h1>
              <h2 className="text-xl md:text-4xl text-white font-light mt-4">
                Designer / Developer
              </h2>
            </div>

            {/* Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12">
              <p className="text-lg font-bold text-gray-900 mb-4">
                A Bit About Me:
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                I am a Video Journalist and a former Bundeswehr employee. After a change of career I recently joined the competitive world of Web Designing/Development. As a Self-Skilled Graphic Designer, I enthusiastically combine the visual designs into interactive and responsive user experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Get In Touch Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-6">
            Let's Work Together
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <Link 
            to="/contact" 
            className="inline-block px-12 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
