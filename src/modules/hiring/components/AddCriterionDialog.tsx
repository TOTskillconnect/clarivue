import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { type Criterion } from '@/types/hiring';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (criterion: Omit<Criterion, 'id' | 'isFromJD'>) => void;
}

export function AddCriterionDialog({ open, onOpenChange, onSubmit }: Props) {
  const [formData, setFormData] = useState({
    label: '',
    description: '',
    synonyms: '',
    weight: 3,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      label: formData.label,
      description: formData.description,
      synonyms: formData.synonyms.split(',').map(s => s.trim()).filter(Boolean),
      weight: formData.weight,
    });
    setFormData({
      label: '',
      description: '',
      synonyms: '',
      weight: 3,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Criterion</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="Enter criterion label"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter criterion description"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="synonyms">Synonyms (comma-separated)</Label>
            <Input
              id="synonyms"
              value={formData.synonyms}
              onChange={(e) => setFormData({ ...formData, synonyms: e.target.value })}
              placeholder="Enter synonyms, separated by commas"
            />
          </div>
          <div className="space-y-2">
            <Label>Weight (1-5)</Label>
            <Slider
              value={[formData.weight]}
              onValueChange={(values: number[]) => setFormData({ ...formData, weight: values[0] })}
              min={1}
              max={5}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Criterion</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 