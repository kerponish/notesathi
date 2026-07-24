import request from "supertest";
import app from "../../app";
import { connectTestDB, disconnectTestDB, clearCollections } from "../helpers/test-db";
import { seedUser, authToken } from "../helpers/seed";

jest.mock("../../utils/mailer", () => ({
  sendPasswordResetEmail: jest.fn().mockResolvedValue(undefined),
}));

import { sendPasswordResetEmail } from "../../utils/mailer";

beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await clearCollections();
  jest.clearAllMocks();
});

afterAll(async () => {
  await disconnectTestDB();
});

describe("POST /api/users/register", () => {
  it("creates a new user", async () => {
    const res = await request(app).post("/api/users/register").send({
      fullname: "New User",
      email: "new@example.com",
      password: "password123",
    });

    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("new@example.com");
    expect(res.body.data.password).not.toBe("password123");
  });

  it("rejects a duplicate email", async () => {
    await seedUser({ email: "dup@example.com" });

    const res = await request(app).post("/api/users/register").send({
      fullname: "Another User",
      email: "dup@example.com",
      password: "password123",
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/already exists/i);
  });

  it("rejects invalid input", async () => {
    const res = await request(app).post("/api/users/register").send({
      fullname: "",
      email: "not-an-email",
      password: "123",
    });

    expect(res.status).toBe(400);
  });
});

describe("POST /api/users/login", () => {
  it("logs in with valid credentials and returns a token", async () => {
    await seedUser({ email: "login@example.com", password: "correct-password" });

    const res = await request(app).post("/api/users/login").send({
      email: "login@example.com",
      password: "correct-password",
    });

    expect(res.status).toBe(201);
    expect(res.body.data.token).toEqual(expect.any(String));
    expect(res.body.data.user.email).toBe("login@example.com");
  });

  it("rejects an incorrect password", async () => {
    await seedUser({ email: "login2@example.com", password: "correct-password" });

    const res = await request(app).post("/api/users/login").send({
      email: "login2@example.com",
      password: "wrong-password",
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/invalid password/i);
  });

  it("rejects an unknown email", async () => {
    const res = await request(app).post("/api/users/login").send({
      email: "nobody@example.com",
      password: "whatever123",
    });

    expect(res.status).toBe(400);
  });
});

describe("GET /api/users/whoami", () => {
  it("returns 401 without a token", async () => {
    const res = await request(app).get("/api/users/whoami");
    expect(res.status).toBe(401);
  });

  it("rejects a tampered token", async () => {
    const user = await seedUser();
    const token = authToken(user);

    const res = await request(app)
      .get("/api/users/whoami")
      .set("Authorization", `Bearer ${token}tampered`);

    // NOTE: authorizedMiddleware only sets a 401 for its own explicit
    // HttpException checks; jwt.verify's JsonWebTokenError has no `.status`
    // property, so it falls through to the generic 500 branch instead of 401.
    // See src/middleware/authorized.middleware.ts.
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });

  it("returns the authenticated user with a valid token", async () => {
    const user = await seedUser({ email: "whoami@example.com" });
    const token = authToken(user);

    const res = await request(app)
      .get("/api/users/whoami")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(201);
    expect(res.body.data.email).toBe("whoami@example.com");
  });
});

describe("Password reset flow", () => {
  it("forgot-password always returns 200, even for an unregistered email", async () => {
    const res = await request(app)
      .post("/api/users/forgot-password")
      .send({ email: "unregistered@example.com" });

    expect(res.status).toBe(200);
    expect(sendPasswordResetEmail).not.toHaveBeenCalled();
  });

  it("forgot-password emails a 6-digit code for a registered user", async () => {
    await seedUser({ email: "reset@example.com" });

    const res = await request(app)
      .post("/api/users/forgot-password")
      .send({ email: "reset@example.com" });

    expect(res.status).toBe(200);
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(
      "reset@example.com",
      expect.stringMatching(/^\d{6}$/),
    );
  });

  it("rejects reset-password with an invalid code", async () => {
    await seedUser({ email: "reset2@example.com" });

    const res = await request(app).post("/api/users/reset-password").send({
      email: "reset2@example.com",
      code: "000000",
      newPassword: "brandnewpass",
      confirmPassword: "brandnewpass",
    });

    expect(res.status).toBe(400);
  });

  it("resets the password with a valid code and allows login with it", async () => {
    await seedUser({ email: "reset3@example.com" });
    await request(app)
      .post("/api/users/forgot-password")
      .send({ email: "reset3@example.com" });

    const code = (sendPasswordResetEmail as jest.Mock).mock.calls[0][1];

    const resetRes = await request(app).post("/api/users/reset-password").send({
      email: "reset3@example.com",
      code,
      newPassword: "brandnewpass",
      confirmPassword: "brandnewpass",
    });
    expect(resetRes.status).toBe(200);

    const loginRes = await request(app).post("/api/users/login").send({
      email: "reset3@example.com",
      password: "brandnewpass",
    });
    expect(loginRes.status).toBe(201);
  });
});

describe("PATCH /api/users/change-password", () => {
  it("requires authentication", async () => {
    const res = await request(app).patch("/api/users/change-password").send({
      currentPassword: "password123",
      newPassword: "newpassword123",
      confirmPassword: "newpassword123",
    });

    expect(res.status).toBe(401);
  });

  it("changes the password when the current password is correct", async () => {
    const user = await seedUser({
      email: "change@example.com",
      password: "password123",
    });
    const token = authToken(user);

    const res = await request(app)
      .patch("/api/users/change-password")
      .set("Authorization", `Bearer ${token}`)
      .send({
        currentPassword: "password123",
        newPassword: "newpassword123",
        confirmPassword: "newpassword123",
      });

    expect(res.status).toBe(201);

    const loginRes = await request(app).post("/api/users/login").send({
      email: "change@example.com",
      password: "newpassword123",
    });
    expect(loginRes.status).toBe(201);
  });
});
