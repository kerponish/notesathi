import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
import { NoteController } from "../controllers/note.controller";
import { authorizedMiddleware } from "../middleware/authorized.middleware";
import { upload } from "../middleware/upload.middleware";

const router = Router();

const noteController = new NoteController();
const commentController = new CommentController();

router.post(
  "/create",
  authorizedMiddleware,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "contentFile", maxCount: 1 },
  ]),
  noteController.createNote,
);

router.get("/", noteController.getAllNotes);

router.get("/search", noteController.searchNotes);

router.get("/:id", noteController.getNoteById);

router.put("/:id", authorizedMiddleware, noteController.updateNote);

router.delete("/:id", authorizedMiddleware, noteController.deleteNote);

router.post("/:id/like", authorizedMiddleware, noteController.toggleLike);

router.post(
  "/:id/comments",
  authorizedMiddleware,
  commentController.addComment,
);

router.get("/:id/comments", commentController.getComments);

export default router;
