import { useState } from 'react';
import projectsData from '../data/Projects.json';
import Books2ShelfImg from '../assets/ReactedTasks.jpg';
import ArefPortfolio from '../assets/ArefPortfolio.jpg';
import NirvanVedic from '../assets/NirvanVedic.jpg';

function ProjectsSection() {
  const [expandedProject, setExpandedProject] = useState(null);

  const imageMap = {
    1: Books2ShelfImg,
    2: ArefPortfolio,
    3: NirvanVedic
  };

  const toggleProject = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-6 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-6 uppercase tracking-wider">
            Portfolio
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Featured Projects
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Transforming ideas into impactful digital experiences through thoughtful design and clean code
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {projectsData.projects.map((project, index) => (
            <div 
              key={project.id}
              className="group relative"
            >
              {/* Project Card */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className={`relative overflow-hidden h-full min-h-[400px] ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 to-blue-600/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img 
                      src={imageMap[project.id]} 
                      alt={project.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlay Badge */}
                    <div className="absolute top-6 left-6 z-20">
                      <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-gray-900 font-bold rounded-full text-sm shadow-lg">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className={`p-8 lg:p-12 flex flex-col justify-between ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    {/* Header */}
                    <div>
                      {/* Project Meta */}
                      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">{project.role}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span>{project.duration}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-lg text-teal-600 font-semibold mb-6">
                        {project.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Impact Metrics */}
                      <div className="mb-6">
                        <button
                          onClick={() => toggleProject(project.id)}
                          className="flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors text-sm uppercase tracking-wider mb-3"
                        >
                          <svg 
                            className={`w-4 h-4 transform transition-transform ${expandedProject === project.id ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          {expandedProject === project.id ? 'Hide Details' : 'View Impact & Details'}
                        </button>

                        {/* Expandable Impact Section */}
                        <div className={`overflow-hidden transition-all duration-500 ${expandedProject === project.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                          {/* Challenge-Solution */}
                          <div className="bg-gray-50 rounded-xl p-6 mb-4 border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                              <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                              Challenge
                            </h4>
                            <p className="text-gray-700 text-sm leading-relaxed">{project.challenge}</p>
                          </div>

                          <div className="bg-teal-50 rounded-xl p-6 mb-4 border border-teal-100">
                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                              <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                              </svg>
                              Solution
                            </h4>
                            <p className="text-gray-700 text-sm leading-relaxed">{project.solution}</p>
                          </div>

                          {/* Impact Metrics */}
                          <div className="bg-blue-50 rounded-xl p-6 mb-4 border border-blue-100">
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                              </svg>
                              Impact & Results
                            </h4>
                            <ul className="space-y-2">
                              {project.impact.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Key Highlights */}
                          <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              Key Highlights
                            </h4>
                            <ul className="grid grid-cols-1 gap-2">
                              {project.highlights.map((highlight, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
                                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full flex-shrink-0"></span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mb-6">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, idx) => (
                            <span 
                              key={idx} 
                              className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-teal-50 hover:to-blue-50 text-gray-700 hover:text-teal-700 text-sm font-medium rounded-lg border border-gray-200 hover:border-teal-300 transition-all duration-300 cursor-default"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          View Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl border-2 border-gray-900 hover:border-teal-600 hover:text-teal-600 transition-all duration-300 transform hover:scale-105"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                          Source Code
                        </a>
                      )}
                      {project.figmaUrl && (
                        <a 
                          href={project.figmaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl border-2 border-gray-300 hover:border-purple-500 hover:text-purple-600 transition-all duration-300"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019 3.019-1.355 3.019-3.019V16.49H8.148zm7.704 0c-.001-2.476 2.013-4.49 4.489-4.49s4.49 2.014 4.49 4.49-2.014 4.49-4.49 4.49-4.49-2.014-4.489-4.49zm1.471 0c0 1.665 1.355 3.019 3.019 3.019s3.019-1.355 3.019-3.019-1.355-3.019-3.019-3.019-3.019 1.354-3.019 3.019z"/>
                          </svg>
                          Prototype
                        </a>
                      )}
                      {project.caseStudyUrl && (
                        <a 
                          href={project.caseStudyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Case Study
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20 pt-12 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Interested in collaborating?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Let's Talk
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
