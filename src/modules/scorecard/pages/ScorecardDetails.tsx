import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import '@/styles/app.css';
import { type Scorecard } from '@/types/interview';
import { scorecardService } from '@/lib/api/services/scorecard';
import { SetupInterviewButton } from '@/components/ui/setup-interview-button';

export function ScorecardDetails() {
  const { scorecardId } = useParams();
  const navigate = useNavigate();
  const [scorecard, setScorecard] = useState<Scorecard | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadScorecard = async () => {
      if (!scorecardId) return;
      try {
        const { data } = await scorecardService.getById(scorecardId);
        setScorecard(data);
      } catch (error) {
        console.error('Failed to load scorecard:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadScorecard();
  }, [scorecardId]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!scorecard) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">Scorecard not found</p>
            <Button onClick={() => navigate('/dashboard/scorecards')}>
              Back to Scorecards
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{scorecard.title}</h1>
          <p className="text-muted-foreground mt-1">{scorecard.description}</p>
        </div>
        <div className="flex gap-3">
          <SetupInterviewButton
            variant="default"
            state={{ scorecardId: scorecard.id }}
          />
          <Button variant="outline" onClick={() => navigate('edit')}>
            Edit Scorecard
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scorecard.metrics.map((metric) => (
              <div
                key={metric.id}
                className="p-4 border rounded-lg"
              >
                <div className="font-medium">{metric.name}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {metric.description}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Weight: {metric.weight}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 