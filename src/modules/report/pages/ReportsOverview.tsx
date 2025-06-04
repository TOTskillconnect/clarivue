import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SmartReportCard } from '../components/SmartReportCard';
import { ReportTable } from '../components/ReportTable';
import { FilterBar } from '../components/FilterBar';
import { useReportStore } from '../store/reportStore';
import { Report, ReportTableItem } from '../types';

const MOCK_ROLES = ['Software Engineer', 'Product Manager', 'Designer', 'Frontend Developer'];
const MOCK_STAGES = ['Initial', 'Technical', 'Final', 'Team Interview'];
const MOCK_INTERVIEWERS = ['John Doe', 'Jane Smith', 'Bob Wilson', 'Mike Wilson'];
const MOCK_TAGS = [
  'Technical Skills',
  'Communication',
  'Leadership',
  'Culture Fit',
  'Problem Solving',
  'React',
  'TypeScript',
  'Team Fit',
  'Product Strategy',
  'Risk Assessment'
];

// Transform Report to ReportTableItem
const transformReports = (reports: Report[]): ReportTableItem[] => {
  return reports.map(report => ({
    id: report.id,
    name: report.title,
    role: report.role,
    lastUpdated: report.lastUpdated,
    decisionUse: report.type === 'decision' ? 'High' : 'Medium',
    type: report.type,
    tags: report.tags,
  }));
};

export const ReportsOverview: React.FC = () => {
  const {
    filters,
    setFilters,
    reports,
    smartReports,
    isLoading,
    error,
    fetchReports,
  } = useReportStore();

  // Fetch reports on mount
  useEffect(() => {
    fetchReports(filters);
  }, []);

  const handleViewReport = (reportId: string) => {
    // TODO: Implement report view navigation
    console.log('View report:', reportId);
  };

  // Transform reports for table display
  const tableReports = transformReports(reports);

  if (isLoading && reports.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Reports that matter. Nothing else.
        </h1>
        <p className="text-lg text-muted-foreground">
          These reports are designed to help you decide faster, hire smarter, and surface red flags — all based on your interview context.
        </p>
      </div>

      {/* Filters */}
      <FilterBar
        filters={filters}
        onUpdateFilters={setFilters}
        roles={MOCK_ROLES}
        stages={MOCK_STAGES}
        interviewers={MOCK_INTERVIEWERS}
        availableTags={MOCK_TAGS}
      />

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.message}</span>
        </div>
      )}

      {/* Smart Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {smartReports.map((report) => (
          <SmartReportCard
            key={report.id}
            report={report}
            onViewDetails={handleViewReport}
          />
        ))}
      </div>

      {/* Report Categories */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="fit">Candidate Fit</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="alignment">Team Alignment</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Reports</CardTitle>
              <CardDescription>
                A comprehensive view of all interview insights and analyses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReportTable
                reports={tableReports}
                isLoading={isLoading}
                onViewReport={handleViewReport}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fit">
          <Card>
            <CardHeader>
              <CardTitle>Candidate Fit Reports</CardTitle>
              <CardDescription>
                Analyze how well candidates align with role requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReportTable
                reports={tableReports.filter(r => r.type === 'fit')}
                isLoading={isLoading}
                onViewReport={handleViewReport}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk">
          <Card>
            <CardHeader>
              <CardTitle>Risk Analysis Reports</CardTitle>
              <CardDescription>
                Identify potential concerns and red flags
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReportTable
                reports={tableReports.filter(r => r.type === 'risk')}
                isLoading={isLoading}
                onViewReport={handleViewReport}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alignment">
          <Card>
            <CardHeader>
              <CardTitle>Team Alignment Reports</CardTitle>
              <CardDescription>
                Track consensus and decision alignment across the interview team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReportTable
                reports={tableReports.filter(r => r.type === 'alignment')}
                isLoading={isLoading}
                onViewReport={handleViewReport}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}; 