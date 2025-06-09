import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Steps } from '@/components/ui/steps';
import { JDPasteOrLinkForm } from '../components/JDPasteOrLinkForm';
import { MetricsList } from '../components/MetricsList';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type Metric } from '@/types/interview';
import { type JDInput } from '@/types/hiring';
import { useToast } from '@/hooks/use-toast';
import { scorecardService } from '@/lib/api/services/scorecard';
import { storage } from '@/lib/utils/storage';

type StepId = 'import' | 'review' | 'save';

const steps = [
  {
    id: 'import' as StepId,
    label: 'Import Job Description',
    description: 'Paste JD or provide link',
  },
  {
    id: 'review' as StepId,
    label: 'Review Metrics',
    description: 'Customize evaluation metrics',
  },
  {
    id: 'save' as StepId,
    label: 'Save Scorecard',
    description: 'Name and save scorecard',
  },
];

export function CreateScorecardFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<StepId>('import');
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [jdText, setJdText] = useState('');
  const [scorecardName, setScorecardName] = useState('');
  const [role, setRole] = useState('');

  // Get the return path from location state
  const returnTo = location.state?.returnTo || '/dashboard/scorecards';
  console.log('Return path:', returnTo);

  const handleJDSubmit = async (input: JDInput) => {
    try {
      setIsLoading(true);
      const { data } = await scorecardService.analyze({ description: input.text });
      setMetrics(data.metrics);
      setJdText(input.text);
      setCurrentStep('review');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to analyze job description. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveScorecard = async () => {
    if (!scorecardName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a name for the scorecard.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      console.log('Creating scorecard...');
      const { data } = await scorecardService.create({
        metrics,
        title: scorecardName,
        role,
        description: jdText,
      });
      console.log('Scorecard created:', data);

      // Save to local storage
      storage.scorecards.save(data);

      toast({
        title: 'Success',
        description: 'Scorecard saved successfully!',
      });

      // If we came from interview setup, return there with the scorecard ID
      if (returnTo.includes('/interviews/schedule')) {
        console.log('Returning to interview setup with scorecard:', data.id);
        navigate(returnTo, { 
          replace: true,
          state: { scorecardId: data.id }
        });
      } else {
        console.log('Navigating to scorecards list');
        navigate('/dashboard/scorecards');
      }
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
          <CardTitle>Create Scorecard</CardTitle>
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
                    onClick={() => setCurrentStep('save')}
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

            {currentStep === 'save' && (
              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="scorecardName">Scorecard Name</Label>
                    <Input
                      id="scorecardName"
                      value={scorecardName}
                      onChange={(e) => setScorecardName(e.target.value)}
                      placeholder="Enter a name for this scorecard"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Enter the role (e.g. Frontend Developer)"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6">
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentStep('review')}
                  >
                    Back to Review
                  </Button>
                  <Button
                    onClick={handleSaveScorecard}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Scorecard'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 