const mockGenerateContent = jest.fn();

jest.mock("@google/genai", () => ({
  GoogleGenAI: jest.fn().mockImplementation(() => ({
    models: { generateContent: mockGenerateContent },
  })),
  Type: { ARRAY: "ARRAY", OBJECT: "OBJECT", STRING: "STRING", INTEGER: "INTEGER" },
}));

import { QuizService } from "../../../services/quiz_service";
import { HttpException } from "../../../exceptions/http-exception";

const quizService = new QuizService();
const ORIGINAL_ENV = process.env.GEMINI_API_KEY;

beforeEach(() => {
  process.env.GEMINI_API_KEY = "test-api-key";
  mockGenerateContent.mockReset();
});

afterAll(() => {
  process.env.GEMINI_API_KEY = ORIGINAL_ENV;
});

describe("QuizService.generateQuiz", () => {
  it("throws 503 when no API key is configured", async () => {
    delete process.env.GEMINI_API_KEY;

    await expect(quizService.generateQuiz("Algebra", "context")).rejects.toThrow(
      HttpException,
    );
  });

  it("throws 502 when the generator call fails", async () => {
    mockGenerateContent.mockRejectedValue(new Error("network down"));

    await expect(quizService.generateQuiz("Algebra", "context")).rejects.toThrow(
      "network down",
    );
  });

  it("throws 502 when the response is empty", async () => {
    mockGenerateContent.mockResolvedValue({ text: "" });

    await expect(quizService.generateQuiz("Algebra", "context")).rejects.toThrow(
      "empty response",
    );
  });

  it("throws 502 when the response is not valid JSON", async () => {
    mockGenerateContent.mockResolvedValue({ text: "not json" });

    await expect(quizService.generateQuiz("Algebra", "context")).rejects.toThrow(
      "Failed to parse",
    );
  });

  it("filters out malformed questions and returns the rest", async () => {
    const validQuestion = {
      question: "What is 2 + 2?",
      options: ["1", "2", "3", "4"],
      correctIndex: 3,
    };
    const malformedQuestion = { question: "Missing options" };

    mockGenerateContent.mockResolvedValue({
      text: JSON.stringify([validQuestion, malformedQuestion]),
    });

    const questions = await quizService.generateQuiz("Algebra", "context");

    expect(questions).toHaveLength(1);
    expect(questions[0]).toEqual(validQuestion);
  });
});
