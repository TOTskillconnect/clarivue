import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, AlertTriangleIcon, ChevronRightIcon } from 'lucide-react';
import { SmartReportCardData } from '../types';
import { cn } from '@/lib/utils';

interface SmartReportCardProps {
  report: SmartReportCardData;
  onViewDetails?: (reportId: string) => void;
}

export const SmartReportCard: React.FC<SmartReportCardProps> = ({
  report,
  onViewDetails,
}) => {
  const getTrendIcon = () => {
    switch (report.trend) {
      case 'up':
        return <ArrowUpIcon className="h-4 w-4 text-emerald-500" />;
      case 'down':
        return <ArrowDownIcon className="h-4 w-4 text-red-500" />;
      default:
        return <MinusIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeColor = () => {
    switch (report.type) {
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

  const getMetricDisplay = () => {
    if (!report.metrics) return null;

    const { confidenceScore, alignmentScore, riskLevel } = report.metrics;

    if (confidenceScore !== undefined) {
      return (
        <div className="text-2xl font-semibold">
          {Math.round(confidenceScore * 100)}%
          <span className="text-sm text-muted-foreground ml-1">confidence</span>
        </div>
      );
    }

    if (alignmentScore !== undefined) {
      return (
        <div className="text-2xl font-semibold">
          {Math.round(alignmentScore * 100)}%
          <span className="text-sm text-muted-foreground ml-1">aligned</span>
        </div>
      );
    }

    if (riskLevel) {
      return (
        <Badge
          variant="outline"
          className={cn(
            "text-sm",
            riskLevel === 'high' && "bg-red-50 text-red-700 border-red-200",
            riskLevel === 'medium' && "bg-yellow-50 text-yellow-700 border-yellow-200",
            riskLevel === 'low' && "bg-emerald-50 text-emerald-700 border-emerald-200"
          )}
        >
          {riskLevel.toUpperCase()} RISK
        </Badge>
      );
    }

    return null;
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md",
      report.alert && "border-orange-300 bg-orange-50/30"
    )}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">
              {report.title}
            </CardTitle>
            <CardDescription>{report.description}</CardDescription>
          </div>
          <Badge variant="outline" className={cn("ml-2", getTypeColor())}>
            {report.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Metrics */}
          <div className="flex items-center justify-between">
            {getMetricDisplay()}
            <div className="flex items-center gap-1">
              {getTrendIcon()}
              {report.alert && (
                <AlertTriangleIcon className="h-4 w-4 text-orange-500 ml-1" />
              )}
            </div>
          </div>

          {/* Summary */}
          <p className="text-sm text-muted-foreground">
            {report.summary}
          </p>

          {/* Action */}
          <Button
            variant="ghost"
            className="w-full justify-between hover:bg-transparent hover:text-blue-600"
            onClick={() => onViewDetails?.(report.id)}
          >
            View Details
            <ChevronRightIcon className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 