import OpenAI from 'openai';
import { type Criterion } from '@/types/hiring';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Log environment variable status (for debugging)
console.log('OpenAI API Key status:', process.env.OPENAI_API_KEY ? 'Present' : 'Missing');

interface AnalyzeJDResponse {
  criteria: Criterion[];
  summary: string;
  confidence: number;
}

export async function analyzeJobDescription(jdText: string): Promise<AnalyzeJDResponse> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert hiring manager and recruiter. Your task is to analyze job descriptions 
          and extract key hiring criteria, skills, and requirements. Format your response as a JSON object with:
          - criteria: array of objects with label and description
          - summary: brief overview of the role
          - confidence: number between 0-1 indicating analysis confidence`
        },
        {
          role: "user",
          content: jdText
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');

    // Validate and transform the response
    const criteria = (result.criteria || []).map((criterion: any) => ({
      label: criterion.label || '',
      description: criterion.description || '',
      required: criterion.required || false,
      weight: criterion.weight || 1,
    }));

    return {
      criteria,
      summary: result.summary || '',
      confidence: result.confidence || 0,
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('Failed to analyze job description');
  }
} 