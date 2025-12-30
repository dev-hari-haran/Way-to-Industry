import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Initialize the client. In a real scenario, handle missing keys gracefully.
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