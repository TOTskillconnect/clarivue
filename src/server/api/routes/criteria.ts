import { Router, Request, Response } from 'express';
import { analyzeJobDescription as analyze } from '../../services/openai';
import { criteriaStore } from '../../store/criteria';
import type { Criterion, JDInput } from '../../../types/hiring';
import axios from 'axios';
import * as cheerio from 'cheerio';

const router = Router();

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

const createCriteria = async (req: Request, res: Response) => {
  try {
    const criteria = criteriaStore.create(req.body);
    res.status(201).json(criteria);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: message });
  }
};

const getAllCriteria = (_req: Request, res: Response) => {
  try {
    const criteria = criteriaStore.getAll();
    res.json(criteria);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: message });
  }
};

const getCriteriaById = (req: Request<{ id: string }>, res: Response) => {
  try {
    const criteria = criteriaStore.getById(req.params.id);
    if (!criteria) {
      return res.status(404).json({ error: 'Criteria not found' });
    }
    res.json(criteria);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: message });
  }
};

const updateCriteria = (req: Request<{ id: string }>, res: Response) => {
  try {
    const criteria = criteriaStore.update(req.params.id, req.body);
    if (!criteria) {
      return res.status(404).json({ error: 'Criteria not found' });
    }
    res.json(criteria);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: message });
  }
};

const deleteCriteria = (req: Request<{ id: string }>, res: Response) => {
  try {
    criteriaStore.delete(req.params.id);
    res.status(204).send();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: message });
  }
};

const analyzeJobDescription = async (req: Request, res: Response) => {
  try {
    const { text, url } = req.body as JDInput;
    const result = await analyze(text, url);
    res.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: message });
  }
};

router.post('/', createCriteria);
router.get('/', getAllCriteria);
router.get('/:id', getCriteriaById);
router.put('/:id', updateCriteria);
router.delete('/:id', deleteCriteria);
router.post('/analyze', analyzeJobDescription);

export default router; 