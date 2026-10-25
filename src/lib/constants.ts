import { BusinessSettings, ServiceItem, ProjectItem } from '../types';

import heroImg from '../assets/images/hero_wall_mural_1792872287346.jpg';
import geometricImg from '../assets/images/geometric_wall_1792872302914.jpg';
import africanMuralImg from '../assets/images/african_art_wall_1792872316582.jpg';
import restaurantMuralImg from '../assets/images/restaurant_mural_1792872329861.jpg';
import bedroomArtImg from '../assets/images/bedroom_wall_art_1792872343161.jpg';
import decorative3dImg from '../assets/images/decorative_3d_wall_1792872354918.jpg';
import artistPaintingImg from '../assets/images/artist_painting_mural_1792872370297.jpg';

export {
  heroImg,
  geometricImg,
  africanMuralImg,
  restaurantMuralImg,
  bedroomArtImg,
  decorative3dImg,
  artistPaintingImg
};

export const DEFAULT_BUSINESS_SETTINGS: BusinessSettings = {
  businessName: 'ATIKU MAKODA ARTS',
  tagline: 'Creative Wall Art & Interior Design Studio',
  whatsappNumber: '+2348000000000',
  phoneNumber: '+234 800 000 0000',
  instagram: '@atiku_art',
  tiktok: '@atiku_art',
  location: 'Nigeria',
  aboutText: 'ATIKU MAKODA ARTS is a dedicated creative art studio specializing in wall painting, artistic interior wall decoration, custom murals, and bespoke wall finishes across Nigeria. We transform blank walls into expressive, colorful, and elegant focal points. Through creative craftsmanship, fine attention to detail, and personalized artistic consultations, we bring warmth, luxury, and cultural depth to homes, luxury villas, and boutique commercial spaces.',
  heroTitle: 'WE TURN WALLS INTO MASTERPIECES.',
  heroSubtitle: 'Transforming ordinary spaces into extraordinary works of art through vibrant creativity, precision, and professional craftsmanship.',
  heroImageUrl: heroImg
};

export const DEFAULT_SERVICES: Omit<ServiceItem, 'id'>[] = [
  {
    title: 'Wall Art & Painting',
    category: 'Interior Art',
    description: 'Bespoke hand-crafted wall art tailored to residential and commercial interiors, combining vibrant color harmony, fluid gradients, and expressive artistic depth.',
    imageUrl: artistPaintingImg,
    order: 1,
    isConfirmed: true,
    createdAt: new Date().toISOString()
  },
  {
    title: 'Custom Wall Murals',
    category: 'Wall Murals',
    description: 'Large-scale illustrative, botanical, and abstract murals created specifically for high-ceiling living rooms, luxury entryways, and feature spaces.',
    imageUrl: heroImg,
    order: 2,
    isConfirmed: true,
    createdAt: new Date().toISOString()
  },
  {
    title: 'Interior Wall Decoration',
    category: 'Decorative Painting',
    description: 'Textured 3D sculptural plaster, architectural wall treatments, and warm tactile finishes that infuse sophistication and modern warmth into every room.',
    imageUrl: decorative3dImg,
    order: 3,
    isConfirmed: true,
    createdAt: new Date().toISOString()
  },
  {
    title: 'Artistic Room Designs',
    category: 'Interior Art',
    description: 'Harmonious artistic bedroom and living room transformations, coordinating statement accent walls with architectural lighting and interior palettes.',
    imageUrl: bedroomArtImg,
    order: 4,
    isConfirmed: true,
    createdAt: new Date().toISOString()
  },
  {
    title: 'Commercial & Restaurant Murals',
    category: 'Wall Murals',
    description: 'Immersive artistic wall installations for boutique restaurants, creative lounges, and corporate headquarters that captivate guests and define brand identity.',
    imageUrl: restaurantMuralImg,
    order: 5,
    isConfirmed: true,
    createdAt: new Date().toISOString()
  },
  {
    title: 'Geometric & African-Inspired Art',
    category: 'Creative Concepts',
    description: 'Contemporary geometric and modern African-inspired statement walls celebrating cultural patterns, terracotta ochre palettes, and crisp architectural lines.',
    imageUrl: africanMuralImg,
    order: 6,
    isConfirmed: true,
    createdAt: new Date().toISOString()
  }
];

