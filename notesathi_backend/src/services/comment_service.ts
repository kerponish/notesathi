import { HttpException } from "../exceptions/http-exception";
import Note from "../models/note_model";
import { CommentMongoRepository } from "../repositories/comment_repository";

const commentRepository = new CommentMongoRepository();

export class CommentService {
  async addComment(noteId: string, userId: string, text: string) {
    const note = await Note.findById(noteId);

    if (!note) {
      throw new HttpException(404, "Note not found");
    }

    const comment = await commentRepository.create(noteId, userId, text);

    await Note.findByIdAndUpdate(noteId, { $inc: { commentsCount: 1 } });

    return comment;
  }

  async getComments(noteId: string) {
    return await commentRepository.findByNote(noteId);
  }
}
