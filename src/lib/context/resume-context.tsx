'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useResumeStore } from '@/lib/store';
import { ResumeSection, SectionType } from '@/lib/types';

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
  
  // Load initial resume on first render
  useEffect(() => {
    // Simulate loading and create a default resume if none exists
    const timer = setTimeout(() => {
      if (!store.resume) {
        store.createResume('My Resume');
      }
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [store]);
  
  // Wrapped store methods to provide as context
  const value: ResumeContextProps = {
    activeSection: store.activeSection,
    setActiveSection: store.setActiveSection,
    addSection: store.addSection,
    updateSection: store.updateSection,
    removeSection: store.removeSection,
    moveSection: store.moveSection,
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