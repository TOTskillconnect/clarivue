import React from 'react';
import { Edit } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { WordCloudCard } from './WordCloudCard';
import { StrengthsConcernsPanel } from './StrengthsConcernsPanel';
import type { Report } from '@/modules/report/types';

interface SummaryTabProps {
  report: Report;
  strengths: Array<{ id: string; text: string }>;
  concerns: Array<{ id: string; text: string }>;
  onReorderStrengths: (items: Array<{ id: string; text: string }>) => void;
  onReorderConcerns: (items: Array<{ id: string; text: string }>) => void;
  onRemoveStrength: (id: string) => void;
  onRemoveConcern: (id: string) => void;
  onUpdateStrength: (id: string, text: string) => void;
  onUpdateConcern: (id: string, text: string) => void;
  onAddStrength: (text: string) => void;
  onAddConcern: (text: string) => void;
  onRegenerateWordCloud: () => void;
}

export const SummaryTab: React.FC<SummaryTabProps> = ({
  report,
  strengths,
  concerns,
  onReorderStrengths,
  onReorderConcerns,
  onRemoveStrength,
  onRemoveConcern,
  onUpdateStrength,
  onUpdateConcern,
  onAddStrength,
  onAddConcern,
  onRegenerateWordCloud,
}) => {
  return (
    <div className="space-y-8">
      {/* Candidate Info & Synopsis */}
      <div className="grid grid-cols-12 gap-4">
        <Card className="glossy-card col-span-12 md:col-span-4 overflow-hidden shadow-sm">
          <CardHeader className="pb-2 pt-3 px-4">
            <CardTitle className="text-lg font-semibold">Candidate Details</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={report.candidate.avatar} alt={report.candidate.name} />
                  <AvatarFallback className="bg-[#7FDCD7]/10 text-[#04ADA4] text-lg">
                    {report.candidate.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-gray-900">{report.candidate.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-[#7FDCD7]/15 text-[#04ADA4] font-medium">
                      {report.candidate.role}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-violet-50 text-violet-600 font-medium">
                      {report.candidate.experience}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-amber-50 text-amber-600 font-medium">
                      {report.candidate.location}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-rose-50 text-rose-600 font-medium">
                      {report.candidate.education}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glossy-card col-span-12 md:col-span-8 overflow-hidden shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-3 px-4">
            <CardTitle className="text-lg font-semibold">Candidate Synopsis</CardTitle>
            <Button 
              variant="ghost" 
              size="icon"
              className="gradient-btn h-8 w-8 text-white"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-0">
            <div className="bg-[#7FDCD7]/5 rounded-lg p-3">
              <p className="text-sm leading-relaxed text-gray-600">{report.synopsis}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Score */}
      <Card className="glossy-card">
        <CardHeader>
          <CardTitle>Overall Fit Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className={`text-lg font-semibold ${
                report.overallScore >= 80 ? 'text-emerald-600' :
                report.overallScore >= 60 ? 'text-blue-600' :
                report.overallScore >= 40 ? 'text-amber-600' :
                'text-red-600'
              }`}>{report.overallScore}%</span>
              <span className="text-sm text-gray-500">Based on weighted criteria</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
              <div 
                className="h-full transition-all duration-500 ease-in-out rounded-full"
                style={{
                  width: `${report.overallScore}%`,
                  background: `linear-gradient(135deg, #7FDCD7 0%, #ACBAFF 100%)`
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strengths & Concerns */}
      <StrengthsConcernsPanel
        strengths={strengths}
        concerns={concerns}
        onReorderStrengths={onReorderStrengths}
        onReorderConcerns={onReorderConcerns}
        onRemoveStrength={onRemoveStrength}
        onRemoveConcern={onRemoveConcern}
        onUpdateStrength={onUpdateStrength}
        onUpdateConcern={onUpdateConcern}
        onAddStrength={onAddStrength}
        onAddConcern={onAddConcern}
      />

      {/* Word Cloud */}
      <WordCloudCard
        words={report.wordCloudData}
        onRegenerate={onRegenerateWordCloud}
      />
    </div>
  );
}; 