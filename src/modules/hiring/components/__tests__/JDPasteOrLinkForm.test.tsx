import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import { JDPasteOrLinkForm } from '../JDPasteOrLinkForm';

describe('JDPasteOrLinkForm', () => {
  const mockSubmit = vi.fn();

  it('renders both paste and link tabs', () => {
    render(<JDPasteOrLinkForm onSubmit={mockSubmit} />);
    
    expect(screen.getByRole('tab', { name: /paste jd/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /link to jd/i })).toBeInTheDocument();
  });

  it('allows pasting job description text', async () => {
    render(<JDPasteOrLinkForm onSubmit={mockSubmit} />);
    
    const textarea = screen.getByPlaceholderText(/paste the job description/i);
    await userEvent.type(textarea, 'Test job description');
    
    const submitButton = screen.getByRole('button', { name: /analyze/i });
    await userEvent.click(submitButton);
    
    expect(mockSubmit).toHaveBeenCalledWith({
      text: 'Test job description',
      url: undefined,
    });
  });

  it('allows entering a job posting URL', async () => {
    render(<JDPasteOrLinkForm onSubmit={mockSubmit} />);
    
    // Switch to URL tab
    const linkTab = screen.getByRole('tab', { name: /link to jd/i });
    await userEvent.click(linkTab);
    
    const urlInput = screen.getByPlaceholderText(/https/i);
    await userEvent.type(urlInput, 'https://example.com/job');
    
    const submitButton = screen.getByRole('button', { name: /analyze/i });
    await userEvent.click(submitButton);
    
    expect(mockSubmit).toHaveBeenCalledWith({
      text: '',
      url: 'https://example.com/job',
    });
  });

  it('prevents submission when no input is provided', async () => {
    render(<JDPasteOrLinkForm onSubmit={mockSubmit} />);
    
    const submitButton = screen.getByRole('button', { name: /analyze/i });
    await userEvent.click(submitButton);
    
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('switches between paste and link modes', async () => {
    render(<JDPasteOrLinkForm onSubmit={mockSubmit} />);
    
    // Initially shows paste textarea
    expect(screen.getByPlaceholderText(/paste the job description/i)).toBeInTheDocument();
    
    // Switch to link mode
    const linkTab = screen.getByRole('tab', { name: /link to jd/i });
    await userEvent.click(linkTab);
    
    // Shows URL input
    expect(screen.getByPlaceholderText(/https/i)).toBeInTheDocument();
    
    // Switch back to paste mode
    const pasteTab = screen.getByRole('tab', { name: /paste jd/i });
    await userEvent.click(pasteTab);
    
    // Shows textarea again
    expect(screen.getByPlaceholderText(/paste the job description/i)).toBeInTheDocument();
  });
}); 