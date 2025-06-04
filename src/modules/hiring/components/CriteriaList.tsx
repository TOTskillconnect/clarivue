import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { type Criterion } from '@/types/hiring';
import { CriterionCard } from './CriterionCard';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { AddCriterionDialog } from './AddCriterionDialog';
import { useToast } from '@/hooks/use-toast';
import { useErrorHandler } from '@/hooks/use-error-handler';
import { cn } from '@/lib/utils';

interface Props {
  criteria: Criterion[];
  onChange: (criteria: Criterion[]) => void;
  isLoading?: boolean;
}

export function CriteriaList({ criteria, onChange, isLoading = false }: Props) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();
  const { handleError } = useErrorHandler();

  const handleDragEnd = (result: DropResult) => {
    try {
      setIsDragging(false);
      if (!result.destination) return;

      const items = Array.from(criteria);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      onChange(items);
      toast({
        title: 'Criteria reordered',
        description: 'The criteria order has been updated.',
      });
    } catch (error) {
      handleError(error, 'Error reordering criteria');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      onChange(criteria.filter(c => c.id !== id));
      toast({
        title: 'Criterion deleted',
        description: 'The criterion has been removed.',
      });
    } catch (error) {
      handleError(error, 'Error deleting criterion');
    }
  };

  const handleEdit = async (id: string, updates: Partial<Criterion>) => {
    try {
      onChange(criteria.map(c => c.id === id ? { ...c, ...updates } : c));
      toast({
        title: 'Criterion updated',
        description: 'The changes have been saved.',
      });
    } catch (error) {
      handleError(error, 'Error updating criterion');
    }
  };

  const handleAdd = async (newCriterion: Omit<Criterion, 'id' | 'isFromJD'>) => {
    try {
      const criterion: Criterion = {
        ...newCriterion,
        id: `manual-${Date.now()}`,
        isFromJD: false,
      };
      onChange([...criteria, criterion]);
      setIsAddDialogOpen(false);
      toast({
        title: 'Criterion added',
        description: 'The new criterion has been added to the list.',
      });
    } catch (error) {
      handleError(error, 'Error adding criterion');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Hiring Criteria</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddDialogOpen(true)}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4 mr-2" />
          )}
          Add Criterion
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <DragDropContext 
          onDragEnd={handleDragEnd}
          onDragStart={() => setIsDragging(true)}
        >
          <Droppable droppableId="criteria">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={cn(
                  "space-y-3",
                  isDragging && "ring-2 ring-primary/20 rounded-lg p-4"
                )}
              >
                {criteria.map((criterion, index) => (
                  <Draggable
                    key={criterion.id}
                    draggableId={criterion.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <CriterionCard
                          criterion={criterion}
                          onDelete={() => handleDelete(criterion.id)}
                          onEdit={(updates) => handleEdit(criterion.id, updates)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {!isLoading && criteria.length === 0 && (
        <div className="text-center p-8 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            No criteria yet. Click "Add Criterion" to get started.
          </p>
        </div>
      )}

      <AddCriterionDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAdd}
      />
    </div>
  );
} 