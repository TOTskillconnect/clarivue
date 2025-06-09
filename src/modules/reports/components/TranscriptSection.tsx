import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Download, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TranscriptEntry {
  timestamp: string;
  speaker: string;
  text: string;
}

interface TranscriptSectionProps {
  transcript: TranscriptEntry[];
  wordCount: number;
}

export const TranscriptSection: React.FC<TranscriptSectionProps> = ({
  transcript,
  wordCount,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTranscript = transcript.filter((entry) =>
    entry.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <CardTitle>Transcript ({wordCount.toLocaleString()} words)</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 mr-2" />
            ) : (
              <ChevronDown className="h-4 w-4 mr-2" />
            )}
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search transcript..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {filteredTranscript.map((entry, index) => (
              <div key={index} className="flex gap-4 text-sm">
                <div className="w-24 flex-shrink-0">
                  <span className="text-gray-500">{entry.timestamp}</span>
                </div>
                <div className="flex-grow">
                  <span className="font-medium text-[#04ADA4]">{entry.speaker}: </span>
                  <span className="text-gray-700">{entry.text}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}; 