/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StudioProvider, useStudio } from './context/StudioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LightboxModal } from './components/LightboxModal';
import { AdminDashboard } from './components/AdminDashboard';
import { MessageSquare, PhoneCall } from 'lucide-react';

function StudioApp() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const { getWhatsAppUrl, settings } = useStudio();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#252525] font-sans selection:bg-[#E76F51]/20 selection:text-[#E76F51] relative">
      
      {/* Top Navbar */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(!isAdminOpen)}
        isAdminOpen={isAdminOpen}
      />

      {/* Main Website Sections */}
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio onOpenAdminUpload={() => setIsAdminOpen(true)} />
        <WhyChooseUs />
        <Process />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Lightbox for Project Photography */}
      <LightboxModal />

      {/* Floating WhatsApp Quick Action Button for Desktop */}
      <aside
        aria-label="Direct WhatsApp Contact"
        className="fixed bottom-6 right-6 z-30 hidden sm:block"
      >
        <a
          href={getWhatsAppUrl("Hello ATIKU MAKODA ARTS, I saw your website and I'm interested in your wall art services. I would like to discuss a project.")}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center space-x-2.5 px-5 py-3.5 rounded-full bg-[#E76F51] hover:bg-[#C85438] text-white font-bold shadow-lg shadow-[#E76F51]/35 hover:shadow-xl hover:shadow-[#E76F51]/50 active:scale-95 transition-all"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <MessageSquare className="w-4 h-4" />
          <span className="text-xs uppercase tracking-wider font-bold pr-1">
            Chat on WhatsApp
          </span>
        </a>
      </aside>

      {/* Sticky Mobile Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-white/95 backdrop-blur-md border-t border-[#EADBCE] p-3 shadow-lg flex items-center justify-between gap-3">
        <a
          href={`tel:${settings.phoneNumber || '+2348000000000'}`}
          className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2.5 rounded-lg border border-[#EADBCE] bg-[#FAF7F2] text-[#252525] text-xs font-bold uppercase tracking-wider active:scale-95 transition-all"
        >
          <PhoneCall className="w-3.5 h-3.5 text-[#2A9D8F]" />
          <span>Call Studio</span>
        </a>

        <a
          href={getWhatsAppUrl("Hello ATIKU MAKODA ARTS, I saw your website and I would like to discuss a wall art project.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2.5 rounded-lg bg-[#E76F51] text-white text-xs font-bold uppercase tracking-wider shadow-sm active:scale-95 transition-all"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* Admin Dashboard Modal / Portal */}
      {isAdminOpen && (
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <StudioProvider>
      <StudioApp />
    </StudioProvider>
  );
}
