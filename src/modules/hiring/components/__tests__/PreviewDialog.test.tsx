import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import { PreviewDialog } from '../PreviewDialog';

const mockCriteria = [
  {
    id: 'test-1',
    label: 'Technical Skills',
    description: 'Strong programming background',
    synonyms: ['coding', 'development'],
    weight: 4,
    isFromJD: true,
  },
  {
    id: 'test-2',
    label: 'Communication',
    description: 'Excellent verbal and written skills',
    synonyms: ['interpersonal', 'articulate'],
    weight: 3,
    isFromJD: false,
  },
];

describe('PreviewDialog', () => {
  const mockOnOpenChange = vi.fn();
  const mockOnConfirm = vi.fn();

  it('renders criteria summary correctly', () => {
    render(
      <PreviewDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        criteria={mockCriteria}
        onConfirm={mockOnConfirm}
      />
    );

    expect(screen.getByText('Total Criteria: 2')).toBeInTheDocument();
    expect(screen.getByText('1 from JD, 1 manual')).toBeInTheDocument();
    expect(screen.getByText('Average Weight: 3.5')).toBeInTheDocument();
    expect(screen.getByText('Total Weight: 7')).toBeInTheDocument();
  });

  it('displays all criteria details', () => {
    render(
      <PreviewDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        criteria={mockCriteria}
        onConfirm={mockOnConfirm}
      />
    );

    mockCriteria.forEach(criterion => {
      expect(screen.getByText(criterion.label)).toBeInTheDocument();
      expect(screen.getByText(criterion.description)).toBeInTheDocument();
      criterion.synonyms.forEach(synonym => {
        expect(screen.getByText(synonym)).toBeInTheDocument();
      });
      expect(screen.getByText(`Weight: ${criterion.weight}`)).toBeInTheDocument();
    });
  });

  it('shows loading state when isLoading is true', () => {
    render(
      <PreviewDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        criteria={mockCriteria}
        onConfirm={mockOnConfirm}
        isLoading={true}
      />
    );

    const confirmButton = screen.getByRole('button', { name: /saving/i });
    expect(confirmButton).toBeDisabled();
  });

  it('calls onConfirm when confirm button is clicked', async () => {
    render(
      <PreviewDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        criteria={mockCriteria}
        onConfirm={mockOnConfirm}
      />
    );

    const confirmButton = screen.getByRole('button', { name: /confirm & save/i });
    await userEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalled();
  });

  it('calls onOpenChange when back button is clicked', async () => {
    render(
      <PreviewDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        criteria={mockCriteria}
        onConfirm={mockOnConfirm}
      />
    );

    const backButton = screen.getByRole('button', { name: /back to edit/i });
    await userEvent.click(backButton);

    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it('shows "From JD" badge only for criteria from JD', () => {
    render(
      <PreviewDialog
        open={true}
        onOpenChange={mockOnOpenChange}
        criteria={mockCriteria}
        onConfirm={mockOnConfirm}
      />
    );

    const fromJDBadges = screen.getAllByText('From JD');
    expect(fromJDBadges).toHaveLength(1);
  });
}); 