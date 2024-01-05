// Resume Section Types
export type ResumeSection = 
  | ContactSection
  | SummarySection
  | ExperienceSection
  | EducationSection
  | SkillsSection
  | ProjectsSection;

export type SectionType = 
  | 'contact'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects';

// Base section interface
interface BaseSection {
  id: string;
  type: SectionType;
  title: string;
  order: number;
}

// Contact Info
export interface ContactSection extends BaseSection {
  type: 'contact';
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

// Professional Summary
export interface SummarySection extends BaseSection {
  type: 'summary';
  content: string;
}

// Work Experience
export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  highlights: string[];
}

export interface ExperienceSection extends BaseSection {
  type: 'experience';
  items: ExperienceItem[];
}

// Education
export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  gpa?: string;
  achievements?: string[];
}

export interface EducationSection extends BaseSection {
  type: 'education';
  items: EducationItem[];
}

// Skills
export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface SkillsSection extends BaseSection {
  type: 'skills';
  categories: SkillCategory[];
}

// Projects
export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
  highlights: string[];
}

export interface ProjectsSection extends BaseSection {
  type: 'projects';
  items: ProjectItem[];
}

// Full Resume Data
export interface ResumeData {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  sections: ResumeSection[];
} 