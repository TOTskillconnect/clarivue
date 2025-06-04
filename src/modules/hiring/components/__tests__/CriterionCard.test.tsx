import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import { CriterionCard } from '../CriterionCard';

const mockCriterion = {
  id: 'test-1',
  label: 'Test Criterion',
  description: 'Test description',
  synonyms: ['test1', 'test2'],
  weight: 3,
  isFromJD: true,
};

describe('CriterionCard', () => {
  const mockDelete = vi.fn();
  const mockEdit = vi.fn();

  it('renders criterion details correctly', () => {
    render(
      <CriterionCard
        criterion={mockCriterion}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );

    expect(screen.getByText(mockCriterion.label)).toBeInTheDocument();
    expect(screen.getByText(mockCriterion.description)).toBeInTheDocument();
    expect(screen.getByText('From JD')).toBeInTheDocument();
    mockCriterion.synonyms.forEach(synonym => {
      expect(screen.getByText(synonym)).toBeInTheDocument();
    });
  });

  it('shows weight indicator correctly', () => {
    render(
      <CriterionCard
        criterion={mockCriterion}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );

    // Since weight is 3, we should have 3 filled indicators and 2 empty ones
    const indicators = screen.getAllByTestId('weight-indicator');
    expect(indicators).toHaveLength(5);
    
    indicators.forEach((indicator, index) => {
      if (index < mockCriterion.weight) {
        expect(indicator).toHaveClass('bg-primary');
      } else {
        expect(indicator).toHaveClass('bg-gray-200');
      }
    });
  });

  it('calls onDelete when delete button is clicked', async () => {
    render(
      <CriterionCard
        criterion={mockCriterion}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await userEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalled();
  });

  it('opens edit dialog when edit button is clicked', async () => {
    render(
      <CriterionCard
        criterion={mockCriterion}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    await userEvent.click(editButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Edit Criterion')).toBeInTheDocument();
  });

  it('shows "From JD" badge only when isFromJD is true', () => {
    const nonJDCriterion = { ...mockCriterion, isFromJD: false };
    
    const { rerender } = render(
      <CriterionCard
        criterion={nonJDCriterion}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );

    expect(screen.queryByText('From JD')).not.toBeInTheDocument();

    rerender(
      <CriterionCard
        criterion={mockCriterion}
        onDelete={mockDelete}
        onEdit={mockEdit}
      />
    );

    expect(screen.getByText('From JD')).toBeInTheDocument();
  });
}); 