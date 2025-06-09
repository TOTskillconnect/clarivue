import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { type Scorecard } from '@/types/interview';
import { scorecardService } from '@/lib/api/services/scorecard';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/lib/utils/storage';

interface Props {
  selectedId: string;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onBack: () => void;
}

export function ScorecardSelection({ selectedId, onSelect, onCreate, onBack }: Props) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [scorecards, setScorecards] = useState<Scorecard[]>([]);
  const [isContinuing, setIsContinuing] = useState(false);

  useEffect(() => {
    const loadScorecards = async () => {
      try {
        // First try to load from local storage
        const storedScorecards = storage.scorecards.getAll();
        
        // Then fetch from API
        const { data } = await scorecardService.getAll();
        const apiScorecards = Array.isArray(data) ? data : [];
        
        // Save API scorecards to local storage
        storage.scorecards.saveMany(apiScorecards);
        
        // Use API scorecards as they have full data
        setScorecards(apiScorecards);
      } catch (error) {
        console.error('Failed to load scorecards:', error);
        
        // On API error, try to load stored scorecard details one by one
        try {
          const storedIds = storage.scorecards.getAll().map(s => s.id);
          const loadedScorecards: Scorecard[] = [];
          
          for (const id of storedIds) {
            try {
              const { data } = await scorecardService.getById(id);
              if (data) {
                loadedScorecards.push(data);
              }
            } catch (e) {
              console.error(`Failed to load scorecard ${id}:`, e);
            }
          }
          
          setScorecards(loadedScorecards);
          
          if (loadedScorecards.length > 0) {
            toast({
              title: 'Warning',
              description: 'Using cached scorecards. Some data may be outdated.',
              variant: 'default',
            });
          } else {
            toast({
              title: 'Error',
              description: 'Failed to load scorecards. Please try again.',
              variant: 'destructive',
            });
          }
        } catch (storageError) {
          console.error('Failed to load from storage:', storageError);
          setScorecards([]);
          toast({
            title: 'Error',
            description: 'Failed to load scorecards. Please try again.',
            variant: 'destructive',
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadScorecards();
  }, [toast]);

  const handleCreateClick = () => {
    console.log('Creating new scorecard, navigating to creation flow');
    onCreate();
  };

  const handleContinue = async () => {
    if (!selectedId) return;

    setIsContinuing(true);
    try {
      // Get the selected scorecard
      const selectedScorecard = scorecards.find(s => s.id === selectedId);
      if (!selectedScorecard) {
        throw new Error('Selected scorecard not found');
      }

      // Save to local storage
      storage.scorecards.save(selectedScorecard);

      // Continue to next step
      onSelect(selectedId);
    } catch (error) {
      console.error('Failed to save selected scorecard:', error);
      toast({
        title: 'Error',
        description: 'Failed to save selected scorecard. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsContinuing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Select a Scorecard</h3>
          <p className="text-sm text-muted-foreground">Choose an existing scorecard or create a new one</p>
        </div>
        <Button
          variant="outline"
          onClick={handleCreateClick}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Create New
        </Button>
      </div>

      {scorecards.length === 0 ? (
        <div className="text-center py-8 space-y-4">
          <p className="text-muted-foreground">No scorecards found</p>
          <Button onClick={handleCreateClick}>Create Your First Scorecard</Button>
        </div>
      ) : (
        <>
          <RadioGroup
            value={selectedId}
            onValueChange={onSelect}
            className="space-y-3"
          >
            {scorecards.map((scorecard) => (
              <div
                key={scorecard.id}
                className="flex items-center space-x-3 border rounded-lg p-4 hover:border-primary/50 transition-colors"
              >
                <RadioGroupItem value={scorecard.id} id={scorecard.id} />
                <Label htmlFor={scorecard.id} className="flex-1 cursor-pointer">
                  <div className="font-medium">{scorecard.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {scorecard.metrics.length} metrics
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between pt-6">
            <Button
              variant="ghost"
              onClick={onBack}
            >
              Back
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedId || isContinuing}
            >
              {isContinuing ? 'Continuing...' : 'Continue'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
} 