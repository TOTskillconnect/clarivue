export type ReportType = 'fit' | 'risk' | 'alignment' | 'stage' | 'decision';

export interface ConversationSnippet {
  id: string;
  candidateName: string;
  interviewerName: string;
  timestamp: Date;
  content: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  tags: string[];
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
  conversations: ConversationSnippet[];
  metrics?: {
    confidenceScore?: number;
    alignmentScore?: number;
    riskLevel?: 'low' | 'medium' | 'high';
  };
}

export interface ReportFilters {
  role?: string;
  stage?: string;
  interviewer?: string;
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface SmartReportCardData {
  id: string;
  title: string;
  description: string;
  type: ReportType;
  summary: string;
  trend?: 'up' | 'down' | 'stable';
  alert?: boolean;
  metrics?: Report['metrics'];
}

export interface ReportTableItem {
  id: string;
  name: string;
  role: string;
  lastUpdated: Date;
  decisionUse: string;
  type: ReportType;
  tags: string[];
} 