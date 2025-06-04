export interface Criterion {
  id: string;
  label: string;
  description: string;
  weight: number;
  isFromJD: boolean;
  synonyms: string[];
  required: boolean;
}

export interface JDInput {
  text: string;
  url?: string;
}

export interface JDAnalysisResponse {
  criteria: Criterion[];
  summary?: string;
  confidence: number;
}

export interface CriterionFormData {
  label: string;
  description: string;
  synonyms: string[];
  weight: number;
}

export interface CriteriaState {
  criteria: Criterion[];
  isAnalyzing: boolean;
  error?: string;
}

export interface HiringCriteria {
  id: string;
  title: string;
  criteria: Criterion[];
  jdText: string;
  createdAt: string;
  updatedAt: string;
} 