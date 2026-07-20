import { UserMongoRepository } from "../repositories/user_repository";
import {
  CreateUserDTO,
  CreateUserDTOAdmin,
  LoginUserDTO,
  UpdateUserDTO,
} from "../dtos/user_dto";
import { IUser } from "../models/user_model";
import { HttpException } from "../exceptions/http-exception";
import bycryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";
import { SECRET_KEY, FRONTEND_URL, GOOGLE_CLIENT_ID } from "../config/constant";
import { sendPasswordResetEmail } from "../utils/mailer";

const userRepository = new UserMongoRepository();
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

export class UserService {
  async createUser(
    userData: CreateUserDTO | CreateUserDTOAdmin,
  ): Promise<IUser> {
    // validation
    const existingEmail = await userRepository.getUserByEmail(userData.email);
    if (existingEmail) {
      throw new HttpException(400, "Email already exists");
    }

    // hash password
    const hashedPassword = await bycryptjs.hash(userData.password, 10);
    userData.password = hashedPassword;
    const user = await userRepository.createUser(userData);
    return user;
  }

  async loginUser(loginData: LoginUserDTO) {
    const user = await userRepository.getUserByEmail(loginData.email);
    if (!user) {
      throw new HttpException(400, "Invalid email");
    }
    if (!user.password) {
      throw new HttpException(
        400,
        "This account uses Google Sign-In. Please continue with Google.",
      );
    }
    const isPasswordValid = await bycryptjs.compare(
      loginData.password, // client password
      user.password, // database password
    );
    if (!isPasswordValid) {
      throw new HttpException(400, "Invalid password");
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, // payload
      SECRET_KEY,
      { expiresIn: "30d" },
    );
    return { user, token };
  }

  async googleAuth(idToken: string) {
    let payload;
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } catch {
      throw new HttpException(400, "Invalid Google token");
    }

    if (!payload || !payload.email) {
      throw new HttpException(400, "Invalid Google token");
    }
    if (!payload.email_verified) {
      throw new HttpException(400, "Google email is not verified");
    }

    let user = await userRepository.getUserByEmail(payload.email);
    if (user) {
      if (!user.googleId) {
        const updated = await userRepository.update(user._id.toString(), {
          googleId: payload.sub,
        });
        if (updated) user = updated;
      }
    } else {
      user = await userRepository.createUser({
        fullname: payload.name || payload.email,
        email: payload.email,
        googleId: payload.sub,
        provider: "google",
        profilePicture: payload.picture,
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "30d" },
    );
    return { user, token };
  }
  async checkPassword(
    userId: string,
    currentPassword: string,
  ): Promise<boolean> {
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new HttpException(404, "User not found");
    }
    const isPasswordValid = await bycryptjs.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException(400, "Current password is incorrect");
    }
    return isPasswordValid;
  }

  async updateUser(id: string, userData: UpdateUserDTO): Promise<IUser> {
    const existingUser = await userRepository.getUserById(id);
    if (!existingUser) {
      throw new HttpException(404, "User not found");
    }
    if (userData.email && userData.email !== existingUser.email) {
      const existingEmail = await userRepository.getUserByEmail(userData.email);
      if (existingEmail) {
        throw new HttpException(400, "Email already exists");
      }
    }

    if (userData.password) {
      const hashedPassword = await bycryptjs.hash(userData.password, 10);
      userData.password = hashedPassword;
    }
    const updatedUser = await userRepository.update(id, userData);
    if (!updatedUser) {
      throw new HttpException(500, "Failed to update user");
    }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    const existingUser = await userRepository.getUserById(id);
    if (!existingUser) {
      throw new HttpException(404, "User not found");
    }
    const deleted = await userRepository.delete(id);
    if (!deleted) {
      throw new HttpException(500, "Failed to delete user");
    }
    return deleted;
  }

  async getUserById(id: string): Promise<IUser | null> {
    const user = await userRepository.getUserById(id);
    if (!user) {
      throw new HttpException(404, "User not found");
    }
    return user;
  }

  async getAllUserPaginated(page?: string, limit?: string, search?: string) {
    const currentPage = page && parseInt(page) > 0 ? parseInt(page) : 1;
    const currentLimit = limit && parseInt(limit) > 0 ? parseInt(limit) : 10;
    const currentSearch = search && search.trim() !== "" ? search : undefined;

    const { data, total } = await userRepository.getAllPaginated(
      currentPage,
      currentLimit,
      currentSearch,
    );
    const totalPages = Math.ceil(total / currentLimit);
    const pagination = {
      page: currentPage,
      limit: currentLimit,
      totalPages: totalPages,
      total: total,
    };
    return { data, pagination };
  }
  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<IUser> {
    const user = await userRepository.getUserById(userId);
    if (!user) {
      throw new HttpException(404, "User not found");
    }
    if (!user.password) {
      throw new HttpException(
        400,
        "This account uses Google Sign-In and has no password to change.",
      );
    }
    const isPasswordValid = await bycryptjs.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new HttpException(400, "Current password is incorrect");
    }
    const hashedNewPassword = await bycryptjs.hash(newPassword, 10);
    const updatedUser = await userRepository.update(userId, {
      password: hashedNewPassword,
    });
    if (!updatedUser) {
      throw new HttpException(500, "Failed to update password");
    }
    return updatedUser;
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await userRepository.getUserByEmail(email);
    // Always resolve silently even if the email isn't registered, so this
    // endpoint can't be used to enumerate which emails have accounts.
    if (!user) {
      return;
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await userRepository.setResetToken(user._id.toString(), hashedToken, expires);

    const resetUrl = `${FRONTEND_URL}/reset-password?token=${rawToken}`;
    await sendPasswordResetEmail(user.email, resetUrl);
  }

  async resetPassword(rawToken: string, newPassword: string): Promise<void> {
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    const user = await userRepository.getUserByResetToken(hashedToken);

    if (!user) {
      throw new HttpException(400, "Reset link is invalid or has expired");
    }

    const hashedPassword = await bycryptjs.hash(newPassword, 10);
    await userRepository.update(user._id.toString(), {
      password: hashedPassword,
    });
    await userRepository.clearResetToken(user._id.toString());
  }
}
