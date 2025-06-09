import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { type Scorecard, type ScorecardCategory, type ScorecardCriterion, type ScorecardContextState } from '@/types/scorecard';
import { useToast } from '@/hooks/use-toast';

const ScorecardContext = createContext<ScorecardContextState | null>(null);

export function useScorecardContext() {
  const context = useContext(ScorecardContext);
  if (!context) {
    throw new Error('useScorecardContext must be used within a ScorecardProvider');
  }
  return context;
}

interface Props {
  children: React.ReactNode;
}

export function ScorecardProvider({ children }: Props) {
  const [scorecard, setScorecard] = useState<Scorecard | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const validateWeights = useCallback(() => {
    if (!scorecard) return null;

    // Check if category weights sum to 100
    const totalCategoryWeight = scorecard.categories.reduce((sum, c) => sum + c.weight, 0);
    if (Math.abs(totalCategoryWeight - 100) > 0.1) {
      toast({
        title: 'Weight Distribution Warning',
        description: `Category weights sum to ${totalCategoryWeight}%. They should total 100%.`,
        variant: 'default',
      });
      return false;
    }

    // Check if criteria weights within each category sum to the category weight
    const invalidCategories = scorecard.categories.filter(category => {
      const totalCriteriaWeight = category.criteria
        .filter(c => c.isEnabled)
        .reduce((sum, c) => sum + c.weight, 0);
      return Math.abs(totalCriteriaWeight - category.weight) > 0.1;
    });

    if (invalidCategories.length > 0) {
      toast({
        title: 'Weight Distribution Warning',
        description: `Criteria weights don't match category weights in: ${invalidCategories.map(c => c.name).join(', ')}`,
        variant: 'default',
      });
      return false;
    }

    return true;
  }, [scorecard, toast]);

  const updateCategory = useCallback((categoryId: string, updates: Partial<ScorecardCategory>) => {
    setScorecard((prev) => {
      if (!prev) return null;
      const newScorecard = {
        ...prev,
        categories: prev.categories.map((category) =>
          category.id === categoryId ? { ...category, ...updates } : category
        ),
      };
      return newScorecard;
    });
  }, []);

  const updateCriterion = useCallback(
    (categoryId: string, criterionId: string, updates: Partial<ScorecardCriterion>) => {
      setScorecard((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          categories: prev.categories.map((category) =>
            category.id === categoryId
              ? {
                  ...category,
                  criteria: category.criteria.map((criterion) =>
                    criterion.id === criterionId ? { ...criterion, ...updates } : criterion
                  ),
                }
              : category
          ),
        };
      });
    },
    []
  );

  const addCriterion = useCallback((categoryId: string, criterion: Omit<ScorecardCriterion, 'id'>) => {
    setScorecard((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        categories: prev.categories.map((category) =>
          category.id === categoryId
            ? {
                ...category,
                criteria: [...category.criteria, { ...criterion, id: uuidv4() }],
              }
            : category
        ),
      };
    });
  }, []);

  const removeCriterion = useCallback((categoryId: string, criterionId: string, redistributeWeight = true) => {
    setScorecard((prev) => {
      if (!prev) return null;

      const category = prev.categories.find(c => c.id === categoryId);
      if (!category) return prev;

      const criterionToRemove = category.criteria.find(c => c.id === criterionId);
      if (!criterionToRemove) return prev;

      const remainingCriteria = category.criteria.filter(c => c.id !== criterionId);
      const enabledRemainingCriteria = remainingCriteria.filter(c => c.isEnabled);

      let updatedCriteria = remainingCriteria;
      if (redistributeWeight && enabledRemainingCriteria.length > 0) {
        const weightToRedistribute = criterionToRemove.weight;
        const weightPerCriterion = weightToRedistribute / enabledRemainingCriteria.length;
        
        updatedCriteria = remainingCriteria.map(c => ({
          ...c,
          weight: c.isEnabled ? c.weight + weightPerCriterion : c.weight,
        }));
      }

      return {
        ...prev,
        categories: prev.categories.map((c) =>
          c.id === categoryId
            ? {
                ...c,
                criteria: updatedCriteria,
              }
            : c
        ),
      };
    });
  }, []);

  const recalculateWeights = useCallback(() => {
    setScorecard((prev) => {
      if (!prev) return null;

      // First, ensure each category's criteria weights sum to the category weight
      const categoriesWithRecalculatedWeights = prev.categories.map((category) => {
        const enabledCriteria = category.criteria.filter((c) => c.isEnabled);
        const weightPerCriterion = category.weight / enabledCriteria.length;

        return {
          ...category,
          criteria: category.criteria.map((criterion) => ({
            ...criterion,
            weight: criterion.isEnabled ? weightPerCriterion : 0,
          })),
        };
      });

      // Then, ensure category weights sum to 100
      const totalCategoryWeight = categoriesWithRecalculatedWeights.reduce(
        (sum, c) => sum + c.weight,
        0
      );
      const weightMultiplier = 100 / totalCategoryWeight;

      const updatedCategories = categoriesWithRecalculatedWeights.map((category) => {
        const newWeight = Math.round(category.weight * weightMultiplier);
        const weightPerCriterion = newWeight / category.criteria.filter(c => c.isEnabled).length;

        return {
          ...category,
          weight: newWeight,
          criteria: category.criteria.map(criterion => ({
            ...criterion,
            weight: criterion.isEnabled ? weightPerCriterion : 0,
          })),
        };
      });

      return {
        ...prev,
        categories: updatedCategories,
      };
    });

    toast({
      title: 'Weights Recalculated',
      description: 'All weights have been automatically rebalanced.',
    });
  }, [toast]);

  const saveScorecard = useCallback(async () => {
    if (!scorecard) return;
    
    if (!validateWeights()) {
      throw new Error('Invalid weight distribution. Please recalculate weights before saving.');
    }

    // TODO: Implement API call to save scorecard
    console.log('Saving scorecard:', scorecard);
  }, [scorecard, validateWeights]);

  const value: ScorecardContextState = {
    scorecard,
    isEditing,
    setScorecard,
    updateCategory,
    updateCriterion,
    addCriterion,
    removeCriterion,
    recalculateWeights,
    setIsEditing,
    saveScorecard,
  };

  return <ScorecardContext.Provider value={value}>{children}</ScorecardContext.Provider>;
} 