'use client';

import { createContext, useContext, ReactNode, useEffect, useState, useCallback } from 'react';
import { useResumeStore, ResumeSection } from '@/lib/store';
import { SectionType } from '@/lib/types';
import { loadResume, saveResume, setupAutoSave } from '@/lib/storage';
import { toast } from 'sonner';

interface ResumeContextProps {
  activeSection: string | null;
  setActiveSection: (sectionId: string | null) => void;
  addSection: (type: SectionType, title: string) => void;
  updateSection: (sectionId: string, data: Partial<ResumeSection>) => void;
  removeSection: (sectionId: string) => void;
  moveSection: (sectionId: string, direction: 'up' | 'down') => void;
  sections: ResumeSection[];
  isLoading: boolean;
}

const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const store = useResumeStore();
  const [isLoading, setIsLoading] = useState(true);
  
  // Load initial resume from localStorage on first render
  useEffect(() => {
    try {
      const savedResume = loadResume();
      
      if (savedResume) {
        store.updateResume(savedResume);
      } else {
        store.createResume('My Resume');
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading resume:', error);
      store.createResume('My Resume');
      setIsLoading(false);
    }
  }, [store]);
  
  // Setup auto-save functionality
  useEffect(() => {
    if (!store.resume) return;
    
    const cleanup = setupAutoSave((data) => {
      // This callback is called after successful save
      // We could show a toast notification here if needed
    });
    
    // Save immediately on any changes
    saveResume(store.resume);
    
    return cleanup;
  }, [store.resume]);
  
  // Wrapped store methods to provide as context
  const addSection = useCallback((type: SectionType, title: string) => {
    store.addSection(type, title);
    toast.success(`Added ${title} section`);
  }, [store]);
  
  const updateSection = useCallback((sectionId: string, data: Partial<ResumeSection>) => {
    store.updateSection(sectionId, data);
  }, [store]);
  
  const removeSection = useCallback((sectionId: string) => {
    const sectionTitle = store.resume?.sections.find(s => s.id === sectionId)?.title || 'section';
    store.removeSection(sectionId);
    toast.success(`Removed ${sectionTitle}`);
  }, [store]);
  
  const moveSection = useCallback((sectionId: string, direction: 'up' | 'down') => {
    store.moveSection(sectionId, direction);
  }, [store]);
  
  const value: ResumeContextProps = {
    activeSection: store.activeSection,
    setActiveSection: store.setActiveSection,
    addSection,
    updateSection,
    removeSection,
    moveSection,
    sections: store.resume?.sections || [],
    isLoading,
  };
  
  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
} 