import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import { ScorecardPage } from '../ScorecardPage';

// Mock useNavigate and useLocation
const mockNavigate = vi.fn();
const mockLocation = {
  state: null as { analyzedData: any } | null,
  pathname: '',
  search: '',
  hash: '',
};

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
  useParams: () => ({ scorecardId: 'new' })
}));

// Mock sample analyzed data
const mockAnalyzedData = {
  job_title: 'Senior Software Engineer',
  categories: [
    {
      name: 'Context Fit',
      weight: 30,
      criteria: [
        {
          id: '1',
          name: 'Innovation Mindset',
          weight: 15,
          description: 'Demonstrates willingness to explore new solutions'
        }
      ]
    }
  ]
};

describe('ScorecardPage', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockLocation.state = null;
  });

  it('renders the job description input form when no analyzed data', () => {
    render(<ScorecardPage />);
    
    expect(screen.getByText('Create New Scorecard')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/paste the job description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /analyze/i })).toBeInTheDocument();
  });

  it('displays scorecard with analyzed data', () => {
    mockLocation.state = { analyzedData: mockAnalyzedData };
    render(<ScorecardPage />);
    
    expect(screen.getByText('Hiring Scorecard')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Context Fit')).toBeInTheDocument();
    expect(screen.getByText('Innovation Mindset')).toBeInTheDocument();
  });

  it('allows editing when edit mode is enabled', async () => {
    mockLocation.state = { analyzedData: mockAnalyzedData };
    render(<ScorecardPage />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    await userEvent.click(editButton);
    
    expect(screen.getByDisplayValue('Senior Software Engineer')).not.toBeDisabled();
    expect(screen.getByRole('button', { name: /recalculate/i })).not.toBeDisabled();
  });

  it('handles weight recalculation', async () => {
    mockLocation.state = { analyzedData: mockAnalyzedData };
    render(<ScorecardPage />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    await userEvent.click(editButton);
    
    const recalculateButton = screen.getByRole('button', { name: /recalculate/i });
    await userEvent.click(recalculateButton);
  });

  it('validates weights before saving', async () => {
    mockLocation.state = { analyzedData: mockAnalyzedData };
    render(<ScorecardPage />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    await userEvent.click(editButton);
    
    const saveButton = screen.getByRole('button', { name: /save/i });
    await userEvent.click(saveButton);
  });

  it('shows loading state during analysis', async () => {
    render(<ScorecardPage />);
    
    const textarea = screen.getByPlaceholderText(/paste the job description/i);
    await userEvent.type(textarea, 'Test job description');
    
    const analyzeButton = screen.getByRole('button', { name: /analyze/i });
    await userEvent.click(analyzeButton);
    
    expect(screen.getByText(/analyzing/i)).toBeInTheDocument();
  });

  it('handles analysis errors', async () => {
    global.fetch = vi.fn(() => 
      Promise.reject(new Error('Analysis failed'))
    );

    render(<ScorecardPage />);
    
    const textarea = screen.getByPlaceholderText(/paste the job description/i);
    await userEvent.type(textarea, 'Test job description');
    
    const analyzeButton = screen.getByRole('button', { name: /analyze/i });
    await userEvent.click(analyzeButton);
    
    await waitFor(() => {
      expect(screen.getByText(/failed to analyze/i)).toBeInTheDocument();
    });
  });
}); 