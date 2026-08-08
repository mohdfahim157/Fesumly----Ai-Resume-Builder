import { GoogleGenAI, Type } from "@google/genai";
import type { Schema } from "@google/genai";

// Define pure TypeScript interfaces 
export interface TechnicalQuestion {
  question: string;
  intention: string;
  answer: string;
}

export interface BehavioralQuestion {
  question: string;
  intention: string;
  answer: string;
}

export interface SkillsGap {
  skill: string;
  severity: "low" | "medium" | "high";
}

export interface PreparationPlanDay {
  day: number;
  focus: string;
  tasks: string[];
}

export interface InterviewReport {
  name: string;
  matchScore: number;
  technicalQuestions: TechnicalQuestion[];
  behavioralQuestions: BehavioralQuestion[];
  skillsGaps: SkillsGap[];
  preparationPlan: PreparationPlanDay[];
  title: string;
}

export interface GenerationParams {
  resume: string;
  selfDescription: string;
  jobDescription: string;
}

export interface ResumePdfResponse {
  html: string;
}

// Define the raw JSON Schema to pass to Gemini
const interviewReportJsonSchema = {
  type: "OBJECT",
  properties: {
    name: { type: "STRING", description: "Name that user given " },
    matchScore: {
      type: "NUMBER",
      description:
        "A score between 0 and 100 indicating how well the candidate's profile matches the job description.",
    },
    technicalQuestions: {
      type: "ARRAY",
      description:
        "Technical questions that can be asked in the interview along with their intention and how to answer them.",
      items: {
        type: "OBJECT",
        properties: {
          question: {
            type: "STRING",
            description:
              "The technical question that can be asked in the interview.",
          },
          intention: {
            type: "STRING",
            description:
              "The interviewer's intention behind asking this question.",
          },
          answer: {
            type: "STRING",
            description:
              "How to answer this question, what points to cover, and what approach to take.",
          },
        },
        required: ["question", "intention", "answer"],
      },
    },
    behavioralQuestions: {
      type: "ARRAY",
      description:
        "Behavioral questions that can be asked in the interview along with their intention and how to answer them.",
      items: {
        type: "OBJECT",
        properties: {
          question: {
            type: "STRING",
            description:
              "The behavioral question that can be asked in the interview.",
          },
          intention: {
            type: "STRING",
            description:
              "The interviewer's intention behind asking this question.",
          },
          answer: {
            type: "STRING",
            description:
              "How to answer this question, what points to cover, and what approach to take.",
          },
        },
        required: ["question", "intention", "answer"],
      },
    },
    skillsGaps: {
      type: "ARRAY",
      description:
        "List of skill gaps in the candidate's profile along with their severity.",
      items: {
        type: "OBJECT",
        properties: {
          skill: {
            type: "STRING",
            description: "The skill which the candidate is lacking.",
          },
          severity: {
            type: "STRING",
            enum: ["low", "medium", "high"],
            description: "The severity of this skill gap.",
          },
        },
        required: ["skill", "severity"],
      },
    },
    preparationPlan: {
      type: "ARRAY",
      description:
        "A day-wise preparation plan for the candidate to prepare for the interview.",
      items: {
        type: "OBJECT",
        properties: {
          day: {
            type: "NUMBER",
            description:
              "The day number in the preparation plan, starting from 1.",
          },
          focus: { type: "STRING", description: "The main focus of this day." },
          tasks: {
            type: "ARRAY",
            description: "List of tasks to complete on this day.",
            items: { type: "STRING" },
          },
        },
        required: ["day", "focus", "tasks"],
      },
    },
    title: {
      type: "STRING",
      description:
        "The title of the job for which the interview report is generated.",
    },
  },
  required: [
    "name",
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillsGaps",
    "preparationPlan",
    "title",
  ],
};

const resumePdfJsonSchema = {
  type: "OBJECT",
  properties: {
    html: {
      type: "STRING",
      description:
        "The HTML content of the resume which can be converted to PDF using any librarys  ",
    },
  },
  required: ["html"],
};




