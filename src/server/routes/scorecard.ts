import { Router, RequestHandler } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { openai, analyzeJobDescription } from '../services/openai';

interface Metric {
  name: string;
  description: string;
  weight: number;
}

interface Scorecard {
  id: string;
  title: string;
  description?: string;
  metrics: Metric[];
  createdAt: string;
  updatedAt: string;
}

const router = Router();

// In-memory storage (replace with database in production)
let scorecards: Scorecard[] = [];

// Analyze job description
const analyze: RequestHandler = async (req, res) => {
  try {
    console.log('Analyzing job description:', req.body);
    if (!req.body.description) {
      res.status(400).json({ error: 'Job description is required' });
      return;
    }
    const result = await analyzeJobDescription(req.body.description);
    console.log('Analysis result:', result);
    res.json(result);
  } catch (error) {
    console.error('Failed to analyze job description:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: `Analysis failed: ${error.message}` });
    } else {
      res.status(500).json({ error: 'Analysis failed with unknown error' });
    }
  }
};

// Create a new scorecard from job description
const createScorecard: RequestHandler = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // Analyze job description with OpenAI
    const { metrics } = await analyzeJobDescription(description);
    
    // Create new scorecard with AI-generated metrics
    const newScorecard: Scorecard = {
      id: uuidv4(),
      title,
      description,
      metrics,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    scorecards.push(newScorecard);
    res.status(201).json({ data: newScorecard });
  } catch (error) {
    console.error('Failed to create scorecard:', error);
    res.status(500).json({ error: 'Failed to create scorecard' });
  }
};

// Get all scorecards
const getAllScorecards: RequestHandler = (_req, res) => {
  res.json({ data: scorecards });
};

// Get a specific scorecard
const getScorecard: RequestHandler<{ id: string }> = (req, res) => {
  const scorecard = scorecards.find(s => s.id === req.params.id);
  if (!scorecard) {
    res.status(404).json({ error: 'Scorecard not found' });
  } else {
    res.json({ data: scorecard });
  }
};

// Update a scorecard
const updateScorecard: RequestHandler<{ id: string }> = (req, res) => {
  const index = scorecards.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: 'Scorecard not found' });
  } else {
    scorecards[index] = {
      ...scorecards[index],
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    res.json({ data: scorecards[index] });
  }
};

// Delete a scorecard
const deleteScorecard: RequestHandler<{ id: string }> = (req, res) => {
  const index = scorecards.findIndex(s => s.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ error: 'Scorecard not found' });
  } else {
    scorecards = scorecards.filter(s => s.id !== req.params.id);
    res.status(204).send();
  }
};

// Register routes
router.post('/analyze', analyze);
router.post('/', createScorecard);
router.get('/', getAllScorecards);
router.get('/:id', getScorecard);
router.put('/:id', updateScorecard);
router.delete('/:id', deleteScorecard);

export const scorecardRoutes = router; 