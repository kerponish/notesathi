import { Request, Response } from "express";
import { NoteService } from "../services/note_service";
import { QuizService } from "../services/quiz_service";

const noteService = new NoteService();
const quizService = new QuizService();

export class QuizController {
  async generateQuiz(req: Request, res: Response) {
    const note = await noteService.getNoteById(req.params.id as string);

    const subjectName = (note.subjectId as any)?.name;
    const topic = subjectName ? `${note.title} (${subjectName})` : note.title;

    const questions = await quizService.generateQuiz(topic, note.description);

    res.status(200).json({
      success: true,
      data: questions,
    });
  }
}
