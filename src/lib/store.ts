"use client";

import { create } from 'zustand';
import { ResumeData, ResumeSection, SectionType } from './types';
import { v4 as uuidv4 } from 'uuid';

interface ResumeStore {
  resume: ResumeData | null;
  activeSection: string | null;
  
  // Actions
  createResume: (name: string) => void;
  updateResume: (data: Partial<ResumeData>) => void;
  setActiveSection: (sectionId: string | null) => void;
  
  // Section management
  addSection: (type: SectionType, title: string) => void;
  updateSection: (sectionId: string, data: Partial<ResumeSection>) => void;
  removeSection: (sectionId: string) => void;
  reorderSection: (sectionId: string, newOrder: number) => void;
  moveSection: (sectionId: string, direction: 'up' | 'down') => void;
}

// Initial empty resume template
const createEmptyResume = (name: string): ResumeData => {
  const now = new Date().toISOString();
  return {
    id: uuidv4(),
    name,
    createdAt: now,
    updatedAt: now,
    sections: [
      {
        id: uuidv4(),
        type: 'contact',
        title: 'Contact Information',
        order: 0,
        fullName: '',
        email: '',
      },
      {
        id: uuidv4(),
        type: 'summary',
        title: 'Professional Summary',
        order: 1,
        content: '',
      },
      {
        id: uuidv4(),
        type: 'experience',
        title: 'Work Experience',
        order: 2,
        items: [],
      },
      {
        id: uuidv4(),
        type: 'education',
        title: 'Education',
        order: 3,
        items: [],
      },
      {
        id: uuidv4(),
        type: 'skills',
        title: 'Skills',
        order: 4,
        categories: [],
      },
    ],
  };
};

export const useResumeStore = create<ResumeStore>((set, get) => ({
  resume: null,
  activeSection: null,
  
  createResume: (name: string) => {
    const newResume = createEmptyResume(name);
    set({ resume: newResume });
  },
  
  updateResume: (data: Partial<ResumeData>) => {
    set((state) => ({
      resume: state.resume
        ? { ...state.resume, ...data, updatedAt: new Date().toISOString() }
        : null,
    }));
  },
  
  setActiveSection: (sectionId: string | null) => {
    set({ activeSection: sectionId });
  },
  
  addSection: (type: SectionType, title: string) => {
    set((state) => {
      if (!state.resume) return state;
      
      const order = state.resume.sections.length;
      const newSection: ResumeSection = {
        id: uuidv4(),
        type,
        title,
        order,
      } as ResumeSection;
      
      // Initialize section specific fields based on type
      if (type === 'contact') {
        (newSection as any).fullName = '';
        (newSection as any).email = '';
      } else if (type === 'summary') {
        (newSection as any).content = '';
      } else if (type === 'experience' || type === 'education' || type === 'projects') {
        (newSection as any).items = [];
      } else if (type === 'skills') {
        (newSection as any).categories = [];
      }
      
      return {
        resume: {
          ...state.resume,
          sections: [...state.resume.sections, newSection],
          updatedAt: new Date().toISOString(),
        },
      };
    });
  },
  
  updateSection: (sectionId: string, data: Partial<ResumeSection>) => {
    set((state) => {
      if (!state.resume) return state;
      
      const updatedSections = state.resume.sections.map((section) => {
        if (section.id === sectionId) {
          return { ...section, ...data };
        }
        return section;
      });
      
      return {
        resume: {
          ...state.resume,
          sections: updatedSections,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  },
  
  removeSection: (sectionId: string) => {
    set((state) => {
      if (!state.resume) return state;
      
      const filteredSections = state.resume.sections.filter(
        (section) => section.id !== sectionId
      );
      
      // Reorder remaining sections
      const reorderedSections = filteredSections.map((section, index) => ({
        ...section,
        order: index,
      }));
      
      return {
        resume: {
          ...state.resume,
          sections: reorderedSections,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  },
  
  reorderSection: (sectionId: string, newOrder: number) => {
    set((state) => {
      if (!state.resume) return state;
      
      const sections = [...state.resume.sections];
      const currentIndex = sections.findIndex((s) => s.id === sectionId);
      
      if (currentIndex < 0) return state;
      
      const [movedSection] = sections.splice(currentIndex, 1);
      sections.splice(newOrder, 0, movedSection);
      
      const reorderedSections = sections.map((section, index) => ({
        ...section,
        order: index,
      }));
      
      return {
        resume: {
          ...state.resume,
          sections: reorderedSections,
          updatedAt: new Date().toISOString(),
        },
      };
    });
  },
  
  moveSection: (sectionId: string, direction: 'up' | 'down') => {
    set((state) => {
      if (!state.resume) return state;
      
      const sections = [...state.resume.sections];
      const currentIndex = sections.findIndex((s) => s.id === sectionId);
      
      if (currentIndex < 0) return state;
      
      const newIndex = 
        direction === 'up' 
          ? Math.max(0, currentIndex - 1)
          : Math.min(sections.length - 1, currentIndex + 1);
      
      if (newIndex === currentIndex) return state;
      
      const sectionStore = get();
      sectionStore.reorderSection(sectionId, newIndex);
      
      return state;
    });
  },
})); 