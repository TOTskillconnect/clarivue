import React from 'react';
import { format } from 'date-fns';
import { ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
import { cn } from '@/lib/utils';

interface MetricCardProps {
  value: number;
  label: string;
  onClick?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({ value, label, onClick }) => (
  <Card
    className={cn(
      'p-6 transition-all hover:translate-y-[-2px] hover:shadow-md cursor-pointer',
      'flex flex-col items-center justify-center text-center h-[160px] w-[160px]'
    )}
    onClick={onClick}
  >
    <span className="text-2xl font-semibold text-gray-900">{value.toLocaleString()}</span>
    <span className="mt-2 text-xs font-medium tracking-wider text-gray-500 uppercase">{label}</span>
  </Card>
);

interface Report {
  id: string;
  candidateName: string;
  role: string;
  date: Date;
  status: 'Draft' | 'Sent' | 'Done';
}

export const ReportsOverviewPage: React.FC = () => {
  const metrics = [
    { value: 128, label: 'Interviews' },
    { value: 342, label: 'Follow-Up Qs Generated' },
    { value: 76, label: 'Cue & Tip Records' },
    { value: 1254, label: 'Question Bank' },
    { value: 84, label: 'Avg Fit Score %' },
    { value: 12, label: 'Draft Reports' },
  ];

  const reports: Report[] = [
    {
      id: '1',
      candidateName: 'Sarah Chen',
      role: 'Frontend Engineer',
      date: new Date('2025-07-12'),
      status: 'Done',
    },
    {
      id: '2',
      candidateName: 'Jamal Malik',
      role: 'Product Manager',
      date: new Date('2025-07-10'),
      status: 'Draft',
    },
    {
      id: '3',
      candidateName: 'Priya Singh',
      role: 'Data Analyst',
      date: new Date('2025-07-08'),
      status: 'Sent',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              value={metric.value}
              label={metric.label}
            />
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineer">Engineer</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="product">Product</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Interviewer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alice">Alice Smith</SelectItem>
                <SelectItem value="bob">Bob Johnson</SelectItem>
                <SelectItem value="carol">Carol Williams</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="leadership">Leadership</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="search"
              placeholder="Search candidates..."
              className="w-[240px]"
            />
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 flex items-center justify-between border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Interviews</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Interview
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow
                  key={report.id}
                  className="group hover:bg-gray-50"
                >
                  <TableCell className="font-medium">{report.candidateName}</TableCell>
                  <TableCell>{report.role}</TableCell>
                  <TableCell>{format(report.date, 'MMM dd, yy')}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        report.status === 'Done' && 'bg-green-100 text-green-800',
                        report.status === 'Draft' && 'bg-gray-100 text-gray-800',
                        report.status === 'Sent' && 'bg-blue-100 text-blue-800'
                      )}
                    >
                      {report.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100"
                    >
                      {report.status === 'Draft' ? 'Edit' : 'View'}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="p-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
            <span>Showing 1-10 of 65</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 