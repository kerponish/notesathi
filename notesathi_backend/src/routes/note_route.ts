import { Router } from "express";
import { NoteController } from "../controllers/note.controller";
import { authorizedMiddleware } from "../middleware/authorized.middleware";

const router = Router();

const noteController = new NoteController();

router.post("/create", authorizedMiddleware, noteController.createNote);

router.get("/", noteController.getAllNotes);

router.get("/search", noteController.searchNotes);

router.get("/:id", noteController.getNoteById);

router.put("/:id", authorizedMiddleware, noteController.updateNote);

router.delete("/:id", authorizedMiddleware, noteController.deleteNote);

export default router;
