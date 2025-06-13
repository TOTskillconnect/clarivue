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
      console.log('Looking for scorecard with ID:', id, 'in', scorecards.length, 'scorecards');
      const found = scorecards.find(s => s.id === id) || null;
      console.log('Found scorecard:', found);
      return found;
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

      console.log('Saving scorecard to storage:', newScorecard);
      const updatedScorecards = [...scorecards, newScorecard];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScorecards));
      console.log('Storage updated, total scorecards:', updatedScorecards.length);
      
      // Verify the save worked
      const verification = localStorage.getItem(STORAGE_KEY);
      const parsed = verification ? JSON.parse(verification) : [];
      console.log('Verification - stored scorecards count:', parsed.length);
      console.log('Verification - can find new scorecard:', parsed.find((s: Scorecard) => s.id === newScorecard.id) !== undefined);
      
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