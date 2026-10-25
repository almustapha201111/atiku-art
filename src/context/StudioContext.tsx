import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { 
  User, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  query, 
  orderBy, 
  getDoc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage, handleFirestoreError, OperationType, testConnection } from '../lib/firebase';
import { BusinessSettings, ServiceItem, ProjectItem, InquiryItem } from '../types';
import { DEFAULT_BUSINESS_SETTINGS, DEFAULT_SERVICES, CONCEPT_PROJECTS } from '../lib/constants';

interface StudioContextType {
  settings: BusinessSettings;
  services: ServiceItem[];
  projects: ProjectItem[];
  conceptProjects: ProjectItem[];
  inquiries: InquiryItem[];
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  isAuthLoading: boolean;
  activeLightboxProject: ProjectItem | null;
  setActiveLightboxProject: (project: ProjectItem | null) => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  getWhatsAppUrl: (message?: string) => string;
  updateSettings: (newSettings: Partial<BusinessSettings>) => Promise<void>;
  addProject: (project: Omit<ProjectItem, 'id' | 'createdAt'>) => Promise<string>;
  updateProject: (id: string, project: Partial<ProjectItem>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addService: (service: Omit<ServiceItem, 'id' | 'createdAt'>) => Promise<string>;
  updateService: (id: string, service: Partial<ServiceItem>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  submitInquiry: (inquiry: Omit<InquiryItem, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateInquiryStatus: (id: string, status: InquiryItem['status']) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

const ADMIN_BOOTSTRAP_EMAIL = 'almustaphaaus2011@gmail.com';

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<BusinessSettings>(DEFAULT_BUSINESS_SETTINGS);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [activeLightboxProject, setActiveLightboxProject] = useState<ProjectItem | null>(null);

  // Initial connection test
  useEffect(() => {
    testConnection();
  }, []);

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const email = currentUser.email?.toLowerCase();
        if (email === ADMIN_BOOTSTRAP_EMAIL.toLowerCase()) {
          setIsAdmin(true);
        } else {
          try {
            const adminDoc = await getDoc(doc(db, 'admins', currentUser.uid));
            setIsAdmin(adminDoc.exists());
          } catch {
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Listen to Settings from Firestore
  useEffect(() => {
    const settingsDocRef = doc(db, 'settings', 'business');
    const unsubscribe = onSnapshot(
      settingsDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as BusinessSettings;
          const businessName = (!data.businessName || data.businessName === 'ATIKU ART' || data.businessName === 'ATIKU MAKODA ART')
            ? 'ATIKU MAKODA ARTS'
            : data.businessName;
          setSettings({
            ...DEFAULT_BUSINESS_SETTINGS,
            ...data,
            businessName
          });
        } else {
          setSettings(DEFAULT_BUSINESS_SETTINGS);
        }
        setIsLoading(false);
      },
      (error) => {
        console.warn('Could not fetch settings from Firestore, using defaults:', error.message);
        setSettings(DEFAULT_BUSINESS_SETTINGS);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Listen to Services from Firestore
  useEffect(() => {
    const servicesColRef = collection(db, 'services');
    const servicesQuery = query(servicesColRef, orderBy('order', 'asc'));

    const unsubscribe = onSnapshot(
      servicesQuery,
      (snapshot) => {
        if (!snapshot.empty) {
          const loadedServices: ServiceItem[] = snapshot.docs.map(d => ({
            id: d.id,
            ...(d.data() as Omit<ServiceItem, 'id'>)
          }));
          setServices(loadedServices);
        } else {
          // Fall back to confirmed default services
          const defaultList = DEFAULT_SERVICES.map((s, idx) => ({
            ...s,
            id: `default-${idx + 1}`
          }));
          setServices(defaultList);
        }
      },
      (error) => {
        console.warn('Could not fetch services, using default confirmed list:', error.message);
        const defaultList = DEFAULT_SERVICES.map((s, idx) => ({
          ...s,
          id: `default-${idx + 1}`
        }));
        setServices(defaultList);
      }
    );

    return () => unsubscribe();
  }, []);

  // Listen to Portfolio Projects from Firestore
  useEffect(() => {
    const projectsColRef = collection(db, 'projects');
    const projectsQuery = query(projectsColRef, orderBy('order', 'asc'));

    const unsubscribe = onSnapshot(
      projectsQuery,
      (snapshot) => {
        const loadedProjects: ProjectItem[] = snapshot.docs.map(d => ({
          id: d.id,
          ...(d.data() as Omit<ProjectItem, 'id'>)
        }));
        setProjects(loadedProjects);
      },
      (error) => {
        console.warn('Could not fetch projects, initializing empty gallery:', error.message);
        setProjects([]);
      }
    );

    return () => unsubscribe();
  }, []);

  // Listen to Inquiries (Only when admin is authenticated)
  useEffect(() => {
    if (!isAdmin) {
      setInquiries([]);
      return;
    }

    const inquiriesColRef = collection(db, 'inquiries');
    const inquiriesQuery = query(inquiriesColRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      inquiriesQuery,
      (snapshot) => {
        const list: InquiryItem[] = snapshot.docs.map(d => ({
          id: d.id,
          ...(d.data() as Omit<InquiryItem, 'id'>)
        }));
        setInquiries(list);
      },
      (error) => {
        console.error('Error fetching inquiries:', error);
      }
    );

    return () => unsubscribe();
  }, [isAdmin]);

  // WhatsApp Link Generator
  const getWhatsAppUrl = (customMessage?: string): string => {
    const cleanNumber = (settings.whatsappNumber || '+2348000000000').replace(/[^0-9]/g, '');
    const defaultMsg = "Hello ATIKU MAKODA ARTS, I saw your website and I'm interested in your wall art services. I would like to discuss a project.";
    const text = encodeURIComponent(customMessage || defaultMsg);
    return `https://wa.me/${cleanNumber}?text=${text}`;
  };

  // Google Login
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
  };

  // Update Settings
  const updateSettings = async (newSettings: Partial<BusinessSettings>) => {
    const path = 'settings/business';
    try {
      const merged = {
        ...settings,
        ...newSettings,
        updatedAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'settings', 'business'), merged, { merge: true });
      setSettings(merged);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  // Image Upload helper (supports Firebase Storage with high-res base64 fallback)
  const uploadImage = async (file: File): Promise<string> => {
    try {
      // First attempt to upload to Firebase Storage
      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const storageRef = ref(storage, `atiku-art/projects/${timestamp}_${safeName}`);
      const uploadResult = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(uploadResult.ref);
      return downloadUrl;
    } catch (storageError) {
      console.warn('Storage direct upload failed or blocked by CORS/rules, using optimized data URL:', storageError);
      // Fallback: Convert to optimized data URL so uploaded real project image is 100% saved and displays
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          resolve(result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  };

  // Add Project
  const addProject = async (projectData: Omit<ProjectItem, 'id' | 'createdAt'>): Promise<string> => {
    const path = 'projects';
    try {
      const now = new Date().toISOString();
      const docRef = await addDoc(collection(db, 'projects'), {
        ...projectData,
        createdAt: now,
        updatedAt: now
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  // Update Project
  const updateProject = async (id: string, projectData: Partial<ProjectItem>) => {
    const path = `projects/${id}`;
    try {
      await updateDoc(doc(db, 'projects', id), {
        ...projectData,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  // Delete Project
  const deleteProject = async (id: string) => {
    const path = `projects/${id}`;
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  // Add Service
  const addService = async (serviceData: Omit<ServiceItem, 'id' | 'createdAt'>): Promise<string> => {
    const path = 'services';
    try {
      const now = new Date().toISOString();
      const docRef = await addDoc(collection(db, 'services'), {
        ...serviceData,
        createdAt: now,
        updatedAt: now
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  // Update Service
  const updateService = async (id: string, serviceData: Partial<ServiceItem>) => {
    const path = `services/${id}`;
    try {
      await updateDoc(doc(db, 'services', id), {
        ...serviceData,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  // Delete Service
  const deleteService = async (id: string) => {
    const path = `services/${id}`;
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  // Submit Inquiry
  const submitInquiry = async (inquiryData: Omit<InquiryItem, 'id' | 'createdAt' | 'status'>) => {
    const path = 'inquiries';
    try {
      const now = new Date().toISOString();
      await addDoc(collection(db, 'inquiries'), {
        ...inquiryData,
        status: 'new',
        createdAt: now
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  // Update Inquiry Status
  const updateInquiryStatus = async (id: string, status: InquiryItem['status']) => {
    const path = `inquiries/${id}`;
    try {
      await updateDoc(doc(db, 'inquiries', id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  // Delete Inquiry
  const deleteInquiry = async (id: string) => {
    const path = `inquiries/${id}`;
    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const contextValue = useMemo(() => ({
    settings,
    services,
    projects,
    conceptProjects: CONCEPT_PROJECTS,
    inquiries,
    user,
    isAdmin,
    isLoading,
    isAuthLoading,
    activeLightboxProject,
    setActiveLightboxProject,
    loginWithGoogle,
    logout,
    getWhatsAppUrl,
    updateSettings,
    addProject,
    updateProject,
    deleteProject,
    addService,
    updateService,
    deleteService,
    submitInquiry,
    updateInquiryStatus,
    deleteInquiry,
    uploadImage,
  }), [
    settings,
    services,
    projects,
    inquiries,
    user,
    isAdmin,
    isLoading,
    isAuthLoading,
    activeLightboxProject
  ]);

  return (
    <StudioContext.Provider value={contextValue}>
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
};
