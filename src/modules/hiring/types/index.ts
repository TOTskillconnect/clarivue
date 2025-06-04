// Each criterion object
export interface Criterion {
  id: string;                 // Unique UUID (front-end generated)
  label: string;              // e.g. "Cloud Architecture Expertise"
  description: string;        // e.g. "Experience designing, deploying, and scaling…"
  synonyms: string[];         // e.g. ["AWS", "Azure", "Kubernetes"]
  weight: number;             // 1 (low) – 5 (high)
  isFromJD: boolean;          // true if auto-extracted, false if user added
}

// Job Description payload before NLP
export interface JDInput {
  rawText: string;            // Full pasted JD or fetched HTML cleaned to text
  sourceUrl?: string;         // Optional URL, if the user supplied a link
}

// Response from backend NLP endpoint
export interface JDAnalysisResponse {
  criteria: Array<{
    suggestedLabel: string;   // e.g. "Team Collaboration"
    suggestedDescription: string; // A short phrase extracted from JD
    suggestedSynonyms: string[];  // e.g. ["cross-functional", "stakeholders"]
  }>;
} 