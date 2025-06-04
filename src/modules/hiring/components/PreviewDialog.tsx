import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { type Criterion } from '@/types/hiring';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  criteria: Criterion[];
  onConfirm: () => void;
  isLoading?: boolean;
}

export function PreviewDialog({ open, onOpenChange, criteria, onConfirm, isLoading }: Props) {
  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
  const avgWeight = totalWeight / criteria.length;
  const fromJDCount = criteria.filter(c => c.isFromJD).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Review Hiring Criteria</DialogTitle>
          <DialogDescription>
            Please review your hiring criteria before saving. Make sure all criteria are correctly weighted and ordered.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Total Criteria: {criteria.length}</p>
              <p className="text-sm text-muted-foreground">
                {fromJDCount} from JD, {criteria.length - fromJDCount} manual
              </p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-sm font-medium">Average Weight: {avgWeight.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">Total Weight: {totalWeight}</p>
            </div>
          </div>

          <ScrollArea className="h-[300px] rounded-md border p-4">
            {criteria.map((criterion, index) => (
              <div
                key={criterion.id}
                className="py-3 first:pt-0 last:pb-0 border-b last:border-0"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{index + 1}. {criterion.label}</span>
                      {criterion.isFromJD && (
                        <Badge variant="secondary" className="text-xs">From JD</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{criterion.description}</p>
                    {criterion.synonyms.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {criterion.synonyms.map((syn, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {syn}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <Badge variant="default">Weight: {criterion.weight}</Badge>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Back to Edit
          </Button>
          <Button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Confirm & Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 