import mongoose, { Document, Schema } from "mongoose";

export interface ISubject extends Document {
  _id: mongoose.Types.ObjectId;

  name: string;
  description?: string;

  createdAt: Date;
  updatedAt: Date;
}

const SubjectModelSchema = new Schema<ISubject>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ISubject>("Subject", SubjectModelSchema);
