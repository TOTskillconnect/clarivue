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
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type Criterion } from '@/types/hiring';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  criterion: Criterion;
  onSave: (updates: Partial<Criterion>) => void;
}

export function EditCriterionDialog({ open, onOpenChange, criterion, onSave }: Props) {
  const [formData, setFormData] = useState({
    label: criterion.label,
    description: criterion.description,
    weight: criterion.weight.toString(),
    required: criterion.required,
    synonyms: criterion.synonyms.join(', '),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...criterion,
      label: formData.label,
      description: formData.description,
      weight: parseInt(formData.weight, 10),
      required: formData.required,
      synonyms: formData.synonyms.split(',').map(s => s.trim()).filter(Boolean),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Criterion</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight</Label>
            <Select
              value={formData.weight}
              onValueChange={(value) => setFormData({ ...formData, weight: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select weight" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 - Low</SelectItem>
                <SelectItem value="2">2 - Medium Low</SelectItem>
                <SelectItem value="3">3 - Medium</SelectItem>
                <SelectItem value="4">4 - Medium High</SelectItem>
                <SelectItem value="5">5 - High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="synonyms">Synonyms (comma-separated)</Label>
            <Input
              id="synonyms"
              value={formData.synonyms}
              onChange={(e) => setFormData({ ...formData, synonyms: e.target.value })}
              placeholder="e.g. JavaScript, JS, ECMAScript"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="required">Required</Label>
            <Switch
              id="required"
              checked={formData.required}
              onCheckedChange={(checked) => setFormData({ ...formData, required: checked })}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 