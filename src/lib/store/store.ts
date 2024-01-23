import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { 
  ResumeData, 
  ExperienceItem, 
  EducationItem, 
  SkillItem, 
  ProjectItem,
  CustomSection,
  ResumeSection
} from '../types/resume';
import { createEmptyResume } from './defaults';

interface ResumeState {
  resumes: ResumeData[];
  activeResumeId: string | null;
  activeSection: ResumeSection | null;

  // Resume CRUD operations
  createResume: () => void;
  deleteResume: (id: string) => void;
  updateResume: (id: string, data: Partial<Omit<ResumeData, 'id' | 'lastUpdated'>>) => void;
  
  // Section CRUD operations
  addExperienceItem: (item: Omit<ExperienceItem, 'id'>) => void;
  updateExperienceItem: (id: string, item: Partial<Omit<ExperienceItem, 'id'>>) => void;
  deleteExperienceItem: (id: string) => void;
  
  addEducationItem: (item: Omit<EducationItem, 'id'>) => void;
  updateEducationItem: (id: string, item: Partial<Omit<EducationItem, 'id'>>) => void;
  deleteEducationItem: (id: string) => void;
  
  addSkillItem: (item: Omit<SkillItem, 'id'>) => void;
  updateSkillItem: (id: string, item: Partial<Omit<SkillItem, 'id'>>) => void;
  deleteSkillItem: (id: string) => void;
  
  addProjectItem: (item: Omit<ProjectItem, 'id'>) => void;
  updateProjectItem: (id: string, item: Partial<Omit<ProjectItem, 'id'>>) => void;
  deleteProjectItem: (id: string) => void;
  
  // Active resume and section selectors
  setActiveResumeId: (id: string | null) => void;
  setActiveSection: (section: ResumeSection | null) => void;
  
  // Utility getters
  getActiveResume: () => ResumeData | null;
}

