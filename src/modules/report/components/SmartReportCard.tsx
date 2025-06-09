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
  const getTypeColor = () => {
    switch (report.type) {
      case 'fit':
        return 'border-emerald-200 text-emerald-700';
      case 'risk':
        return 'border-blue-200 text-blue-700';
      case 'alignment':
        return 'border-violet-200 text-violet-700';
      default:
        return 'border-gray-200 text-gray-700';
    }
  };

  const getTrendIcon = () => {
    if (!report.trend) return null;

    const commonClasses = "h-4 w-4";
    if (report.trend === 'up') {
      return <ArrowUpIcon className={cn(commonClasses, "text-emerald-600")} />;
    }
    if (report.trend === 'down') {
      return <ArrowDownIcon className={cn(commonClasses, "text-red-600")} />;
    }
    return <MinusIcon className={cn(commonClasses, "text-gray-400")} />;
  };

  const getMetricDisplay = () => {
    if (!report.metrics) return null;

    const { confidenceScore, alignmentScore, riskLevel } = report.metrics;

    if (confidenceScore !== undefined) {
      return (
        <div className="space-y-1">
          <span className="text-2xl font-semibold text-gray-900">
            {Math.round(confidenceScore * 100)}%
          </span>
          <span className="block text-sm text-gray-500">Confidence Score</span>
        </div>
      );
    }

    if (alignmentScore !== undefined) {
      return (
        <div className="space-y-1">
          <span className="text-2xl font-semibold text-gray-900">
            {Math.round(alignmentScore * 100)}%
          </span>
          <span className="block text-sm text-gray-500">Alignment Score</span>
        </div>
      );
    }

    if (riskLevel) {
      return (
        <div className="space-y-1">
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
          <span className="block text-sm text-gray-500">Risk Level</span>
        </div>
      );
    }

    return null;
  };

  return (
    <Card className={cn(
      "glossy-card transition-all duration-200 hover:shadow-md",
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
            className="gradient-btn w-full justify-between text-white"
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