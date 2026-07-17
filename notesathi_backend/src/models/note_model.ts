import mongoose, { Document, Schema } from "mongoose";

export interface INote extends Document {
  _id: mongoose.Types.ObjectId;

  title: string;
  description: string;
  thumbnail?: string;
  contentFile?: string;
  contentFileType?: "image" | "pdf";
  category: string;

  subjectId: mongoose.Types.ObjectId;
  classLevel: string;
  createdBy: mongoose.Types.ObjectId;

  likes: mongoose.Types.ObjectId[];
  commentsCount: number;

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

    contentFile: {
      type: String,
      default: "",
    },

    contentFileType: {
      type: String,
      enum: ["image", "pdf"],
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

    classLevel: {
      type: String,
      enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    likes: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },

    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<INote>("Note", NoteModelSchema);
