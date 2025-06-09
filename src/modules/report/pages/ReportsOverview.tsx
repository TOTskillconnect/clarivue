import React from 'react';
import { format } from 'date-fns';
import { ChevronRight, Plus, Search, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useReportStore } from '../store/reportStore';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Add CSS keyframes for animations
const styles = `
  @keyframes shine {
    from {
      background-position: 200% center;
    }
    to {
      background-position: -200% center;
    }
  }
  
  @keyframes borderGlow {
    0%, 100% {
      border-color: rgba(127, 220, 215, 0.2);
    }
    50% {
      border-color: rgba(172, 186, 255, 0.6);
    }
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .gradient-btn {
    background: linear-gradient(135deg, #7FDCD7 0%, #ACBAFF 100%);
    transition: all 0.3s ease;
  }
  
  .gradient-btn:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  .glossy-card {
    position: relative;
    overflow: hidden;
    background: white;
    border: 1px solid transparent;
    animation: borderGlow 3s ease-in-out infinite;
  }

  .glossy-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(127, 220, 215, 0.1),
      rgba(172, 186, 255, 0.1),
      transparent
    );
    animation: shimmer 3s infinite;
    transform: skewX(-15deg);
  }

  .glossy-card::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0.1) 20%,
      transparent 40%,
      transparent 100%
    );
    pointer-events: none;
  }
`;

const MOCK_ROLES = ['Software Engineer', 'Product Manager', 'Designer', 'Frontend Developer'];
const MOCK_INTERVIEWERS = ['John Doe', 'Jane Smith', 'Bob Wilson', 'Mike Wilson'];
const PIPELINE_STAGES = [
  'Initial Screen',
  'Technical Round',
  'Team Interview',
  'Culture Fit',
  'Final Round',
  'Offer Stage'
];

export const ReportsOverview: React.FC = () => {
  const navigate = useNavigate();
  const { reports } = useReportStore();

  const handleViewReport = (reportId: string) => {
    navigate(`/dashboard/reports/${reportId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Initial Screen':
        return 'bg-[#E8F5FF] text-[#0072E5]';
      case 'Technical Round':
        return 'bg-[#F3E8FF] text-[#9333EA]';
      case 'Team Interview':
        return 'bg-[#ACBAFF] text-[#4338CA]';
      case 'Culture Fit':
        return 'bg-[#FCE7F6] text-[#DB2777]';
      case 'Final Round':
        return 'bg-[#7FDCD7] text-[#04ADA4]';
      case 'Offer Stage':
        return 'bg-[#ECFDF5] text-[#059669]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen bg-[#FAFAFA] p-8">
        <div className="max-w-[1400px] mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-[#04ADA4] to-[#7FDCD7] bg-clip-text text-transparent">
              Reports that matter.
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              These reports are designed to help you decide faster, hire smarter, and surface red flags — all based on your interview context.
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
            <MetricCard value={128} label="Total Interviews" trend="up" />
            <MetricCard value={342} label="Follow-Up Qs Generated" trend="up" />
            <MetricCard value={76} label="Cue & Tip Records" trend="neutral" />
            <MetricCard value={1254} label="Question Bank Size" trend="up" />
            <MetricCard value={84} label="Average Fit Score" trend="up" />
            <MetricCard value={12} label="Active Draft Reports" trend="neutral" />
          </div>

          {/* Filters */}
          <div className="glossy-card rounded-xl p-5 shadow-sm">
            <div className="flex flex-wrap gap-4 items-center">
              <Select>
                <SelectTrigger className="w-[160px] border-gray-200 hover:border-[#04ADA4] transition-colors">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_ROLES.map(role => (
                    <SelectItem key={role} value={role.toLowerCase()}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[160px] border-gray-200 hover:border-[#04ADA4] transition-colors">
                  <SelectValue placeholder="Interviewer" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_INTERVIEWERS.map(interviewer => (
                    <SelectItem key={interviewer} value={interviewer.toLowerCase()}>
                      {interviewer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[160px] border-gray-200 hover:border-[#04ADA4] transition-colors">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[160px] border-gray-200 hover:border-[#04ADA4] transition-colors">
                  <SelectValue placeholder="Pipeline Stage" />
                </SelectTrigger>
                <SelectContent>
                  {PIPELINE_STAGES.map(stage => (
                    <SelectItem key={stage} value={stage.toLowerCase()}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search candidates..."
                  className="pl-9 border-gray-200 hover:border-[#04ADA4] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Reports Table */}
          <div className="glossy-card rounded-xl overflow-hidden shadow-sm">
            <div className="p-5 flex items-center justify-between border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Recent Interviews</h2>
              <Button className="gradient-btn text-white shadow-sm">
                <Plus className="h-4 w-4 mr-2" />
                New Interview
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-medium text-gray-600">Candidate</TableHead>
                  <TableHead className="font-medium text-gray-600">Role</TableHead>
                  <TableHead className="font-medium text-gray-600">Date</TableHead>
                  <TableHead className="font-medium text-gray-600">Pipeline Stage</TableHead>
                  <TableHead className="text-right font-medium text-gray-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow
                    key={report.id}
                    className="group hover:bg-gray-50/50"
                  >
                    <TableCell className="font-medium">
                      {report.title}
                    </TableCell>
                    <TableCell className="text-gray-600">{report.role}</TableCell>
                    <TableCell className="text-gray-600">{format(report.lastUpdated, 'MMM dd, yy')}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                          getStatusColor(report.stage)
                        )}
                      >
                        {report.stage}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 gradient-btn text-white"
                        onClick={() => handleViewReport(report.id)}
                      >
                        View Details
                        <ArrowUpRight className="h-4 w-4 ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="p-5 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
              <span>Showing 1-10 of 65</span>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled
                  className="gradient-btn text-white"
                >
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="gradient-btn text-white"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface MetricCardProps {
  value: number;
  label: string;
  trend?: 'up' | 'down' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({ value, label, trend }) => {
  const getTrendIcon = () => {
    if (!trend) return null;
    
    const commonClasses = "h-4 w-4 ml-1";
    if (trend === 'up') {
      return <ArrowUpRight className={cn(commonClasses, "text-emerald-600")} />;
    }
    if (trend === 'down') {
      return <ArrowUpRight className={cn(commonClasses, "text-red-600 rotate-90")} />;
    }
    return <ArrowUpRight className={cn(commonClasses, "text-gray-400 rotate-45")} />;
  };

  return (
    <div className="glossy-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-[2px]">
      <div className="flex items-start justify-between">
        <span className="text-2xl font-semibold text-gray-900">{value.toLocaleString()}</span>
        {getTrendIcon()}
      </div>
      <span className="mt-2 text-sm text-gray-500 block">{label}</span>
    </div>
  );
}; 