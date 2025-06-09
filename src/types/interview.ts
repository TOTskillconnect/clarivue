import { type Criterion } from './hiring';

export type InterviewStatus = 'scheduled' | 'pending' | 'completed' | 'cancelled';

export interface ScorecardResponse {
  job_title: string;
  metrics: Array<{
    id: string;
    name: string;
    weight: number;
    description: string;
  }>;
}

export interface Interview {
  id: string;
  title: string;
  status: InterviewStatus;
  candidateName: string;
  candidateEmail: string;
  scheduledFor?: string | Date;
  meetingLink?: string;
  scorecardId: string;
  notes?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface InterviewCriteria {
  id: string;
  title: string;
  criteria: Criterion[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Metric {
  id: string;
  name: string;
  description: string;
  weight: number;
}

export interface Scorecard {
  id: string;
  title: string;
  description?: string;
  role?: string;
  metrics: Metric[];
  createdAt?: string;
  updatedAt?: string;
}

export interface InterviewFormData {
  scorecardId: string;
  candidateName: string;
  candidateEmail: string;
  scheduledFor: string;
  meetingLink: string;
  notes: string;
}

export interface StepProps {
  onNext: () => void;
  onBack?: () => void;
  isLoading?: boolean;
}

export interface InterviewQuestion {
  metricId: string;
  primaryQuestion: string;
  followUpQuestions: string[];
  indicators: {
    positive: string[];
    negative: string[];
  };
  scoringGuidelines: {
    [score: number]: string;
  };
}

export interface InterviewQuestions {
  questions: InterviewQuestion[];
}

export interface InterviewReport {
  overallAssessment: string;
  scores: {
    metricId: string;
    score: number;
    notes: string;
  }[];
  strengths: string[];
  concerns: string[];
  fitAnalysis: {
    score: number;
    explanation: string;
  };
  riskAssessment: {
    level: 'low' | 'medium' | 'high';
    factors: string[];
  };
}

export interface CreateScorecardDTO {
  metrics: Metric[];
  title: string;
  description: string;
  role: string;
} 