import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document {
  _id: mongoose.Types.ObjectId;

  userId: mongoose.Types.ObjectId;
  fromUserId: mongoose.Types.ObjectId;
  type: "like" | "comment";
  noteId: mongoose.Types.ObjectId;
  read: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["like", "comment"],
      required: true,
    },
    noteId: {
      type: Schema.Types.ObjectId,
      ref: "Note",
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<INotification>("Notification", NotificationSchema);
