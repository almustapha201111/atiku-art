import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, ArrowUpRight, Palette } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

export const Services: React.FC = () => {
  const { services, getWhatsAppUrl } = useStudio();

  // Filter confirmed services only
  const confirmedServices = services.filter(s => s.isConfirmed !== false);

  return (
    <section id="services" className="relative py-28 bg-[#FAF7F2] overflow-hidden">
      
      {/* Decorative ambient gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#2A9D8F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#E9C46A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#EADBCE]">
          <div>
            <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-[#E76F51] font-bold mb-3">
              <span>Confirmed Offerings</span>
              <span className="w-8 h-[1.5px] bg-[#E76F51]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#252525] uppercase tracking-tight">
              Our Creative <span className="artistic-gradient-text italic font-bold">Services.</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-[#555555] max-w-md font-normal leading-relaxed">
            Bespoke artistic wall solutions crafted to reflect individuality, warmth, and architectural harmony in residences and boutique spaces.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {confirmedServices.map((service, index) => {
            const quoteMessage = `Hello ATIKU ART, I saw your website and I would like to request a quote for your "${service.title}" service.`;

            return (
              <motion.div
                key={service.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                className="group flex flex-col justify-between rounded-2xl bg-white border border-[#EADBCE] hover:border-[#E76F51] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
              >
                <div>
                  {/* Image Container with high-res art */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-[#EADBCE]">
                    {service.imageUrl ? (
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FAF7F2] via-white to-[#F4A6A0]/10">
                        <Palette className="w-8 h-8 text-[#E76F51] mb-2" />
                        <span className="text-xs uppercase tracking-wider text-[#E76F51] font-semibold">
                          ATIKU ART Studio
                        </span>
                        <span className="text-xs text-[#777] mt-1 font-serif">
                          {service.title}
                        </span>
                      </div>
                    )}

                    {/* Category tag */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] uppercase tracking-wider font-semibold text-[#2A9D8F] shadow-xs">
                      {service.category || 'Specialized Service'}
                    </div>

                    <div className="absolute top-3 right-3 text-[#E76F51] font-mono text-xs font-bold px-2 py-0.5 rounded-full bg-white/90 shadow-xs">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-[#252525] group-hover:text-[#E76F51] transition-colors leading-snug">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-[#555555] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Footer / Quote CTA */}
                <div className="p-6 pt-0 mt-auto">
                  <a
                    href={getWhatsAppUrl(quoteMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-between px-4 py-3 rounded-lg border border-[#E76F51] bg-[#FAF7F2] hover:bg-[#E76F51] text-[#E76F51] hover:text-white transition-all duration-300 text-xs uppercase tracking-wider font-bold group/btn shadow-xs"
                  >
                    <span className="flex items-center space-x-2">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Request Quote on WhatsApp</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Custom Project Note */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-white via-[#FAF7F2] to-white border border-[#EADBCE] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#252525]">
              Have a distinct custom concept in mind?
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-[#555555]">
              We collaborate on private residential commissions, commercial statement walls, and bespoke interior installations across Nigeria.
            </p>
          </div>
          <a
            href={getWhatsAppUrl("Hello ATIKU ART, I have a custom wall art idea and would like to discuss it directly.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-sm bg-[#E76F51] hover:bg-[#C85438] text-white font-bold uppercase tracking-wider text-xs transition-all shadow-md shadow-[#E76F51]/30 whitespace-nowrap active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discuss Custom Project</span>
          </a>
        </div>

      </div>
    </section>
  );
};