export const CONCEPT_PROJECTS: ProjectItem[] = [
  {
    id: 'concept-1',
    title: 'Fluid Terracotta & Teal Living Room Mural',
    category: 'Wall Murals',
    description: 'Double-height luxury living room feature wall combining organic wave forms in terracotta orange, artistic teal, and warm golden yellow.',
    imageUrl: heroImg,
    isPublished: true,
    isHeroFeatured: true,
    isConcept: true,
    order: 1,
    createdAt: new Date().toISOString()
  },
  {
    id: 'concept-2',
    title: 'Modern Geometric Architectural Wall Art',
    category: 'Creative Concepts',
    description: 'Clean Scandinavian-inspired geometric wall mural featuring terracotta, deep teal, and warm mustard ochre color blocking in a sunlit lounge.',
    imageUrl: geometricImg,
    isPublished: true,
    isConcept: true,
    order: 2,
    createdAt: new Date().toISOString()
  },
  {
    id: 'concept-3',
    title: 'Contemporary African-Inspired Gallery Mural',
    category: 'Wall Murals',
    description: 'Rich cultural patterns reimagined with modern geometric elegance, desert terracotta tones, and deep indigo teal for high-end luxury interiors.',
    imageUrl: africanMuralImg,
    isPublished: true,
    isConcept: true,
    order: 3,
    createdAt: new Date().toISOString()
  },
  {
    id: 'concept-4',
    title: 'Boutique Restaurant Botanical Wall Mural',
    category: 'Decorative Painting',
    description: 'Vibrant organic botanical mural with layered warm terracotta florals and soft teal foliage, setting an enchanting dining atmosphere.',
    imageUrl: restaurantMuralImg,
    isPublished: true,
    isConcept: true,
    order: 4,
    createdAt: new Date().toISOString()
  },
  {
    id: 'concept-5',
    title: 'Serene Fluid Master Bedroom Accent Wall',
    category: 'Interior Art',
    description: 'Calming fluid wave mural blending gentle terracotta, warm ivory, and sage teal behind a luxury minimalist master bed.',
    imageUrl: bedroomArtImg,
    isPublished: true,
    isConcept: true,
    order: 5,
    createdAt: new Date().toISOString()
  },
  {
    id: 'concept-6',
    title: '3D Sculptural Textured Decorative Plaster Wall',
    category: 'Decorative Painting',
    description: 'Architectural feature wall with tactile sculptural wave reliefs, warm ivory plaster finish, and delicate gold leaf grazing highlights.',
    imageUrl: decorative3dImg,
    isPublished: true,
    isConcept: true,
    order: 6,
    createdAt: new Date().toISOString()
  },
  {
    id: 'concept-7',
    title: 'Artisan Hand-Painting Studio Commission',
    category: 'Creative Concepts',
    description: 'Documentary scene of a professional muralist applying bold multi-color abstract strokes on an expansive interior studio wall.',
    imageUrl: artistPaintingImg,
    isPublished: true,
    isConcept: true,
    order: 7,
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_REAL_PROJECT_SLOTS: Omit<ProjectItem, 'id'>[] = [
  {
    title: 'Client Commission #1',
    category: 'Wall Murals',
    description: 'Verified ATIKU MAKODA ARTS client project photograph slot. Upload authentic project photos from the Admin Dashboard.',
    imageUrl: '',
    isPublished: true,
    isConcept: false,
    order: 1,
    createdAt: new Date().toISOString()
  },
  {
    title: 'Client Commission #2',
    category: 'Interior Art',
    description: 'Verified ATIKU MAKODA ARTS client project photograph slot. Upload authentic project photos from the Admin Dashboard.',
    imageUrl: '',
    isPublished: true,
    isConcept: false,
    order: 2,
    createdAt: new Date().toISOString()
  }
];
