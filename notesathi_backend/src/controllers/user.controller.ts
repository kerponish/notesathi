import { UserService } from "../services/user_service";
import { HttpException } from "../exceptions/http-exception";
import { z } from "zod";
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserProfileDto,
  ChangePasswordDto,
} from "../dtos/user_dto";
import { ApiResponseHelper } from "../utils/api-response";
import { Request, Response } from "express";

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const profilePicture = req.file
        ? `uploads/${req.file.filename}`
        : undefined;

      const parseResult = CreateUserDto.safeParse(req.body);

      if (!parseResult.success) {
        throw new HttpException(400, z.prettifyError(parseResult.error));
      }

      const createdUser = await userService.createUser({
        ...parseResult.data,
        profilePicture,
      });

      return ApiResponseHelper.success(res, createdUser, 201, "User created");
    } catch (e: Error | unknown | any) {
      return ApiResponseHelper.error(
        res,
        e?.message || "Failed to create user",
        e.status || 500,
      );
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const parseResult = LoginUserDto.safeParse(req.body);

      if (!parseResult.success) {
        throw new HttpException(400, z.prettifyError(parseResult.error));
      }

      const { user, token } = await userService.loginUser(parseResult.data);

      return ApiResponseHelper.success(
        res,
        { user, token },
        200,
        "Login successful",
      );
    } catch (e: Error | unknown | any) {
      return ApiResponseHelper.error(
        res,
        e?.message || "Failed to login user",
        e.status || 500,
      );
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const userId = (req.user as any)._id || (req.user as any).id;

      const user = await userService.getUserById(userId.toString());

      return ApiResponseHelper.success(res, user, 200, "Profile fetched");
    } catch (e: Error | unknown | any) {
      return ApiResponseHelper.error(
        res,
        e?.message || "Failed to fetch profile",
        e.status || 500,
      );
    }
  }
  async changePassword(req: Request, res: Response) {
    try {
      const parseResult = ChangePasswordDto.safeParse(req.body);

      if (!parseResult.success) {
        throw new HttpException(400, z.prettifyError(parseResult.error));
      }

      const userId = (req.user as any)._id || (req.user as any).id;

      const user = await userService.changePassword(
        userId.toString(),
        parseResult.data.oldPassword,
        parseResult.data.newPassword,
      );

      return ApiResponseHelper.success(
        res,
        user,
        200,
        "Password updated successfully",
      );
    } catch (e: any) {
      return ApiResponseHelper.error(
        res,
        e?.message || "Failed to update password",
        e?.status || 500,
      );
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const parseResult = UpdateUserProfileDto.safeParse(req.body);

      if (!parseResult.success) {
        throw new HttpException(400, z.prettifyError(parseResult.error));
      }

      const userId = (req.user as any)._id || (req.user as any).id;

      const user = await userService.updateProfile(
        userId.toString(),
        parseResult.data,
      );

      return ApiResponseHelper.success(res, user, 200, "Profile updated");
    } catch (e: Error | unknown | any) {
      return ApiResponseHelper.error(
        res,
        e?.message || "Failed to update profile",
        e.status || 500,
      );
    }
  }

  async updateProfilePicture(req: Request, res: Response) {
    try {
      if (!req.file) {
        throw new HttpException(400, "Profile picture is required");
      }

      const userId = (req.user as any)._id || (req.user as any).id;

      const profilePicture = `uploads/${req.file.filename}`;

      const user = await userService.updateProfilePicture(
        userId.toString(),
        profilePicture,
      );

      return ApiResponseHelper.success(
        res,
        user,
        200,
        "Profile picture updated",
      );
    } catch (e: Error | unknown | any) {
      return ApiResponseHelper.error(
        res,
        e?.message || "Failed to update profile picture",
        e.status || 500,
      );
    }
  }

  async deleteProfilePicture(req: Request, res: Response) {
    try {
      const userId = (req.user as any)._id || (req.user as any).id;

      const user = await userService.deleteProfilePicture(userId.toString());

      return ApiResponseHelper.success(
        res,
        user,
        200,
        "Profile picture deleted",
      );
    } catch (e: Error | unknown | any) {
      return ApiResponseHelper.error(
        res,
        e?.message || "Failed to delete profile picture",
        e.status || 500,
      );
    }
  }

  async whoAmI(req: Request, res: Response) {
    try {
      if (!req.user) {
        throw new HttpException(401, "User not found");
      }

      return ApiResponseHelper.success(
        res,
        req.user,
        200,
        "User details fetched successfully",
      );
    } catch (e: Error | unknown | any) {
      return ApiResponseHelper.error(
        res,
        e?.message || "Failed to fetch user details",
        e.status || 500,
      );
    }
  }
}
