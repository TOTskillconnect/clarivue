import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Grip, Pencil, Trash2 } from 'lucide-react';
import { type Criterion } from '@/types/hiring';
import { EditCriterionDialog } from './EditCriterionDialog';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

interface Props {
  criterion: Criterion;
  onDelete: () => void;
  onEdit: (updates: Partial<Criterion>) => void;
}

export function CriterionCard({ criterion, onDelete, onEdit }: Props) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="cursor-move">
              <Grip className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{criterion.label}</h3>
                <div className="flex items-center gap-2">
                  {criterion.isFromJD && (
                    <Badge variant="secondary">From JD</Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditDialogOpen(true)}
                    aria-label="Edit criterion"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsDeleteDialogOpen(true)}
                    aria-label="Delete criterion"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600">{criterion.description}</p>
              {criterion.synonyms.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {criterion.synonyms.map((synonym, index) => (
                    <Badge key={index} variant="outline">
                      {synonym}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Weight:</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      data-testid="weight-indicator"
                      className={`h-2 w-4 rounded-full mx-0.5 ${
                        i < criterion.weight
                          ? 'bg-primary'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditCriterionDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        criterion={criterion}
        onSave={onEdit}
      />

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete Criterion"
        description={`Are you sure you want to delete "${criterion.label}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={() => {
          onDelete();
          setIsDeleteDialogOpen(false);
        }}
      />
    </>
  );
} 