export type ReportType = 'fit' | 'risk' | 'alignment' | 'stage';

export interface ReportFilters {
  role?: string;
  interviewer?: string;
  dateRange?: string;
  stage?: string;
  tags?: string[];
}

export interface ReportTableItem {
  id: string;
  name: string;
  role: string;
  lastUpdated: string;
  type: string;
  tags: string[];
}

export interface SmartReportCardData {
  id: string;
  title: string;
  description: string;
  type: ReportType;
  summary: string;
  trend?: 'up' | 'down' | 'stable';
  alert?: boolean;
  metrics?: {
    confidenceScore?: number;
    alignmentScore?: number;
    riskLevel?: 'low' | 'medium' | 'high';
  };
}

export interface Report {
  id: string;
  title: string;
  description: string;
  type: string;
  role: string;
  stage: string;
  createdBy: string;
  lastUpdated: Date;
  interviewDate: Date;
  summary: string;
  tags: string[];
  conversations: any[]; // TODO: Define conversation type
  metrics: {
    confidenceScore: number;
    alignmentScore: number;
    riskLevel: 'low' | 'medium' | 'high';
  };
  candidate: {
    name: string;
    role: string;
    avatar?: string;
    experience: string;
    location: string;
    education: string;
  };
  synopsis: string;
  strengths: string[];
  concerns: string[];
  overallScore: number;
  wordCloudData: Array<{
    text: string;
    value: number;
    relevance: number;
  }>;
  scorecardCriteria: Array<{
    id: string;
    criterion: string;
    category: string;
    score: number;
    weight: number;
    explanation: string;
  }>;
  transcript: Array<{
    timestamp: string;
    speaker: string;
    text: string;
  }>;
  transcriptWordCount: number;
}

// ... rest of the existing types ... 