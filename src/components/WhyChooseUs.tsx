import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Eye, Compass, MessageCircleHeart, Check } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: Sparkles,
      color: '#E76F51',
      title: 'Creative & Unique Designs',
      subtitle: 'Original Artistic Conception',
      description: 'Every project begins with a bespoke creative exploration. We never replicate mass-produced templates; your wall becomes an exclusive, handcrafted work of art.'
    },
    {
      icon: ShieldCheck,
      color: '#2A9D8F',
      title: 'Quality Craftsmanship',
      subtitle: 'Uncompromising Technique',
      description: 'Using professional artist-grade pigments, binders, and durable architectural coatings, we guarantee longevity, vivid color retention, and smooth finishes.'
    },
    {
      icon: Eye,
      color: '#E9C46A',
      title: 'Intense Attention to Detail',
      subtitle: 'Microscopic Precision',
      description: 'From precision edge crispness to subtle gradient feathering, our artistic execution upholds the highest standards of luxury interior finishes.'
    },
    {
      icon: Compass,
      color: '#2A9D8F',
      title: 'Personalized Solutions',
      subtitle: 'Curated for Your Space',
      description: 'We analyze your room dimensions, natural ambient lighting, interior color palette, and lifestyle to tailor an artistic vision that harmonizes effortlessly.'
    },
    {
      icon: MessageCircleHeart,
      color: '#E76F51',
      title: 'Professional Communication',
      subtitle: 'Transparent & Reliable',
      description: 'Clear project timelines, respectful on-site conduct, and direct communication through WhatsApp ensure an enjoyable, stress-free transformation journey.'
    }
  ];

  return (
    <section id="why-us" className="relative py-28 bg-[#FFFFFF] overflow-hidden border-b border-[#EADBCE]">
      
      {/* Decorative ambient color spots */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#E76F51]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#2A9D8F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-[#E76F51] font-bold mb-3">
            <span>The ATIKU MAKODA ARTS Standard</span>
            <span className="w-8 h-[1.5px] bg-[#E76F51]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-[#252525] uppercase tracking-tight">
            Why Choose <span className="artistic-gradient-text italic font-bold">ATIKU MAKODA ARTS?</span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#555555] font-normal leading-relaxed">
            Elevating wall decoration beyond routine paint into refined, enduring statements of culture, luxury, and artistic mastery.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE] hover:border-[#E76F51] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 shadow-xs"
                      style={{ backgroundColor: `${reason.color}15`, color: reason.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold tracking-widest text-[#2A9D8F]">0{index + 1}</span>
                  </div>

                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#E76F51] font-bold">
                    {reason.subtitle}
                  </span>

                  <h3 className="font-serif text-xl font-bold text-[#252525] mt-1 group-hover:text-[#E76F51] transition-colors leading-snug">
                    {reason.title}
                  </h3>

                  <p className="mt-4 text-xs sm:text-sm text-[#555555] leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#EADBCE] flex items-center space-x-2 text-xs text-[#2A9D8F] font-semibold">
                  <Check className="w-4 h-4 text-[#2A9D8F]" />
                  <span>Guaranteed Studio Commitment</span>
                </div>
              </motion.div>
            );
          })}

          {/* Studio Quality Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-[#2A9D8F] to-[#1E7B70] text-white flex flex-col justify-between shadow-md"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#E9C46A] font-bold">
                Studio Quality Pledge
              </span>
              <h3 className="font-serif text-2xl font-bold mt-2 leading-snug">
                Art That Resonates With Warmth & Distinction.
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-white/90 leading-relaxed font-light">
                We believe that every stroke tells a story. From modern geometric abstractions to expressive botanical murals, ATIKU MAKODA ARTS brings vibrant soul to contemporary interior architecture.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20 flex items-center justify-between">
              <span className="font-serif text-xs font-bold tracking-widest uppercase">ATIKU MAKODA ARTS Studio</span>
              <span className="text-[10px] text-[#E9C46A] font-mono tracking-widest font-semibold">NIGERIA</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
