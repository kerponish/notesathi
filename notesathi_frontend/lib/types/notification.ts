export interface AppNotification {
  _id: string;
  type: "like" | "comment";
  read: boolean;
  createdAt: string;
  fromUserId: {
    _id: string;
    fullname: string;
    profilePicture?: string;
  };
  noteId: {
    _id: string;
    title: string;
  };
}
