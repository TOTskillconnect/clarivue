import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { scorecardStorage, type Scorecard } from '@/lib/storage/scorecard';
import { ScorecardCard } from '../components/ScorecardCard';
import { EmptyState } from '@/components/ui/empty-state';
import { useToast } from '@/hooks/use-toast';

export function ScorecardsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [scorecards, setScorecards] = useState<Scorecard[]>([]);

  // Load scorecards and handle navigation state
  useEffect(() => {
    // Load scorecards from local storage
    const loadedScorecards = scorecardStorage.getAll();
    setScorecards(loadedScorecards);

    // Show success message if navigating from create flow
    const state = location.state as { message?: string; scorecardId?: string } | null;
    if (state?.message) {
      toast({
        title: 'Success',
        description: state.message,
      });

      // Clear the navigation state
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate, toast]);

  // Sort scorecards by creation date (newest first)
  const sortedScorecards = [...scorecards].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Interview Scorecards</h1>
          <p className="text-muted-foreground mt-2">
            Manage and create interview scorecards for your hiring process
          </p>
        </div>
        <Button onClick={() => navigate('/dashboard/scorecards/new')}>
          <Plus className="w-4 h-4 mr-2" />
          New Scorecard
        </Button>
      </div>

      {sortedScorecards.length === 0 ? (
        <EmptyState
          title="No scorecards yet"
          description="Create your first interview scorecard to get started"
          action={
            <Button onClick={() => navigate('/dashboard/scorecards/new')}>
              <Plus className="w-4 h-4 mr-2" />
              Create Scorecard
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedScorecards.map((scorecard) => (
            <ScorecardCard
              key={scorecard.id}
              scorecard={scorecard}
              onClick={() => navigate(`/dashboard/scorecards/${scorecard.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
} 