import { Request, Response } from "express";
import { z } from "zod";
import { AddCommentDto } from "../dtos/comment_dto";
import { HttpException } from "../exceptions/http-exception";
import { CommentService } from "../services/comment_service";

const commentService = new CommentService();

export class CommentController {
  async addComment(req: Request, res: Response) {
    const userId = (req as any).user.id;

    const parseResult = AddCommentDto.safeParse(req.body);
    if (!parseResult.success) {
      throw new HttpException(400, z.prettifyError(parseResult.error));
    }

    const comment = await commentService.addComment(
      req.params.id as string,
      userId,
      parseResult.data.text,
    );

    res.status(201).json({
      success: true,
      data: comment,
    });
  }

  async getComments(req: Request, res: Response) {
    const comments = await commentService.getComments(req.params.id as string);

    res.status(200).json({
      success: true,
      data: comments,
    });
  }
}
