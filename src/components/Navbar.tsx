import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, MessageSquare, Shield } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

interface NavbarProps {
  onOpenAdmin: () => void;
  isAdminOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, isAdminOpen }) => {
  const { settings, getWhatsAppUrl, user } = useStudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Real Projects', href: '#real-projects' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (isAdminOpen) {
      onOpenAdmin();
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav-light py-3.5 shadow-sm'
            : 'bg-[#FAF7F2]/90 backdrop-blur-sm py-4 border-b border-[#EADBCE]/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a 
              href="#" 
              onClick={(e) => {
                if (isAdminOpen) onOpenAdmin();
              }}
              className="group flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#E76F51] via-[#E9C46A] to-[#2A9D8F] p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-sm">
                <div className="w-full h-full bg-[#FAF7F2] rounded-[1px] flex items-center justify-center">
                  <span className="font-serif text-lg font-bold text-[#E76F51]">A</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.18em] text-[#252525] group-hover:text-[#E76F51] transition-colors">
                  {settings.businessName || 'ATIKU MAKODA ARTS'}
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-[#2A9D8F] font-semibold -mt-0.5">
                  Creative Wall Art Studio
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-xs uppercase tracking-[0.18em] font-medium text-[#555555] hover:text-[#E76F51] transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#E76F51] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right CTAs */}
            <div className="hidden sm:flex items-center space-x-4">
              {user ? (
                <button
                  onClick={onOpenAdmin}
                  className={`flex items-center space-x-2 text-xs uppercase tracking-wider px-3 py-1.5 rounded border transition-all ${
                    isAdminOpen
                      ? 'border-[#E76F51] bg-[#E76F51]/10 text-[#E76F51]'
                      : 'border-[#EADBCE] hover:border-[#E76F51] text-[#555555] hover:text-[#252525]'
                  }`}
                  title="Studio Portal"
                >
                  <Shield className="w-3.5 h-3.5 text-[#E76F51]" />
                  <span>{isAdminOpen ? 'Studio Live' : 'Admin'}</span>
                </button>
              ) : null}

              {/* WhatsApp Booking CTA */}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center space-x-2 px-5 py-2.5 rounded-sm text-xs uppercase font-semibold tracking-wider bg-[#E76F51] hover:bg-[#C85438] text-white transition-all duration-300 shadow-md shadow-[#E76F51]/25 hover:shadow-lg hover:shadow-[#E76F51]/35 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Book on WhatsApp</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#252525] hover:text-[#E76F51] focus:outline-none transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 pt-24 pb-8 px-6 bg-[#FAF7F2]/98 backdrop-blur-2xl flex flex-col justify-between md:hidden border-b border-[#EADBCE]"
          >
            <div className="flex flex-col space-y-5">
              <div className="border-b border-[#EADBCE] pb-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#E76F51] font-bold">
                  Studio Navigation
                </span>
              </div>
              {navLinks.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-serif text-2xl text-[#252525] hover:text-[#E76F51] transition-colors py-1 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#2A9D8F] tracking-widest font-sans font-semibold">0{idx + 1}</span>
                </a>
              ))}
            </div>

            <div className="pt-6 border-t border-[#EADBCE] flex flex-col space-y-4">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2 py-3.5 rounded bg-[#E76F51] text-white font-semibold uppercase tracking-wider text-xs shadow-md shadow-[#E76F51]/30"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Book on WhatsApp</span>
              </a>

              <div className="flex items-center justify-between pt-2 text-xs text-[#777]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="flex items-center space-x-1.5 text-[#2A9D8F] font-medium hover:underline"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Studio Portal</span>
                </button>
                <span>{settings.location || 'Nigeria'}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