export const useResumeStore = create<ResumeState>((set, get) => ({
  resumes: [],
  activeResumeId: null,
  activeSection: null,
  
  // Resume CRUD
  createResume: () => {
    const newResume = createEmptyResume();
    set(state => ({
      resumes: [...state.resumes, newResume],
      activeResumeId: newResume.id
    }));
  },
  
  deleteResume: (id) => {
    set(state => ({
      resumes: state.resumes.filter(resume => resume.id !== id),
      activeResumeId: state.activeResumeId === id ? null : state.activeResumeId
    }));
  },
  
  updateResume: (id, data) => {
    set(state => ({
      resumes: state.resumes.map(resume => 
        resume.id === id 
          ? { 
              ...resume, 
              ...data, 
              lastUpdated: new Date().toISOString() 
            } 
          : resume
      )
    }));
  },
  
  // Experience CRUD
  addExperienceItem: (item) => {
    const activeResume = get().getActiveResume();
    if (!activeResume) return;
    
    const newItem = { id: uuidv4(), ...item };
    
    set(state => ({
      resumes: state.resumes.map(resume => 
        resume.id === activeResume.id 
          ? { 
              ...resume, 
              experience: [...resume.experience, newItem],
              lastUpdated: new Date().toISOString()
            } 
          : resume
      )
    }));
  },
  
  updateExperienceItem: (id, item) => {
    const activeResume = get().getActiveResume();
    if (!activeResume) return;
    
    set(state => ({
      resumes: state.resumes.map(resume => 
        resume.id === activeResume.id 
          ? { 
              ...resume, 
              experience: resume.experience.map(exp => 
                exp.id === id ? { ...exp, ...item } : exp
              ),
              lastUpdated: new Date().toISOString()
            } 
          : resume
      )
    }));
  },
  
  deleteExperienceItem: (id) => {
    const activeResume = get().getActiveResume();
    if (!activeResume) return;
    
    set(state => ({
      resumes: state.resumes.map(resume => 
        resume.id === activeResume.id 
          ? { 
              ...resume, 
              experience: resume.experience.filter(exp => exp.id !== id),
              lastUpdated: new Date().toISOString()
            } 
          : resume
      )
    }));
  },
  
  // Education CRUD
  addEducationItem: (item) => {
    const activeResume = get().getActiveResume();
    if (!activeResume) return;
    
    const newItem = { id: uuidv4(), ...item };
    
    set(state => ({
      resumes: state.resumes.map(resume => 
        resume.id === activeResume.id 
          ? { 
              ...resume, 
              education: [...resume.education, newItem],
              lastUpdated: new Date().toISOString()
            } 
          : resume
      )
    }));
  },
  
  updateEducationItem: (id, item) => {
    const activeResume = get().getActiveResume();
    if (!activeResume) return;
    
    set(state => ({
      resumes: state.resumes.map(resume => 
        resume.id === activeResume.id 
          ? { 
              ...resume, 
              education: resume.education.map(edu => 
                edu.id === id ? { ...edu, ...item } : edu
              ),
              lastUpdated: new Date().toISOString()
            } 
          : resume
      )
    }));
  },
  
  deleteEducationItem: (id) => {
    const activeResume = get().getActiveResume();
    if (!activeResume) return;
    
    set(state => ({
      resumes: state.resumes.map(resume => 
        resume.id === activeResume.id 
          ? { 
              ...resume, 
              education: resume.education.filter(edu => edu.id !== id),
              lastUpdated: new Date().toISOString()
            } 
          : resume
      )
    }));
  },
  
  // Skills CRUD
  addSkillItem: (item) => {
    const activeResume = get().getActiveResume();
    if (!activeResume) return;
    
    const newItem = { id: uuidv4(), ...item };
    
    set(state => ({
      resumes: state.resumes.map(resume => 
        resume.id === activeResume.id 
          ? { 
              ...resume, 
              skills: [...resume.skills, newItem],
              lastUpdated: new Date().toISOString()
            } 
          : resume
      )
    }));
  },
  
  updateSkillItem: (id, item) => {
    const activeResume = get().getActiveResume();
    if (!activeResume) return;
    
    set(state => ({
      resumes: state.resumes.map(resume => 
        resume.id === activeResume.id 
          ? { 
              ...resume, 
              skills: resume.skills.map(skill => 
                skill.id === id ? { ...skill, ...item } : skill
              ),
              lastUpdated: new Date().toISOString()
            } 
          : resume
      )
    }));
  },
  
  deleteSkillItem: (id) => {
    const activeResume = get().getActiveResume();
    if (!activeResume) return;
    
    set(state => ({
      resumes: state.resumes.map(resume => 
        resume.id === activeResume.id 
          ? { 
              ...resume, 
              skills: resume.skills.filter(skill => skill.id !== id),
              lastUpdated: new Date().toISOString()
            } 
          : resume
      )
    }));
  },
  
  // Projects CRUD
  addProjectItem: (item) => {
    const activeResume = get().getActiveResume();
    if (!activeResume) return;
    
    const newItem = { id: uuidv4(), ...item };
    
    set(state => ({
      resumes: state.resumes.map(resume => 
        resume.id === activeResume.id 
          ? { 
              ...resume, 
              projects: [...resume.projects, newItem],
              lastUpdated: new Date().toISOString()
            } 
          : resume
      )
    }));
  },
  
  updateProjectItem: (id, item) => {
    const activeResume = get().getActiveResume();
    if (!activeResume) return;
    
    set(state => ({
      resumes: state.resumes.map(resume => 
        resume.id === activeResume.id 
          ? { 
              ...resume, 
              projects: resume.projects.map(project => 
                project.id === id ? { ...project, ...item } : project
              ),
              lastUpdated: new Date().toISOString()
            } 
          : resume
      )
    }));
  },
  
  deleteProjectItem: (id) => {
    const activeResume = get().getActiveResume();
    if (!activeResume) return;
    
    set(state => ({
      resumes: state.resumes.map(resume => 
        resume.id === activeResume.id 
          ? { 
              ...resume, 
              projects: resume.projects.filter(project => project.id !== id),
              lastUpdated: new Date().toISOString()
            } 
          : resume
      )
    }));
  },
  
  // Active Resume Management
  setActiveResumeId: (id) => set({ activeResumeId: id }),
  setActiveSection: (section) => set({ activeSection: section }),
  
  // Utility Getters
  getActiveResume: () => {
    const { resumes, activeResumeId } = get();
    if (!activeResumeId) return null;
    return resumes.find(resume => resume.id === activeResumeId) || null;
  }
})); 