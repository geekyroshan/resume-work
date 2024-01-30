'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useResumeStore } from '../store/store';
import { ResumeData, ResumeSection } from '../types/resume';
import { createSampleResume } from '../store/defaults';
import { toast } from 'sonner';

type ResumeContextType = {
  activeResume: ResumeData | null;
  activeSection: ResumeSection | null;
  isLoading: boolean;
  setActiveResumeId: (id: string | null) => void;
  setActiveSection: (section: ResumeSection | null) => void;
  createNewResume: () => void;
  createSampleResume: () => void;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    resumes,
    createResume,
    setActiveResumeId,
    setActiveSection,
    getActiveResume,
    activeSection,
  } = useResumeStore();

  // Initialize with a sample resume if none exists
  useEffect(() => {
    setIsLoading(true);
    
    // Wrap in setTimeout to ensure this runs after initial render
    // This also gives localStorage time to load via the Zustand middleware
    setTimeout(() => {
      if (resumes.length === 0) {
        createResume();
        toast.success('Created a new resume');
      } else if (!getActiveResume() && resumes.length > 0) {
        setActiveResumeId(resumes[0].id);
      }
      setIsLoading(false);
    }, 100);
  }, [resumes.length, createResume, setActiveResumeId, getActiveResume]);

  // Create a sample resume
  const handleCreateSampleResume = () => {
    const sampleResume = createSampleResume();
    useResumeStore.setState(state => ({
      resumes: [...state.resumes, sampleResume],
      activeResumeId: sampleResume.id
    }));
    toast.success('Created a sample resume');
  };

  // Create a new empty resume
  const handleCreateNewResume = () => {
    createResume();
    toast.success('Created a new resume');
  };

  const contextValue: ResumeContextType = {
    activeResume: getActiveResume(),
    activeSection,
    isLoading,
    setActiveResumeId,
    setActiveSection,
    createNewResume: handleCreateNewResume,
    createSampleResume: handleCreateSampleResume
  };

  return (
    <ResumeContext.Provider value={contextValue}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}; 