import { Request, Response } from "express";
import { NoteService } from "../../services/note_service";
import { ApiResponseHelper } from "../../utils/apihelper.util";

const noteService = new NoteService();

interface QueryParams {
  page?: string;
  limit?: string;
  search?: string;
}

export class AdminNoteController {
  async getAllNotesPaginated(req: Request, res: Response) {
    try {
      const { page, limit, search }: QueryParams = req.query;
      const { data, pagination } = await noteService.getAllNotesPaginated(
        page,
        limit,
        search,
      );

      return ApiResponseHelper.success(
        res,
        data,
        "Notes retrieved successfully",
        200,
        pagination,
      );
    } catch (error: Error | any | unknown) {
      return ApiResponseHelper.error(
        res,
        error.message || "Internal Server Error",
        error.status || 500,
      );
    }
  }

  async getNoteById(req: Request, res: Response) {
    try {
      const note = await noteService.getNoteById(req.params.id as string);
      return ApiResponseHelper.success(res, note, "Note retrieved successfully");
    } catch (error: Error | any | unknown) {
      return ApiResponseHelper.error(
        res,
        error.message || "Internal Server Error",
        error.status || 500,
      );
    }
  }

  async createNote(req: Request, res: Response) {
    try {
      const userId = (req as any).user._id || (req as any).user.id;

      const files = req.files as
        | { [fieldname: string]: Express.Multer.File[] }
        | undefined;
      const thumbnailFile = files?.thumbnail?.[0];
      const contentFile = files?.contentFile?.[0];

      const noteData = { ...req.body };
      if (thumbnailFile) {
        noteData.thumbnail = `/uploads/${thumbnailFile.filename}`;
      }
      if (contentFile) {
        noteData.contentFile = `/uploads/${contentFile.filename}`;
        noteData.contentFileType = contentFile.mimetype.startsWith("image/")
          ? "image"
          : "pdf";
      }

      const note = await noteService.createNote(noteData, userId.toString());

      return ApiResponseHelper.success(res, note, "Note created successfully", 201);
    } catch (error: Error | any | unknown) {
      return ApiResponseHelper.error(
        res,
        error.message || "Internal Server Error",
        error.status || 500,
      );
    }
  }

  async updateNote(req: Request, res: Response) {
    try {
      const noteId = req.params.id as string;

      const files = req.files as
        | { [fieldname: string]: Express.Multer.File[] }
        | undefined;
      const thumbnailFile = files?.thumbnail?.[0];
      const contentFile = files?.contentFile?.[0];

      const noteData = { ...req.body };
      if (thumbnailFile) {
        noteData.thumbnail = `/uploads/${thumbnailFile.filename}`;
      }
      if (contentFile) {
        noteData.contentFile = `/uploads/${contentFile.filename}`;
        noteData.contentFileType = contentFile.mimetype.startsWith("image/")
          ? "image"
          : "pdf";
      }

      const note = await noteService.adminUpdateNote(noteId, noteData);
      return ApiResponseHelper.success(res, note, "Note updated successfully");
    } catch (error: Error | any | unknown) {
      return ApiResponseHelper.error(
        res,
        error.message || "Internal Server Error",
        error.status || 500,
      );
    }
  }

  async deleteNote(req: Request, res: Response) {
    try {
      const noteId = req.params.id as string;
      const result = await noteService.adminDeleteNote(noteId);
      return ApiResponseHelper.success(res, null, result.message);
    } catch (error: Error | any | unknown) {
      return ApiResponseHelper.error(
        res,
        error.message || "Internal Server Error",
        error.status || 500,
      );
    }
  }
}
