import { useState } from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../data/Projects.json';

const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            RECENT WORKS
          </h2>
          <div className="w-24 h-1 bg-teal-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Crafting beautifully responsive and user-centered<br></br> designs that deserve to be displayed on screens.
          </p>
        </div>

        <div className="flex flex-col gap-12 max-w-5xl mx-auto">
          {projectsData.projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <div 
                className="relative w-full cursor-pointer overflow-hidden"
                onClick={() => openModal(project)}
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.name}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">Click to preview</span>
                </div>
              </div>
              
              <div className="p-8 md:p-10">
                <div className="mb-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-base text-teal-600 font-semibold uppercase tracking-wide">
                    {project.subtitle}
                  </p>
                </div>
                
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  {project.description}
                </p>
                
                <button 
                  onClick={() => openModal(project)}
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-lg"
                >
                  Visit Website
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Want to see more?
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              I'm constantly working on new projects and improving my skills. Feel free to reach out if you'd like to collaborate or discuss potential opportunities.
            </p>
            <Link to="/contact" className="inline-block px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get In Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedProject && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-5xl w-full bg-white rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-2 shadow-lg transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Content */}
            <img 
              src={selectedProject.imageUrl} 
              alt={selectedProject.name}
              className="w-full h-auto"
            />
            <div className="p-6">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedProject.name}
              </h3>
              <p className="text-lg text-teal-600 font-semibold mb-4">
                {selectedProject.subtitle}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
