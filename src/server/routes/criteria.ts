import { Router, Request, Response } from 'express';
import { analyzeJobDescription } from '../services/openai';

const router = Router();

interface AnalyzeRequest {
  text: string;
}

// Analyze job description and return criteria
router.post('/analyze', async (req: Request<{}, {}, AnalyzeRequest>, res: Response) => {
  try {
    console.log('Received analyze request:', req.body);
    const { text } = req.body;
    
    if (!text) {
      console.log('Missing text in request body');
      return res.status(400).json({ 
        error: 'Job description text is required',
        details: 'Please provide the job description text in the request body'
      });
    }

    if (typeof text !== 'string' || text.trim().length === 0) {
      console.log('Invalid text format in request body');
      return res.status(400).json({ 
        error: 'Invalid job description format',
        details: 'Job description must be a non-empty string'
      });
    }

    console.log('Calling OpenAI service...');
    const result = await analyzeJobDescription(text);
    console.log('Analysis complete, sending response');
    res.json(result);
  } catch (error) {
    console.error('Analysis failed:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);

      if (error.message.includes('OpenAI')) {
        return res.status(503).json({
          error: 'AI service temporarily unavailable',
          details: 'The AI analysis service is currently unavailable. Please try again later.'
        });
      }

      if (error.message.includes('Invalid response structure') || 
          error.message.includes('Invalid category structure') ||
          error.message.includes('Invalid criterion structure')) {
        return res.status(500).json({
          error: 'Analysis format error',
          details: 'The analysis result was not in the expected format. Our team has been notified.'
        });
      }
    }

    // Generic error response
    res.status(500).json({ 
      error: 'Failed to analyze job description',
      details: 'An unexpected error occurred while analyzing the job description. Please try again.'
    });
  }
});

export default router; 