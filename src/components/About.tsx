import React from 'react';
import { motion } from 'motion/react';
import { Palette, Sparkles, Layers, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import { artistPaintingImg } from '../lib/constants';

export const About: React.FC = () => {
  const { settings } = useStudio();

  const corePillars = [
    {
      icon: Palette,
      title: 'Creative Craftsmanship',
      color: '#E76F51',
      description: 'Handcrafted wall paintings and custom murals executed with expressive artistry, vibrant palettes, and rigorous technique.'
    },
    {
      icon: Sparkles,
      title: 'Attention to Detail',
      color: '#2A9D8F',
      description: 'Meticulous surface preparation, exact line definition, and harmonious color blending across every single stroke.'
    },
    {
      icon: Layers,
      title: 'Unique Artistic Designs',
      color: '#E9C46A',
      description: 'Original concepts conceived specifically for your interior layout, architectural lighting, and bespoke personal vision.'
    },
    {
      icon: HeartHandshake,
      title: 'Personalized Experience',
      color: '#F4A6A0',
      description: 'Direct collaboration from initial space consultation to the final reveal, tailored specifically to your lifestyle.'
    },
    {
      icon: CheckCircle2,
      title: 'Professional Finishing',
      color: '#2A9D8F',
      description: 'Durable, premium-grade pigments and protective archival sealers engineered for lasting beauty and elegance.'
    }
  ];

  return (
    <section id="about" className="relative py-28 bg-[#FFFFFF] border-t border-b border-[#EADBCE] overflow-hidden">
      
      {/* Subtle organic artistic decorative spots */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E76F51]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#2A9D8F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-[#E76F51] font-bold mb-3">
              <span>The Studio Philosophy</span>
              <span className="w-8 h-[1.5px] bg-[#E76F51]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-[#252525] uppercase tracking-tight leading-tight">
              Creativity <span className="artistic-gradient-text italic font-bold">Without Limits.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-[#555555] font-normal leading-relaxed">
              {settings.aboutText ||
                'ATIKU ART is a dedicated creative art studio specializing in wall painting, artistic interior wall decoration, custom murals, and bespoke wall finishes across Nigeria. We believe that walls are not merely partitions, but living canvases that shape how people feel, live, and create.'}
            </p>
          </div>

          {/* Documentary Photo Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden p-2 bg-[#FAF7F2] border border-[#EADBCE] shadow-lg">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200">
                <img
                  src={artistPaintingImg}
                  alt="Mural artist hand-painting a wall in studio"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] uppercase tracking-wider font-semibold text-[#252525] shadow-xs">
                  Artisanal Hand-Craftsmanship
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {corePillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] hover:border-[#E76F51] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-all group-hover:scale-110 shadow-xs"
                  style={{ backgroundColor: `${pillar.color}15`, color: pillar.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="font-serif text-xl font-bold text-[#252525] group-hover:text-[#E76F51] transition-colors">
                  {pillar.title}
                </h3>

                <p className="mt-3 text-sm text-[#555555] leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}

          {/* Studio Guarantee Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="p-8 rounded-xl bg-gradient-to-br from-[#E76F51] to-[#C85438] text-white flex flex-col justify-between shadow-md"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#E9C46A] font-bold">
                Studio Standard
              </span>
              <h4 className="font-serif text-2xl font-bold mt-2 leading-snug">
                Every space is treated as an original gallery piece.
              </h4>
              <p className="mt-3 text-xs text-white/90 leading-relaxed font-light">
                Whether creating a bold focal accent wall for a private residence or an expansive mural for a boutique hospitality suite, ATIKU ART combines technical excellence with boundless creative ambition.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/20 flex items-center justify-between">
              <span className="text-[11px] tracking-wider uppercase font-serif font-bold">ATIKU ART Studio</span>
              <span className="text-[11px] text-[#E9C46A] font-mono tracking-widest font-semibold">EST. NIGERIA</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
