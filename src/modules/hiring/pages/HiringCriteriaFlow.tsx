import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Steps } from '@/components/ui/steps';
import { JDPasteOrLinkForm } from '../components/JDPasteOrLinkForm';
import { CriteriaList } from '../components/CriteriaList';
import { type Criterion, type JDInput } from '@/types/hiring';
import { useToast } from '@/hooks/use-toast';

type StepId = 'import' | 'review' | 'confirm';

const steps = [
  {
    id: 'import' as StepId,
    label: 'Import Job Description',
    description: 'Paste JD or provide link',
  },
  {
    id: 'review' as StepId,
    label: 'Review Criteria',
    description: 'Customize hiring criteria',
  },
  {
    id: 'confirm' as StepId,
    label: 'Confirm',
    description: 'Review and save',
  },
];

export function HiringCriteriaFlow() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<StepId>('import');
  const [isLoading, setIsLoading] = useState(false);
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [jdText, setJdText] = useState('');

  const handleJDSubmit = async (input: JDInput) => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch('/api/criteria/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) throw new Error('Failed to analyze JD');

      const data = await response.json();
      setCriteria(data.criteria);
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

  const handleSaveCriteria = async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch('/api/criteria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          criteria,
          jdText,
          title: 'Interview Criteria', // TODO: Allow user to set title
        }),
      });

      if (!response.ok) throw new Error('Failed to save criteria');

      const { id } = await response.json();

      toast({
        title: 'Success',
        description: 'Hiring criteria saved successfully!',
      });

      // Navigate to interview scheduling with the created criteria
      navigate(`/dashboard/interviews/schedule/${id}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save criteria. Please try again.',
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
          <CardTitle>Set Up Hiring Criteria</CardTitle>
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
                    disabled={criteria.length === 0}
                  >
                    Continue
                  </Button>
                </div>
                <CriteriaList
                  criteria={criteria}
                  onChange={setCriteria}
                />
              </div>
            )}

            {currentStep === 'confirm' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentStep('review')}
                  >
                    Back to Review
                  </Button>
                  <Button
                    onClick={handleSaveCriteria}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Continue to Schedule Interview'}
                  </Button>
                </div>
                <div className="border rounded-lg p-6 space-y-4">
                  <h3 className="font-medium">Selected Criteria</h3>
                  <div className="space-y-2">
                    {criteria.map((criterion, index) => (
                      <div
                        key={index}
                        className="p-3 bg-muted rounded-lg"
                      >
                        <div className="font-medium">{criterion.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {criterion.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 