import { Request, Response } from "express";
import { SubjectService } from "../services/subject_service";

const subjectService = new SubjectService();

export class SubjectController {
  async createSubject(req: Request, res: Response) {
    const subject = await subjectService.createSubject(req.body);

    res.status(201).json({
      success: true,
      data: subject,
    });
  }

  async getAllSubjects(req: Request, res: Response) {
    const subjects = await subjectService.getAllSubjects();

    res.status(200).json({
      success: true,
      data: subjects,
    });
  }

  async getSubjectById(req: Request, res: Response) {
    const subject = await subjectService.getSubjectById(
      req.params.id as string,
    );

    res.status(200).json({
      success: true,
      data: subject,
    });
  }

  async updateSubject(req: Request, res: Response) {
    const subject = await subjectService.updateSubject(
      req.params.id as string,
      req.body,
    );

    res.status(200).json({
      success: true,
      data: subject,
    });
  }

  async deleteSubject(req: Request, res: Response) {
    const result = await subjectService.deleteSubject(req.params.id as string);

    res.status(200).json({
      success: true,
      ...result,
    });
  }
}
