import { Router, type Request, type Response, type RequestHandler } from 'express';
import { analyzeJobDescription as analyzeJDWithAI } from '../openai';
import { type HiringCriteria } from '@/types/hiring';
import axios from 'axios';
import * as cheerio from 'cheerio';

const router = Router();

// In-memory store for demo purposes
const criteriaStore = new Map<string, HiringCriteria>();

interface AnalysisRequest {
  url?: string;
  text?: string;
}

async function extractTextFromUrl(url: string): Promise<string> {
  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Connection': 'keep-alive',
    };

    const response = await axios.get(url, { headers });
    const $ = cheerio.load(response.data);
    
    // Remove script, style, and other non-content elements
    $('script, style, nav, header, footer, [role="complementary"]').remove();
    
    // Site-specific selectors
    const selectors = {
      linkedin: '.show-more-less-html__markup',
      indeed: '#jobDescriptionText',
      glassdoor: '.jobDescriptionContent',
      default: '.job-description, .description, [class*="job"], [class*="description"]'
    };
    
    // Try site-specific selector first
    let jobText = '';
    if (url.includes('linkedin.com')) {
      jobText = $(selectors.linkedin).text();
    } else if (url.includes('indeed.com')) {
      jobText = $(selectors.indeed).text();
    } else if (url.includes('glassdoor.com')) {
      jobText = $(selectors.glassdoor).text();
    }
    
    // Fallback to default selectors if no text found
    if (!jobText) {
      jobText = $(selectors.default).text();
    }
    
    // Final fallback to body text
    if (!jobText) {
      jobText = $('body').text();
    }
    
    // Clean up the text
    return jobText
      .trim()
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .replace(/[^\x20-\x7E\n]/g, ''); // Remove non-ASCII characters
  } catch (error) {
    console.error('Error fetching URL:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error('Access to job posting URL is forbidden. The site may require authentication.');
      } else if (error.response?.status === 404) {
        throw new Error('Job posting URL not found. The posting may have been removed.');
      }
    }
    throw new Error('Failed to fetch job description from URL');
  }
}

// Create new criteria
const createCriteria: RequestHandler = async (req, res) => {
  try {
    const criteria = req.body as HiringCriteria;
    const id = Math.random().toString(36).substring(2, 10);
    const newCriteria = {
      ...criteria,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    criteriaStore.set(id, newCriteria);
    return res.status(201).json(newCriteria);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create criteria' });
  }
};

// Get all criteria
const getAllCriteria: RequestHandler = (_req, res) => {
  const criteria = Array.from(criteriaStore.values());
  return res.json(criteria);
};

// Get criteria by ID
const getCriteriaById: RequestHandler<{ id: string }> = (req, res) => {
  const criteria = criteriaStore.get(req.params.id);
  if (!criteria) {
    return res.status(404).json({ error: 'Criteria not found' });
  }
  return res.json(criteria);
};

// Update criteria
const updateCriteria: RequestHandler<{ id: string }> = (req, res) => {
  const id = req.params.id;
  const existing = criteriaStore.get(id);
  
  if (!existing) {
    return res.status(404).json({ error: 'Criteria not found' });
  }
  
  const updated = {
    ...req.body,
    id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString()
  };
  
  criteriaStore.set(id, updated);
  return res.json(updated);
};

// Delete criteria
const deleteCriteria: RequestHandler<{ id: string }> = (req, res) => {
  const deleted = criteriaStore.delete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Criteria not found' });
  }
  return res.status(204).send();
};

// Analyze job description from URL or text
const analyzeJobDescription: RequestHandler = async (req, res) => {
  try {
    const { url, text } = req.body as AnalysisRequest;
    
    if (!url && !text) {
      return res.status(400).json({ error: 'Either URL or text must be provided' });
    }

    let jobText: string;
    
    if (url) {
      try {
        jobText = await extractTextFromUrl(url);
      } catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Failed to fetch job description from URL' });
      }
    } else {
      jobText = text!;
    }

    const analysis = await analyzeJDWithAI(jobText);
    return res.json({
      ...analysis,
      source: url ? { type: 'url', url } : { type: 'text' }
    });
  } catch (error) {
    console.error('Error analyzing job description:', error);
    return res.status(500).json({ error: 'Failed to analyze job description' });
  }
};

// Register routes
router.post('/', createCriteria);
router.get('/', getAllCriteria);
router.get('/:id', getCriteriaById);
router.put('/:id', updateCriteria);
router.delete('/:id', deleteCriteria);
router.post('/analyze', analyzeJobDescription);

export default router; 