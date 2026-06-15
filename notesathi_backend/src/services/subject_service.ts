import { CreateSubjectDto, UpdateSubjectDto } from "../dtos/subject_dto";
import { HttpException } from "../exceptions/http-exception";
import { SubjectMongoRepository } from "../repositories/subject_repository";

const subjectRepository = new SubjectMongoRepository();

export class SubjectService {
  async createSubject(subjectData: CreateSubjectDto) {
    const existing = await subjectRepository.findByName(subjectData.name);

    if (existing) {
      throw new HttpException(400, "Subject already exists");
    }

    return await subjectRepository.create(subjectData);
  }

  async getAllSubjects() {
    return await subjectRepository.findAll();
  }

  async getSubjectById(id: string) {
    const subject = await subjectRepository.findById(id);

    if (!subject) {
      throw new HttpException(404, "Subject not found");
    }

    return subject;
  }

  async updateSubject(id: string, subjectData: UpdateSubjectDto) {
    return await subjectRepository.update(id, subjectData);
  }

  async deleteSubject(id: string) {
    const deleted = await subjectRepository.delete(id);

    if (!deleted) {
      throw new HttpException(404, "Subject not found");
    }

    return {
      message: "Subject deleted successfully",
    };
  }
}
