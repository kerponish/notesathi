import Comment, { IComment } from "../models/comment_model";

export interface ICommentRepository {
  create(noteId: string, userId: string, text: string): Promise<IComment>;
  findByNote(noteId: string): Promise<IComment[]>;
}

export class CommentMongoRepository implements ICommentRepository {
  async create(noteId: string, userId: string, text: string): Promise<IComment> {
    return await Comment.create({ noteId, userId, text });
  }

  async findByNote(noteId: string): Promise<IComment[]> {
    return await Comment.find({ noteId })
      .populate("userId", "fullname email")
      .sort({ createdAt: -1 });
  }
}
