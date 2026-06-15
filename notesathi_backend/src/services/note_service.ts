import { CreateNoteDto, UpdateNoteDto } from "../dtos/note_dto";
import { HttpException } from "../exceptions/http-exception";
import { NoteMongoRepository } from "../repositories/note_repository";

const noteRepository = new NoteMongoRepository();

export class NoteService {
  async createNote(noteData: CreateNoteDto, userId: string) {
    return await noteRepository.create({
      ...noteData,
      createdBy: userId,
    } as any);
  }

  async getAllNotes() {
    return await noteRepository.findAll();
  }

  async searchNotes(keyword: string) {
    return await noteRepository.search(keyword);
  }

  async getNoteById(id: string) {
    const note = await noteRepository.findById(id);

    if (!note) {
      throw new HttpException(404, "Note not found");
    }

    return note;
  }

  async updateNote(noteId: string, userId: string, noteData: UpdateNoteDto) {
    const note = await noteRepository.findById(noteId);

    if (!note) {
      throw new HttpException(404, "Note not found");
    }

    if (note.createdBy.toString() !== userId) {
      throw new HttpException(403, "You can only update your own notes");
    }

    return await noteRepository.update(noteId, noteData as any);
  }

  async deleteNote(noteId: string, userId: string) {
    const note = await noteRepository.findById(noteId);

    if (!note) {
      throw new HttpException(404, "Note not found");
    }

    if (note.createdBy.toString() !== userId) {
      throw new HttpException(403, "You can only delete your own notes");
    }

    await noteRepository.delete(noteId);

    return {
      message: "Note deleted successfully",
    };
  }
}
