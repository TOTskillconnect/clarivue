import { type Scorecard } from '@/lib/storage/scorecard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface ScorecardCardProps {
  scorecard: Scorecard;
  onClick?: () => void;
}

export function ScorecardCard({ scorecard, onClick }: ScorecardCardProps) {
  return (
    <Card 
      className="hover:bg-accent/5 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{scorecard.title}</CardTitle>
            <CardDescription className="mt-1">
              {scorecard.description || 'No description provided'}
            </CardDescription>
          </div>
          <Badge variant="secondary">
            {scorecard.metrics.length} metrics
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {scorecard.metrics.slice(0, 3).map((metric) => (
              <Badge key={metric.id} variant="outline">
                {metric.name}
              </Badge>
            ))}
            {scorecard.metrics.length > 3 && (
              <Badge variant="outline">
                +{scorecard.metrics.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="text-sm text-muted-foreground">
            Created {formatDistanceToNow(new Date(scorecard.createdAt))} ago
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 