export async function generateResumePdf({
  resume,
  selfDescription,
  jobDescription,
}: GenerationParams): Promise<string> {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GOOGLE_GENAI_API_KEY environment variable.");
  }
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `You are an Expert Executive Resume Writer and ATS (Applicant Tracking System) Optimization Specialist. 

Your objective is to generate a highly tailored, ATS-friendly resume in HTML format that perfectly positions the candidate for the target role based on their existing experience and self-description.

### INPUT DATA:
- Current Resume Data: ${resume}
- Candidate's Self Description: ${selfDescription}
- Target Job Description: ${jobDescription}

### TASK:
Analyze the Job Description to identify key requirements, skills, and industry keywords. Then, rewrite and structure the candidate's Current Resume and Self Description to highlight the most relevant strengths, experiences, and accomplishments. 

### CONTENT RULES (STRICT STRICT COMPLIANCE REQUIRED):
1. True to Experience (No Hallucinations): Do NOT invent jobs, degrees, or metrics that are not supported by the provided inputs. Enhance and tailor, but remain strictly factual.
2. 100% Human-Sounding Tone: The writing must be indistinguishable from a real human professional. 
   - BANNED AI VOCABULARY: You must NOT use flowery, dramatic, or cliché AI words (e.g., "delve", "testament", "tapestry", "synergy", "dynamic", "seamlessly", "orchestrated", "pivotal", "unwavering", "spearheaded", "beacon", "landscape").
   - PLAIN ENGLISH: Use clear, straightforward business language. Do not over-embellish duties. 
   - VARIED CADENCE: Humans don't write with perfect robotic rhythm. Vary your sentence structures. Avoid starting every single bullet point with the same rhythm. 
   - MATCH THE USER: Analyze the 'selfDescription' and incorporate its natural, human phrasing where appropriate.
3. Impact-Driven: Format experience bullet points to focus on achievements (e.g., "Accomplished [X] by doing [Y]"). If metrics aren't provided, focus on the tangible business result of the task.
4. Brevity & Quality: The final output must be concise enough to fit on 1-2 pages when converted to PDF. Avoid fluff. Prioritize quality and relevance over quantity. 

### DESIGN & HTML/CSS RULES:
1. Semantic HTML: Use proper structural tags ('<h1>' for name, '<h2>' for section headers, '<ul>' and '<li>' for lists, '<p>' for text) to ensure the HTML remains easily parsable by ATS systems before or during PDF conversion.
2. Styling: Use inline CSS or a single '<style>' block. The design must be modern, clean, minimal, and highly professional.
3. Typography & Layout: Use standard, legible web-safe fonts (e.g., Arial, Helvetica, Roboto, or standard sans-serif). Ensure appropriate margins, line spacing, and visual hierarchy. 
4. Color Palette: Keep it mostly monochrome with a single, subtle, professional accent color (e.g., deep navy blue or dark slate gray) for headers or lines.

### OUTPUT FORMAT:
You must output ONLY a valid JSON object. Do not include any markdown wrappers (like json), conversational text, or explanations before or after the JSON and make sure that it cover only one A4 page not excluded it and cover whole page with content. 

The JSON must exactly match this structure:
{
  "html": "<!DOCTYPE html><html><head>...</head><body>...</body></html>"
} `;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: resumePdfJsonSchema as Schema,
    },
  });

  if (!response.text) {
    throw new Error("Failed to generate content: response is empty.");
  }

  const jsonContent = JSON.parse(response.text) as ResumePdfResponse;

  return jsonContent.html;
}

export default async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}: GenerationParams): Promise<InterviewReport> {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GOOGLE_GENAI_API_KEY environment variable.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
    `;

  // Using standard generateContent API as Interactions API is either not fully supported or is specific to another package version.
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: interviewReportJsonSchema as Schema,
    },
  });

  if (!response.text) {
    throw new Error("Failed to generate content: response is empty.");
  }

  return JSON.parse(response.text) as InterviewReport;
}
