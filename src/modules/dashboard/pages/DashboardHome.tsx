import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ExternalLink } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { type Interview } from '@/types/interview';
import { ConversationList } from '../components/ConversationList';
import { EmailCopyBox } from '../components/EmailCopyBox';
import { JoinMeetingBox } from '../components/JoinMeetingBox';
import { SetupChecklistCard } from '../components/SetupChecklistCard';
import { SetupInterviewButton } from '@/components/ui/setup-interview-button';

// Safe date formatting function
const formatDate = (date: Date | string | undefined) => {
  if (!date) return 'Not scheduled';
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'PPP p');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

// Mock data for testing
const mockInterviews: Interview[] = [
  {
    id: '1',
    title: 'Frontend Developer Interview',
    status: 'scheduled',
    candidateName: 'John Doe',
    candidateEmail: 'john@example.com',
    scheduledFor: new Date('2024-03-15T10:00:00Z').toISOString(),
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    scorecardId: 'scorecard-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Backend Developer Interview',
    status: 'pending',
    candidateName: 'Jane Smith',
    candidateEmail: 'jane@example.com',
    scorecardId: 'scorecard-2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

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
        // Using mock data instead of API call
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        setUpcomingInterviews(mockInterviews);
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
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <SetupInterviewButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
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
                          {formatDate(interview.scheduledFor)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={getStatusColor(interview.status)}>
                          {interview.status}
                        </Badge>
                        <div className="flex items-center gap-2">
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
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-[#ACBAFF] hover:bg-gradient-to-br hover:from-[#7FDCD7] hover:to-[#ACBAFF] text-white transition-all duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/dashboard/interviews/${interview.id}/edit`);
                            }}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Scorecards</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add recent scorecards list */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add quick stats */}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Conversations & Upcoming Interviews */}
        <div className="lg:col-span-2 space-y-6">
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