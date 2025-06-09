import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { type InterviewFormData, type Scorecard } from '@/types/interview';

type Step = 'candidate' | 'scorecard' | 'schedule';

export function SetupInterview() {
  const navigate = useNavigate();
  const { scorecardId } = useParams();
  const [currentStep, setCurrentStep] = useState<Step>(scorecardId ? 'schedule' : 'candidate');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableScorecards, setAvailableScorecards] = useState<Scorecard[]>([]);
  const [formData, setFormData] = useState<InterviewFormData>({
    scorecardId: scorecardId || '',
    candidateName: '',
    candidateEmail: '',
    scheduledFor: '',
    meetingLink: '',
    notes: '',
  });

  useEffect(() => {
    const loadScorecards = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Mock API call - replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockScorecards: Scorecard[] = [
          {
            id: 'scorecard-1',
            title: 'Frontend Developer',
            description: 'Evaluation scorecard for frontend developers',
            metrics: []
          },
          {
            id: 'scorecard-2',
            title: 'Backend Developer',
            description: 'Evaluation scorecard for backend developers',
            metrics: []
          }
        ];
        
        setAvailableScorecards(mockScorecards);
        
        // If scorecardId is provided but not found in available scorecards
        if (scorecardId && !mockScorecards.find(s => s.id === scorecardId)) {
          throw new Error('Selected scorecard not found');
        }
        
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load interview scorecards');
        // Navigate back to interviews list if there's an error
        navigate('/dashboard/interviews');
      } finally {
        setIsLoading(false);
      }
    };

    loadScorecards();
  }, [navigate, scorecardId]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-6 max-w-3xl">
        <Card>
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-sm text-muted-foreground">Loading interview setup...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="container mx-auto py-6 max-w-3xl">
        <Card>
          <CardContent className="py-12">
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard/interviews')}
              >
                Return to Interviews
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    switch (currentStep) {
      case 'candidate':
        if (!formData.candidateName || !formData.candidateEmail) {
          setError('Please fill in all required fields');
          return;
        }
        setCurrentStep('scorecard');
        break;
      case 'scorecard':
        if (!formData.scorecardId) {
          setError('Please select a scorecard');
          return;
        }
        setCurrentStep('schedule');
        break;
      case 'schedule':
        handleSubmit();
        break;
    }
    setError(null);
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'scorecard':
        setCurrentStep('candidate');
        break;
      case 'schedule':
        setCurrentStep('scorecard');
        break;
    }
    setError(null);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/interviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create interview');
      }

      navigate('/dashboard/interviews');
    } catch (error) {
      setError('Failed to create interview. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'candidate':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="candidateName">Candidate Name *</Label>
              <Input
                id="candidateName"
                name="candidateName"
                value={formData.candidateName}
                onChange={handleInputChange}
                placeholder="Enter candidate name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="candidateEmail">Candidate Email *</Label>
              <Input
                id="candidateEmail"
                name="candidateEmail"
                type="email"
                value={formData.candidateEmail}
                onChange={handleInputChange}
                placeholder="Enter candidate email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Add any notes about the candidate"
              />
            </div>
          </div>
        );

      case 'scorecard':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Scorecard</Label>
              {availableScorecards.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No scorecards available</p>
                  <Button
                    onClick={() => navigate('/dashboard/scorecards/new')}
                  >
                    Create New Scorecard
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {availableScorecards.map((scorecard) => (
                    <Card
                      key={scorecard.id}
                      className={`cursor-pointer transition-colors ${
                        formData.scorecardId === scorecard.id
                          ? 'border-primary'
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, scorecardId: scorecard.id }))
                      }
                    >
                      <CardContent className="p-4">
                        <h3 className="font-medium">{scorecard.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {scorecard.metrics.length} metrics
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/dashboard/scorecards/new')}
                  >
                    Create New Scorecard
                  </Button>
                </div>
              )}
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="scheduledFor">Interview Date and Time *</Label>
              <Input
                id="scheduledFor"
                name="scheduledFor"
                type="datetime-local"
                value={formData.scheduledFor ? new Date(formData.scheduledFor).toISOString().slice(0, 16) : ''}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    scheduledFor: date.toISOString(),
                  }));
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meetingLink">Meeting Link *</Label>
              <Input
                id="meetingLink"
                name="meetingLink"
                value={formData.meetingLink}
                onChange={handleInputChange}
                placeholder="Enter meeting link (e.g., Zoom, Google Meet)"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Set up Interview</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {currentStep === 'candidate'
              ? 'Candidate Details'
              : currentStep === 'scorecard'
              ? 'Select Scorecard'
              : 'Schedule Interview'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {renderStep()}

          <div className="flex justify-between mt-6">
            {currentStep !== 'candidate' && (
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isLoading}
              >
                Back
              </Button>
            )}
            <Button
              className="ml-auto"
              onClick={handleNext}
              disabled={isLoading}
            >
              {currentStep === 'schedule' ? (
                'Create Interview'
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 