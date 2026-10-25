import React from 'react';
import { motion } from 'motion/react';
import { Compass, MessageSquare, Sparkles, Palette, ArrowDown } from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import { heroImg } from '../lib/constants';

export const Hero: React.FC = () => {
  const { settings, projects, getWhatsAppUrl } = useStudio();

  // Use uploaded hero image if configured, otherwise use high-fidelity generated hero photograph
  const activeHeroImage = settings.heroImageUrl || projects.find(p => p.isHeroFeatured && p.imageUrl)?.imageUrl || heroImg;

  const scrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#FAF7F2] pt-24 pb-16">
      
      {/* Subtle Artistic Abstract Shapes in the background */}
      <div className="absolute top-12 left-10 w-96 h-96 bg-[#F4A6A0]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#2A9D8F]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#E9C46A]/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Narrative */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Studio Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EADBCE] shadow-xs"
            >
              <Palette className="w-3.5 h-3.5 text-[#E76F51]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E76F51]">
                Bespoke Wall Painting & Interior Murals • Nigeria
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl font-black text-[#252525] uppercase tracking-tight leading-[1.08]"
            >
              We Turn Walls Into{' '}
              <span className="artistic-gradient-text italic font-bold">
                Masterpieces.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-[#555555] font-normal leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {settings.heroSubtitle ||
                'Transforming ordinary spaces into extraordinary works of art through vibrant creativity, precision, and professional craftsmanship.'}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#portfolio"
                onClick={scrollToPortfolio}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-sm text-xs uppercase tracking-[0.16em] font-bold border-2 border-[#252525] text-[#252525] hover:bg-[#252525] hover:text-[#FAF7F2] transition-all duration-300 shadow-sm active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Our Work</span>
              </a>

              <a
                href={getWhatsAppUrl("Hello ATIKU MAKODA ARTS, I saw your website and I'd like to get a free quote for my wall art project.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-4 rounded-sm text-xs uppercase tracking-[0.16em] font-bold bg-[#E76F51] hover:bg-[#C85438] text-white transition-all duration-300 shadow-md shadow-[#E76F51]/30 hover:shadow-lg hover:shadow-[#E76F51]/40 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Get a Free Quote</span>
              </a>
            </motion.div>

            {/* Palette Bar / Editorial Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="pt-6 border-t border-[#EADBCE] grid grid-cols-3 gap-4 text-left max-w-md mx-auto lg:mx-0"
            >
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#E76F51] font-bold block">Original</span>
                <span className="font-serif text-sm font-bold text-[#252525]">Custom Murals</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#2A9D8F] font-bold block">Artisanal</span>
                <span className="font-serif text-sm font-bold text-[#252525]">Textured Finishes</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#E9C46A] font-bold block">Luxury</span>
                <span className="font-serif text-sm font-bold text-[#252525]">Interior Walls</span>
              </div>
            </motion.div>

          </div>

          {/* Right Hero Image Showcase with Artistic Framing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Colorful Artistic Back-drop card */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#E76F51]/20 via-[#E9C46A]/25 to-[#2A9D8F]/25 rounded-2xl transform rotate-2 blur-sm" />
            
            {/* Main Featured Photo Card */}
            <div className="relative rounded-xl overflow-hidden bg-white p-2.5 shadow-xl border border-[#EADBCE]">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                <img
                  src={activeHeroImage}
                  alt="Colorful modern luxury wall mural by ATIKU MAKODA ARTS"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />

                {/* Concept Design Tag */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] uppercase tracking-wider font-semibold text-[#E76F51] shadow-xs">
                  Featured Art Concept
                </div>
              </div>

              {/* Caption Card */}
              <div className="p-3.5 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#252525]">
                    Double-Height Fluid Living Room Mural
                  </h4>
                  <p className="text-[11px] text-[#777]">
                    Terracotta, Warm Teal & Golden Ochre Symphony
                  </p>
                </div>
                <div className="flex space-x-1.5 shrink-0">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#E76F51]" title="Terracotta" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#2A9D8F]" title="Artistic Teal" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#E9C46A]" title="Golden Yellow" />
                </div>
              </div>
            </div>

            {/* Floating Floating Decorative Badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -bottom-5 -left-4 sm:-left-6 p-3.5 rounded-lg bg-white/95 backdrop-blur-md border border-[#EADBCE] shadow-lg flex items-center space-x-3 hidden sm:flex"
            >
              <div className="w-8 h-8 rounded-full bg-[#E76F51]/15 flex items-center justify-center text-[#E76F51]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#777] block">Craftsmanship</span>
                <span className="text-xs font-bold text-[#252525]">100% Hand-Painted</span>
              </div>
            </motion.div>
          </motion.div>

        </div>

      </div>

      {/* Elegant Scroll Down prompt */}
      <div 
        onClick={scrollToPortfolio}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] text-[#777] group-hover:text-[#E76F51] transition-colors mb-1">
          Scroll
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-[#E76F51] animate-bounce" />
      </div>
    </section>
  );
};
