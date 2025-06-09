import { create } from 'zustand';
import { ReportFilters, Report, SmartReportCardData, ReportType } from '../types';

interface ReportStore {
  // Filters
  filters: ReportFilters;
  setFilters: (filters: Partial<ReportFilters>) => void;
  resetFilters: () => void;

  // Reports
  reports: Report[];
  smartReports: SmartReportCardData[];
  isLoading: boolean;
  error: Error | null;

  // Actions
  fetchReports: (filters: ReportFilters) => Promise<void>;
  generateSmartReports: () => void;
}

const defaultFilters: ReportFilters = {
  role: undefined,
  stage: undefined,
  interviewer: undefined,
  tags: [],
  dateRange: undefined,
};

// Mock data for initial development
const mockReports: Report[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer Interview',
    description: 'Technical assessment and culture fit evaluation',
    type: 'fit',
    role: 'Frontend Developer',
    stage: 'Technical Interview',
    createdBy: 'John Doe',
    lastUpdated: new Date(),
    summary: 'Strong technical skills with good cultural alignment',
    tags: ['React', 'TypeScript', 'Leadership'],
    conversations: [],
    metrics: {
      confidenceScore: 0.85,
      alignmentScore: 0.9,
      riskLevel: 'low',
    },
    candidate: {
      name: 'Sarah Chen',
      role: 'Senior Frontend Developer',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen',
      experience: '8+ years in frontend development',
      location: 'San Francisco, CA',
      education: 'MS Computer Science, Stanford University',
    },
    synopsis: 'Sarah demonstrated exceptional technical expertise in React and modern frontend architecture. Her experience leading teams and mentoring junior developers aligns well with our needs. She showed strong problem-solving skills during the system design discussion.',
    strengths: [
      'Deep expertise in React and TypeScript',
      'Strong system design and architecture skills',
      'Proven leadership experience',
      'Excellent communication skills',
      'Active open source contributor'
    ],
    concerns: [
      'Limited experience with our specific tech stack',
      'May need time to adapt to our development processes',
      'Higher salary expectations'
    ],
    overallScore: 85,
    wordCloudData: [
      { text: 'React', value: 100, relevance: 0.9 },
      { text: 'TypeScript', value: 85, relevance: 0.85 },
      { text: 'Leadership', value: 75, relevance: 0.8 },
      { text: 'Architecture', value: 70, relevance: 0.75 },
      { text: 'Testing', value: 65, relevance: 0.7 },
      { text: 'Performance', value: 60, relevance: 0.65 },
      { text: 'Mentoring', value: 55, relevance: 0.6 },
      { text: 'Communication', value: 50, relevance: 0.55 }
    ],
    scorecardCriteria: [
      {
        id: 'tech-1',
        criterion: 'Frontend Development',
        category: 'Technical Skills',
        score: 4.5,
        weight: 0.3,
        explanation: 'Excellent knowledge of React, TypeScript, and modern frontend practices.'
      },
      {
        id: 'tech-2',
        criterion: 'System Design',
        category: 'Technical Skills',
        score: 4.0,
        weight: 0.2,
        explanation: 'Strong understanding of scalable architecture and performance optimization.'
      },
      {
        id: 'soft-1',
        criterion: 'Leadership',
        category: 'Soft Skills',
        score: 4.0,
        weight: 0.25,
        explanation: 'Demonstrated experience leading teams and mentoring junior developers.'
      },
      {
        id: 'soft-2',
        criterion: 'Communication',
        category: 'Soft Skills',
        score: 4.5,
        weight: 0.25,
        explanation: 'Clear and articulate communication, both technical and non-technical.'
      }
    ],
    transcript: [
      {
        timestamp: '00:00',
        speaker: 'Interviewer',
        text: 'Could you walk us through your experience with React and modern frontend development?'
      },
      {
        timestamp: '00:45',
        speaker: 'Sarah',
        text: 'I\'ve been working with React for the past 6 years, starting with class components and seeing the evolution to hooks and modern patterns. In my current role, I\'ve led the migration of a large-scale application from a legacy framework to React with TypeScript.'
      },
      {
        timestamp: '02:15',
        speaker: 'Interviewer',
        text: 'Can you tell us about a challenging technical problem you\'ve solved recently?'
      },
      {
        timestamp: '03:00',
        speaker: 'Sarah',
        text: 'Recently, I tackled a performance issue in our application where the main dashboard was taking too long to load. I implemented a combination of code splitting, virtualization for long lists, and strategic data fetching which reduced the initial load time by 60%.'
      }
    ],
    transcriptWordCount: 1250
  },
  {
    id: '2',
    title: 'Product Manager Risk Analysis',
    description: 'Evaluation of potential concerns',
    type: 'risk',
    role: 'Product Manager',
    stage: 'Final Interview',
    createdBy: 'Jane Smith',
    lastUpdated: new Date(),
    summary: 'Some concerns about project management experience',
    tags: ['Product Strategy', 'Risk Assessment'],
    conversations: [],
    metrics: {
      confidenceScore: 0.7,
      alignmentScore: 0.75,
      riskLevel: 'medium',
    },
  },
  {
    id: '3',
    title: 'Engineering Team Alignment',
    description: 'Cross-team interview feedback analysis',
    type: 'alignment',
    role: 'Software Engineer',
    stage: 'Team Interview',
    createdBy: 'Mike Wilson',
    lastUpdated: new Date(),
    summary: 'High alignment across engineering interviewers',
    tags: ['Team Fit', 'Technical Skills'],
    conversations: [],
    metrics: {
      confidenceScore: 0.9,
      alignmentScore: 0.95,
      riskLevel: 'low',
    },
  },
];

