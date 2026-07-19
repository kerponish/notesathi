import { HttpException } from "../exceptions/http-exception";
import Note from "../models/note_model";
import { CommentMongoRepository } from "../repositories/comment_repository";
import { NotificationService } from "./notification_service";

const commentRepository = new CommentMongoRepository();
const notificationService = new NotificationService();

export class CommentService {
  async addComment(noteId: string, userId: string, text: string) {
    const note = await Note.findById(noteId);

    if (!note) {
      throw new HttpException(404, "Note not found");
    }

    const comment = await commentRepository.create(noteId, userId, text);

    await Note.findByIdAndUpdate(noteId, { $inc: { commentsCount: 1 } });

    await notificationService.notify({
      userId: note.createdBy.toString(),
      fromUserId: userId,
      type: "comment",
      noteId,
    });

    return comment;
  }

  async getComments(noteId: string) {
    return await commentRepository.findByNote(noteId);
  }
}
