import { type Metric } from '@/types/interview';

export interface Scorecard {
  id: string;
  title: string;
  description?: string;
  metrics: Metric[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'clarivue_scorecards';

export const scorecardStorage = {
  getAll: (): Scorecard[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get scorecards from storage:', error);
      return [];
    }
  },

  getById: (id: string): Scorecard | null => {
    try {
      const scorecards = scorecardStorage.getAll();
      return scorecards.find(s => s.id === id) || null;
    } catch (error) {
      console.error('Failed to get scorecard from storage:', error);
      return null;
    }
  },

  save: (scorecard: Omit<Scorecard, 'id' | 'createdAt' | 'updatedAt'>): Scorecard => {
    try {
      const scorecards = scorecardStorage.getAll();
      const now = new Date().toISOString();
      
      const newScorecard: Scorecard = {
        ...scorecard,
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify([...scorecards, newScorecard]));
      return newScorecard;
    } catch (error) {
      console.error('Failed to save scorecard to storage:', error);
      throw new Error('Failed to save scorecard');
    }
  },

  update: (id: string, updates: Partial<Scorecard>): Scorecard => {
    const scorecards = scorecardStorage.getAll();
    const index = scorecards.findIndex(s => s.id === id);
    
    if (index === -1) {
      throw new Error('Scorecard not found');
    }

    const updatedScorecard = {
      ...scorecards[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    scorecards[index] = updatedScorecard;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scorecards));
    
    return updatedScorecard;
  },

  delete: (id: string): void => {
    try {
      const scorecards = scorecardStorage.getAll();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scorecards.filter(s => s.id !== id)));
    } catch (error) {
      console.error('Failed to delete scorecard from storage:', error);
      throw new Error('Failed to delete scorecard');
    }
  }
}; 