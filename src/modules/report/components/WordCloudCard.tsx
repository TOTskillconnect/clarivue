import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import ReactWordcloud, { Scale, Options } from 'react-wordcloud';

interface WordCloudProps {
  words: Array<{
    text: string;
    value: number;
    relevance: number;
  }>;
  onRegenerate: () => void;
}

const options: Partial<Options> = {
  colors: ['#04ADA4', '#7FDCD7', '#ACBAFF', '#6B7CFF'],
  enableTooltip: true,
  deterministic: false,
  fontFamily: 'inter',
  fontSizes: [12, 40] as [number, number],
  fontStyle: 'normal',
  fontWeight: 'normal',
  padding: 3,
  rotations: 2,
  rotationAngles: [0, 0] as [number, number],
  scale: 'sqrt' as Scale,
  spiral: 'rectangular' as const,
  transitionDuration: 1000,
};

export const WordCloudCard: React.FC<WordCloudProps> = ({
  words,
  onRegenerate,
}) => {
  // Enhance word data with more context and variations
  const enhancedWords = words.flatMap(word => {
    const baseValue = word.value;
    const variations = [];

    // Add the main word
    variations.push({
      text: word.text,
      value: baseValue,
      relevance: word.relevance,
    });

    // Add related technical terms if the value is high enough
    if (baseValue > 7) {
      variations.push({
        text: `${word.text} skills`,
        value: Math.floor(baseValue * 0.8),
        relevance: word.relevance * 0.9,
      });
    }

    // Add experience-related variations
    if (baseValue > 5) {
      variations.push({
        text: `${word.text} experience`,
        value: Math.floor(baseValue * 0.7),
        relevance: word.relevance * 0.8,
      });
    }

    // Add domain-specific variations
    if (word.relevance > 0.7) {
      variations.push({
        text: `${word.text} expertise`,
        value: Math.floor(baseValue * 0.6),
        relevance: word.relevance * 0.7,
      });
    }

    return variations;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Key Terms & Concepts</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRegenerate}
          className="text-gray-500 hover:text-[#04ADA4]"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Regenerate
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ReactWordcloud
            words={enhancedWords}
            options={options}
          />
        </div>
      </CardContent>
    </Card>
  );
}; 