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
import { type ScorecardCriterion } from '@/types/scorecard';
import '@/styles/scorecard.css';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (criterion: Omit<ScorecardCriterion, 'id'>) => void;
}

export function AddCriterionDialog({ open, onOpenChange, onSubmit }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    weight: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      description: formData.description,
      weight: formData.weight,
      isEnabled: true,
    });
    setFormData({
      name: '',
      description: '',
      weight: 0,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <div className="scorecard-header">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Add New Criterion</DialogTitle>
          </DialogHeader>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter criterion name"
              className="border-[#ACBAFF]/20 focus:border-[#ACBAFF] focus:ring-[#ACBAFF]"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter criterion description"
              className="min-h-[100px] border-[#ACBAFF]/20 focus:border-[#ACBAFF] focus:ring-[#ACBAFF]"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight" className="text-sm font-medium text-gray-700">
              Weight (%)
            </Label>
            <Input
              id="weight"
              type="number"
              min="0"
              max="100"
              value={formData.weight}
              onChange={(e) =>
                setFormData({ ...formData, weight: parseInt(e.target.value, 10) || 0 })
              }
              className="border-[#ACBAFF]/20 focus:border-[#ACBAFF] focus:ring-[#ACBAFF]"
              required
            />
          </div>
          <DialogFooter className="gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1 border-[#ACBAFF] text-[#ACBAFF] hover:bg-[#ACBAFF] hover:text-white"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="flex-1 scorecard-button-primary"
            >
              Add Criterion
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 