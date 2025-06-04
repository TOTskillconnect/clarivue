import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { type Interview } from '@/types/interview';
import { ConversationList } from '../components/ConversationList';
import { EmailCopyBox } from '../components/EmailCopyBox';
import { JoinMeetingBox } from '../components/JoinMeetingBox';
import { SetupChecklistCard } from '../components/SetupChecklistCard';

export function DashboardHome() {
  const navigate = useNavigate();
  const [upcomingInterviews, setUpcomingInterviews] = useState<Interview[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock user state - replace with actual state management
  const user = {
    onboardingComplete: false,
    connectedCalendar: false,
    phoneLinked: false,
    calendlyIntegrated: false,
  };

  useEffect(() => {
    const loadUpcomingInterviews = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API call
        const response = await fetch('/api/interviews?status=scheduled');
        if (!response.ok) throw new Error('Failed to load interviews');
        const data = await response.json();
        setUpcomingInterviews(data.slice(0, 3)); // Show only next 3 interviews
      } catch (error) {
        console.error('Failed to load interviews:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUpcomingInterviews();
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Conversations & Upcoming Interviews */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Interviews */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Upcoming Interviews</CardTitle>
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard/interviews')}
              >
                View all
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center p-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
              ) : upcomingInterviews.length === 0 ? (
                <div className="text-center py-6">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No upcoming interviews</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingInterviews.map((interview) => (
                    <Card
                      key={interview.id}
                      className="cursor-pointer hover:bg-accent/50 transition-colors"
                      onClick={() => navigate(`/dashboard/interviews/${interview.id}`)}
                    >
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="space-y-1">
                          <h3 className="font-medium">{interview.candidateName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(interview.scheduledFor!), 'PPP p')}
                          </p>
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
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <ConversationList />
        </div>

        {/* Right Column - Setup & Actions */}
        <div className="space-y-6">
          <EmailCopyBox />
          <JoinMeetingBox />
          {!user.onboardingComplete && (
            <SetupChecklistCard
              user={user}
            />
          )}
        </div>
      </div>
    </div>
  );
} 