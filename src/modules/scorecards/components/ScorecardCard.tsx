import { type Scorecard } from '@/lib/storage/scorecard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { clarivueColors } from '@/theme';

interface ScorecardCardProps {
  scorecard: Scorecard;
  onClick?: () => void;
}

export function ScorecardCard({ scorecard, onClick }: ScorecardCardProps) {
  return (
    <Card 
      className="hover:shadow-lg transition-all duration-200 cursor-pointer"
      onClick={onClick}
      style={{
        backgroundColor: 'white',
        borderColor: clarivueColors.gray[200],
      }}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl" style={{ color: clarivueColors.gray[800] }}>
              {scorecard.title}
            </CardTitle>
            <CardDescription className="mt-1" style={{ color: clarivueColors.gray[500] }}>
              {scorecard.description || 'No description provided'}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            {scorecard.metrics.length} metrics
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {scorecard.metrics.slice(0, 3).map((metric) => (
              <Badge 
                key={metric.id} 
                variant="outline"
                className="border-primary/20 text-primary hover:bg-primary/10"
              >
                {metric.name}
              </Badge>
            ))}
            {scorecard.metrics.length > 3 && (
              <Badge 
                variant="outline"
                className="border-primary/20 text-primary hover:bg-primary/10"
              >
                +{scorecard.metrics.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="text-sm" style={{ color: clarivueColors.gray[500] }}>
            Created {formatDistanceToNow(new Date(scorecard.createdAt))} ago
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 