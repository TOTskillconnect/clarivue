import React from 'react';
import type { Report } from '@/modules/report/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

interface TranscriptTabProps {
  report: Report;
}

export const TranscriptTab: React.FC<TranscriptTabProps> = ({
  report,
}) => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Interview Transcript</h3>
            <p className="text-sm text-gray-500">
              {report.transcriptWordCount?.toLocaleString() || 0} words
            </p>
          </div>
        </div>

        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            {report.transcript?.map((entry, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    {entry.speaker}
                  </span>
                  <span className="text-xs text-gray-500">
                    {entry.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {entry.text}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}; 