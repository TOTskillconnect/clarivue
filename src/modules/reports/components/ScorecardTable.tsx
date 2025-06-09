import React from 'react';
import { Star, StarHalf, Download, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ScorecardCriterion {
  id: string;
  criterion: string;
  category: string;
  score: number;
  weight: number;
  explanation: string;
}

interface ScorecardTableProps {
  criteria: ScorecardCriterion[];
  onScoreChange: (id: string, score: number) => void;
  onExplanationChange: (id: string, explanation: string) => void;
  onAutoScore: () => void;
}

export const ScorecardTable: React.FC<ScorecardTableProps> = ({
  criteria,
  onScoreChange,
  onExplanationChange,
  onAutoScore,
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 4) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (score >= 3) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (score >= 2) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-red-50 text-red-700 border-red-200';
  };

  const renderStars = (score: number) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className="h-5 w-5 fill-[#7FDCD7] text-[#7FDCD7] cursor-pointer transition-colors hover:fill-[#6BC9C4] hover:text-[#6BC9C4]"
            onClick={() => onScoreChange(criteria[i].id, i + 1)}
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <StarHalf
            key={i}
            className="h-5 w-5 fill-[#7FDCD7] text-[#7FDCD7] cursor-pointer transition-colors hover:fill-[#6BC9C4] hover:text-[#6BC9C4]"
            onClick={() => onScoreChange(criteria[i].id, i + 0.5)}
          />
        );
      } else {
        stars.push(
          <Star
            key={i}
            className="h-5 w-5 text-gray-300 cursor-pointer transition-colors hover:text-gray-400"
            onClick={() => onScoreChange(criteria[i].id, i + 1)}
          />
        );
      }
    }
    return stars;
  };

  // Group criteria by category
  const groupedCriteria = criteria.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ScorecardCriterion[]>);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-0 z-10">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#7FDCD7] to-[#ACBAFF] bg-clip-text text-transparent">
            Scorecard Analysis
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Evaluate candidate performance across key criteria
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onAutoScore}
            className="border-[#7FDCD7] text-[#7FDCD7] hover:bg-[#7FDCD7] hover:text-white transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Auto-Score
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="border-[#ACBAFF] text-[#ACBAFF] hover:bg-[#ACBAFF] hover:text-white transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {Object.entries(groupedCriteria).map(([category, items]) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center gap-3 px-1 sticky top-24 bg-white z-10 py-2">
            <h3 className="text-lg font-semibold text-gray-900 whitespace-nowrap">{category}</h3>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-full" style={{ width: 'max-content' }}>
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="w-[300px] bg-white rounded-xl shadow-md border border-gray-200 hover:border-[#7FDCD7] hover:shadow-lg transition-all duration-200 p-6 flex flex-col"
                >
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h4 className="font-medium text-gray-900 line-clamp-2">{item.criterion}</h4>
                      <div className="flex flex-col gap-2">
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap',
                          getScoreColor(item.score)
                        )}>
                          Score: {item.score}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 whitespace-nowrap">
                          Weight: {item.weight}%
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-center items-center gap-1 p-3 bg-gray-50 rounded-lg">
                        {renderStars(item.score)}
                      </div>
                    </div>

                    <div className="mt-4">
                      <textarea
                        className="w-full h-[120px] p-3 text-sm border rounded-lg bg-gray-50 focus:border-[#7FDCD7] focus:ring-[#7FDCD7] transition-colors resize-none"
                        value={item.explanation}
                        onChange={(e) => onExplanationChange(item.id, e.target.value)}
                        placeholder="Enter your evaluation notes..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 