import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ChevronLeft, Plus } from 'lucide-react';
import { type InterviewCriteria } from '@/types/interview';

interface Props {
  selectedId: string;
  onSelect: (criteriaId: string) => void;
  onBack: () => void;
}

export function CriteriaSelection({ selectedId, onSelect, onBack }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [criteria, setCriteria] = useState<InterviewCriteria[]>([]);

  // Load criteria on mount
  useEffect(() => {
    const loadCriteria = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API call
        const response = await fetch('/api/criteria');
        if (!response.ok) throw new Error('Failed to load criteria');
        const data = await response.json();
        setCriteria(data);
      } catch (error) {
        console.error('Failed to load criteria:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCriteria();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button
          variant="outline"
          onClick={() => {/* TODO: Open create criteria dialog */}}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Criteria
        </Button>
      </div>

      <div className="space-y-4">
        <RadioGroup
          value={selectedId}
          onValueChange={onSelect}
          className="space-y-4"
        >
          {criteria.map((item) => (
            <Card
              key={item.id}
              className={`cursor-pointer transition-colors hover:bg-accent ${
                selectedId === item.id ? 'border-primary' : ''
              }`}
              onClick={() => onSelect(item.id)}
            >
              <CardContent className="flex items-start gap-4 p-4">
                <RadioGroupItem value={item.id} id={item.id} />
                <div className="flex-1">
                  <Label
                    htmlFor={item.id}
                    className="text-base font-medium cursor-pointer"
                  >
                    {item.title}
                  </Label>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {item.criteria.length} criteria
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Created {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </RadioGroup>

        {isLoading && (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        )}

        {!isLoading && criteria.length === 0 && (
          <div className="text-center p-8 text-muted-foreground">
            No criteria found. Create your first one!
          </div>
        )}
      </div>
    </div>
  );
} 