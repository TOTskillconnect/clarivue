import React from 'react';
import type { Report } from '@/modules/report/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ScorecardTabProps {
  report: Report;
  onScoreChange: (criterionId: string, newScore: number) => void;
  onExplanationChange: (criterionId: string, newExplanation: string) => void;
  onAutoScore: (criterionId: string) => void;
}

export const ScorecardTab: React.FC<ScorecardTabProps> = ({
  report,
  onScoreChange,
  onExplanationChange,
  onAutoScore,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-emerald-600 bg-emerald-50';
    if (score >= 3) return 'text-blue-600 bg-blue-50';
    if (score >= 2) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-8">
      <Card className="glossy-card p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Interview Scorecard</h3>
          <p className="text-sm text-gray-500">
            Rate each criterion from 1-5 and provide explanations
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Criterion</TableHead>
              <TableHead className="w-[120px]">Category</TableHead>
              <TableHead className="w-[100px] text-center">Score</TableHead>
              <TableHead>Explanation</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {report.scorecardCriteria?.map((criterion) => (
              <TableRow key={criterion.id}>
                <TableCell className="font-medium">
                  {criterion.criterion}
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {criterion.category}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        onClick={() => onScoreChange(criterion.id, score)}
                        className={cn(
                          'w-8 h-8 rounded-full text-sm font-medium transition-all',
                          criterion.score === score
                            ? getScoreColor(score)
                            : 'text-gray-400 hover:bg-gray-100'
                        )}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Textarea
                    value={criterion.explanation}
                    onChange={(e) => onExplanationChange(criterion.id, e.target.value)}
                    placeholder="Add your explanation..."
                    className="min-h-[80px] resize-none"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gradient-btn text-white w-full"
                    onClick={() => onAutoScore(criterion.id)}
                  >
                    <Wand2 className="h-4 w-4 mr-1" />
                    Auto
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}; 