import { UserMongoRepository } from "../repositories/user_repository";
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserProfileDto,
} from "../dtos/user_dto";
import { HttpException } from "../exceptions/http-exception";
import bcrypt from "bcryptjs"; // to hash password
import { IUser } from "../models/user_model";
// jwt for token generation
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/constant";
import fs from "fs";
import path from "path";

const userRepository = new UserMongoRepository();
export class UserService {
  async createUser(userData: CreateUserDto) {
    const existingUserByEmail = await userRepository.findByEmail(
      userData.email,
    );
    if (existingUserByEmail) {
      throw new HttpException(400, "Email already exists");
    }
    // Validate password confirmation
    if ((userData as any).password !== (userData as any).confirmPassword) {
      throw new HttpException(400, "Passwords do not match");
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userToCreate = {
      ...userData,
      password: hashedPassword,
    };
    const createdUser = await userRepository.create(userToCreate as any);
    return createdUser;
  }

  async loginUser(loginData: LoginUserDto) {
    const user = await userRepository.findByEmail(loginData.email);
    console.log(user);
    if (!user) {
      throw new HttpException(400, "Invalid email or password");
    }
    console.log(user);
    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password,
    ); // compare hashed password
    if (!isPasswordValid) {
      throw new HttpException(400, "Invalid email or password");
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      }, // payload
      SECRET_KEY,
      { expiresIn: "30d" },
    );
    return { user, token };
  }

  async getUserById(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new HttpException(404, "User not found");
    }
    return user;
  }

  async updateProfile(userId: string, profileData: UpdateUserProfileDto) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new HttpException(404, "User not found");
    }

    const updatedUser = await userRepository.update(userId, profileData as any);
    if (!updatedUser) {
      throw new HttpException(404, "User not found");
    }

    return updatedUser;
  }

  async updateProfilePicture(userId: string, profilePicture: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new HttpException(404, "User not found");
    }

    const oldProfilePicture = user.profilePicture;
    const updatedUser = await userRepository.update(userId, {
      profilePicture,
    } as any);

    if (!updatedUser) {
      throw new HttpException(404, "User not found");
    }

    this.deleteUploadedFile(oldProfilePicture);
    return updatedUser;
  }

  async deleteProfilePicture(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new HttpException(404, "User not found");
    }

    const oldProfilePicture = user.profilePicture;
    const updatedUser = await userRepository.update(userId, {
      profilePicture: "",
    } as any);

    if (!updatedUser) {
      throw new HttpException(404, "User not found");
    }

    this.deleteUploadedFile(oldProfilePicture);
    return updatedUser;
  }

  private deleteUploadedFile(filePath?: string) {
    if (!filePath || !filePath.startsWith("uploads/")) {
      return;
    }

    const absolutePath = path.join(process.cwd(), filePath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  }
}
