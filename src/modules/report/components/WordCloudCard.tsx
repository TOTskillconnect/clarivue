import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { TagCloud } from 'react-tagcloud';

interface WordCloudProps {
  words: Array<{
    text: string;
    value: number;
    relevance: number;
  }>;
  onRegenerate: () => void;
}

const options = {
  luminosity: 'light' as const,
  hue: 'blue' as const,
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
      value: baseValue.toString(), // Convert to string as required by react-tagcloud
      count: baseValue,
    });

    // Add related technical terms if the value is high enough
    if (baseValue > 7) {
      variations.push({
        text: `${word.text} skills`,
        value: Math.floor(baseValue * 0.8).toString(),
        count: Math.floor(baseValue * 0.8),
      });
    }

    // Add experience-related variations
    if (baseValue > 5) {
      variations.push({
        text: `${word.text} experience`,
        value: Math.floor(baseValue * 0.7).toString(),
        count: Math.floor(baseValue * 0.7),
      });
    }

    // Add domain-specific variations
    if (word.relevance > 0.7) {
      variations.push({
        text: `${word.text} expertise`,
        value: Math.floor(baseValue * 0.6).toString(),
        count: Math.floor(baseValue * 0.6),
      });
    }

    return variations;
  });

  const customRenderer = (tag: any, size: number, color: string) => (
    <span
      key={tag.text}
      style={{
        fontSize: `${size}px`,
        margin: '3px',
        padding: '3px',
        display: 'inline-block',
        color: color,
      }}
    >
      {tag.text}
    </span>
  );

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
        <div className="h-[300px] w-full overflow-hidden">
          <TagCloud
            minSize={12}
            maxSize={35}
            tags={enhancedWords}
            renderer={customRenderer}
            colorOptions={options}
          />
        </div>
      </CardContent>
    </Card>
  );
}; 