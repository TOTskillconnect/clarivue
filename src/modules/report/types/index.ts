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
  type: ReportType;
  role: string;
  stage: string;
  createdBy: string;
  lastUpdated: Date;
  summary: string;
  tags: string[];
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