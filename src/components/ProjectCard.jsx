import { useState } from 'react';

// Import all screenshots
import books2shelfDesktop from '../assets/books2shelf-screenshots/books2shelf-desktop.png';
import books2shelfTablet from '../assets/books2shelf-screenshots/books2shelf-tablet.png';
import books2shelfMobile from '../assets/books2shelf-screenshots/books2shelf-mobile.png';

import nirvanDesktop from '../assets/Nirvan-Screenshots/desktop-hero.png';
import nirvanTablet from '../assets/Nirvan-Screenshots/tablet-hero.png';
import nirvanMobile from '../assets/Nirvan-Screenshots/mobile-hero.png';

import portfolioDesktop from '../assets/Portfolio-Site-Screenshots/Home-Desktop.png';
import portfolioTablet from '../assets/Portfolio-Site-Screenshots/Home-Tablet.png';
import portfolioMobile from '../assets/Portfolio-Site-Screenshots/Home-Mobile.png';

import bestsellersDesktop from '../assets/bestsellers-screenshots/bestsellers-desktop.png';
import bestsellersTablet from '../assets/bestsellers-screenshots/bestsellers-tablet.png';
import bestsellersMobile from '../assets/bestsellers-screenshots/bestsellers-mobile.png';

// Map JSON paths to imported images
const screenshotMap = {
  '/books2shelf-screenshots/books2shelf-desktop.png': books2shelfDesktop,
  '/books2shelf-screenshots/books2shelf-tablet.png': books2shelfTablet,
  '/books2shelf-screenshots/books2shelf-mobile.png': books2shelfMobile,
  '/Nirvan-Screenshots/desktop-hero.png': nirvanDesktop,
  '/Nirvan-Screenshots/tablet-hero.png': nirvanTablet,
  '/Nirvan-Screenshots/mobile-hero.png': nirvanMobile,
  '/Portfolio-Site-Screenshots/Home-Desktop.png': portfolioDesktop,
  '/Portfolio-Site-Screenshots/Home-Tablet.png': portfolioTablet,
  '/Portfolio-Site-Screenshots/Home-Mobile.png': portfolioMobile,
  '/bestsellers-screenshots/bestsellers-desktop.png': bestsellersDesktop,
  '/bestsellers-screenshots/bestsellers-tablet.png': bestsellersTablet,
  '/bestsellers-screenshots/bestsellers-mobile.png': bestsellersMobile,
};

