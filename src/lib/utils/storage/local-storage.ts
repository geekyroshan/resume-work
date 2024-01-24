'use client';

import { ResumeData } from '../../types/resume';

// Constants
const STORAGE_KEY = 'resume-app-data';
const STORAGE_VERSION = '1.0.0';

// Storage data structure with versioning
interface StorageData {
  version: string;
  lastUpdated: string;
  resumes: ResumeData[];
  activeResumeId: string | null;
}

/**
 * Save resumes data to localStorage
 */
export const saveToLocalStorage = (
  resumes: ResumeData[], 
  activeResumeId: string | null
): void => {
  try {
    const storageData: StorageData = {
      version: STORAGE_VERSION,
      lastUpdated: new Date().toISOString(),
      resumes,
      activeResumeId
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Load resumes data from localStorage
 * Returns null if no data is found or an error occurs
 */
export const loadFromLocalStorage = (): {
  resumes: ResumeData[];
  activeResumeId: string | null;
} | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    
    if (!data) {
      return null;
    }
    
    const storageData = JSON.parse(data) as StorageData;
    
    // Basic version check
    if (storageData.version !== STORAGE_VERSION) {
      console.warn(`Storage version mismatch. Expected ${STORAGE_VERSION}, found ${storageData.version}`);
      // Here you could implement migration logic if needed
    }
    
    return {
      resumes: storageData.resumes,
      activeResumeId: storageData.activeResumeId
    };
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

/**
 * Clear all resume data from localStorage
 */
export const clearLocalStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

/**
 * Setup autosave functionality for resume data
 * Returns a cleanup function to remove the subscription
 */
export const setupAutoSave = (
  getResumes: () => ResumeData[],
  getActiveResumeId: () => string | null,
  debounceMs = 1000
): () => void => {
  // Initially store the current state in case it changes before the first autosave
  let pendingResumes: ResumeData[] | null = null;
  let pendingActiveResumeId: string | null = null;
  let saveTimeout: NodeJS.Timeout | null = null;
  
  // Save function with debounce
  const debouncedSave = () => {
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }
    
    pendingResumes = getResumes();
    pendingActiveResumeId = getActiveResumeId();
    
    saveTimeout = setTimeout(() => {
      if (pendingResumes) {
        saveToLocalStorage(pendingResumes, pendingActiveResumeId);
        pendingResumes = null;
        pendingActiveResumeId = null;
      }
    }, debounceMs);
  };
  
  // Set up subscription to Zustand store
  const unsubscribe = subscribeToStore(debouncedSave);
  
  // Return cleanup function
  return () => {
    if (saveTimeout) {
      clearTimeout(saveTimeout);
    }
    unsubscribe();
  };
};

// Helper function to subscribe to store changes
// In a real implementation, you would use the Zustand subscription API
const subscribeToStore = (callback: () => void): () => void => {
  // This is a simplified implementation
  // In reality, you would use the actual Zustand subscribe method
  window.addEventListener('storage-save-needed', callback);
  
  return () => {
    window.removeEventListener('storage-save-needed', callback);
  };
}; 