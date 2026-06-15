import Subject, { ISubject } from "../models/subject_model";

export interface ISubjectRepository {
  create(subject: Partial<ISubject>): Promise<ISubject>;

  findById(id: string): Promise<ISubject | null>;

  findByName(name: string): Promise<ISubject | null>;

  findAll(): Promise<ISubject[]>;

  update(id: string, subject: Partial<ISubject>): Promise<ISubject | null>;

  delete(id: string): Promise<boolean>;
}

export class SubjectMongoRepository implements ISubjectRepository {
  async create(subject: Partial<ISubject>): Promise<ISubject> {
    return await Subject.create(subject);
  }

  async findById(id: string): Promise<ISubject | null> {
    return await Subject.findById(id);
  }

  async findByName(name: string): Promise<ISubject | null> {
    return await Subject.findOne({ name });
  }

  async findAll(): Promise<ISubject[]> {
    return await Subject.find().sort({
      name: 1,
    });
  }

  async update(
    id: string,
    subject: Partial<ISubject>,
  ): Promise<ISubject | null> {
    return await Subject.findByIdAndUpdate(id, subject, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await Subject.findByIdAndDelete(id);

    return !!deleted;
  }
}
