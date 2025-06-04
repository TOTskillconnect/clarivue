import { type Criterion } from './hiring';

export type InterviewStatus = 'scheduled' | 'pending' | 'completed' | 'cancelled';

export interface Interview {
  id: string;
  title: string;
  status: InterviewStatus;
  candidateName: string;
  candidateEmail: string;
  scheduledFor?: Date;
  meetingLink?: string;
  criteriaId: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InterviewCriteria {
  id: string;
  title: string;
  criteria: Criterion[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InterviewFormData {
  criteriaId: string;
  candidateName: string;
  candidateEmail: string;
  scheduledFor: Date | null;
  meetingLink: string;
  notes?: string;
}

export interface StepProps {
  onNext: () => void;
  onBack?: () => void;
  isLoading?: boolean;
} 