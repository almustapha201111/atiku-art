import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, Upload, SlidersHorizontal, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import { ProjectCategory, ProjectItem } from '../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { INITIAL_REAL_PROJECT_SLOTS } from '../lib/constants';

interface PortfolioProps {
  onOpenAdminUpload?: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenAdminUpload }) => {
  const { conceptProjects, projects, setActiveLightboxProject, isAdmin, getWhatsAppUrl } = useStudio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewBeforeAfterId, setViewBeforeAfterId] = useState<string | null>(null);

  const categories = [
    'All',
    'Wall Murals',
    'Interior Art',
    'Decorative Painting',
    'Creative Concepts'
  ];

  // Filter concept projects by category
  const filteredConcepts = selectedCategory === 'All'
    ? conceptProjects
    : conceptProjects.filter(p => p.category === selectedCategory);

  // Real client projects from Firestore
  const realProjects = projects.filter(p => p.isPublished && !p.isConcept);

  return (
    <>
      {/* 1. CREATIVE CONCEPT SHOWCASE GALLERY */}
      <section id="portfolio" className="relative py-28 bg-[#FFFFFF] border-t border-[#EADBCE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-[#E76F51] font-bold mb-3">
                <span>Inspirational Gallery</span>
                <span className="w-8 h-[1.5px] bg-[#E76F51]" />
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-[#252525] uppercase tracking-tight">
                Our Work Speaks <span className="artistic-gradient-text italic font-bold">For Itself.</span>
              </h2>
              <p className="mt-3 text-sm text-[#555555] max-w-xl">
                Explore our curated wall mural styles, artistic room treatments, and architectural finishes designed to inspire your space.
              </p>
            </div>

            {/* Verification label */}
            <div className="mt-4 md:mt-0 flex items-center space-x-2 text-xs text-[#2A9D8F] font-semibold bg-[#2A9D8F]/10 px-3.5 py-1.5 rounded-full border border-[#2A9D8F]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#2A9D8F]" />
              <span>Studio Concept Designs & Styles</span>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-4 mb-10 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] font-bold transition-all duration-300 whitespace-nowrap shadow-xs ${
                  selectedCategory === cat
                    ? 'bg-[#E76F51] text-white shadow-md shadow-[#E76F51]/30'
                    : 'bg-[#FAF7F2] text-[#555555] hover:text-[#252525] hover:bg-white border border-[#EADBCE]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Concept Gallery Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredConcepts.map((project, idx) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
                  className="group relative rounded-2xl bg-[#FAF7F2] border border-[#EADBCE] hover:border-[#E76F51] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Image Container with smooth hover zoom */}
                  <div 
                    onClick={() => setActiveLightboxProject(project)}
                    className="relative aspect-[4/3] overflow-hidden bg-slate-100 cursor-pointer"
                  >
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />

                    {/* Zoom icon action */}
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-[#EADBCE] flex items-center justify-center text-[#E76F51] opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-100 scale-75 shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] uppercase tracking-wider font-semibold text-[#252525] shadow-xs">
                      {project.category}
                    </div>

                    {/* Mandatory Concept Label as requested */}
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#E76F51]/90 backdrop-blur-md text-[9px] uppercase tracking-wider font-bold text-white shadow-xs">
                      Concept Design • Illustrative Example
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#2A9D8F] font-bold mb-1">
                        <span>{project.category}</span>
                        <span>Custom Commission Available</span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-[#252525] group-hover:text-[#E76F51] transition-colors leading-snug">
                        {project.title}
                      </h3>

                      <p className="mt-2 text-xs text-[#555555] leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Inquire on WhatsApp */}
                    <div className="mt-5 pt-4 border-t border-[#EADBCE] flex items-center justify-between">
                      <button
                        onClick={() => setActiveLightboxProject(project)}
                        className="text-xs text-[#2A9D8F] font-semibold hover:underline flex items-center space-x-1"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>View Full Screen</span>
                      </button>

                      <a
                        href={getWhatsAppUrl(`Hello ATIKU MAKODA ARTS, I am inspired by the "${project.title}" style from your website. Can we discuss a custom project like this?`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#E76F51] font-bold hover:text-[#C85438] flex items-center space-x-1 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Inquire This Style</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* 2. DEDICATED "OUR REAL PROJECTS" GALLERY (Strict authenticity for genuine client work) */}
      <section id="real-projects" className="relative py-28 bg-[#FAF7F2] border-t border-b border-[#EADBCE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-[#2A9D8F] font-bold mb-3">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9D8F]" />
                <span>Client Portfolio</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#252525] uppercase tracking-tight">
                Our Real <span className="artistic-gradient-text italic font-bold">Projects.</span>
              </h2>
              <p className="mt-3 text-sm text-[#555555] max-w-xl">
                Dedicated showcase for genuine, on-site wall art installations and murals completed for clients across Nigeria.
              </p>
            </div>

            {/* Admin Upload Shortcut */}
            {onOpenAdminUpload && (
              <button
                onClick={onOpenAdminUpload}
                className="mt-4 md:mt-0 inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white border border-[#E76F51] text-[#E76F51] text-xs uppercase tracking-wider font-bold hover:bg-[#E76F51] hover:text-white transition-all shadow-xs"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isAdmin ? 'Upload Real Project Photo' : 'Studio Portal'}</span>
              </button>
            )}
          </div>

          {/* Real Projects Display */}
          {realProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {realProjects.map((project) => {
                const hasBeforeAfter = Boolean(project.hasBeforeAfter && project.beforeImageUrl && project.afterImageUrl);
                const isComparing = viewBeforeAfterId === project.id;

                return (
                  <div
                    key={project.id}
                    className="group rounded-2xl bg-white border border-[#EADBCE] overflow-hidden shadow-sm hover:shadow-xl transition-all"
                  >
                    {hasBeforeAfter && isComparing ? (
                      <div className="p-2 bg-slate-900">
                        <BeforeAfterSlider
                          beforeUrl={project.beforeImageUrl!}
                          afterUrl={project.afterImageUrl!}
                          title={project.title}
                        />
                        <button
                          onClick={() => setViewBeforeAfterId(null)}
                          className="mt-2 w-full py-1 text-center text-[10px] uppercase tracking-wider text-[#E9C46A] hover:underline"
                        >
                          Exit Comparison
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => setActiveLightboxProject(project)}
                        className="relative aspect-[4/3] bg-slate-100 cursor-pointer overflow-hidden"
                      >
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-emerald-600 text-white text-[9px] uppercase tracking-wider font-bold shadow-xs">
                          Verified Client Project
                        </div>
                        {hasBeforeAfter && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setViewBeforeAfterId(project.id);
                            }}
                            className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-white/90 text-xs text-[#252525] font-semibold border border-[#EADBCE] shadow-xs flex items-center space-x-1"
                          >
                            <SlidersHorizontal className="w-3 h-3 text-[#E76F51]" />
                            <span>Before / After</span>
                          </button>
                        )}
                      </div>
                    )}

                    <div className="p-6">
                      <h4 className="font-serif text-lg font-bold text-[#252525] group-hover:text-[#E76F51] transition-colors">
                        {project.title}
                      </h4>
                      <p className="mt-2 text-xs text-[#555555] line-clamp-2">
                        {project.description}
                      </p>
                      <div className="mt-4 pt-4 border-t border-[#EADBCE] flex items-center justify-between">
                        <span className="text-[10px] text-[#2A9D8F] font-bold uppercase tracking-wider">
                          Authentic Handiwork
                        </span>
                        <a
                          href={getWhatsAppUrl(`Hello ATIKU MAKODA ARTS, I am looking at your real project "${project.title}" and would like to discuss a similar project.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#E76F51] font-bold hover:underline"
                        >
                          Inquire on WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Upload slots ready for business owner photos */
            <div className="p-10 rounded-2xl bg-white border border-[#EADBCE] text-center space-y-4 max-w-2xl mx-auto shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#E76F51]/10 text-[#E76F51] flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#252525]">
                Authentic Client Work Archive
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                ATIKU MAKODA ARTS upholds complete authenticity. When real on-site client photographs are uploaded via the Admin Dashboard, they appear in this dedicated section.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenAdminUpload}
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#2A9D8F] hover:bg-[#1E7B70] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Client Photos in Admin Portal</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
};
