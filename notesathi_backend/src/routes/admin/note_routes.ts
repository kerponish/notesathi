import { Router } from "express";
import { AdminNoteController } from "../../controllers/admin/note.controller";
import {
  authorizedMiddleware,
  adminMiddleware,
} from "../../middleware/authorized.middleware";
import { upload } from "../../middleware/upload.middleware";

const router = Router();
const adminNoteController = new AdminNoteController();

router.use(authorizedMiddleware, adminMiddleware);

const noteUpload = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "contentFile", maxCount: 1 },
]);

// api endpoints for admin note management
router.get("/", adminNoteController.getAllNotesPaginated);
router.get("/:id", adminNoteController.getNoteById);
router.post("/", noteUpload, adminNoteController.createNote);
router.put("/:id", noteUpload, adminNoteController.updateNote);
router.delete("/:id", adminNoteController.deleteNote);

export default router;
