"use client";

import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { SectionType } from './types';

// Simplified type definitions to avoid TypeScript errors
export interface ResumeSection {
  id: string;
  type: SectionType;
  title: string;
  order: number;
  [key: string]: any; // Allow any additional properties
}

export interface ResumeData {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  sections: ResumeSection[];
}

interface ResumeState {
  resume: ResumeData | null;
  activeSection: string | null;
}

interface ResumeActions {
  createResume: (name: string) => void;
  updateResume: (data: Partial<ResumeData>) => void;
  setActiveSection: (sectionId: string | null) => void;
  addSection: (type: SectionType, title: string) => void;
  updateSection: (sectionId: string, data: Partial<ResumeSection>) => void;
  removeSection: (sectionId: string) => void;
  reorderSection: (sectionId: string, newOrder: number) => void;
  moveSection: (sectionId: string, direction: 'up' | 'down') => void;
}

// Simplified function to create sections
const createSection = (type: SectionType, title: string, order: number): ResumeSection => {
  const baseSection = {
    id: uuidv4(),
    type,
    title,
    order,
  };
  
  // Add type-specific properties
  switch (type) {
    case 'contact':
      return {
        ...baseSection,
        fullName: '',
        email: '',
      };
    
    case 'summary':
      return {
        ...baseSection,
        content: '',
      };
    
    case 'experience':
    case 'education':
    case 'projects':
      return {
        ...baseSection,
        items: [],
      };
    
    case 'skills':
      return {
        ...baseSection,
        categories: [],
      };
    
    default:
      return baseSection;
  }
};

// Create the store with simplified types
export const useResumeStore = create<ResumeState & ResumeActions>((set, get) => ({
  resume: null,
  activeSection: null,
  
  createResume: (name) => {
    const now = new Date().toISOString();
    
    set({
      resume: {
        id: uuidv4(),
        name,
        createdAt: now,
        updatedAt: now,
        sections: [
          createSection('contact', 'Contact Information', 0),
          createSection('summary', 'Professional Summary', 1),
          createSection('experience', 'Work Experience', 2),
          createSection('education', 'Education', 3),
          createSection('skills', 'Skills', 4),
        ],
      }
    });
  },
  
  updateResume: (data) => {
    const { resume } = get();
    if (!resume) return;
    
    set({
      resume: {
        ...resume,
        ...data,
        updatedAt: new Date().toISOString()
      }
    });
  },
  
  setActiveSection: (sectionId) => {
    set({ activeSection: sectionId });
  },
  
  addSection: (type, title) => {
    const { resume } = get();
    if (!resume) return;
    
    const order = resume.sections.length;
    const newSection = createSection(type, title, order);
    
    set({
      resume: {
        ...resume,
        sections: [...resume.sections, newSection],
        updatedAt: new Date().toISOString(),
      }
    });
  },
  
  updateSection: (sectionId, data) => {
    const { resume } = get();
    if (!resume) return;
    
    const updatedSections = resume.sections.map((section) =>
      section.id === sectionId ? { ...section, ...data } : section
    );
    
    set({
      resume: {
        ...resume,
        sections: updatedSections,
        updatedAt: new Date().toISOString(),
      }
    });
  },
  
  removeSection: (sectionId) => {
    const { resume } = get();
    if (!resume) return;
    
    const filteredSections = resume.sections.filter(
      (section) => section.id !== sectionId
    );
    
    // Reorder remaining sections
    const reorderedSections = filteredSections.map((section, index) => ({
      ...section,
      order: index,
    }));
    
    set({
      resume: {
        ...resume,
        sections: reorderedSections,
        updatedAt: new Date().toISOString(),
      }
    });
  },
  
  reorderSection: (sectionId, newOrder) => {
    const { resume } = get();
    if (!resume) return;
    
    const sections = [...resume.sections];
    const currentIndex = sections.findIndex((s) => s.id === sectionId);
    
    if (currentIndex < 0) return;
    
    const [movedSection] = sections.splice(currentIndex, 1);
    sections.splice(newOrder, 0, movedSection);
    
    const reorderedSections = sections.map((section, index) => ({
      ...section,
      order: index,
    }));
    
    set({
      resume: {
        ...resume,
        sections: reorderedSections,
        updatedAt: new Date().toISOString(),
      }
    });
  },
  
  moveSection: (sectionId, direction) => {
    const { resume } = get();
    if (!resume) return;
    
    const sections = [...resume.sections];
    const currentIndex = sections.findIndex((s) => s.id === sectionId);
    
    if (currentIndex < 0) return;
    
    const newIndex = 
      direction === 'up' 
        ? Math.max(0, currentIndex - 1)
        : Math.min(sections.length - 1, currentIndex + 1);
    
    if (newIndex === currentIndex) return;
    
    get().reorderSection(sectionId, newIndex);
  },
})); 