import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Steps } from '@/components/ui/steps';
import { JDPasteOrLinkForm } from '@/modules/scorecards/components/JDPasteOrLinkForm';
import { MetricsList } from '../components/MetricsList';
import { type Metric } from '@/types/interview';
import { type JDInput } from '@/types/hiring';
import { useToast } from '@/hooks/use-toast';
import { scorecardStorage } from '@/lib/storage/scorecard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type StepId = 'import' | 'review' | 'confirm';

const steps = [
  {
    id: 'import' as StepId,
    label: 'Import',
    description: 'Import job description',
  },
  {
    id: 'review' as StepId,
    label: 'Review',
    description: 'Review metrics',
  },
  {
    id: 'confirm' as StepId,
    label: 'Confirm',
    description: 'Save scorecard',
  },
];

interface LocationState {
  analyzedData?: {
    metrics: Array<{
      name: string;
      description: string;
      weight: number;
    }>;
  };
}

export function ScorecardFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<StepId>('import');
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<Metric[]>([{
    id: '1',
    name: '',
    description: '',
    weight: 1
  }]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Initialize metrics from location state if available
  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.analyzedData?.metrics) {
      const transformedMetrics = state.analyzedData.metrics.map((metric, index) => ({
        id: String(index + 1),
        name: metric.name,
        description: metric.description,
        weight: metric.weight
      }));
      setMetrics(transformedMetrics);
      setCurrentStep('review');
    }
  }, [location.state]);

  const handleJDSubmit = async (input: JDInput) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/scorecard/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: input.text }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze job description');
      }

      const data = await response.json();
      
      // Ensure we have metrics array
      if (!data.metrics || !Array.isArray(data.metrics)) {
        throw new Error('Invalid response format: missing metrics array');
      }
      
      // Transform the API response into the correct format
      const transformedMetrics: Metric[] = data.metrics.map((metric: any, index: number) => ({
        id: String(index + 1),
        name: metric.name || '',
        description: metric.description || '',
        weight: Number(metric.weight) || 1
      }));

      if (transformedMetrics.length === 0) {
        throw new Error('No metrics found in analysis');
      }

      setMetrics(transformedMetrics);
      setCurrentStep('review');
    } catch (error) {
      console.error('Failed to analyze JD:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to analyze job description. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveScorecard = async () => {
    try {
      setIsLoading(true);

      if (!title.trim()) {
        toast({
          title: 'Error',
          description: 'Please enter a title for the scorecard.',
          variant: 'destructive',
        });
        return;
      }

      // Save to local storage
      const savedScorecard = scorecardStorage.save({
        title: title.trim(),
        description: description.trim(),
        metrics,
      });

      toast({
        title: 'Success',
        description: 'Scorecard saved successfully!',
      });

      // Navigate to the scorecards list
      navigate('/dashboard/scorecards', { 
        state: { 
          message: 'Scorecard created successfully',
          scorecardId: savedScorecard.id 
        } 
      });
    } catch (error) {
      console.error('Failed to save scorecard:', error);
      toast({
        title: 'Error',
        description: 'Failed to save scorecard. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Create Interview Scorecard</CardTitle>
        </CardHeader>
        <CardContent>
          <Steps
            steps={steps}
            currentStep={currentStep}
            className="mb-8"
          />

          <div className="mt-8">
            {currentStep === 'import' && (
              <div className="max-w-2xl mx-auto">
                <JDPasteOrLinkForm
                  onSubmit={handleJDSubmit}
                  isLoading={isLoading}
                />
              </div>
            )}

            {currentStep === 'review' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentStep('import')}
                  >
                    Back to Import
                  </Button>
                  <Button
                    onClick={() => setCurrentStep('confirm')}
                    disabled={metrics.length === 0}
                  >
                    Continue
                  </Button>
                </div>
                <MetricsList
                  metrics={metrics}
                  onChange={setMetrics}
                />
              </div>
            )}

            {currentStep === 'confirm' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Scorecard Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter a title for this scorecard"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add a description for this scorecard"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentStep('review')}
                    disabled={isLoading}
                  >
                    Back to Review
                  </Button>
                  <Button
                    onClick={handleSaveScorecard}
                    disabled={isLoading || !title.trim()}
                  >
                    {isLoading ? 'Saving...' : 'Save Scorecard'}
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Selected Metrics</h3>
                  {metrics.map((metric) => (
                    <Card key={metric.id}>
                      <CardContent className="p-4">
                        <h3 className="font-medium">{metric.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{metric.description}</p>
                        <p className="text-sm text-muted-foreground mt-1">Weight: {metric.weight}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 