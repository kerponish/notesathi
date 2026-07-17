export interface Comment {
  _id: string;
  noteId: string;
  userId: {
    _id: string;
    fullname: string;
    email: string;
  };
  text: string;
  createdAt: string;
  updatedAt: string;
}
