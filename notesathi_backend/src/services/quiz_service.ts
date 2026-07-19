import { GoogleGenAI, Type } from "@google/genai";
import { HttpException } from "../exceptions/http-exception";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

const QUESTION_COUNT = 10;

export class QuizService {
  async generateQuiz(topic: string, context: string): Promise<QuizQuestion[]> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new HttpException(503, "Quiz generation is not configured");
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are creating a study quiz for a student about "${topic}".
Context / notes description: ${context || "No further description provided."}

Write exactly ${QUESTION_COUNT} multiple-choice questions that test understanding of this topic.
Each question must have exactly 4 answer options with exactly one correct option.
Keep questions and options concise and unambiguous.`;

    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                correctIndex: { type: Type.INTEGER },
              },
              required: ["question", "options", "correctIndex"],
            },
          },
        },
      });
    } catch (error: any) {
      throw new HttpException(502, error?.message || "Failed to reach quiz generator");
    }

    const text = response.text;
    if (!text) {
      throw new HttpException(502, "Quiz generator returned an empty response");
    }

    let questions: QuizQuestion[];
    try {
      questions = JSON.parse(text);
    } catch {
      throw new HttpException(502, "Failed to parse quiz response");
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new HttpException(502, "Quiz generator returned no questions");
    }

    return questions.filter(
      (q) =>
        q &&
        typeof q.question === "string" &&
        Array.isArray(q.options) &&
        q.options.length === 4 &&
        typeof q.correctIndex === "number",
    );
  }
}
