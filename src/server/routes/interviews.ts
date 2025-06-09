import { Router, Request, Response } from 'express';
import { generateInterviewQuestions, generateInterviewReport } from '../services/openai';
import { type InterviewQuestions } from '@/types/interview';
import { type Criterion } from '@/types/hiring';

const router = Router();

// Generate questions based on criteria
router.post('/questions/generate', async (req: Request, res: Response) => {
  try {
    const { criteria } = req.body as { criteria: Criterion[] };
    const questions = await generateInterviewQuestions(criteria);
    res.json(questions);
  } catch (error) {
    console.error('Failed to generate questions:', error);
    res.status(500).json({ error: 'Failed to generate questions' });
  }
});

// Generate report after interview
router.post('/report/generate', async (req: Request, res: Response) => {
  try {
    const { criteria, questions, notes } = req.body as {
      criteria: Criterion[];
      questions: InterviewQuestions;
      notes: string;
    };
    const report = await generateInterviewReport(criteria, questions, notes);
    res.json(report);
  } catch (error) {
    console.error('Failed to generate report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

export default router; 