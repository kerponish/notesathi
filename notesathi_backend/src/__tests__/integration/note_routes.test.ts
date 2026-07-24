import request from "supertest";
import app from "../../app";
import { connectTestDB, disconnectTestDB, clearCollections } from "../helpers/test-db";
import { seedUser, seedSubject, authToken } from "../helpers/seed";
import { IUser } from "../../models/user_model";
import { ISubject } from "../../models/subject_model";

beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await clearCollections();
});

afterAll(async () => {
  await disconnectTestDB();
});

async function createNote(
  token: string,
  subjectId: string,
  overrides: Partial<{ title: string; description: string; classLevel: string }> = {},
) {
  return request(app)
    .post("/api/note/create")
    .set("Authorization", `Bearer ${token}`)
    .field("title", overrides.title ?? "Test Note")
    .field("description", overrides.description ?? "A note about testing")
    .field("category", "General")
    .field("subjectId", subjectId)
    .field("classLevel", overrides.classLevel ?? "5");
}

describe("Note routes", () => {
  let owner: IUser;
  let ownerToken: string;
  let subject: ISubject;

  beforeEach(async () => {
    owner = await seedUser({ email: "owner@example.com" });
    ownerToken = authToken(owner);
    subject = await seedSubject();
  });

  describe("POST /api/note/create", () => {
    it("requires authentication", async () => {
      const res = await request(app)
        .post("/api/note/create")
        .field("title", "x")
        .field("description", "y")
        .field("category", "General")
        .field("subjectId", subject._id.toString())
        .field("classLevel", "5");

      expect(res.status).toBe(401);
    });

    it("creates a note for the authenticated user", async () => {
      const res = await createNote(ownerToken, subject._id.toString());

      expect(res.status).toBe(201);
      expect(res.body.data.title).toBe("Test Note");
      expect(res.body.data.createdBy).toBe(owner._id.toString());
    });
  });

  describe("GET /api/note and /api/note/:id", () => {
    it("lists all notes", async () => {
      await createNote(ownerToken, subject._id.toString());

      const res = await request(app).get("/api/note");

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
    });

    it("returns 404 for a note that does not exist", async () => {
      const res = await request(app).get(
        "/api/note/000000000000000000000000",
      );
      expect(res.status).toBe(404);
    });

    it("fetches a single note by id", async () => {
      const created = await createNote(ownerToken, subject._id.toString());
      const noteId = created.body.data._id;

      const res = await request(app).get(`/api/note/${noteId}`);

      expect(res.status).toBe(200);
      expect(res.body.data._id).toBe(noteId);
    });
  });

  describe("PUT /api/note/:id (ownership)", () => {
    it("lets the owner update their note", async () => {
      const created = await createNote(ownerToken, subject._id.toString());
      const noteId = created.body.data._id;

      const res = await request(app)
        .put(`/api/note/${noteId}`)
        .set("Authorization", `Bearer ${ownerToken}`)
        .send({ title: "Updated Title" });

      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe("Updated Title");
    });

    it("forbids a non-owner from updating the note", async () => {
      const created = await createNote(ownerToken, subject._id.toString());
      const noteId = created.body.data._id;

      const otherUser = await seedUser({ email: "other@example.com" });
      const otherToken = authToken(otherUser);

      const res = await request(app)
        .put(`/api/note/${noteId}`)
        .set("Authorization", `Bearer ${otherToken}`)
        .send({ title: "Hijacked Title" });

      expect(res.status).toBe(403);
    });
  });

  describe("DELETE /api/note/:id (ownership)", () => {
    it("forbids a non-owner from deleting the note", async () => {
      const created = await createNote(ownerToken, subject._id.toString());
      const noteId = created.body.data._id;

      const otherUser = await seedUser({ email: "other2@example.com" });
      const otherToken = authToken(otherUser);

      const res = await request(app)
        .delete(`/api/note/${noteId}`)
        .set("Authorization", `Bearer ${otherToken}`);

      expect(res.status).toBe(403);
    });

    it("lets the owner delete their note", async () => {
      const created = await createNote(ownerToken, subject._id.toString());
      const noteId = created.body.data._id;

      const res = await request(app)
        .delete(`/api/note/${noteId}`)
        .set("Authorization", `Bearer ${ownerToken}`);

      expect(res.status).toBe(200);

      const getRes = await request(app).get(`/api/note/${noteId}`);
      expect(getRes.status).toBe(404);
    });
  });

  describe("POST /api/note/:id/like", () => {
    it("toggles a like on and off", async () => {
      const created = await createNote(ownerToken, subject._id.toString());
      const noteId = created.body.data._id;
      const liker = await seedUser({ email: "liker@example.com" });
      const likerToken = authToken(liker);

      const likeRes = await request(app)
        .post(`/api/note/${noteId}/like`)
        .set("Authorization", `Bearer ${likerToken}`);
      expect(likeRes.status).toBe(200);
      expect(likeRes.body.data.likes).toContain(liker._id.toString());

      const unlikeRes = await request(app)
        .post(`/api/note/${noteId}/like`)
        .set("Authorization", `Bearer ${likerToken}`);
      expect(unlikeRes.status).toBe(200);
      expect(unlikeRes.body.data.likes).not.toContain(liker._id.toString());
    });
  });
});
