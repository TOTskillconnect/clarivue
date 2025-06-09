import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { SetupInterviewButton } from '@/components/ui/setup-interview-button';
import '@/styles/app.css';
import { type Scorecard } from '@/types/interview';
import { scorecardService } from '@/lib/api/services/scorecard';

export function ScorecardOverview() {
  const navigate = useNavigate();
  const [scorecards, setScorecards] = useState<Scorecard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadScorecards = async () => {
      try {
        const response = await scorecardService.getAll();
        setScorecards(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Failed to load scorecards:', error);
        setScorecards([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadScorecards();
  }, []);

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Scorecards</h1>
        <div className="flex gap-3">
          <SetupInterviewButton />
          <Button onClick={() => navigate('new')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Scorecard
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : scorecards.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No scorecards found</p>
            <Button onClick={() => navigate('new')}>Create Your First Scorecard</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scorecards.map((scorecard) => (
            <Card
              key={scorecard.id}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => navigate(scorecard.id)}
            >
              <CardHeader>
                <CardTitle>{scorecard.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {scorecard.metrics.length} metrics
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 