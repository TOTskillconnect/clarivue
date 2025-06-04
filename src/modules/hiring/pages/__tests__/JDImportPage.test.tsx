import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import { JDImportPage } from '../JDImportPage';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('JDImportPage', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('renders the initial job description input step', () => {
    render(<JDImportPage />);
    
    expect(screen.getByText('Import Job Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /analyze/i })).toBeInTheDocument();
  });

  it('shows loading state while analyzing', async () => {
    mockFetch.mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(resolve, 100))
        .then(() => ({
          ok: true,
          json: () => Promise.resolve({ criteria: [] }),
        }))
    );

    render(<JDImportPage />);
    
    const textarea = screen.getByPlaceholderText(/paste the job description/i);
    await userEvent.type(textarea, 'Test job description');
    
    const analyzeButton = screen.getByRole('button', { name: /analyze/i });
    await userEvent.click(analyzeButton);
    
    expect(screen.getByText(/analyzing/i)).toBeInTheDocument();
  });

  it('transitions to review step after successful analysis', async () => {
    const mockCriteria = [
      {
        id: 'test-1',
        label: 'Test Criterion',
        description: 'Test description',
        synonyms: ['test'],
        weight: 3,
        isFromJD: true,
      },
    ];

    mockFetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ criteria: mockCriteria }),
      })
    );

    render(<JDImportPage />);
    
    const textarea = screen.getByPlaceholderText(/paste the job description/i);
    await userEvent.type(textarea, 'Test job description');
    
    const analyzeButton = screen.getByRole('button', { name: /analyze/i });
    await userEvent.click(analyzeButton);
    
    await waitFor(() => {
      expect(screen.getByText('Review Criteria')).toBeInTheDocument();
    });

    expect(screen.getByText('Test Criterion')).toBeInTheDocument();
  });

  it('shows error toast on analysis failure', async () => {
    mockFetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: false,
      })
    );

    render(<JDImportPage />);
    
    const textarea = screen.getByPlaceholderText(/paste the job description/i);
    await userEvent.type(textarea, 'Test job description');
    
    const analyzeButton = screen.getByRole('button', { name: /analyze/i });
    await userEvent.click(analyzeButton);
    
    await waitFor(() => {
      expect(screen.getByText(/failed to analyze/i)).toBeInTheDocument();
    });
  });

  it('opens preview dialog when clicking review & save', async () => {
    const mockCriteria = [
      {
        id: 'test-1',
        label: 'Test Criterion',
        description: 'Test description',
        synonyms: ['test'],
        weight: 3,
        isFromJD: true,
      },
    ];

    mockFetch
      .mockImplementationOnce(() => 
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ criteria: mockCriteria }),
        })
      );

    render(<JDImportPage />);
    
    // First analyze JD
    const textarea = screen.getByPlaceholderText(/paste the job description/i);
    await userEvent.type(textarea, 'Test job description');
    
    const analyzeButton = screen.getByRole('button', { name: /analyze/i });
    await userEvent.click(analyzeButton);
    
    await waitFor(() => {
      expect(screen.getByText('Review Criteria')).toBeInTheDocument();
    });

    // Click review & save
    const reviewButton = screen.getByRole('button', { name: /review & save/i });
    await userEvent.click(reviewButton);

    expect(screen.getByText('Review Hiring Criteria')).toBeInTheDocument();
  });
}); 