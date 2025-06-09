import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Minus, Pencil } from 'lucide-react';
import { type ScorecardCategory, type ScorecardCriterion } from '@/types/scorecard';
import { useScorecardContext } from '@/contexts/ScorecardContext';
import { AddCriterionDialog } from './AddCriterionDialog';
import '@/styles/scorecard.css';

interface Props {
  category: ScorecardCategory;
  isEditing: boolean;
}

export function ScorecardCategoryPanel({ category, isEditing }: Props) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { updateCategory, updateCriterion, addCriterion, removeCriterion } = useScorecardContext();

  const handleWeightChange = (value: string) => {
    const weight = parseInt(value, 10);
    if (!isNaN(weight) && weight >= 0 && weight <= 100) {
      updateCategory(category.id, { weight });
    }
  };

  const handleCriterionWeightChange = (criterion: ScorecardCriterion, value: string) => {
    const weight = parseInt(value, 10);
    if (!isNaN(weight) && weight >= 0 && weight <= 100) {
      updateCriterion(category.id, criterion.id, { weight });
    }
  };

  const handleAddCriterion = (criterion: Omit<ScorecardCriterion, 'id'>) => {
    addCriterion(category.id, criterion);
    setIsAddDialogOpen(false);
  };

  return (
    <div className="bg-white rounded-lg border border-[#7FDCD7]/10 overflow-hidden">
      <div className="bg-gradient-to-r from-[#7FDCD7]/5 to-[#ACBAFF]/5 p-4 border-b border-[#7FDCD7]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-medium text-gray-800">{category.name}</h3>
            {isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newName = prompt('Enter new category name:', category.name);
                  if (newName) {
                    updateCategory(category.id, { name: newName });
                  }
                }}
                className="text-[#7FDCD7] hover:text-[#04ADA4] hover:bg-[#7FDCD7]/10"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-gray-600">Weight:</Label>
            <Input
              type="number"
              min="0"
              max="100"
              value={category.weight}
              onChange={(e) => handleWeightChange(e.target.value)}
              disabled={!isEditing}
              className="w-20 border-[#ACBAFF]/20 focus:border-[#ACBAFF] focus:ring-[#ACBAFF]"
            />
            <span className="text-gray-600">%</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {category.criteria.map((criterion) => (
          <div
            key={criterion.id}
            className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-200 ${
              criterion.isEnabled
                ? 'bg-gradient-to-r from-[#7FDCD7]/5 to-[#ACBAFF]/5 border border-[#7FDCD7]/10'
                : 'bg-gray-50 border border-gray-100'
            }`}
          >
            <Checkbox
              checked={criterion.isEnabled}
              onCheckedChange={(checked: boolean) =>
                updateCriterion(category.id, criterion.id, {
                  isEnabled: checked,
                })
              }
              disabled={!isEditing}
              className="mt-1"
            />
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className={`font-medium ${criterion.isEnabled ? 'text-gray-800' : 'text-gray-500'}`}>
                  {criterion.name}
                </div>
                <div className="flex items-center gap-2">
                  <Label className={criterion.isEnabled ? 'text-gray-600' : 'text-gray-400'}>Weight:</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={criterion.weight}
                    onChange={(e) => handleCriterionWeightChange(criterion, e.target.value)}
                    disabled={!isEditing || !criterion.isEnabled}
                    className={`w-20 ${
                      criterion.isEnabled
                        ? 'border-[#ACBAFF]/20 focus:border-[#ACBAFF] focus:ring-[#ACBAFF]'
                        : 'border-gray-200'
                    }`}
                  />
                  <span className={criterion.isEnabled ? 'text-gray-600' : 'text-gray-400'}>%</span>
                  {isEditing && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCriterion(category.id, criterion.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <p className={`text-sm ${criterion.isEnabled ? 'text-gray-600' : 'text-gray-400'}`}>
                {criterion.description}
              </p>
            </div>
          </div>
        ))}

        {isEditing && (
          <Button
            variant="outline"
            className="w-full mt-4 border-[#7FDCD7] text-[#7FDCD7] hover:bg-[#7FDCD7] hover:text-white"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Criterion
          </Button>
        )}

        <AddCriterionDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleAddCriterion}
        />
      </div>
    </div>
  );
} 