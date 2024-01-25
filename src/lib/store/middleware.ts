import { StateCreator, StoreMutatorIdentifier } from 'zustand';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/storage/local-storage';
import { ResumeState } from './store';

type Logger = <
  T extends object,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>;

type LocalStorage = <
  T extends object,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>
) => StateCreator<T, Mps, Mcs>;

/**
 * Create a logger middleware for Zustand store
 */
export const logger: Logger = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = (...args) => {
    const result = set(...args);
    const state = get();
    console.log(`${name || 'store'} updated:`, state);
    return result;
  };
  
  return f(loggedSet, get, store);
};

/**
 * Create a localStorage persistence middleware for Zustand store
 */
export const persist: LocalStorage = (f) => (set, get, store) => {
  // Try to load data from localStorage on initialization
  const savedData = loadFromLocalStorage();
  
  // Create a wrapped setter that also persists to localStorage
  const persistedSet: typeof set = (...args) => {
    const result = set(...args);
    const state = get() as ResumeState;
    
    // Persist to localStorage after state updates
    saveToLocalStorage(state.resumes, state.activeResumeId);
    
    return result;
  };

  // Initialize the store with the persisted setter
  const storeWithMiddleware = f(persistedSet, get, store);
  
  // Initialize with saved data if it exists
  if (savedData) {
    set({
      resumes: savedData.resumes,
      activeResumeId: savedData.activeResumeId
    } as Partial<ResumeState>);
  }
  
  return storeWithMiddleware;
}; 