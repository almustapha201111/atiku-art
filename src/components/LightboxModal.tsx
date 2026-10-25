import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, ChevronLeft, ChevronRight, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import { ProjectItem } from '../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';

export const LightboxModal: React.FC = () => {
  const { activeLightboxProject, setActiveLightboxProject, projects, conceptProjects, getWhatsAppUrl } = useStudio();
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  // Combine available gallery items
  const allGalleryItems = [...conceptProjects, ...projects.filter(p => p.imageUrl)];

  useEffect(() => {
    setShowBeforeAfter(false);
  }, [activeLightboxProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveLightboxProject(null);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    if (activeLightboxProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [activeLightboxProject, allGalleryItems]);

  if (!activeLightboxProject) return null;

  const currentIndex = allGalleryItems.findIndex(p => p.id === activeLightboxProject.id);

  const handleNext = () => {
    if (allGalleryItems.length === 0) return;
    const nextIndex = (currentIndex + 1) % allGalleryItems.length;
    setActiveLightboxProject(allGalleryItems[nextIndex]);
  };

  const handlePrev = () => {
    if (allGalleryItems.length === 0) return;
    const prevIndex = (currentIndex - 1 + allGalleryItems.length) % allGalleryItems.length;
    setActiveLightboxProject(allGalleryItems[prevIndex]);
  };

  const hasBeforeAfter = Boolean(
    activeLightboxProject.hasBeforeAfter &&
    activeLightboxProject.beforeImageUrl &&
    activeLightboxProject.afterImageUrl
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 lg:p-10"
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveLightboxProject(null)}
          className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white border border-[#EADBCE] hover:border-[#E76F51] text-[#252525] hover:text-[#E76F51] transition-all shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Prev / Next Controls */}
        {allGalleryItems.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/90 hover:bg-[#E76F51] hover:text-white text-[#252525] border border-[#EADBCE] transition-all hidden sm:flex shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/90 hover:bg-[#E76F51] hover:text-white text-[#252525] border border-[#EADBCE] transition-all hidden sm:flex shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Modal Content */}
        <div className="relative max-w-6xl w-full max-h-[90vh] flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#EADBCE]">
          
          {/* Main Visual Display */}
          <div className="lg:w-3/5 bg-slate-900 flex items-center justify-center p-2 relative overflow-hidden min-h-[300px] lg:min-h-[550px]">
            {hasBeforeAfter && showBeforeAfter ? (
              <div className="w-full">
                <BeforeAfterSlider
                  beforeUrl={activeLightboxProject.beforeImageUrl!}
                  afterUrl={activeLightboxProject.afterImageUrl!}
                  title={activeLightboxProject.title}
                />
              </div>
            ) : (
              <img
                src={activeLightboxProject.imageUrl}
                alt={activeLightboxProject.title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            )}

            {/* Before/After Switch Button */}
            {hasBeforeAfter && (
              <button
                onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-white/90 hover:bg-[#E76F51] hover:text-white text-xs uppercase tracking-wider text-[#252525] font-bold border border-[#EADBCE] flex items-center space-x-1.5 transition-all shadow-lg"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#E76F51]" />
                <span>{showBeforeAfter ? 'Show Final Artwork Only' : 'Compare Before & After'}</span>
              </button>
            )}
          </div>

          {/* Project Details Panel */}
          <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[40vh] lg:max-h-none bg-[#FAF7F2] border-t lg:border-t-0 lg:border-l border-[#EADBCE]">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-[#E76F51]/15 text-[10px] uppercase tracking-wider text-[#E76F51] font-bold">
                  {activeLightboxProject.category}
                </span>
                <span className="text-[10px] text-[#777] uppercase tracking-wider font-semibold">
                  {activeLightboxProject.isConcept ? 'Concept Design Style' : 'Verified Client Installation'}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#252525] leading-snug">
                {activeLightboxProject.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                {activeLightboxProject.description ||
                  'Custom hand-painted artistic wall project designed by the ATIKU MAKODA ARTS creative studio.'}
              </p>

              <div className="pt-4 border-t border-[#EADBCE] space-y-2 text-xs text-[#777]">
                <div>
                  <span className="text-[#252525] font-bold">Studio:</span> ATIKU MAKODA ARTS — Creative Wall Art & Interior Design
                </div>
                <div>
                  <span className="text-[#252525] font-bold">Execution:</span> 100% Hand-Crafted with durable architectural pigments
                </div>
              </div>
            </div>

            {/* Inquire on WhatsApp for similar artwork */}
            <div className="pt-6 mt-6 border-t border-[#EADBCE]">
              <a
                href={getWhatsAppUrl(`Hello ATIKU MAKODA ARTS, I am admiring your "${activeLightboxProject.title}" (${activeLightboxProject.category}) work on your website. I would love to discuss commissioning a project in this style.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2.5 py-4 rounded-sm bg-[#E76F51] hover:bg-[#C85438] text-white font-bold uppercase tracking-wider text-xs shadow-md shadow-[#E76F51]/30 hover:shadow-lg active:scale-95 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire About This Style on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};
