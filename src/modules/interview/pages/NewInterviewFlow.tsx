import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Steps } from '@/components/ui/steps';
import { type InterviewFormData } from '@/types/interview';
import { useToast } from '@/hooks/use-toast';
import { InterviewDetails } from '../components/InterviewDetails';
import { ScheduleInterview } from '../components/ScheduleInterview';

type StepId = 'details' | 'schedule';

const steps = [
  {
    id: 'details' as StepId,
    label: 'Interview Details',
    description: 'Add candidate information',
  },
  {
    id: 'schedule' as StepId,
    label: 'Schedule',
    description: 'Set date and time',
  },
];

export function NewInterviewFlow() {
  const navigate = useNavigate();
  const { criteriaId } = useParams();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<StepId>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<InterviewFormData>({
    criteriaId: criteriaId || '',
    candidateName: '',
    candidateEmail: '',
    scheduledFor: null,
    meetingLink: '',
    notes: '',
  });

  useEffect(() => {
    if (!criteriaId) {
      toast({
        title: 'Error',
        description: 'No hiring criteria selected. Please start from the beginning.',
        variant: 'destructive',
      });
      navigate('/dashboard/interviews/new');
    }
  }, [criteriaId, navigate, toast]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch('/api/interviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create interview');

      const { id } = await response.json();

      toast({
        title: 'Success',
        description: 'Interview scheduled successfully!',
      });

      navigate(`/dashboard/interviews/${id}`);
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

  if (!criteriaId) {
    return null;
  }

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
            {currentStep === 'details' && (
              <InterviewDetails
                formData={formData}
                onChange={setFormData}
                onNext={() => setCurrentStep('schedule')}
                onBack={() => navigate('/dashboard/interviews/new')}
              />
            )}

            {currentStep === 'schedule' && (
              <ScheduleInterview
                formData={formData}
                onChange={setFormData}
                onSubmit={handleSubmit}
                onBack={() => setCurrentStep('details')}
                isLoading={isLoading}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 