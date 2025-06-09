import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Steps } from '@/components/ui/steps';
import { type InterviewFormData } from '@/types/interview';
import { useToast } from '@/hooks/use-toast';
import { CandidateDetailsForm } from '../components/CandidateDetailsForm';
import { ScorecardSelection } from '../components/ScorecardSelection';
import { ScheduleInterview } from '../components/ScheduleInterview';
import { scorecardService } from '@/lib/api/services/scorecard';

type StepId = 'candidate' | 'scorecard' | 'schedule';

const steps = [
  {
    id: 'candidate' as StepId,
    label: 'Candidate Details',
    description: 'Enter candidate information',
  },
  {
    id: 'scorecard' as StepId,
    label: 'Select Scorecard',
    description: 'Choose or create scorecard',
  },
  {
    id: 'schedule' as StepId,
    label: 'Schedule',
    description: 'Set date and time',
  },
];

export function InterviewSetupFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<StepId>('candidate');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<InterviewFormData>({
    candidateName: '',
    candidateEmail: '',
    scorecardId: '',
    scheduledFor: '',
    meetingLink: '',
    notes: '',
  });

  // Handle return from scorecard creation
  useEffect(() => {
    const handleScorecardReturn = async () => {
      const state = location.state as { scorecardId?: string } | null;
      console.log('Location state:', state);

      if (state?.scorecardId) {
        try {
          console.log('Verifying scorecard:', state.scorecardId);
          // Verify the scorecard exists
          const { data } = await scorecardService.getById(state.scorecardId);
          console.log('Scorecard data:', data);

          if (data) {
            console.log('Setting scorecard and moving to schedule step');
            setFormData(prev => ({
              ...prev,
              scorecardId: state.scorecardId!,
            }));
            setCurrentStep('schedule');
          }
        } catch (error) {
          console.error('Failed to verify scorecard:', error);
          toast({
            title: 'Error',
            description: 'Failed to load the selected scorecard. Please try again.',
            variant: 'destructive',
          });
          setCurrentStep('scorecard');
        } finally {
          // Clear the state to avoid reusing it if the user navigates back
          console.log('Clearing navigation state');
          navigate(location.pathname, { replace: true, state: {} });
        }
      }
    };

    handleScorecardReturn();
  }, [location, navigate, toast]);

  const handleCandidateSubmit = (data: Pick<InterviewFormData, 'candidateName' | 'candidateEmail' | 'notes'>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep('scorecard');
  };

  const handleScorecardSelect = (scorecardId: string) => {
    setFormData(prev => ({ ...prev, scorecardId }));
    setCurrentStep('schedule');
  };

  const handleCreateScorecard = () => {
    // Navigate to scorecard creation flow with return path
    navigate('/dashboard/scorecards/new', {
      state: { returnTo: location.pathname }
    });
  };

  const handleScheduleSubmit = async (scheduleData: Pick<InterviewFormData, 'scheduledFor' | 'meetingLink'>) => {
    try {
      setIsLoading(true);
      const interviewData = {
        ...formData,
        ...scheduleData,
      };

      // Call your API to create the interview
      const response = await fetch('/api/interviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(interviewData),
      });

      if (!response.ok) {
        throw new Error('Failed to schedule interview');
      }

      const data = await response.json();

      toast({
        title: 'Success',
        description: 'Interview scheduled successfully!',
      });

      // Navigate to the interview details page
      navigate(`/dashboard/interviews/${data.id}`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to schedule interview. Please try again.',
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
          <CardTitle>Schedule Interview</CardTitle>
        </CardHeader>
        <CardContent>
          <Steps
            steps={steps}
            currentStep={currentStep}
            className="mb-8"
          />

          <div className="mt-8">
            {currentStep === 'candidate' && (
              <CandidateDetailsForm
                initialData={formData}
                onSubmit={handleCandidateSubmit}
              />
            )}

            {currentStep === 'scorecard' && (
              <ScorecardSelection
                selectedId={formData.scorecardId}
                onSelect={handleScorecardSelect}
                onCreate={handleCreateScorecard}
                onBack={() => setCurrentStep('candidate')}
              />
            )}

            {currentStep === 'schedule' && (
              <ScheduleInterview
                isLoading={isLoading}
                onSubmit={handleScheduleSubmit}
                onBack={() => setCurrentStep('scorecard')}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 