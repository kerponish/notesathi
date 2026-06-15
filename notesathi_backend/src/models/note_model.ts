import mongoose, { Document, Schema } from "mongoose";

export interface INote extends Document {
  _id: mongoose.Types.ObjectId;

  title: string;
  description: string;
  thumbnail?: string;
  category: string;

  subjectId: mongoose.Types.ObjectId;
  classLevel: {
    type: String;
    enum: ["1", "2", "3", "4", "5", "6", "7", "8"];
    required: true;
  };
  createdBy: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const NoteModelSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
    },

    subjectId: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<INote>("Note", NoteModelSchema);
