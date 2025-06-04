import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { type Interview } from '@/types/interview';

export function InterviewsOverview() {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadInterviews = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API call
        const response = await fetch('/api/interviews');
        if (!response.ok) throw new Error('Failed to load interviews');
        const data = await response.json();
        setInterviews(data);
      } catch (error) {
        console.error('Failed to load interviews:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadInterviews();
  }, []);

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

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Interviews</h1>
        <Button onClick={() => navigate('new')}>
          <Plus className="h-4 w-4 mr-2" />
          New Interview
        </Button>
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <Card>
            <CardContent className="flex justify-center p-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </CardContent>
          </Card>
        ) : interviews.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <p className="text-muted-foreground mb-4">No interviews scheduled</p>
              <Button onClick={() => navigate('new')}>
                Schedule Your First Interview
              </Button>
            </CardContent>
          </Card>
        ) : (
          interviews.map((interview) => (
            <Card
              key={interview.id}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => navigate(interview.id)}
            >
              <CardContent className="flex items-center justify-between p-6">
                <div className="space-y-1">
                  <h3 className="font-medium">{interview.candidateName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {interview.candidateEmail}
                  </p>
                  {interview.scheduledFor && (
                    <p className="text-sm">
                      {format(new Date(interview.scheduledFor), 'PPP p')}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(interview.status)}>
                    {interview.status}
                  </Badge>
                  {interview.meetingLink && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(interview.meetingLink, '_blank');
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 