import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Compass, Paintbrush, Sparkles, ArrowRight } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export const Process: React.FC = () => {
  const { getWhatsAppUrl } = useStudio();

  const steps = [
    {
      number: '01',
      title: 'Consultation',
      subtitle: 'Space & Vision Assessment',
      description: 'Tell us about your space and design ideas. Share photos, dimensions, and your aesthetic inspirations.',
      icon: MessageCircle,
      color: '#E76F51'
    },
    {
      number: '02',
      title: 'Creative Planning',
      subtitle: 'Curated Design & Palette',
      description: 'We discuss your preferred artistic style and project requirements, refining color schemes and artwork placement.',
      icon: Compass,
      color: '#2A9D8F'
    },
    {
      number: '03',
      title: 'Artistic Execution',
      subtitle: 'Masterful Brushwork',
      description: 'Our creative team brings the approved design to life on your walls using premium materials and surgical precision.',
      icon: Paintbrush,
      color: '#E9C46A'
    },
    {
      number: '04',
      title: 'Final Reveal',
      subtitle: 'Transformed Environment',
      description: 'Enjoy your beautifully transformed space. Step back and celebrate a bespoke, handcrafted wall masterpiece.',
      icon: Sparkles,
      color: '#E76F51'
    }
  ];

  return (
    <section id="process" className="relative py-28 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-[#E76F51] font-bold mb-3">
            <span>Seamless Collaboration</span>
            <span className="w-8 h-[1.5px] bg-[#E76F51]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-[#252525] uppercase tracking-tight">
            Our Creative <span className="artistic-gradient-text italic font-bold">Process.</span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#555555] font-normal leading-relaxed">
            From initial sketch to the final protective seal, an elevated and transparent client experience at every stage.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-[2px] bg-gradient-to-r from-[#E76F51]/20 via-[#2A9D8F]/30 to-[#E9C46A]/20 -translate-y-8 z-0 pointer-events-none" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative z-10 p-8 rounded-2xl bg-white border border-[#EADBCE] hover:border-[#E76F51] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 shadow-xs"
                      style={{ backgroundColor: `${step.color}15`, color: step.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-serif text-3xl font-black text-[#EADBCE] group-hover:text-[#E76F51]/30 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <span className="text-[11px] uppercase tracking-[0.2em] font-bold" style={{ color: step.color }}>
                    Step {step.number}
                  </span>

                  <h3 className="font-serif text-2xl font-bold text-[#252525] mt-1 group-hover:text-[#E76F51] transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-xs text-[#777] font-medium uppercase tracking-wider">
                    {step.subtitle}
                  </p>

                  <p className="mt-4 text-xs sm:text-sm text-[#555555] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#EADBCE] flex items-center justify-between text-xs text-[#777] font-semibold">
                  <span>Phase {index + 1}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform text-[#E76F51]" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-16 text-center">
          <a
            href={getWhatsAppUrl("Hello ATIKU MAKODA ARTS, I would like to begin Step 1 (Consultation) for my wall space.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-8 py-4 rounded-sm bg-[#E76F51] hover:bg-[#C85438] text-white font-bold uppercase tracking-[0.16em] text-xs transition-all shadow-md shadow-[#E76F51]/30 hover:shadow-lg hover:shadow-[#E76F51]/40 active:scale-95"
          >
            <Paintbrush className="w-4 h-4" />
            <span>Begin Step 1: Book Consultation on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
