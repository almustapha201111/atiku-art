import React from 'react';
import { MessageSquare, Instagram, Shield, ArrowUp, Sparkles } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { settings, getWhatsAppUrl, isAdmin } = useStudio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Home', href: '#' },
    { label: 'About Studio', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio Gallery', href: '#portfolio' },
    { label: 'Our Real Projects', href: '#real-projects' },
    { label: 'Why Choose Us', href: '#why-us' },
    { label: 'Our Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#FAF7F2] border-t border-[#EADBCE] pt-20 pb-12 overflow-hidden">
      
      {/* Decorative ambient color spots */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-[#E76F51]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#EADBCE]">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#E76F51] via-[#E9C46A] to-[#2A9D8F] p-[1.5px] shadow-xs">
                <div className="w-full h-full bg-white rounded-[1px] flex items-center justify-center">
                  <span className="font-serif text-lg font-bold text-[#E76F51]">A</span>
                </div>
              </div>
              <span className="font-serif text-2xl font-bold tracking-[0.18em] text-[#252525]">
                {settings.businessName || 'ATIKU ART'}
              </span>
            </div>

            <p className="font-serif italic text-base text-[#E76F51] font-semibold">
              "Transforming Spaces Through Creativity."
            </p>

            <p className="text-xs text-[#555555] max-w-sm leading-relaxed">
              Nigeria’s premier creative wall painting and interior decoration studio, crafting bespoke murals and luxury artistic transformations for discerning spaces.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-[#EADBCE] hover:border-[#E76F51] flex items-center justify-center text-[#555555] hover:text-[#E76F51] transition-all shadow-xs"
                title="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              {settings.instagram && (
                <a
                  href={`https://instagram.com/${settings.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-[#EADBCE] hover:border-[#E76F51] flex items-center justify-center text-[#555555] hover:text-[#E76F51] transition-all shadow-xs"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}

              {settings.tiktok && (
                <a
                  href={`https://tiktok.com/@${settings.tiktok.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-[#EADBCE] hover:border-[#2A9D8F] flex items-center justify-center text-[#555555] hover:text-[#2A9D8F] transition-all shadow-xs"
                  title="TikTok"
                >
                  <Sparkles className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#E76F51] font-bold block">
              Quick Navigation
            </span>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-[#555555] hover:text-[#E76F51] transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business & Booking Contacts */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#E76F51] font-bold block">
              Direct Contact & Booking
            </span>
            <p className="text-xs text-[#555555] leading-relaxed">
              Inquire about residential murals, commercial statement walls, or luxury interior finishes.
            </p>

            <a
              href={getWhatsAppUrl("Hello ATIKU ART, I would like to book a project consultation.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-sm bg-[#E76F51] hover:bg-[#C85438] text-white font-bold uppercase tracking-wider text-xs shadow-md shadow-[#E76F51]/30 hover:shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Book on WhatsApp</span>
            </a>

            <div className="pt-2 text-xs text-[#777]">
              Studio Location: <span className="text-[#252525] font-bold">{settings.location || 'Nigeria'}</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777]">
          <div className="flex items-center space-x-3">
            <span>© {new Date().getFullYear()} ATIKU ART. All rights reserved.</span>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              className="hover:text-[#E76F51] flex items-center space-x-1 transition-colors font-semibold"
            >
              <Shield className="w-3.5 h-3.5 text-[#E76F51]" />
              <span>{isAdmin ? 'Admin Console' : 'Studio Portal'}</span>
            </button>
          </div>

          {/* Mandated Credit */}
          <div className="text-xs text-[#555555] font-medium flex items-center space-x-1">
            <span>Website Designed by</span>
            <span className="text-[#E76F51] font-bold tracking-wider">AUS AI</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full border border-[#EADBCE] bg-white hover:border-[#E76F51] text-[#555555] hover:text-[#E76F51] transition-all shadow-xs"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
