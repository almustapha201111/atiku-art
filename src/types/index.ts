export type ProjectCategory = 
  | 'Wall Murals'
  | 'Interior Art'
  | 'Decorative Painting'
  | 'Creative Concepts'
  | 'Wall Art' 
  | 'Murals' 
  | 'Interior Decoration' 
  | 'Custom Artwork';

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  imageUrl?: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  hasBeforeAfter?: boolean;
  isPublished: boolean;
  isHeroFeatured?: boolean;
  isConcept?: boolean; // When true, clearly labeled as Concept Design / Illustrative Example
  order: number;
  createdAt: string;
  updatedAt?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  order: number;
  isConfirmed: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface BusinessSettings {
  businessName: string;
  tagline: string;
  whatsappNumber: string;
  phoneNumber: string;
  instagram: string;
  tiktok: string;
  location: string;
  aboutText: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl?: string;
  updatedAt?: string;
}

export interface InquiryItem {
  id: string;
  fullName: string;
  phoneNumber: string;
  serviceRequired: string;
  projectDescription: string;
  status: 'new' | 'contacted' | 'completed';
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'owner';
  addedAt: string;
}
