import { UserService } from "../services/user_service";
import { HttpException } from "../exceptions/http-exception";
import { z } from "zod";
import {
  CreateUserDTO,
  LoginUserDTO,
  UpdateUserDTO,
  UpdatePasswordDTO,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  GoogleAuthDTO,
} from "../dtos/user_dto";
import { ApiResponseHelper } from "../utils/api-response";
import { Request, Response } from "express";

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      console.log("Request body:", req.body); // Log the request body for debugging
      const parseResult = CreateUserDTO.safeParse(req.body);

      if (!parseResult.success) {
        throw new HttpException(400, z.prettifyError(parseResult.error));
      }

      const createdUser = await userService.createUser({
        ...parseResult.data,
      });

      return ApiResponseHelper.success(res, createdUser, "User created", 201);
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
      const parseResult = LoginUserDTO.safeParse(req.body);

      if (!parseResult.success) {
        throw new HttpException(400, z.prettifyError(parseResult.error));
      }

      const { user, token } = await userService.loginUser(parseResult.data);

      return ApiResponseHelper.success(
        res,
        { user, token },

        "Login successful",
        201,
      );
    } catch (e: Error | unknown | any) {
      return ApiResponseHelper.error(
        res,
        e?.message || "Failed to login user",
        e.status || 500,
      );
    }
  }

  async googleAuth(req: Request, res: Response) {
    try {
      const parseResult = GoogleAuthDTO.safeParse(req.body);

      if (!parseResult.success) {
        throw new HttpException(400, z.prettifyError(parseResult.error));
      }

      const { user, token } = await userService.googleAuth(
        parseResult.data.idToken,
      );

      return ApiResponseHelper.success(
        res,
        { user, token },
        "Google login successful",
        201,
      );
    } catch (e: Error | unknown | any) {
      return ApiResponseHelper.error(
        res,
        e?.message || "Failed to sign in with Google",
        e.status || 500,
      );
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const userId = (req.user as any)._id || (req.user as any).id;

      const user = await userService.getUserById(userId.toString());

      return ApiResponseHelper.success(res, user, "Profile fetched", 201);
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
      const parseResult = UpdatePasswordDTO.safeParse(req.body);

      if (!parseResult.success) {
        throw new HttpException(400, z.prettifyError(parseResult.error));
      }

      const userId = (req.user as any)._id || (req.user as any).id;

      const user = await userService.changePassword(
        userId.toString(),
        parseResult.data.currentPassword,
        parseResult.data.newPassword,
      );

      return ApiResponseHelper.success(
        res,
        user,
        "Password updated successfully",
        201,
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
      const parseResult = UpdateUserDTO.safeParse(req.body);

      if (!parseResult.success) {
        throw new HttpException(400, z.prettifyError(parseResult.error));
      }

      const userId = (req.user as any)._id || (req.user as any).id;

      const user = await userService.updateUser(
        userId.toString(),
        parseResult.data,
      );

      return ApiResponseHelper.success(res, user, "Profile updated", 201);
    } catch (e: Error | unknown | any) {
      return ApiResponseHelper.error(
        res,
        e?.message || "Failed to update profile",
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

        "User details fetched successfully",
        201,
      );
    } catch (e: Error | unknown | any) {
      return ApiResponseHelper.error(
        res,
        e?.message || "Failed to fetch user details",
        e.status || 500,
      );
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const parseResult = ForgotPasswordDTO.safeParse(req.body);
      if (!parseResult.success) {
        throw new HttpException(400, z.prettifyError(parseResult.error));
      }

      await userService.forgotPassword(parseResult.data.email);

      return ApiResponseHelper.success(
        res,
        null,
        "If that email is registered, a reset link has been sent.",
        200,
      );
    } catch (e: Error | unknown | any) {
      return ApiResponseHelper.error(
        res,
        e?.message || "Failed to process request",
        e.status || 500,
      );
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const parseResult = ResetPasswordDTO.safeParse(req.body);
      if (!parseResult.success) {
        throw new HttpException(400, z.prettifyError(parseResult.error));
      }

      await userService.resetPassword(
        parseResult.data.token,
        parseResult.data.newPassword,
      );

      return ApiResponseHelper.success(
        res,
        null,
        "Password reset successfully",
        200,
      );
    } catch (e: Error | unknown | any) {
      return ApiResponseHelper.error(
        res,
        e?.message || "Failed to reset password",
        e.status || 500,
      );
    }
  }
}
