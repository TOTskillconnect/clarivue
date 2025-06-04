import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRightIcon } from 'lucide-react';
import { ReportTableItem } from '../types';
import { formatDistanceToNow } from 'date-fns';

interface ReportTableProps {
  reports: ReportTableItem[];
  isLoading?: boolean;
  onViewReport?: (reportId: string) => void;
}

export const ReportTable: React.FC<ReportTableProps> = ({
  reports,
  isLoading,
  onViewReport,
}) => {
  const getTypeColor = (type: ReportTableItem['type']) => {
    switch (type) {
      case 'fit':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'risk':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'alignment':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'stage':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Report Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No reports found.
              </TableCell>
            </TableRow>
          ) : (
            reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.name}</TableCell>
                <TableCell>{report.role}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDistanceToNow(new Date(report.lastUpdated), { addSuffix: true })}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getTypeColor(report.type)}
                  >
                    {report.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {report.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-gray-50"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewReport?.(report.id)}
                  >
                    View
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}; 