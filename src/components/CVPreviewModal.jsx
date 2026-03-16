import { useEffect, useState, useRef } from 'react';
import cvPdf from '../assets/Aref_Saboor_CV.pdf';
import cvImage from '../assets/Aref_Saboor_CV.jpg'; // High-quality resume image for mobile devices

function CVPreviewModal({ isOpen, onClose, pdfUrl = cvPdf }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Image zoom/pan states
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastDistance, setLastDistance] = useState(0);
  const [lastCenter, setLastCenter] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  // Detect if device is mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      // Check if it's a real mobile device (not just small screen)
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isMobileDevice && isTouchDevice);
    };
    
    checkMobile();
  }, []);

  // Handle modal animation states
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Reset zoom/pan when opening
      setScale(1);
      setPosition({ x: 0, y: 0 });
      // Delay animation to trigger transition
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      // Wait for animation to finish before unmounting
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
  // Touch event handlers for zoom/pan on mobile
  const getDistance = (touch1, touch2) => {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getCenter = (touch1, touch2) => {
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    };
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getDistance(e.touches[0], e.touches[1]);
      const center = getCenter(e.touches[0], e.touches[1]);
      setLastDistance(distance);
      setLastCenter(center);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getDistance(e.touches[0], e.touches[1]);
      const center = getCenter(e.touches[0], e.touches[1]);

      if (lastDistance > 0) {
        // Zoom
        const scaleChange = distance / lastDistance;
        const newScale = Math.min(Math.max(scale * scaleChange, 1), 4);
        setScale(newScale);

        // Pan
        if (newScale > 1) {
          const dx = center.x - lastCenter.x;
          const dy = center.y - lastCenter.y;
          setPosition({
            x: position.x + dx,
            y: position.y + dy,
          });
        } else {
          setPosition({ x: 0, y: 0 });
        }
      }

      setLastDistance(distance);
      setLastCenter(center);
    }
  };

  const handleTouchEnd = () => {
    setLastDistance(0);
  };

      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      documeCV Viewer - Image for mobile, iframe for desktop */}
        <div className="flex-1 overflow-auto bg-gray-100">
          {isMobile ? (
            // Mobile: Show zoomable image
            <div 
              ref={imageContainerRef}
              className="w-full h-full flex items-center justify-center overflow-hidden touch-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={cvImage}
                alt="Resume Preview"
                className="max-w-full max-h-full object-contain"
                style={{
                  transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                  transformOrigin: 'center',
                  transition: lastDistance === 0 ? 'transform 0.3s ease-out' : 'none',
                }}
                draggable={false}
              />
            </div>
          ) : (
            // Desktop: Show PDF iframe
            <iframe
              src={`${pdfUrl}#view=FitH&toolbar=0`}
              className="w-full h-full border-0"
              title="CV Preview"
              loading="lazy"
            />
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-3 bg-gray-50 text-center text-sm text-gray-600 border-t border-gray-200">
          {isMobile ? (
            <p className="text-xs">
              Pinch to zoom • Drag with two fingers to pan
            </p>
          ) : (
            <p className="flex items-center justify-center gap-2">
              <kbd className="px-2 py-1 bg-white rounded border border-gray-300 text-xs font-mono">Esc</kbd>
              <span>to close</span>
            </p>
          )}obUrl = window.URL.createObjectURL(blob);
      
      // Create a temporary link with the correct filename
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = "Aref Saboor's Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isAnimating ? 'bg-black/80 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'
      }`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="CV Preview"
    >
      <div 
        className={`relative w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white text-teal-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
            aria-label="Download CV"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download</span>
          </button>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label="Close preview"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-auto bg-gray-100">
          <iframe
            src={`${pdfUrl}#view=FitH&toolbar=0`}
            className="w-full h-full border-0"
            title="CV Preview"
            loading="lazy"
          />
        </div>

        {/* Footer Hint - Desktop Only */}
        <div className="hidden sm:block p-3 bg-gray-50 text-center text-sm text-gray-600 border-t border-gray-200">
          <p className="flex items-center justify-center gap-2">
            <kbd className="px-2 py-1 bg-white rounded border border-gray-300 text-xs font-mono">Esc</kbd>
            <span>to close</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CVPreviewModal;
