export interface NoteAuthor {
  _id: string;
  fullname: string;
  email: string;
}

export interface NoteSubject {
  _id: string;
  name: string;
}

export interface Note {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  contentFile?: string;
  contentFileType?: "image" | "pdf";
  category: string;
  subjectId?: NoteSubject;
  classLevel: string;
  createdBy: NoteAuthor;
  likes: string[];
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
}
