import mongoose, { Schema, Document } from "mongoose";
import { UserType } from "../types/user_type";

export interface IUser extends UserType, Document {
  // can add mongo related attr
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  // internal-only fields: never part of UserSchema/UpdateUserDTO, so they
  // can never be set through the generic profile-update endpoint.
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}
const UserMongoSchema: Schema = new Schema<IUser>(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: { type: String, enum: ["admin", "user"], default: "user" },
    profilePicture: { type: String, required: false },
    notificationsEnabled: { type: Boolean, default: true },
    language: { type: String, enum: ["en", "ne"], default: "en" },

    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: Date, select: false },
  },
  {
    timestamps: true, // createdAt and updatedAt will be automatically added and managed by mongoose
  },
);
export const UserModel = mongoose.model<IUser>(
  "User", // db.users -> Model Name "User"
  UserMongoSchema,
);
