import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface WordData {
  text: string;
  value: number;
  relevance: number;
}

interface WordCloudCardProps {
  words: WordData[];
  onRegenerate: () => void;
}

export const WordCloudCard: React.FC<WordCloudCardProps> = ({
  words,
  onRegenerate,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Key Terms Analysis</CardTitle>
        <Button variant="outline" size="sm" onClick={onRegenerate}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Regenerate
        </Button>
      </CardHeader>
      <CardContent>
        <div className="min-h-[300px] flex flex-wrap items-center justify-center gap-4 p-4">
          <TooltipProvider>
            {words.map((word, index) => (
              <Tooltip key={index}>
                <TooltipTrigger>
                  <span
                    className="inline-block cursor-pointer transition-colors hover:text-[#04ADA4]"
                    style={{
                      fontSize: `${Math.max(1, Math.min(4, word.value / 10))}rem`,
                      opacity: Math.max(0.5, word.relevance),
                    }}
                  >
                    {word.text}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Frequency: {word.value}</p>
                  <p>Relevance: {(word.relevance * 100).toFixed(1)}%</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}; 