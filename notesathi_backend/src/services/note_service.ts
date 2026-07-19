import { CreateNoteDto, UpdateNoteDto } from "../dtos/note_dto";
import { HttpException } from "../exceptions/http-exception";
import { NoteMongoRepository } from "../repositories/note_repository";
import { NotificationService } from "./notification_service";

const noteRepository = new NoteMongoRepository();
const notificationService = new NotificationService();

// createdBy comes back populated ({_id, fullname, email}) from findById,
// so a plain .toString() never matches the raw userId string.
function ownerId(createdBy: any): string {
  if (createdBy && typeof createdBy === "object" && createdBy._id) {
    return createdBy._id.toString();
  }
  return createdBy?.toString();
}

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

    if (ownerId(note.createdBy) !== userId) {
      throw new HttpException(403, "You can only update your own notes");
    }

    return await noteRepository.update(noteId, noteData as any);
  }

  async toggleLike(noteId: string, userId: string) {
    const note = await noteRepository.findById(noteId);

    if (!note) {
      throw new HttpException(404, "Note not found");
    }

    const alreadyLiked = note.likes.some((likeId) => likeId.toString() === userId);
    const updated = await noteRepository.toggleLike(noteId, userId);

    if (!alreadyLiked) {
      await notificationService.notify({
        userId: ownerId(note.createdBy),
        fromUserId: userId,
        type: "like",
        noteId,
      });
    }

    return updated;
  }

  async deleteNote(noteId: string, userId: string) {
    const note = await noteRepository.findById(noteId);

    if (!note) {
      throw new HttpException(404, "Note not found");
    }

    if (ownerId(note.createdBy) !== userId) {
      throw new HttpException(403, "You can only delete your own notes");
    }

    await noteRepository.delete(noteId);

    return {
      message: "Note deleted successfully",
    };
  }
}
