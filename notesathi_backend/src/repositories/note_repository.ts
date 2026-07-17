import Note, { INote } from "../models/note_model";

export interface INoteRepository {
  create(note: INote): Promise<INote>;
  findById(id: string): Promise<INote | null>;
  findAll(): Promise<INote[]>;
  findByUser(userId: string): Promise<INote[]>;
  search(keyword: string): Promise<INote[]>;
  update(id: string, note: Partial<INote>): Promise<INote | null>;
  delete(id: string): Promise<boolean>;
  toggleLike(id: string, userId: string): Promise<INote | null>;
}

export class NoteMongoRepository implements INoteRepository {
  async create(note: INote): Promise<INote> {
    return await Note.create(note);
  }

  async findById(id: string): Promise<INote | null> {
    return await Note.findById(id)
      .populate("createdBy", "fullname email")
      .populate("subjectId");
  }

  async findAll(): Promise<INote[]> {
    return await Note.find()
      .populate("createdBy", "fullname email")
      .populate("subjectId")
      .sort({ createdAt: -1 });
  }

  async findByUser(userId: string): Promise<INote[]> {
    return await Note.find({
      createdBy: userId,
    })
      .populate("createdBy", "fullname email")
      .populate("subjectId")
      .sort({ createdAt: -1 });
  }

  async search(keyword: string): Promise<INote[]> {
    return await Note.find({
      title: {
        $regex: keyword,
        $options: "i",
      },
    })
      .populate("createdBy", "fullname email")
      .populate("subjectId")
      .sort({ createdAt: -1 });
  }

  async update(id: string, note: Partial<INote>): Promise<INote | null> {
    return await Note.findByIdAndUpdate(id, note, {
      new: true,
    })
      .populate("createdBy", "fullname email")
      .populate("subjectId");
  }

  async delete(id: string): Promise<boolean> {
    const deletedNote = await Note.findByIdAndDelete(id);

    return !!deletedNote;
  }

  async toggleLike(id: string, userId: string): Promise<INote | null> {
    const note = await Note.findById(id);

    if (!note) {
      return null;
    }

    const alreadyLiked = note.likes.some((likeId) => likeId.toString() === userId);

    if (alreadyLiked) {
      await Note.findByIdAndUpdate(id, { $pull: { likes: userId } });
    } else {
      await Note.findByIdAndUpdate(id, { $addToSet: { likes: userId } });
    }

    return await this.findById(id);
  }
}
