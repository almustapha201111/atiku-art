import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Upload, 
  Trash2, 
  Edit3, 
  Plus, 
  Save, 
  LogOut, 
  Lock, 
  Check, 
  ExternalLink, 
  MessageSquare, 
  Phone, 
  MapPin, 
  Eye, 
  EyeOff, 
  Image as ImageIcon,
  SlidersHorizontal,
  Home,
  Briefcase,
  Layers,
  Inbox,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useStudio } from '../context/StudioContext';
import { ProjectCategory, ProjectItem, ServiceItem } from '../types';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { 
    settings, 
    updateSettings, 
    services, 
    addService, 
    updateService, 
    deleteService, 
    projects, 
    addProject, 
    updateProject, 
    deleteProject, 
    inquiries, 
    updateInquiryStatus, 
    deleteInquiry,
    user, 
    isAdmin, 
    loginWithGoogle, 
    logout,
    uploadImage,
    getWhatsAppUrl
  } = useStudio();

  const [activeTab, setActiveTab] = useState<'projects' | 'services' | 'settings' | 'inquiries'>('projects');
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Settings State
  const [settingsForm, setSettingsForm] = useState({
    businessName: settings.businessName || 'ATIKU ART',
    tagline: settings.tagline || '',
    whatsappNumber: settings.whatsappNumber || '',
    phoneNumber: settings.phoneNumber || '',
    instagram: settings.instagram || '',
    tiktok: settings.tiktok || '',
    location: settings.location || '',
    aboutText: settings.aboutText || '',
    heroTitle: settings.heroTitle || '',
    heroSubtitle: settings.heroSubtitle || '',
    heroImageUrl: settings.heroImageUrl || ''
  });

  // Project Upload / Edit State
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<{
    title: string;
    category: ProjectCategory;
    description: string;
    imageUrl: string;
    beforeImageUrl: string;
    afterImageUrl: string;
    hasBeforeAfter: boolean;
    isPublished: boolean;
    isHeroFeatured: boolean;
  }>({
    title: '',
    category: 'Wall Art',
    description: '',
    imageUrl: '',
    beforeImageUrl: '',
    afterImageUrl: '',
    hasBeforeAfter: false,
    isPublished: true,
    isHeroFeatured: false
  });

  // Service Edit State
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [serviceForm, setServiceForm] = useState<{
    title: string;
    category: string;
    description: string;
    imageUrl: string;
    isConfirmed: boolean;
  }>({
    title: '',
    category: 'Wall Art',
    description: '',
    imageUrl: '',
    isConfirmed: true
  });

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Handle File Upload from device
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'before' | 'after' | 'hero' | 'service') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsSaving(true);
      const url = await uploadImage(file);
      if (field === 'image') {
        setProjectForm(prev => ({ ...prev, imageUrl: url }));
      } else if (field === 'before') {
        setProjectForm(prev => ({ ...prev, beforeImageUrl: url, hasBeforeAfter: true }));
      } else if (field === 'after') {
        setProjectForm(prev => ({ ...prev, afterImageUrl: url, hasBeforeAfter: true }));
      } else if (field === 'hero') {
        setSettingsForm(prev => ({ ...prev, heroImageUrl: url }));
      } else if (field === 'service') {
        setServiceForm(prev => ({ ...prev, imageUrl: url }));
      }
      showNotification('Photograph uploaded successfully!');
    } catch (err) {
      console.error('Upload failed:', err);
      showNotification('Failed to upload image. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings(settingsForm);
      showNotification('Studio settings updated successfully.');
    } catch (err) {
      console.error('Settings save error:', err);
      showNotification('Error updating settings.');
    } finally {
      setIsSaving(false);
    }
  };

  // Save Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim()) {
      showNotification('Please enter a project title.');
      return;
    }
    setIsSaving(true);
    try {
      if (editingProject) {
        await updateProject(editingProject.id, projectForm);
        showNotification('Project updated successfully.');
      } else {
        await addProject({
          ...projectForm,
          order: projects.length + 1
        });
        showNotification('New project added to portfolio.');
      }
      setIsAddingProject(false);
      setEditingProject(null);
      setProjectForm({
        title: '',
        category: 'Wall Art',
        description: '',
        imageUrl: '',
        beforeImageUrl: '',
        afterImageUrl: '',
        hasBeforeAfter: false,
        isPublished: true,
        isHeroFeatured: false
      });
    } catch (err) {
      console.error('Project save error:', err);
      showNotification('Error saving project.');
    } finally {
      setIsSaving(false);
    }
  };

  // Save Service
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title.trim()) {
      showNotification('Please enter a service title.');
      return;
    }
    setIsSaving(true);
    try {
      if (editingService) {
        await updateService(editingService.id, serviceForm);
        showNotification('Service updated successfully.');
      } else {
        await addService({
          ...serviceForm,
          order: services.length + 1
        });
        showNotification('Service created.');
      }
      setIsAddingService(false);
      setEditingService(null);
    } catch (err) {
      console.error('Service save error:', err);
      showNotification('Error saving service.');
    } finally {
      setIsSaving(false);
    }
  };

  // If Not Authenticated or Not Admin: Show Gate
  if (!user || !isAdmin) {
    return (
      <div className="fixed inset-0 z-50 bg-[#111111]/98 backdrop-blur-2xl flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-sm bg-[#161616] border border-[#D4AF37]/40 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full border border-[#D4AF37]/50 bg-[#1c1c1c] flex items-center justify-center text-[#D4AF37] mx-auto gold-glow">
            <Shield className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              ATIKU ART Studio Portal
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E8] mt-1">
              Administrator Login
            </h2>
            <p className="text-xs text-[#C8C1B4] mt-2 leading-relaxed">
              Sign in with your verified administrative Google account to manage studio artwork, services, WhatsApp configurations, and client inquiries.
            </p>
          </div>

          {user && !isAdmin && (
            <div className="p-3 rounded bg-red-950/60 border border-red-800 text-xs text-red-200 flex items-start space-x-2 text-left">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <span>Signed in as <strong>{user.email}</strong>, but this account is not registered as an administrator.</span>
            </div>
          )}

          <div className="space-y-3 pt-2">
            {!user ? (
              <button
                onClick={loginWithGoogle}
                className="w-full flex items-center justify-center space-x-2 py-3.5 rounded bg-gradient-to-r from-[#D4AF37] to-[#B89228] text-black font-semibold uppercase tracking-wider text-xs shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 active:scale-95 transition-all"
              >
                <Lock className="w-4 h-4 fill-black" />
                <span>Sign in with Google</span>
              </button>
            ) : (
              <button
                onClick={logout}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded border border-red-800/80 text-red-300 hover:bg-red-950/40 text-xs uppercase tracking-wider transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out ({user.email})</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full py-2.5 text-xs text-[#888] hover:text-[#D4AF37] transition-colors"
            >
              Return to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="fixed inset-0 z-50 bg-[#0d0d0d] text-[#F5F0E8] flex flex-col overflow-hidden">
      
      {/* Top Admin Bar */}
      <header className="h-16 border-b border-[#262626] bg-[#141414] px-4 sm:px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-sm border border-[#D4AF37] bg-black flex items-center justify-center text-[#D4AF37] font-serif font-bold text-sm">
              A
            </div>
            <div>
              <span className="font-serif text-sm sm:text-base font-bold tracking-wider text-[#F5F0E8] block">
                ATIKU ART Studio Console
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] block -mt-0.5">
                Admin: {user.email}
              </span>
            </div>
          </div>
        </div>

        {/* Global Notifications */}
        {notification && (
          <div className="hidden sm:inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#D4AF37]/15 border border-[#D4AF37] text-[#D4AF37] text-xs">
            <Check className="w-3.5 h-3.5" />
            <span>{notification}</span>
          </div>
        )}

        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded border border-[#333] hover:border-[#D4AF37] text-xs text-[#C8C1B4] hover:text-[#F5F0E8] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>View Website</span>
          </button>

          <button
            onClick={logout}
            className="p-2 rounded border border-[#333] hover:border-red-700 text-[#888] hover:text-red-400 transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar Navigation */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar Tabs */}
        <aside className="w-20 sm:w-64 border-r border-[#262626] bg-[#111111] p-3 sm:p-4 flex flex-col justify-between shrink-0">
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded text-xs uppercase tracking-wider font-semibold transition-all ${
                activeTab === 'projects'
                  ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'text-[#C8C1B4] hover:bg-[#1a1a1a] hover:text-[#F5F0E8]'
              }`}
            >
              <Upload className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Portfolio & Images</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded text-xs uppercase tracking-wider font-semibold transition-all ${
                activeTab === 'services'
                  ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'text-[#C8C1B4] hover:bg-[#1a1a1a] hover:text-[#F5F0E8]'
              }`}
            >
              <Briefcase className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Services Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded text-xs uppercase tracking-wider font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'text-[#C8C1B4] hover:bg-[#1a1a1a] hover:text-[#F5F0E8]'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Business & WhatsApp</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded text-xs uppercase tracking-wider font-semibold transition-all relative ${
                activeTab === 'inquiries'
                  ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'text-[#C8C1B4] hover:bg-[#1a1a1a] hover:text-[#F5F0E8]'
              }`}
            >
              <Inbox className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">Client Inquiries</span>
              {inquiries.filter(i => i.status === 'new').length > 0 && (
                <span className="absolute top-2 right-2 sm:relative sm:top-auto sm:right-auto sm:ml-auto w-5 h-5 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {inquiries.filter(i => i.status === 'new').length}
                </span>
              )}
            </button>
          </nav>

          <div className="hidden sm:block p-3 rounded bg-[#161616] border border-[#222] text-[11px] text-[#888]">
            <span className="text-[#D4AF37] font-semibold block mb-1">Image Upload Rule</span>
            Only upload authentic ATIKU ART project photographs.
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#0d0d0d]">
          
          {/* TAB 1: PROJECTS & IMAGE UPLOADS */}
          {activeTab === 'projects' && (
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222]">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E8]">
                    Portfolio Projects & Real Photograph Uploads
                  </h2>
                  <p className="text-xs text-[#C8C1B4] mt-1">
                    Upload real project photographs from your device, manage before/after comparisons, and toggle public visibility.
                  </p>
                </div>

                {!isAddingProject && !editingProject && (
                  <button
                    onClick={() => {
                      setIsAddingProject(true);
                      setEditingProject(null);
                      setProjectForm({
                        title: '',
                        category: 'Wall Art',
                        description: '',
                        imageUrl: '',
                        beforeImageUrl: '',
                        afterImageUrl: '',
                        hasBeforeAfter: false,
                        isPublished: true,
                        isHeroFeatured: false
                      });
                    }}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-[#D4AF37]/20"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload New Project Photo</span>
                  </button>
                )}
              </div>

              {/* Add / Edit Project Form */}
              {(isAddingProject || editingProject) && (
                <div className="p-6 sm:p-8 rounded-sm bg-[#161616] border border-[#D4AF37]/40 shadow-xl space-y-6">
                  <div className="flex items-center justify-between border-b border-[#2a2a2a] pb-4">
                    <h3 className="font-serif text-xl font-bold text-[#F5F0E8]">
                      {editingProject ? 'Edit Project Details' : 'Upload Real ATIKU ART Photograph'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingProject(false);
                        setEditingProject(null);
                      }}
                      className="text-xs text-[#888] hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleSaveProject} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Project Title */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#C8C1B4] mb-2 font-medium">
                          Project Title *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={150}
                          placeholder="e.g. Geometric Gold Leaf Mural — Victoria Island"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                          className="w-full px-4 py-3 rounded-xs bg-[#111] border border-[#333] focus:border-[#D4AF37] focus:outline-none text-sm text-[#F5F0E8]"
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#C8C1B4] mb-2 font-medium">
                          Category *
                        </label>
                        <select
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as ProjectCategory })}
                          className="w-full px-4 py-3 rounded-xs bg-[#111] border border-[#333] focus:border-[#D4AF37] focus:outline-none text-sm text-[#F5F0E8]"
                        >
                          <option value="Wall Murals">Wall Murals</option>
                          <option value="Interior Art">Interior Art</option>
                          <option value="Decorative Painting">Decorative Painting</option>
                          <option value="Creative Concepts">Creative Concepts</option>
                          <option value="Wall Art">Wall Art</option>
                          <option value="Murals">Murals</option>
                          <option value="Interior Decoration">Interior Decoration</option>
                          <option value="Custom Artwork">Custom Artwork</option>
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#C8C1B4] mb-2 font-medium">
                        Description & Space Details
                      </label>
                      <textarea
                        rows={3}
                        maxLength={1000}
                        placeholder="Describe the wall dimensions, technique, room type, color scheme, or client brief..."
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xs bg-[#111] border border-[#333] focus:border-[#D4AF37] focus:outline-none text-sm text-[#F5F0E8]"
                      />
                    </div>

                    {/* Image Upload Area */}
                    <div className="p-5 rounded bg-[#121212] border border-[#2a2a2a] space-y-4">
                      <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block">
                        Main Project Photograph (From Device)
                      </span>

                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        {projectForm.imageUrl ? (
                          <div className="relative w-36 h-28 rounded overflow-hidden border border-[#D4AF37] shrink-0">
                            <img src={projectForm.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-36 h-28 rounded border border-dashed border-[#444] bg-[#181818] flex flex-col items-center justify-center text-xs text-[#888] shrink-0">
                            <ImageIcon className="w-6 h-6 mb-1 text-[#666]" />
                            <span>No photo selected</span>
                          </div>
                        )}

                        <div className="flex-1 w-full space-y-2">
                          <label className="inline-flex items-center space-x-2 px-4 py-2.5 rounded border border-[#D4AF37]/50 bg-[#D4AF37]/15 text-[#D4AF37] text-xs uppercase tracking-wider font-semibold cursor-pointer hover:bg-[#D4AF37] hover:text-black transition-all">
                            <Upload className="w-4 h-4" />
                            <span>Select Image from Device</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageFileChange(e, 'image')}
                              className="hidden"
                            />
                          </label>
                          <p className="text-[11px] text-[#888]">
                            Upload actual project photos taken on site. Preserves high quality.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Before & After Toggle */}
                    <div className="p-5 rounded bg-[#121212] border border-[#2a2a2a] space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-[#F5F0E8] font-semibold block">
                            Before & After Comparison
                          </span>
                          <span className="text-[11px] text-[#888]">
                            Add separate before and after photographs to enable interactive client slider
                          </span>
                        </div>
                        <input
                          type="checkbox"
                          checked={projectForm.hasBeforeAfter}
                          onChange={(e) => setProjectForm({ ...projectForm, hasBeforeAfter: e.target.checked })}
                          className="w-4 h-4 accent-[#D4AF37]"
                        />
                      </div>

                      {projectForm.hasBeforeAfter && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div className="p-4 rounded bg-[#181818] border border-[#333] space-y-2">
                            <span className="text-[10px] uppercase tracking-wider text-[#888] block">Before Photo</span>
                            {projectForm.beforeImageUrl && (
                              <img src={projectForm.beforeImageUrl} alt="Before" className="w-full h-24 object-cover rounded mb-2" />
                            )}
                            <label className="w-full inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded border border-[#444] text-xs text-[#C8C1B4] hover:border-[#D4AF37] cursor-pointer">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload Before Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageFileChange(e, 'before')}
                                className="hidden"
                              />
                            </label>
                          </div>

                          <div className="p-4 rounded bg-[#181818] border border-[#333] space-y-2">
                            <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] block">After Photo</span>
                            {projectForm.afterImageUrl && (
                              <img src={projectForm.afterImageUrl} alt="After" className="w-full h-24 object-cover rounded mb-2" />
                            )}
                            <label className="w-full inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded border border-[#444] text-xs text-[#C8C1B4] hover:border-[#D4AF37] cursor-pointer">
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload After Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageFileChange(e, 'after')}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Flags: Published & Featured in Hero */}
                    <div className="flex flex-wrap items-center gap-6 pt-2">
                      <label className="flex items-center space-x-2 text-xs text-[#F5F0E8] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={projectForm.isPublished}
                          onChange={(e) => setProjectForm({ ...projectForm, isPublished: e.target.checked })}
                          className="w-4 h-4 accent-[#D4AF37]"
                        />
                        <span>Publish to Public Portfolio</span>
                      </label>

                      <label className="flex items-center space-x-2 text-xs text-[#F5F0E8] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={projectForm.isHeroFeatured}
                          onChange={(e) => setProjectForm({ ...projectForm, isHeroFeatured: e.target.checked })}
                          className="w-4 h-4 accent-[#D4AF37]"
                        />
                        <span>Feature as Homepage Hero Background</span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 flex items-center space-x-4">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-3 rounded bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 disabled:opacity-50"
                      >
                        {isSaving ? 'Saving...' : editingProject ? 'Update Project' : 'Publish Project'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingProject(false);
                          setEditingProject(null);
                        }}
                        className="px-4 py-3 text-xs text-[#888] hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Existing Projects List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#888] uppercase tracking-wider">
                  <span>Uploaded Projects ({projects.length})</span>
                  <span>Manage & Reorder</span>
                </div>

                {projects.length === 0 ? (
                  <div className="p-12 text-center rounded bg-[#141414] border border-[#222] space-y-3">
                    <ImageIcon className="w-10 h-10 text-[#444] mx-auto" />
                    <h4 className="font-serif text-lg text-[#F5F0E8]">No Real Photos Uploaded Yet</h4>
                    <p className="text-xs text-[#888] max-w-md mx-auto">
                      Click the button above to upload authentic photographs from your recent wall art, mural, or interior decoration projects.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="p-4 rounded-sm bg-[#161616] border border-[#262626] flex flex-col justify-between space-y-4"
                      >
                        <div>
                          <div className="relative aspect-[16/10] bg-black rounded overflow-hidden mb-3">
                            {project.imageUrl ? (
                              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-[#666]">
                                No image
                              </div>
                            )}
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[9px] uppercase tracking-wider text-[#D4AF37]">
                              {project.category}
                            </div>
                            <div className="absolute top-2 right-2">
                              {project.isPublished ? (
                                <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500 text-[9px] text-emerald-300">
                                  Published
                                </span>
                              ) : (
                                <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-[9px] text-zinc-400">
                                  Draft
                                </span>
                              )}
                            </div>
                          </div>

                          <h4 className="font-serif text-base font-bold text-[#F5F0E8] line-clamp-1">
                            {project.title}
                          </h4>
                          <p className="text-xs text-[#888] line-clamp-2 mt-1">
                            {project.description || 'No description provided.'}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#222] flex items-center justify-between">
                          <button
                            onClick={() => {
                              updateProject(project.id, { isPublished: !project.isPublished });
                              showNotification(`Project ${project.isPublished ? 'hidden' : 'published'}.`);
                            }}
                            className="text-xs text-[#888] hover:text-[#D4AF37] flex items-center space-x-1"
                            title="Toggle Visibility"
                          >
                            {project.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                            <span>{project.isPublished ? 'Visible' : 'Hidden'}</span>
                          </button>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                setEditingProject(project);
                                setProjectForm({
                                  title: project.title,
                                  category: project.category,
                                  description: project.description || '',
                                  imageUrl: project.imageUrl || '',
                                  beforeImageUrl: project.beforeImageUrl || '',
                                  afterImageUrl: project.afterImageUrl || '',
                                  hasBeforeAfter: project.hasBeforeAfter || false,
                                  isPublished: project.isPublished,
                                  isHeroFeatured: project.isHeroFeatured || false
                                });
                                setIsAddingProject(false);
                              }}
                              className="p-1.5 rounded hover:bg-[#222] text-[#C8C1B4] hover:text-[#D4AF37]"
                              title="Edit project"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Delete "${project.title}" permanently?`)) {
                                  deleteProject(project.id);
                                  showNotification('Project deleted.');
                                }
                              }}
                              className="p-1.5 rounded hover:bg-red-950/40 text-[#888] hover:text-red-400"
                              title="Delete project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES MANAGER */}
          {activeTab === 'services' && (
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222]">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E8]">
                    Services Manager
                  </h2>
                  <p className="text-xs text-[#C8C1B4] mt-1">
                    Manage the 6 confirmed wall art services, edit descriptions, upload service photos, or add custom offerings.
                  </p>
                </div>

                {!isAddingService && !editingService && (
                  <button
                    onClick={() => {
                      setIsAddingService(true);
                      setEditingService(null);
                      setServiceForm({
                        title: '',
                        category: 'Wall Art',
                        description: '',
                        imageUrl: '',
                        isConfirmed: true
                      });
                    }}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Service</span>
                  </button>
                )}
              </div>

              {/* Service Form */}
              {(isAddingService || editingService) && (
                <div className="p-6 sm:p-8 rounded-sm bg-[#161616] border border-[#D4AF37]/40 shadow-xl space-y-6">
                  <div className="flex items-center justify-between border-b border-[#2a2a2a] pb-4">
                    <h3 className="font-serif text-xl font-bold text-[#F5F0E8]">
                      {editingService ? 'Edit Service' : 'Add New Service Offering'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingService(false);
                        setEditingService(null);
                      }}
                      className="text-xs text-[#888] hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleSaveService} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#C8C1B4] mb-2 font-medium">
                          Service Title *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={100}
                          placeholder="e.g. Bespoke Metallic Wall Painting"
                          value={serviceForm.title}
                          onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                          className="w-full px-4 py-3 rounded-xs bg-[#111] border border-[#333] focus:border-[#D4AF37] focus:outline-none text-sm text-[#F5F0E8]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#C8C1B4] mb-2 font-medium">
                          Category
                        </label>
                        <input
                          type="text"
                          maxLength={50}
                          placeholder="e.g. Wall Art"
                          value={serviceForm.category}
                          onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                          className="w-full px-4 py-3 rounded-xs bg-[#111] border border-[#333] focus:border-[#D4AF37] focus:outline-none text-sm text-[#F5F0E8]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#C8C1B4] mb-2 font-medium">
                        Service Description
                      </label>
                      <textarea
                        rows={3}
                        maxLength={1000}
                        placeholder="Explain what the client receives, materials used, artistic scope..."
                        value={serviceForm.description}
                        onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xs bg-[#111] border border-[#333] focus:border-[#D4AF37] focus:outline-none text-sm text-[#F5F0E8]"
                      />
                    </div>

                    {/* Service Image */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#C8C1B4] mb-2 font-medium">
                        Service Illustration Image (Optional)
                      </label>
                      <label className="inline-flex items-center space-x-2 px-4 py-2 rounded border border-[#444] text-xs text-[#C8C1B4] hover:border-[#D4AF37] cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Photo for Service</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e, 'service')}
                          className="hidden"
                        />
                      </label>
                      {serviceForm.imageUrl && (
                        <div className="mt-2 w-24 h-16 rounded overflow-hidden border border-[#444]">
                          <img src={serviceForm.imageUrl} alt="Service" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={serviceForm.isConfirmed}
                        onChange={(e) => setServiceForm({ ...serviceForm, isConfirmed: e.target.checked })}
                        className="w-4 h-4 accent-[#D4AF37]"
                      />
                      <span className="text-xs text-[#F5F0E8]">Confirmed offering (advertised on live website)</span>
                    </div>

                    <div className="pt-2 flex items-center space-x-4">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-3 rounded bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110"
                      >
                        {isSaving ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingService(false);
                          setEditingService(null);
                        }}
                        className="px-4 py-3 text-xs text-[#888] hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Services List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="p-5 rounded-sm bg-[#161616] border border-[#262626] flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#D4AF37] mb-1">
                        <span>{service.category || 'Service'}</span>
                        <span>{service.isConfirmed ? 'Confirmed' : 'Unconfirmed'}</span>
                      </div>
                      <h4 className="font-serif text-lg font-bold text-[#F5F0E8]">
                        {service.title}
                      </h4>
                      <p className="text-xs text-[#888] mt-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#222] flex items-center justify-between">
                      <button
                        onClick={() => {
                          setEditingService(service);
                          setServiceForm({
                            title: service.title,
                            category: service.category || 'Wall Art',
                            description: service.description || '',
                            imageUrl: service.imageUrl || '',
                            isConfirmed: service.isConfirmed
                          });
                          setIsAddingService(false);
                        }}
                        className="text-xs text-[#D4AF37] hover:underline flex items-center space-x-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete service "${service.title}"?`)) {
                            deleteService(service.id);
                            showNotification('Service removed.');
                          }
                        }}
                        className="text-xs text-[#888] hover:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BUSINESS SETTINGS & WHATSAPP */}
          {activeTab === 'settings' && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="pb-6 border-b border-[#222]">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E8]">
                  Business & WhatsApp Configuration
                </h2>
                <p className="text-xs text-[#C8C1B4] mt-1">
                  Configure official WhatsApp number, telephone, social media links, studio address, and homepage headlines.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-8">
                
                {/* WhatsApp & Phone Section */}
                <div className="p-6 rounded-sm bg-[#161616] border border-[#2a2a2a] space-y-4">
                  <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block">
                    WhatsApp Booking & Contact Numbers
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#C8C1B4] mb-2 font-medium">
                        Official WhatsApp Number *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={30}
                        placeholder="e.g. +2348000000000"
                        value={settingsForm.whatsappNumber}
                        onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                        className="w-full px-4 py-3 rounded-xs bg-[#111] border border-[#333] focus:border-[#D4AF37] focus:outline-none text-sm text-[#F5F0E8]"
                      />
                      <span className="text-[11px] text-[#888] block mt-1">
                        All website "Book Now" and "Request Quote" buttons immediately route to this number.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#C8C1B4] mb-2 font-medium">
                        Direct Phone Number
                      </label>
                      <input
                        type="text"
                        maxLength={30}
                        placeholder="e.g. +234 800 000 0000"
                        value={settingsForm.phoneNumber}
                        onChange={(e) => setSettingsForm({ ...settingsForm, phoneNumber: e.target.value })}
                        className="w-full px-4 py-3 rounded-xs bg-[#111] border border-[#333] focus:border-[#D4AF37] focus:outline-none text-sm text-[#F5F0E8]"
                      />
                    </div>
                  </div>
                </div>

                {/* Studio Profile & Location */}
                <div className="p-6 rounded-sm bg-[#161616] border border-[#2a2a2a] space-y-4">
                  <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block">
                    Studio Information
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#C8C1B4] mb-2 font-medium">
                        Business Name
                      </label>
                      <input
                        type="text"
                        maxLength={100}
                        value={settingsForm.businessName}
                        onChange={(e) => setSettingsForm({ ...settingsForm, businessName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xs bg-[#111] border border-[#333] focus:border-[#D4AF37] focus:outline-none text-sm text-[#F5F0E8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#C8C1B4] mb-2 font-medium">
                        Location (City / State, Nigeria)
                      </label>
                      <input
                        type="text"
                        maxLength={150}
                        placeholder="e.g. Lagos & Abuja, Nigeria"
                        value={settingsForm.location}
                        onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-xs bg-[#111] border border-[#333] focus:border-[#D4AF37] focus:outline-none text-sm text-[#F5F0E8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#C8C1B4] mb-2 font-medium">
                        Instagram Handle
                      </label>
                      <input
                        type="text"
                        maxLength={100}
                        placeholder="@atiku_art"
                        value={settingsForm.instagram}
                        onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                        className="w-full px-4 py-3 rounded-xs bg-[#111] border border-[#333] focus:border-[#D4AF37] focus:outline-none text-sm text-[#F5F0E8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#C8C1B4] mb-2 font-medium">
                        TikTok Handle
                      </label>
                      <input
                        type="text"
                        maxLength={100}
                        placeholder="@atiku_art"
                        value={settingsForm.tiktok}
                        onChange={(e) => setSettingsForm({ ...settingsForm, tiktok: e.target.value })}
                        className="w-full px-4 py-3 rounded-xs bg-[#111] border border-[#333] focus:border-[#D4AF37] focus:outline-none text-sm text-[#F5F0E8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C8C1B4] mb-2 font-medium">
                      Studio Tagline
                    </label>
                    <input
                      type="text"
                      maxLength={200}
                      value={settingsForm.tagline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xs bg-[#111] border border-[#333] focus:border-[#D4AF37] focus:outline-none text-sm text-[#F5F0E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C8C1B4] mb-2 font-medium">
                      About ATIKU ART Narrative
                    </label>
                    <textarea
                      rows={4}
                      maxLength={2000}
                      value={settingsForm.aboutText}
                      onChange={(e) => setSettingsForm({ ...settingsForm, aboutText: e.target.value })}
                      className="w-full px-4 py-3 rounded-xs bg-[#111] border border-[#333] focus:border-[#D4AF37] focus:outline-none text-sm text-[#F5F0E8]"
                    />
                  </div>
                </div>

                {/* Homepage Hero Headline Settings */}
                <div className="p-6 rounded-sm bg-[#161616] border border-[#2a2a2a] space-y-4">
                  <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block">
                    Homepage Hero Content
                  </span>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C8C1B4] mb-2 font-medium">
                      Main Hero Heading
                    </label>
                    <input
                      type="text"
                      maxLength={200}
                      value={settingsForm.heroTitle}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroTitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xs bg-[#111] border border-[#333] focus:border-[#D4AF37] focus:outline-none text-sm text-[#F5F0E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C8C1B4] mb-2 font-medium">
                      Hero Subtitle
                    </label>
                    <textarea
                      rows={2}
                      maxLength={500}
                      value={settingsForm.heroSubtitle}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xs bg-[#111] border border-[#333] focus:border-[#D4AF37] focus:outline-none text-sm text-[#F5F0E8]"
                    />
                  </div>

                  {/* Hero Background image upload */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#C8C1B4] mb-2 font-medium">
                      Hero Background Project Image
                    </label>
                    <div className="flex items-center space-x-4">
                      {settingsForm.heroImageUrl && (
                        <div className="w-24 h-16 rounded overflow-hidden border border-[#D4AF37]">
                          <img src={settingsForm.heroImageUrl} alt="Hero background" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <label className="inline-flex items-center space-x-2 px-4 py-2 rounded border border-[#444] text-xs text-[#C8C1B4] hover:border-[#D4AF37] cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Hero Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileChange(e, 'hero')}
                          className="hidden"
                        />
                      </label>
                      {settingsForm.heroImageUrl && (
                        <button
                          type="button"
                          onClick={() => setSettingsForm({ ...settingsForm, heroImageUrl: '' })}
                          className="text-xs text-red-400 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Save Changes Button */}
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center space-x-2 px-8 py-4 rounded bg-[#D4AF37] text-black font-semibold uppercase tracking-wider text-xs shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 disabled:opacity-50"
                >
                  <Save className="w-4 h-4 fill-black" />
                  <span>{isSaving ? 'Saving Changes...' : 'Save All Business Settings'}</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: CLIENT INQUIRIES & LEADS */}
          {activeTab === 'inquiries' && (
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222]">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F0E8]">
                    Client Leads & Contact Inquiries
                  </h2>
                  <p className="text-xs text-[#C8C1B4] mt-1">
                    Direct inquiries submitted via the website contact form. Click to chat directly on WhatsApp.
                  </p>
                </div>
              </div>

              {inquiries.length === 0 ? (
                <div className="p-12 text-center rounded bg-[#141414] border border-[#222] space-y-3">
                  <Inbox className="w-10 h-10 text-[#444] mx-auto" />
                  <h4 className="font-serif text-lg text-[#F5F0E8]">No Inquiries Yet</h4>
                  <p className="text-xs text-[#888] max-w-md mx-auto">
                    When prospective clients fill out the contact form on your website, their requests and contact details will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inquiry) => {
                    const clientReplyMsg = `Hello ${inquiry.fullName}, thank you for contacting ATIKU ART regarding your "${inquiry.serviceRequired}" project. We would love to discuss this with you.`;
                    const cleanPhone = inquiry.phoneNumber.replace(/[^0-9]/g, '');
                    const waReplyUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(clientReplyMsg)}`;

                    return (
                      <div
                        key={inquiry.id}
                        className={`p-6 rounded-sm bg-[#161616] border transition-all ${
                          inquiry.status === 'new'
                            ? 'border-[#D4AF37]/50 bg-gradient-to-r from-[#181612] to-[#161616]'
                            : 'border-[#262626]'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="font-serif text-lg font-bold text-[#F5F0E8]">
                                {inquiry.fullName}
                              </span>
                              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#111] border border-[#D4AF37]/40 text-[#D4AF37]">
                                {inquiry.serviceRequired}
                              </span>
                              <span className="text-[10px] text-[#888]">
                                {new Date(inquiry.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="flex items-center space-x-2 text-xs text-[#C8C1B4] mb-3">
                              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>{inquiry.phoneNumber}</span>
                            </div>

                            <p className="text-xs sm:text-sm text-[#F5F0E8]/90 bg-[#121212] p-4 rounded border border-[#222] leading-relaxed">
                              "{inquiry.projectDescription}"
                            </p>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 shrink-0">
                            {cleanPhone && (
                              <a
                                href={waReplyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded bg-gradient-to-r from-[#D4AF37] to-[#B89228] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 whitespace-nowrap"
                              >
                                <MessageSquare className="w-3.5 h-3.5 fill-black" />
                                <span>Reply on WhatsApp</span>
                              </a>
                            )}

                            <select
                              value={inquiry.status}
                              onChange={(e) => {
                                updateInquiryStatus(inquiry.id, e.target.value as any);
                                showNotification('Inquiry status updated.');
                              }}
                              className="px-3 py-1.5 rounded bg-[#111] border border-[#333] text-xs text-[#C8C1B4]"
                            >
                              <option value="new">Status: New</option>
                              <option value="contacted">Status: Contacted</option>
                              <option value="completed">Status: Completed</option>
                            </select>

                            <button
                              onClick={() => {
                                if (confirm(`Delete inquiry from ${inquiry.fullName}?`)) {
                                  deleteInquiry(inquiry.id);
                                  showNotification('Inquiry removed.');
                                }
                              }}
                              className="text-xs text-[#888] hover:text-red-400"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
