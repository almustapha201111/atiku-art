import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquare, 
  Phone, 
  Instagram, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Download,
  FileArchive,
  Loader2
} from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import { downloadProjectZip } from '../lib/projectZipDownloader';

export const Contact: React.FC = () => {
  const { settings, services, submitInquiry, getWhatsAppUrl } = useStudio();

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    serviceRequired: 'Custom Wall Murals',
    projectDescription: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ZIP Download State (with one-time action & auto-hide upon success)
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const [zipProgress, setZipProgress] = useState<string | null>(null);
  const [hasDownloadedZip, setHasDownloadedZip] = useState(false);

  const handleDownloadZip = async () => {
    // Prevent accidental double-clicks or repeated executions
    if (isDownloadingZip || hasDownloadedZip) return;

    try {
      setIsDownloadingZip(true);
      await downloadProjectZip((status) => setZipProgress(status));
      // Hide immediately once download completes successfully
      setHasDownloadedZip(true);
    } catch (err) {
      console.error('Failed to download project zip:', err);
      alert('Could not generate the project ZIP file. Please try again.');
    } finally {
      setIsDownloadingZip(false);
      setZipProgress(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phoneNumber.trim() || !formData.projectDescription.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await submitInquiry({
        fullName: formData.fullName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        serviceRequired: formData.serviceRequired,
        projectDescription: formData.projectDescription.trim()
      });

      setIsSuccess(true);
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage('Could not record your inquiry to the database right now. Please use the direct WhatsApp button below.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildWhatsAppInquiryUrl = () => {
    const text = `Hello ATIKU ART,\n\nMy Name: ${formData.fullName || 'Prospective Client'}\nPhone: ${formData.phoneNumber || 'N/A'}\nService Required: ${formData.serviceRequired}\nProject Details: ${formData.projectDescription || 'I would like to discuss a wall art project.'}`;
    return getWhatsAppUrl(text);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#FFFFFF] border-t border-[#EADBCE] overflow-hidden">
      
      {/* Decorative ambient color spots */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#E76F51]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#2A9D8F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 text-[11px] uppercase tracking-[0.25em] text-[#E76F51] font-bold mb-3">
            <span>Direct Studio Dialogue</span>
            <span className="w-8 h-[1.5px] bg-[#E76F51]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-[#252525] uppercase tracking-tight">
            Connect With <span className="artistic-gradient-text italic font-bold">ATIKU ART.</span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#555555] font-normal leading-relaxed">
            Ready to commission a vibrant wall masterpiece? Send us your space details, download the complete project files, or chat directly on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Business Info, Direct Contacts & Download Project ZIP Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              
              {/* Studio Overview Card */}
              <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE] shadow-sm">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#E76F51] font-bold">
                  Creative Studio
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#252525] mt-1">
                  {settings.businessName || 'ATIKU ART'}
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {settings.tagline || 'Creative Wall Art & Interior Design Studio'}
                </p>

                {/* Direct WhatsApp Callout */}
                <div className="mt-6 pt-6 border-t border-[#EADBCE]">
                  <a
                    href={getWhatsAppUrl("Hello ATIKU ART, I saw your website and I'm interested in your wall art services. I would like to discuss a project.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-2.5 py-4 rounded-sm bg-[#E76F51] hover:bg-[#C85438] text-white font-bold uppercase tracking-wider text-xs shadow-md shadow-[#E76F51]/30 hover:shadow-lg active:scale-95 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp Directly</span>
                  </a>
                </div>
              </div>

              {/* DEDICATED "DOWNLOAD PROJECT ZIP" CARD */}
              <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#FAF7F2] via-white to-[#FAF7F2] border-2 border-[#2A9D8F] shadow-md space-y-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#2A9D8F] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <FileArchive className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#E76F51] font-bold block">
                      Source Package & Assets
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#252525]">
                      Download Project ZIP
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-[#555555] leading-relaxed">
                  Download the complete ATIKU ART website codebase, high-resolution interior artwork assets, documentation, and configuration files bundled as a ZIP file.
                </p>

                {/* Button disappears immediately upon successful download */}
                {!hasDownloadedZip ? (
                  <button
                    type="button"
                    onClick={handleDownloadZip}
                    disabled={isDownloadingZip}
                    className="w-full inline-flex items-center justify-center space-x-2.5 py-4 rounded-lg bg-[#2A9D8F] hover:bg-[#1E7B70] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#2A9D8F]/25 hover:shadow-lg active:scale-95 disabled:opacity-75 cursor-pointer"
                  >
                    {isDownloadingZip ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{zipProgress || 'Packaging Project ZIP...'}</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download Project ZIP File</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex items-center space-x-2.5 text-xs text-[#2A9D8F] font-semibold bg-[#2A9D8F]/10 px-4 py-3 rounded-lg border border-[#2A9D8F]/20">
                    <CheckCircle2 className="w-4 h-4 text-[#2A9D8F] shrink-0" />
                    <span>Project ZIP archive downloaded successfully.</span>
                  </div>
                )}
              </div>

              {/* Contact Channels List */}
              <div className="space-y-4">
                
                {/* Location */}
                <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] flex items-center space-x-4 shadow-xs">
                  <div className="w-10 h-10 rounded-lg bg-[#2A9D8F]/15 text-[#2A9D8F] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#777] font-semibold block">Studio Location</span>
                    <span className="text-sm font-bold text-[#252525]">
                      {settings.location || 'Nigeria'}
                    </span>
                  </div>
                </div>

                {/* Phone */}
                {settings.phoneNumber && (
                  <div className="p-5 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] flex items-center space-x-4 shadow-xs">
                    <div className="w-10 h-10 rounded-lg bg-[#E76F51]/15 text-[#E76F51] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#777] font-semibold block">Direct Telephone</span>
                      <a href={`tel:${settings.phoneNumber}`} className="text-sm font-bold text-[#252525] hover:text-[#E76F51] transition-colors">
                        {settings.phoneNumber}
                      </a>
                    </div>
                  </div>
                )}

                {/* Social Media Links */}
                <div className="grid grid-cols-2 gap-4">
                  {settings.instagram && (
                    <a
                      href={`https://instagram.com/${settings.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] hover:border-[#E76F51] flex items-center space-x-3 transition-colors group shadow-xs"
                    >
                      <Instagram className="w-4 h-4 text-[#E76F51]" />
                      <div className="overflow-hidden">
                        <span className="text-[9px] uppercase tracking-wider text-[#777] block font-semibold">Instagram</span>
                        <span className="text-xs text-[#252525] group-hover:text-[#E76F51] font-bold truncate block">
                          {settings.instagram}
                        </span>
                      </div>
                    </a>
                  )}

                  {settings.tiktok && (
                    <a
                      href={`https://tiktok.com/@${settings.tiktok.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] hover:border-[#2A9D8F] flex items-center space-x-3 transition-colors group shadow-xs"
                    >
                      <Sparkles className="w-4 h-4 text-[#2A9D8F]" />
                      <div className="overflow-hidden">
                        <span className="text-[9px] uppercase tracking-wider text-[#777] block font-semibold">TikTok</span>
                        <span className="text-xs text-[#252525] group-hover:text-[#2A9D8F] font-bold truncate block">
                          {settings.tiktok}
                        </span>
                      </div>
                    </a>
                  )}
                </div>

              </div>

            </div>

            {/* Quick response note */}
            <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EADBCE] flex items-center space-x-3 text-xs text-[#555555]">
              <Clock className="w-4 h-4 text-[#E76F51] shrink-0" />
              <span>Prompt response guaranteed within business hours for all inquiries.</span>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form & Project ZIP Download Option */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE] shadow-sm relative">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#E76F51] font-bold">
                Project Commission Inquiry
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#252525] mt-1 mb-6">
                Tell Us About Your Space
              </h3>

              {isSuccess ? (
                <div className="p-8 rounded-xl bg-white border border-[#2A9D8F] text-center space-y-4 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-[#2A9D8F]/15 text-[#2A9D8F] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-[#252525]">
                    Inquiry Received!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#555555] max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.fullName}. Your project inquiry has been securely submitted to ATIKU ART.
                  </p>
                  
                  {/* Actions: WhatsApp Forward + Download Project ZIP */}
                  <div className="pt-4 mt-4 border-t border-[#EADBCE] flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={buildWhatsAppInquiryUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 rounded bg-[#E76F51] hover:bg-[#C85438] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#E76F51]/30 transition-all"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Forward Brief to WhatsApp</span>
                    </a>

                    {!hasDownloadedZip && (
                      <button
                        type="button"
                        onClick={handleDownloadZip}
                        disabled={isDownloadingZip}
                        className="inline-flex items-center space-x-2 px-6 py-3 rounded border border-[#2A9D8F] bg-[#2A9D8F] hover:bg-[#1E7B70] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer disabled:opacity-75"
                      >
                        {isDownloadingZip ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Preparing ZIP...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span>Download Project ZIP</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        fullName: '',
                        phoneNumber: '',
                        serviceRequired: 'Custom Wall Murals',
                        projectDescription: ''
                      });
                    }}
                    className="block mx-auto text-xs text-[#777] hover:text-[#E76F51] pt-2 underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800">
                      {errorMessage}
                    </div>
                  )}

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#555555] mb-2 font-bold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      placeholder="e.g. Al-Mustapha Abubakar"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-[#EADBCE] focus:border-[#E76F51] focus:outline-none text-[#252525] text-sm shadow-xs transition-colors"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#555555] mb-2 font-bold">
                      Phone Number (or WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={30}
                      placeholder="e.g. +234 800 000 0000"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-[#EADBCE] focus:border-[#E76F51] focus:outline-none text-[#252525] text-sm shadow-xs transition-colors"
                    />
                  </div>

                  {/* Service Required */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#555555] mb-2 font-bold">
                      Service Required *
                    </label>
                    <select
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-[#EADBCE] focus:border-[#E76F51] focus:outline-none text-[#252525] text-sm shadow-xs transition-colors cursor-pointer"
                    >
                      {services.length > 0 ? (
                        services.map((s) => (
                          <option key={s.id || s.title} value={s.title}>
                            {s.title}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value="Custom Wall Murals">Custom Wall Murals</option>
                          <option value="Wall Art & Painting">Wall Art & Painting</option>
                          <option value="Interior Wall Decoration">Interior Wall Decoration</option>
                          <option value="Artistic Room Designs">Artistic Room Designs</option>
                          <option value="Commercial & Restaurant Murals">Commercial & Restaurant Murals</option>
                          <option value="Geometric & African-Inspired Art">Geometric & African-Inspired Art</option>
                        </>
                      )}
                    </select>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#555555] mb-2 font-bold">
                      Project Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      maxLength={2000}
                      placeholder="Describe your wall dimensions, preferred artistic theme, room type (living room, office, master bedroom, etc.), or specific aesthetic goals..."
                      value={formData.projectDescription}
                      onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-[#EADBCE] focus:border-[#E76F51] focus:outline-none text-[#252525] text-sm shadow-xs transition-colors resize-y"
                    />
                    <div className="flex justify-end text-[10px] text-[#888] mt-1">
                      {formData.projectDescription.length}/2000 characters
                    </div>
                  </div>

                  {/* Action Buttons: Submit, WhatsApp & One-time Download Project ZIP */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 inline-flex items-center justify-center space-x-2 py-4 rounded-sm bg-[#E76F51] hover:bg-[#C85438] text-white font-bold uppercase tracking-wider text-xs shadow-md shadow-[#E76F51]/30 hover:shadow-lg active:scale-95 transition-all disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                    </button>

                    <a
                      href={buildWhatsAppInquiryUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 px-5 py-4 rounded-sm border-2 border-[#252525] text-[#252525] hover:bg-[#252525] hover:text-white font-bold uppercase tracking-wider text-xs transition-all whitespace-nowrap active:scale-95"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Disappears immediately after successful download */}
                    {!hasDownloadedZip && (
                      <button
                        type="button"
                        onClick={handleDownloadZip}
                        disabled={isDownloadingZip}
                        className="inline-flex items-center justify-center space-x-2 px-5 py-4 rounded-sm border-2 border-[#2A9D8F] bg-white text-[#2A9D8F] hover:bg-[#2A9D8F] hover:text-white font-bold uppercase tracking-wider text-xs transition-all whitespace-nowrap active:scale-95 shadow-xs disabled:opacity-75 cursor-pointer"
                        title="Download complete project files as a ZIP archive"
                      >
                        {isDownloadingZip ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Packaging ZIP...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span>Download Project ZIP</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
