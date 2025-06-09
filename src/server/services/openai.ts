import OpenAI from 'openai';
import dotenv from 'dotenv';
import { type Criterion } from '@/types/hiring';
import { v4 as uuidv4 } from 'uuid';
import { type ScorecardResponse, type InterviewQuestions, type InterviewReport } from '@/types/interview';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface Metric {
  name: string;
  description: string;
  weight: number;
}

interface OpenAIResponse {
  metrics: Array<Partial<Metric>>;
}

const SCORECARD_PROMPT = `You are an expert in creating interview scorecards. Given a job description, create relevant evaluation metrics.
Focus on these key areas:
1. Technical Skills
2. Soft Skills
3. Experience

For each metric, provide:
- Name
- Description (brief, 1-2 sentences)
- Weight (1-5 scale)

Return the response as a JSON object with this structure:
{
  "metrics": [{
    "name": "string",
    "description": "string",
    "weight": number
  }]
}`;

export async function analyzeJobDescription(description: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: SCORECARD_PROMPT + "\nIMPORTANT: Return ONLY the JSON object with the metrics array, without any markdown formatting or code blocks."
        },
        {
          role: "user",
          content: description
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    let content = completion.choices[0]?.message?.content || '{"metrics": []}';
    
    // Remove any markdown code block syntax if present
    content = content.replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
    
    try {
      const result = JSON.parse(content) as OpenAIResponse;
      
      // Ensure the response has the correct structure
      if (!result.metrics || !Array.isArray(result.metrics)) {
        console.error('Invalid response structure:', result);
        return { metrics: [] };
      }

      // Validate and transform each metric
      const metrics = result.metrics.map((metric: Partial<Metric>) => ({
        name: String(metric.name || ''),
        description: String(metric.description || ''),
        weight: Number(metric.weight) || 1
      }));

      return { metrics };
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Content being parsed:', content);
      return { metrics: [] };
    }
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
}

export async function extractJobTitle(jobDescription: string) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Extract the job title from the job description. Return only the title, nothing else.'
        },
        { role: 'user', content: jobDescription }
      ],
      temperature: 0.3,
    });

    const title = response.choices[0]?.message?.content?.trim();
    return title || 'Untitled Position';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    if (error instanceof Error) {
      console.error(`Title extraction failed: ${error.message}`);
    }
    return 'Untitled Position';
  }
}

export async function generateInterviewQuestions(criteria: Criterion[]): Promise<InterviewQuestions> {
  const prompt = `Based on the following hiring criteria, generate targeted interview questions that will help assess each criterion effectively.

Criteria: ${JSON.stringify(criteria, null, 2)}

For each criterion, create:
1. A primary behavioral or technical question that directly assesses the requirement
2. 2-3 follow-up questions to dig deeper based on potential responses
3. Key positive and negative indicators to look for in responses
4. Clear scoring guidelines on a 1-5 scale with specific examples

Format your response as JSON with this exact structure:
{
  "questions": [{
    "criterionId": "string",
    "primaryQuestion": "string",
    "followUpQuestions": ["string"],
    "indicators": {
      "positive": ["string"],
      "negative": ["string"]
    },
    "scoringGuidelines": {
      "1": "Poor - description",
      "2": "Below Average - description",
      "3": "Average - description",
      "4": "Above Average - description",
      "5": "Excellent - description"
    }
  }]
}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: 'Generate interview questions based on the criteria provided.' }
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  });

  return JSON.parse(response.choices[0]?.message?.content || '{}');
}

export async function generateInterviewReport(
  criteria: Criterion[],
  questions: InterviewQuestions,
  notes: string
): Promise<InterviewReport> {
  const prompt = `Analyze the interview notes and generate a comprehensive evaluation report.

Context:
- Hiring Criteria: ${JSON.stringify(criteria, null, 2)}
- Interview Questions Used: ${JSON.stringify(questions, null, 2)}
- Interview Notes: ${notes}

Generate a detailed report that includes:
1. Overall assessment of the candidate
2. Scores for each criterion (1-5 scale) with justification
3. Key strengths identified with specific examples
4. Areas of concern or growth opportunities
5. Cultural fit analysis
6. Risk assessment

Format your response as JSON with this structure:
{
  "overallAssessment": "string",
  "scores": [{
    "criterionId": "string",
    "score": number,
    "notes": "string"
  }],
  "strengths": ["string"],
  "concerns": ["string"],
  "fitAnalysis": {
    "score": number,
    "explanation": "string"
  },
  "riskAssessment": {
    "level": "low" | "medium" | "high",
    "factors": ["string"]
  }
}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: 'Generate interview report based on the provided notes and criteria.' }
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
  });

  return JSON.parse(response.choices[0]?.message?.content || '{}');
} 