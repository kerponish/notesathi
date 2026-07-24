import { NoteService } from "../../../services/note_service";
import { NoteMongoRepository } from "../../../repositories/note_repository";
import { NotificationService } from "../../../services/notification_service";
import { HttpException } from "../../../exceptions/http-exception";

const noteService = new NoteService();

function mockNote(overrides: Record<string, any> = {}) {
  return {
    _id: "note-id-1",
    title: "Test Note",
    description: "A note about testing",
    category: "General",
    createdBy: { _id: { toString: () => "owner-id" } },
    likes: [] as { toString(): string }[],
    ...overrides,
  };
}

afterEach(() => {
  jest.restoreAllMocks();
});

describe("NoteService.createNote", () => {
  it("attaches the creating user's id and delegates to the repository", async () => {
    const createSpy = jest
      .spyOn(NoteMongoRepository.prototype, "create")
      .mockImplementation(async (data) => mockNote(data as any) as any);

    await noteService.createNote(
      { title: "Test Note", description: "desc" } as any,
      "owner-id",
    );

    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Test Note", createdBy: "owner-id" }),
    );
  });
});

describe("NoteService.getNoteById", () => {
  it("throws 404 when the note does not exist", async () => {
    jest.spyOn(NoteMongoRepository.prototype, "findById").mockResolvedValue(null);

    await expect(noteService.getNoteById("missing-id")).rejects.toThrow(
      HttpException,
    );
  });

  it("returns the note when found", async () => {
    jest
      .spyOn(NoteMongoRepository.prototype, "findById")
      .mockResolvedValue(mockNote() as any);

    const note = await noteService.getNoteById("note-id-1");
    expect(note.title).toBe("Test Note");
  });
});

describe("NoteService.updateNote / deleteNote ownership checks", () => {
  it("rejects updating a note owned by someone else", async () => {
    jest
      .spyOn(NoteMongoRepository.prototype, "findById")
      .mockResolvedValue(mockNote() as any);

    await expect(
      noteService.updateNote("note-id-1", "someone-else", { title: "x" } as any),
    ).rejects.toThrow("You can only update your own notes");
  });

  it("allows the owner to update their note", async () => {
    jest
      .spyOn(NoteMongoRepository.prototype, "findById")
      .mockResolvedValue(mockNote() as any);
    const updateSpy = jest
      .spyOn(NoteMongoRepository.prototype, "update")
      .mockResolvedValue(mockNote({ title: "Updated" }) as any);

    const updated = await noteService.updateNote("note-id-1", "owner-id", {
      title: "Updated",
    } as any);

    expect(updateSpy).toHaveBeenCalled();
    expect(updated?.title).toBe("Updated");
  });

  it("rejects deleting a note owned by someone else", async () => {
    jest
      .spyOn(NoteMongoRepository.prototype, "findById")
      .mockResolvedValue(mockNote() as any);

    await expect(
      noteService.deleteNote("note-id-1", "someone-else"),
    ).rejects.toThrow("You can only delete your own notes");
  });

  it("allows the owner to delete their note", async () => {
    jest
      .spyOn(NoteMongoRepository.prototype, "findById")
      .mockResolvedValue(mockNote() as any);
    const deleteSpy = jest
      .spyOn(NoteMongoRepository.prototype, "delete")
      .mockResolvedValue(true);

    const result = await noteService.deleteNote("note-id-1", "owner-id");

    expect(deleteSpy).toHaveBeenCalledWith("note-id-1");
    expect(result.message).toMatch(/deleted/i);
  });
});

describe("NoteService.toggleLike", () => {
  it("notifies the note owner when a different user likes the note", async () => {
    jest
      .spyOn(NoteMongoRepository.prototype, "findById")
      .mockResolvedValue(mockNote() as any);
    jest
      .spyOn(NoteMongoRepository.prototype, "toggleLike")
      .mockResolvedValue(mockNote({ likes: ["liker-id"] }) as any);
    const notifySpy = jest
      .spyOn(NotificationService.prototype, "notify")
      .mockResolvedValue(null);

    await noteService.toggleLike("note-id-1", "liker-id");

    expect(notifySpy).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: "owner-id",
        fromUserId: "liker-id",
        type: "like",
        noteId: "note-id-1",
      }),
    );
  });

  it("does not notify again when un-liking a note", async () => {
    jest.spyOn(NoteMongoRepository.prototype, "findById").mockResolvedValue(
      mockNote({ likes: [{ toString: () => "liker-id" }] }) as any,
    );
    jest
      .spyOn(NoteMongoRepository.prototype, "toggleLike")
      .mockResolvedValue(mockNote({ likes: [] }) as any);
    const notifySpy = jest
      .spyOn(NotificationService.prototype, "notify")
      .mockResolvedValue(null);

    await noteService.toggleLike("note-id-1", "liker-id");

    expect(notifySpy).not.toHaveBeenCalled();
  });
});