export const useReportStore = create<ReportStore>((set, get) => ({
  // Initial state
  filters: defaultFilters,
  reports: mockReports, // Initialize with mock data
  smartReports: [],
  isLoading: false,
  error: null,

  // Filter actions
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
    get().fetchReports(get().filters);
  },

  resetFilters: () => {
    set({ filters: defaultFilters });
    get().fetchReports(defaultFilters);
  },

  // Data fetching
  fetchReports: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      // For now, just simulate an API call with mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter mock data based on filters
      let filteredReports = [...mockReports];
      
      if (filters.role && filters.role !== 'all') {
        filteredReports = filteredReports.filter(r => r.role === filters.role);
      }
      if (filters.stage && filters.stage !== 'all') {
        filteredReports = filteredReports.filter(r => r.stage === filters.stage);
      }
      if (filters.interviewer && filters.interviewer !== 'all') {
        filteredReports = filteredReports.filter(r => r.createdBy === filters.interviewer);
      }
      if (filters.tags?.length) {
        filteredReports = filteredReports.filter(r => 
          filters.tags?.some(tag => r.tags.includes(tag))
        );
      }
      
      set({ reports: filteredReports });
      get().generateSmartReports();
    } catch (error) {
      set({ error: error as Error });
    } finally {
      set({ isLoading: false });
    }
  },

  // Smart report generation
  generateSmartReports: () => {
    const { reports } = get();
    
    const smartReports: SmartReportCardData[] = [
      {
        id: 'fit-overview',
        title: 'Candidate Fit Analysis',
        description: 'Overall alignment with requirements',
        type: 'fit',
        summary: generateFitSummary(reports),
        trend: calculateTrend(reports, 'fit'),
        metrics: {
          confidenceScore: calculateAverageConfidence(reports),
        },
      },
      {
        id: 'risk-overview',
        title: 'Risk Assessment',
        description: 'Potential concerns and red flags',
        type: 'risk',
        summary: generateRiskSummary(reports),
        trend: calculateTrend(reports, 'risk'),
        alert: hasHighRisks(reports),
        metrics: {
          riskLevel: calculateOverallRisk(reports),
        },
      },
      {
        id: 'alignment-overview',
        title: 'Team Alignment',
        description: 'Interview team consensus',
        type: 'alignment',
        summary: generateAlignmentSummary(reports),
        trend: calculateTrend(reports, 'alignment'),
        metrics: {
          alignmentScore: calculateAverageAlignment(reports),
        },
      },
    ];

    set({ smartReports });
  },
}));

// Helper functions for smart report generation
function generateFitSummary(reports: Report[]): string {
  const fitReports = reports.filter(r => r.type === 'fit');
  const highConfidence = fitReports.filter(r => r.metrics?.confidenceScore && r.metrics.confidenceScore > 0.8).length;
  return `${highConfidence}/${fitReports.length} candidates show strong alignment`;
}

function generateRiskSummary(reports: Report[]): string {
  const highRiskCount = reports.filter(r => r.metrics?.riskLevel === 'high').length;
  return `${highRiskCount} candidates flagged for potential concerns`;
}

function generateAlignmentSummary(reports: Report[]): string {
  const alignedCount = reports.filter(r => r.metrics?.alignmentScore && r.metrics.alignmentScore > 0.8).length;
  return `${alignedCount}/${reports.length} interviews show strong team alignment`;
}

function calculateTrend(reports: Report[], type: ReportType): 'up' | 'down' | 'stable' {
  // Simplified trend calculation
  return reports.length > 2 ? 'up' : 'stable';
}

function calculateAverageConfidence(reports: Report[]): number {
  const scores = reports
    .map(r => r.metrics?.confidenceScore)
    .filter((score): score is number => score !== undefined);
  return scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0.75;
}

function hasHighRisks(reports: Report[]): boolean {
  return reports.some(r => r.metrics?.riskLevel === 'high');
}

function calculateOverallRisk(reports: Report[]): 'low' | 'medium' | 'high' {
  const riskCounts = reports.reduce((acc, r) => {
    if (r.metrics?.riskLevel) {
      acc[r.metrics.riskLevel]++;
    }
    return acc;
  }, { low: 0, medium: 0, high: 0 });

  if (riskCounts.high > 0) return 'high';
  if (riskCounts.medium > riskCounts.low) return 'medium';
  return 'low';
}

function calculateAverageAlignment(reports: Report[]): number {
  const scores = reports
    .map(r => r.metrics?.alignmentScore)
    .filter((score): score is number => score !== undefined);
  return scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0.8;
} 