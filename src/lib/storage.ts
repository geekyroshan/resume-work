"use client";

import { ResumeData } from './store';

const STORAGE_KEY = 'resume_data';

/**
 * Save resume data to localStorage
 */
export function saveResume(data: ResumeData): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving resume to localStorage:', error);
  }
}

/**
 * Load resume data from localStorage
 */
export function loadResume(): ResumeData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    
    return JSON.parse(data) as ResumeData;
  } catch (error) {
    console.error('Error loading resume from localStorage:', error);
    return null;
  }
}

/**
 * Delete resume data from localStorage
 */
export function deleteResume(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error deleting resume from localStorage:', error);
  }
}

/**
 * Auto-save resume data when store is updated
 */
export function setupAutoSave(callback: (data: ResumeData) => void): () => void {
  let timeoutId: NodeJS.Timeout | null = null;
  
  const autoSave = (data: ResumeData) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    // Debounce save to avoid excessive writes
    timeoutId = setTimeout(() => {
      saveResume(data);
      callback(data);
    }, 500);
  };
  
  // Return cleanup function
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };
} 