import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Initialize the client.
const ai = new GoogleGenAI({ apiKey });

export const generateCareerRoadmap = async (currentSkills: string, targetRole: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure process.env.API_KEY to use the AI features.";
  }

  try {
    const prompt = `
      Act as an expert career coach and industry mentor.
      
      Context: A student has the following skills: "${currentSkills}".
      Goal: They want to become a "${targetRole}".
      
      Task: Create a concise, motivating, and actionable roadmap to bridge the gap.
      1. Analyze the Gap: Briefly mention what they are missing.
      2. Step-by-Step Plan: List 3-5 key milestones they need to hit (e.g., learn React, build a project, etc.).
      3. Resource Recommendation: Suggest 1 general type of resource (e.g., "Official documentation" or "Open source projects").
      
      Keep the tone encouraging but professional. Use Markdown for formatting.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Could not generate roadmap. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while communicating with the AI. Please check your connection and try again.";
  }
};

// Interface for the interview question structure
export interface InterviewQuestion {
  id: number;
  type: 'MCQ' | 'CODE';
  question: string;
  options?: string[]; // Only for MCQ
  correctAnswer?: string; // Only for MCQ (index or value)
  hint?: string; // For Code
}

export const generateInterviewQuestions = async (topic: string, type: 'Skill' | 'Role'): Promise<InterviewQuestion[]> => {
  if (!apiKey) {
    // Fallback mock data if no key
    return [
      { id: 1, type: 'MCQ', question: `What is a key feature of ${topic}?`, options: ['Speed', 'Complexity', 'Redundancy', 'None'], correctAnswer: 'Speed' },
      { id: 2, type: 'MCQ', question: 'Which pattern is best?', options: ['Singleton', 'Factory', 'Observer', 'All'], correctAnswer: 'Factory' },
      { id: 3, type: 'MCQ', question: 'Identify the error.', options: ['Syntax', 'Logic', 'Runtime', 'None'], correctAnswer: 'Syntax' },
      { id: 4, type: 'CODE', question: `Write a function in ${topic} to reverse a string.`, hint: 'Use built-in methods.' },
      { id: 5, type: 'CODE', question: 'Optimize this loop.', hint: 'Reduce time complexity.' },
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 5 interview questions for the ${type}: "${topic}". 
      The first 3 must be Multiple Choice Questions (MCQ) with 4 options and 1 correct answer.
      The last 2 must be Coding challenges (CODE) that ask the user to write a snippet.
      Strictly follow the JSON schema.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              type: { type: Type.STRING, enum: ["MCQ", "CODE"] },
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.STRING, description: "The correct option text for MCQ" },
              hint: { type: Type.STRING, description: "A hint for the coding challenge" }
            },
            required: ["id", "type", "question"]
          }
        }
      }
    });

    const data = JSON.parse(response.text || "[]");
    return data;
  } catch (error) {
    console.error("Gemini Interview Error:", error);
    // Fallback on error
    return [
      { id: 1, type: 'MCQ', question: `What is the primary use of ${topic}?`, options: ['A', 'B', 'C', 'D'], correctAnswer: 'A' },
      { id: 2, type: 'MCQ', question: 'Question 2', options: ['A', 'B', 'C', 'D'], correctAnswer: 'B' },
      { id: 3, type: 'MCQ', question: 'Question 3', options: ['A', 'B', 'C', 'D'], correctAnswer: 'C' },
      { id: 4, type: 'CODE', question: `Write a generic function for ${topic}.`, hint: 'Think simple.' },
      { id: 5, type: 'CODE', question: 'Explain this concept in code.', hint: 'Be verbose.' },
    ];
  }
};