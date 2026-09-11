import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import cvPdf from '../assets/Aref-Saboor_Resume_2026.pdf';
import cvImage from '../assets/Aref-Saboor_Resume_2026.jpg';
import { zIndex } from '../data/navigation';

function CVPreviewModal({ isOpen, onClose, pdfUrl = cvPdf }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastDistance, setLastDistance] = useState(0);
  const [lastCenter, setLastCenter] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isMobileDevice && isTouchDevice);
    };
    
    checkMobile();
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const restoreTo = document.activeElement;
    const id = setTimeout(() => closeButtonRef.current?.focus(), 60);
    return () => {
      clearTimeout(id);
      if (restoreTo instanceof HTMLElement) restoreTo.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

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
        const scaleChange = distance / lastDistance;
        const newScale = Math.min(Math.max(scale * scaleChange, 1), 4);
        setScale(newScale);

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

  const handleDownload = async () => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = "Aref Saboor's Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return createPortal(
    <div 
      className={`fixed inset-0 flex items-center justify-center p-4 transition-all duration-300 ${
        isAnimating ? 'bg-[#08191A]/85 backdrop-blur-sm' : 'bg-[#08191A]/0 backdrop-blur-none'
      }`}
      style={{ zIndex: zIndex.modal }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="CV Preview"
    >
      <div 
        className={`relative w-full max-w-6xl h-[90vh] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 bg-[#0C2A2C] text-[#F2F7F6]">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#F2F7F6] text-[#0C2A2C] font-semibold rounded-md hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
            aria-label="Download CV"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download</span>
          </button>
          
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label="Close preview"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-auto bg-[#E6EDED]">
          {isMobile ? (
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
            <iframe
              src={`${pdfUrl}#view=FitH&toolbar=0`}
              className="w-full h-full border-0"
              title="CV Preview"
              loading="lazy"
            />
          )}
        </div>

        <div className="p-3 bg-[#F5F8F8] text-center text-sm text-[#40575A] border-t border-[#E9EEEE]">
          {isMobile ? (
            <p className="text-xs">
              Pinch to zoom • Drag with two fingers to pan
            </p>
          ) : (
            <p className="flex items-center justify-center gap-2">
              <kbd className="px-2 py-1 bg-white rounded border border-[#DEE5E5] text-xs font-mono">Esc</kbd>
              <span>to close</span>
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default CVPreviewModal;