const ProjectCard = ({ project }) => {
  // Get actual image paths from mapping
  const getImage = (path) => screenshotMap[path] || path;
  const [activeDevice, setActiveDevice] = useState('desktop');

  const devices = {
    desktop: {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Desktop'
    },
    tablet: {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Tablet'
    },
    mobile: {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Mobile'
    }
  };

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-teal-200">
      
      {/* Compact Header */}
      <div className="relative bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-100">
        
        <div className="relative z-10 lg:grid lg:grid-cols-5 lg:gap-0">
          {/* Left Side - Aligned with device preview (60%) */}
          <div className="lg:col-span-3 px-6 sm:px-8 lg:px-10 py-5 flex items-center gap-3">
            {/* Live Badge */}
            <div className="relative flex items-center gap-2.5 px-5 py-2.5 bg-green-50 border-2 rounded-full text-xs font-semibold text-green-700 shrink-0 animate-live-pulse">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-dot-pulse"></span>
              <span className="relative z-10">Live</span>
            </div>
            
            {/* Device Switcher */}
            <div className="flex gap-1.5 bg-gradient-to-br from-gray-100 to-gray-50 backdrop-blur-md rounded-xl p-1 shadow-sm border border-gray-200">
              {Object.entries(devices).map(([device, config]) => (
                <button
                  key={device}
                  onClick={() => setActiveDevice(device)}
                  title={config.label}
                  className={`p-2.5 rounded-lg transition-all duration-300 ${
                    activeDevice === device
                      ? 'bg-teal-600 text-white shadow-lg scale-105'
                      : 'text-gray-600 hover:bg-white hover:text-teal-600 hover:shadow'
                  }`}
                >
                  {config.icon}
                </button>
              ))}
            </div>
          </div>
          
          {/* Right Side - Aligned with content sidebar (40%) */}
          <div className="lg:col-span-2 px-6 sm:px-8 lg:px-10 py-5 border-t lg:border-t-0 lg:border-l border-gray-100">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {project.name}
                </h3>
                {project.subtitle && (
                  <p className="text-gray-600 mt-1.5 text-sm font-medium">
                    {project.subtitle}
                  </p>
                )}
              </div>
              {/* Year Badge */}
              {project.duration && (
                <div className="flex-shrink-0">
                  <div className={`px-3 py-1.5 rounded-lg font-bold text-sm ${
                    project.duration === '2026' 
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {project.duration}
                  </div>
                  {project.duration === '2026' && (
                    <span className="block text-xs text-center text-teal-600 font-semibold mt-1">NEW</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="lg:grid lg:grid-cols-5 lg:gap-0">
        
        {/* Left: Device Preview (60%) */}
        <div className="lg:col-span-3 relative bg-gradient-to-br from-slate-50 to-gray-50 px-6 py-12 lg:py-16 min-h-[450px] lg:min-h-[600px] flex items-center justify-center">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-teal-200 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          </div>

          {/* Device Mockups */}
          <div className="relative z-10 w-full flex items-center justify-center">
            
            {/* Desktop - MacBook Pro Style */}
            {activeDevice === 'desktop' && (
              <div className="w-full max-w-4xl animate-fadeInScale">
                {/* Display Housing - Aluminum */}
                <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 rounded-t-xl pt-1.5 px-1.5 pb-0" style={{ boxShadow: '-15px 25px 50px rgba(0,0,0,0.4)' }}>
                  {/* Screen Bezel - Ultra thin like real MacBook */}
                  <div className="relative bg-slate-900 rounded-t-lg p-0.5">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-b-3xl z-20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
                    </div>
                    
                    {/* Browser Chrome */}
                    <div className="bg-slate-800 rounded-t-md px-3 py-2 flex items-center gap-2 mt-3.5">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex-1 bg-slate-700 rounded text-xs text-slate-400 px-3 py-1 ml-2 truncate">
                        {project.liveUrl}
                      </div>
                    </div>
                    
                    {/* Screenshot */}
                    <div className="relative bg-white overflow-hidden">
                      <img
                        src={getImage(project.screenshots.desktop)}
                        alt={`${project.name} Desktop`}
                        className="w-full h-auto"
                        style={{ 
                          display: 'block',
                          imageRendering: 'high-quality',
                          WebkitFontSmoothing: 'antialiased'
                        }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Bottom Housing - Keyboard Deck */}
                <div className="relative">
                  {/* Hinge */}
                  <div className="h-px bg-slate-950"></div>
                  {/* Front Edge of Keyboard Base */}
                  <div className="relative bg-gradient-to-b from-slate-600 via-slate-700 to-slate-600 rounded-b-xl h-4" style={{
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1)'
                  }}>
                  </div>
                </div>
              </div>
            )}
            
            {/* Tablet - iPad Pro Style (2024) */}
            {activeDevice === 'tablet' && (
              <div className="w-full max-w-md animate-fadeInScale">
                {/* iPad Pro Frame - Thinner bezels */}
                <div className="relative bg-gradient-to-b from-slate-800 to-slate-950 rounded-3xl p-2.5 shadow-2xl" style={{ boxShadow: '-12px 20px 40px rgba(0,0,0,0.4)' }}>
                  {/* Screenshot Container */}
                  <div className="relative bg-white rounded-2xl overflow-hidden">
                    {/* Face ID Camera - Inside the screen at top */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-950 rounded-full ring-1 ring-slate-800/50 z-10"></div>
                    
                    <img
                      src={getImage(project.screenshots.tablet)}
                      alt={`${project.name} Tablet`}
                      className="w-full h-auto"
                      style={{ 
                        display: 'block',
                        imageRendering: 'high-quality',
                        WebkitFontSmoothing: 'antialiased'
                      }}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Mobile - iPhone 15 Pro Style (2023) */}
            {activeDevice === 'mobile' && (
              <div className="w-full max-w-xs animate-fadeInScale">
                <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-[2.5rem] p-3 shadow-2xl" style={{ boxShadow: '-8px 15px 35px rgba(0,0,0,0.4)' }}>
                  {/* Dynamic Island - pill shaped cutout */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20 flex items-center justify-center px-3">
                    <div className="flex items-center justify-between w-full">
                      <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                      <div className="flex-1 mx-2 h-1 bg-slate-900 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Side Buttons - iPhone 15 style */}
                  {/* Action Button (left top) */}
                  <div className="absolute left-0 top-[22%] w-1 h-10 bg-slate-950 rounded-r"></div>
                  {/* Volume buttons (left) */}
                  <div className="absolute left-0 top-[35%] w-1 h-14 bg-slate-950 rounded-r"></div>
                  {/* Power button (right) */}
                  <div className="absolute right-0 top-[30%] w-1 h-16 bg-slate-950 rounded-l"></div>
                  
                  {/* Screenshot Container */}
                  <div className="relative bg-white rounded-[2.2rem] overflow-hidden">
                    <img
                      src={getImage(project.screenshots.mobile)}
                      alt={`${project.name} Mobile`}
                      className="w-full h-auto"
                      style={{ 
                        display: 'block',
                        imageRendering: 'high-quality',
                        WebkitFontSmoothing: 'antialiased'
                      }}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>

        {/* Right: Content Sidebar (40%) */}
        <div className="lg:col-span-2 bg-white px-6 lg:px-8 py-8 lg:py-12 space-y-6 border-t lg:border-t-0 lg:border-l border-gray-100">
          
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Overview</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          {project.technologies && (
            <div className="pb-6 border-b border-gray-100">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-lg border border-teal-100"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          {project.highlights && (
            <div className="pb-6 border-b border-gray-100">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Key Features
              </h4>
              <ul className="space-y-2">
                {project.highlights.slice(0, 4).map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 text-xs">
                    <svg className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="leading-snug">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3 pt-2">
            {/* Live Demo Section */}
            {project.liveUrl && (
              <div className="space-y-2">
                {/* Label with down arrow */}
                <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm">
                  <span>Live Demo:</span>
                  <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {/* Two buttons side by side */}
                <div className="grid grid-cols-2 gap-2">
                  {/* Vercel Button */}
                  {project.vercelUrl && (
                    <a
                      href={project.vercelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 px-3 rounded-lg transition-all duration-300 text-xs"
                    >
                      <span>Vercel</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  
                  {/* Subdomain/Custom Domain Button */}
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 px-3 rounded-lg transition-all duration-300 text-xs"
                  >
                    <span>{project.name === "Portfolio" ? "Custom Domain" : "Subdomain"}</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            )}
            
            {/* Secondary Links - Outline Style */}
            <div className="grid grid-cols-2 gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-medium py-2 px-3 rounded-lg transition-all duration-300 text-xs"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
              )}

              {project.figmaUrl && (
                <a
                  href={project.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-medium py-2 px-3 rounded-lg transition-all duration-300 text-xs"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"/>
                  </svg>
                  Figma
                </a>
              )}

              {project.framerUrl && (
                <a
                  href={project.framerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-medium py-2 px-3 rounded-lg transition-all duration-300 text-xs"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
                  </svg>
                  Framer
                </a>
              )}

              {project.caseStudyUrl && (
                <a
                  href={project.caseStudyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 font-medium py-2 px-3 rounded-lg transition-all duration-300 text-xs col-span-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Case Study (Behance)
                </a>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
