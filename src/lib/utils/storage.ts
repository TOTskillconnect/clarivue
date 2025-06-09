import { type Scorecard } from '@/types/interview';

const STORAGE_KEYS = {
  SCORECARDS: 'clarivue_scorecards'
} as const;

interface StoredScorecard extends Pick<Scorecard, 'id' | 'title' | 'role'> {
  metrics: number;
  createdAt: string;
}

export const storage = {
  scorecards: {
    getAll(): StoredScorecard[] {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.SCORECARDS);
        return data ? JSON.parse(data) : [];
      } catch (error) {
        console.error('Failed to get scorecards from storage:', error);
        return [];
      }
    },

    save(scorecard: Scorecard): void {
      try {
        const existing = this.getAll();
        const storedScorecard: StoredScorecard = {
          id: scorecard.id,
          title: scorecard.title,
          role: scorecard.role || '',
          metrics: scorecard.metrics.length,
          createdAt: new Date().toISOString()
        };

        // Update if exists, otherwise add
        const updated = existing.some(s => s.id === scorecard.id)
          ? existing.map(s => s.id === scorecard.id ? storedScorecard : s)
          : [...existing, storedScorecard];

        localStorage.setItem(STORAGE_KEYS.SCORECARDS, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save scorecard to storage:', error);
      }
    },

    saveMany(scorecards: Scorecard[]): void {
      try {
        const storedScorecards: StoredScorecard[] = scorecards.map(scorecard => ({
          id: scorecard.id,
          title: scorecard.title,
          role: scorecard.role || '',
          metrics: scorecard.metrics.length,
          createdAt: new Date().toISOString()
        }));

        localStorage.setItem(STORAGE_KEYS.SCORECARDS, JSON.stringify(storedScorecards));
      } catch (error) {
        console.error('Failed to save scorecards to storage:', error);
      }
    },

    remove(id: string): void {
      try {
        const existing = this.getAll();
        const updated = existing.filter(s => s.id !== id);
        localStorage.setItem(STORAGE_KEYS.SCORECARDS, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to remove scorecard from storage:', error);
      }
    }
  }
}; 