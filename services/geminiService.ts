
import { GoogleGenAI, Type } from "@google/genai";
import { Habit, Entry } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIInsights = async (habits: Habit[], entries: Entry[]) => {
  if (habits.length === 0) return null;

  // Prepare context for the AI
  const dataContext = habits.map(habit => {
    const habitEntries = entries.filter(e => e.habitId === habit.id);
    return {
      habit: habit.name,
      goal: `${habit.goal} ${habit.unit}`,
      recentHistory: habitEntries.slice(-7).map(e => ({ date: e.date, value: e.value }))
    };
  });

  const prompt = `Analyze the following user habit tracking data and provide helpful insights, trends, and personalized recommendations.
  
  Data Context:
  ${JSON.stringify(dataContext, null, 2)}
  
  Please provide the response in a structured JSON format.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "A 2-3 sentence summary of overall progress."
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 actionable tips based on the data."
            },
            motivationalQuote: {
              type: Type.STRING,
              description: "A short motivational quote tailored to the user's journey."
            }
          },
          required: ["summary", "recommendations", "motivationalQuote"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return null;
  }
};
