import { Router } from "express";
import { SubjectController } from "../controllers/subject.controller";
import { authorizedMiddleware } from "../middleware/authorized.middleware";

const router = Router();

const subjectController = new SubjectController();

router.post("/create", authorizedMiddleware, subjectController.createSubject);

router.get("/", subjectController.getAllSubjects);

router.get("/:id", subjectController.getSubjectById);

router.put("/:id", authorizedMiddleware, subjectController.updateSubject);

router.delete("/:id", authorizedMiddleware, subjectController.deleteSubject);

export default router;
