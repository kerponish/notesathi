import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { UserModel, IUser } from "../../models/user_model";
import SubjectModel, { ISubject } from "../../models/subject_model";
import { SECRET_KEY } from "../../config/constant";

export async function seedUser(
  overrides: Partial<{
    fullname: string;
    email: string;
    password: string;
    role: "admin" | "user";
  }> = {},
): Promise<IUser> {
  const password = overrides.password ?? "password123";
  const hashedPassword = await bcryptjs.hash(password, 10);

  return UserModel.create({
    fullname: overrides.fullname ?? "Test User",
    email: overrides.email ?? "test@example.com",
    password: hashedPassword,
    role: overrides.role ?? "user",
  });
}

export function authToken(user: IUser): string {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    SECRET_KEY,
    { expiresIn: "30d" },
  );
}

export async function seedSubject(
  overrides: Partial<{ name: string; description: string }> = {},
): Promise<ISubject> {
  return SubjectModel.create({
    name: overrides.name ?? "Mathematics",
    description: overrides.description ?? "",
  });
}
