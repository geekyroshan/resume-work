import { v4 as uuidv4 } from 'uuid';
import { ResumeData } from '../types/resume';

/**
 * Default empty resume data structure
 */
export const createEmptyResume = (): ResumeData => ({
  id: uuidv4(),
  title: 'Untitled Resume',
  lastUpdated: new Date().toISOString(),
  contactInfo: {
    name: '',
    email: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  customSections: [],
});

/**
 * Sample resume data with example content
 */
export const createSampleResume = (): ResumeData => ({
  id: uuidv4(),
  title: 'Sample Resume',
  lastUpdated: new Date().toISOString(),
  contactInfo: {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexjohnson',
    github: 'github.com/alexjohnson',
  },
  summary: 'Experienced software engineer with 5+ years of experience building scalable web applications. Proficient in React, TypeScript, and Node.js with a passion for creating intuitive user interfaces and solving complex problems.',
  experience: [
    {
      id: uuidv4(),
      company: 'Tech Solutions Inc.',
      position: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      startDate: '2021-06-01',
      endDate: undefined,
      current: true,
      description: 'Leading frontend development for enterprise SaaS platform',
      highlights: [
        'Architected and implemented a component library used across multiple products',
        'Reduced application bundle size by 35% through code splitting and lazy loading',
        'Mentored junior developers and led code reviews for team of 6 engineers',
        'Implemented comprehensive unit and integration testing with 90% coverage',
      ],
    },
    {
      id: uuidv4(),
      company: 'WebDev Studios',
      position: 'Frontend Developer',
      location: 'San Francisco, CA',
      startDate: '2019-03-15',
      endDate: '2021-05-30',
      current: false,
      description: 'Developed responsive web applications for clients in various industries',
      highlights: [
        'Built interactive dashboards with React, Redux, and D3.js',
        'Implemented authentication and authorization using OAuth 2.0',
        'Optimized website performance achieving 95+ Lighthouse scores',
        'Collaborated with design team to implement pixel-perfect UI components',
      ],
    },
  ],
  education: [
    {
      id: uuidv4(),
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2015-09-01',
      endDate: '2019-05-15',
      current: false,
      gpa: '3.8',
      highlights: [
        'Graduated with honors',
        'Teaching Assistant for Introduction to Web Development',
        'Developed a machine learning project for image recognition',
      ],
    },
  ],
  skills: [
    { id: uuidv4(), name: 'JavaScript', level: 'expert', category: 'Programming Languages' },
    { id: uuidv4(), name: 'TypeScript', level: 'expert', category: 'Programming Languages' },
    { id: uuidv4(), name: 'React', level: 'expert', category: 'Frontend' },
    { id: uuidv4(), name: 'Redux', level: 'advanced', category: 'Frontend' },
    { id: uuidv4(), name: 'Node.js', level: 'advanced', category: 'Backend' },
    { id: uuidv4(), name: 'GraphQL', level: 'intermediate', category: 'API' },
    { id: uuidv4(), name: 'Docker', level: 'intermediate', category: 'DevOps' },
    { id: uuidv4(), name: 'AWS', level: 'intermediate', category: 'Cloud' },
  ],
  projects: [
    {
      id: uuidv4(),
      name: 'E-commerce Platform',
      description: 'A full-stack e-commerce application with shopping cart, payment processing, and admin dashboard',
      url: 'github.com/alexjohnson/ecommerce-platform',
      startDate: '2020-06-01',
      endDate: '2020-12-15',
      current: false,
      highlights: [
        'Implemented shopping cart with persistent storage',
        'Integrated Stripe payment processing',
        'Built admin dashboard for inventory management',
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API'],
    },
    {
      id: uuidv4(),
      name: 'Task Management App',
      description: 'A Kanban-style task management application with drag-and-drop UI',
      url: 'github.com/alexjohnson/task-manager',
      startDate: '2019-08-01',
      endDate: '2019-11-30',
      current: false,
      highlights: [
        'Built responsive UI with React and styled-components',
        'Implemented drag-and-drop functionality with react-beautiful-dnd',
        'Created RESTful API with Express and MongoDB',
      ],
      technologies: ['React', 'Redux', 'styled-components', 'Express', 'MongoDB'],
    },
  ],
  customSections: [],
}); 