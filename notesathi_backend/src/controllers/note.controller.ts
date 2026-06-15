import { Request, Response } from "express";
import { NoteService } from "../services/note_service";

const noteService = new NoteService();

export class NoteController {
  async createNote(req: Request, res: Response) {
    const userId = (req as any).user.id;

    const note = await noteService.createNote(req.body, userId);

    res.status(201).json({
      success: true,
      data: note,
    });
  }

  async getAllNotes(req: Request, res: Response) {
    const notes = await noteService.getAllNotes();

    res.status(200).json({
      success: true,
      data: notes,
    });
  }

  async searchNotes(req: Request, res: Response) {
    const keyword = req.query.q as string;

    const notes = await noteService.searchNotes(keyword);

    res.status(200).json({
      success: true,
      data: notes,
    });
  }

  async getNoteById(req: Request, res: Response) {
    const note = await noteService.getNoteById(req.params.id as string);

    res.status(200).json({
      success: true,
      data: note,
    });
  }

  async updateNote(req: Request, res: Response) {
    const userId = (req as any).user.id;

    const note = await noteService.updateNote(
      req.params.id as string,
      userId,
      req.body,
    );

    res.status(200).json({
      success: true,
      data: note,
    });
  }

  async deleteNote(req: Request, res: Response) {
    const userId = (req as any).user.id;

    const result = await noteService.deleteNote(
      req.params.id as string,
      userId,
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  }
}
