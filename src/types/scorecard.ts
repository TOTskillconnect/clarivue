import { type ScorecardResponse } from './interview';

export interface ScorecardCategory {
  id: string;
  name: string;
  weight: number;
  criteria: ScorecardCriterion[];
}

export interface ScorecardCriterion {
  id: string;
  name: string;
  weight: number;
  description: string;
  isEnabled: boolean;
}

export interface Scorecard {
  id: string;
  jobTitle: string;
  categories: ScorecardCategory[];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScorecardFormData {
  jobTitle: string;
  categories: ScorecardCategory[];
  notes?: string;
}

export interface ScorecardContextState {
  scorecard: Scorecard | null;
  isEditing: boolean;
  setScorecard: (scorecard: Scorecard) => void;
  updateCategory: (categoryId: string, updates: Partial<ScorecardCategory>) => void;
  updateCriterion: (categoryId: string, criterionId: string, updates: Partial<ScorecardCriterion>) => void;
  addCriterion: (categoryId: string, criterion: Omit<ScorecardCriterion, 'id'>) => void;
  removeCriterion: (categoryId: string, criterionId: string) => void;
  recalculateWeights: () => void;
  setIsEditing: (isEditing: boolean) => void;
  saveScorecard: () => Promise<void>;
} 