import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import { JDImportPage } from '../JDImportPage';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

// Mock sample response
const mockAnalyzeResponse = {
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

describe('JDImportPage', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockNavigate.mockReset();
  });

  it('renders the initial job description input form', () => {
    render(<JDImportPage />);
    
    expect(screen.getByText('Import Job Description')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /paste/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /link/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/paste the job description/i)).toBeInTheDocument();
  });

  it('shows loading state while analyzing JD', async () => {
    mockFetch.mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(resolve, 100))
        .then(() => ({
          ok: true,
          json: () => Promise.resolve(mockAnalyzeResponse)
        }))
    );

    render(<JDImportPage />);
    
    const textarea = screen.getByPlaceholderText(/paste the job description/i);
    await userEvent.type(textarea, 'Test job description');
    
    const submitButton = screen.getByRole('button', { name: /analyze/i });
    await userEvent.click(submitButton);
    
    expect(screen.getByText(/analyzing/i)).toBeInTheDocument();
  });

  it('navigates to scorecard page with analyzed data on successful analysis', async () => {
    mockFetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAnalyzeResponse)
      })
    );

    render(<JDImportPage />);
    
    const textarea = screen.getByPlaceholderText(/paste the job description/i);
    await userEvent.type(textarea, 'Test job description');
    
    const submitButton = screen.getByRole('button', { name: /analyze/i });
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        '/dashboard/hiring/scorecard/new',
        expect.objectContaining({
          state: { analyzedData: mockAnalyzeResponse }
        })
      );
    });
  });

  it('shows error toast on analysis failure', async () => {
    mockFetch.mockImplementationOnce(() => 
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      })
    );

    render(<JDImportPage />);
    
    const textarea = screen.getByPlaceholderText(/paste the job description/i);
    await userEvent.type(textarea, 'Test job description');
    
    const submitButton = screen.getByRole('button', { name: /analyze/i });
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/failed to analyze/i)).toBeInTheDocument();
    });
    
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('validates empty job description input', async () => {
    render(<JDImportPage />);
    
    const submitButton = screen.getByRole('button', { name: /analyze/i });
    await userEvent.click(submitButton);
    
    expect(mockFetch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('handles URL import tab switch', async () => {
    render(<JDImportPage />);
    
    const urlTab = screen.getByRole('tab', { name: /link/i });
    await userEvent.click(urlTab);
    
    expect(screen.getByPlaceholderText(/https/i)).toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/paste the job description/i)).not.toBeInTheDocument();
  });
}); 