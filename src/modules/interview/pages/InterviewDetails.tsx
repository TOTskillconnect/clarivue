import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ExternalLink, Calendar, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { type Interview, type Scorecard } from '@/types/interview';
import { scorecardService } from '@/lib/api/services/scorecard';

export function InterviewDetails() {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [scorecard, setScorecard] = useState<Scorecard | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadInterview = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API calls
        const [interviewRes, scorecardRes] = await Promise.all([
          fetch(`/api/interviews/${interviewId}`),
          interview?.scorecardId ? scorecardService.getById(interview.scorecardId) : Promise.resolve(null),
        ]);

        if (!interviewRes.ok) {
          throw new Error('Failed to load interview details');
        }

        const interviewData = await interviewRes.json();
        setInterview(interviewData);

        if (scorecardRes) {
          setScorecard(scorecardRes.data);
        }
      } catch (error) {
        console.error('Failed to load interview details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (interviewId) {
      loadInterview();
    }
  }, [interviewId, interview?.scorecardId]);

  const getStatusColor = (status: Interview['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="flex justify-center p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="text-muted-foreground mb-4">Interview not found</p>
            <Button onClick={() => navigate('/dashboard/interviews')}>
              Back to Interviews
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/dashboard/interviews')}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Badge className={getStatusColor(interview.status)}>
          {interview.status}
        </Badge>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Interview Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <h3 className="text-lg font-medium">{interview.candidateName}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2" />
                {interview.candidateEmail}
              </div>
              {interview.scheduledFor && (
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  {format(new Date(interview.scheduledFor), 'PPP p')}
                </div>
              )}
            </div>

            {interview.meetingLink && (
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => window.open(interview.meetingLink, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Join Meeting
              </Button>
            )}

            {interview.notes && (
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Notes</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {interview.notes}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {scorecard && (
          <Card>
            <CardHeader>
              <CardTitle>Interview Scorecard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="font-medium">{scorecard.title}</h3>
                <div className="space-y-2">
                  {scorecard.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="p-3 bg-muted rounded-lg text-sm"
                    >
                      <div className="font-medium">{metric.name}</div>
                      <p className="text-muted-foreground mt-1">{metric.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 