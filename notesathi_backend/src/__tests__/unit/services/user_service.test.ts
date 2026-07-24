import { UserService } from "../../../services/user_service";
import { UserMongoRepository } from "../../../repositories/user_repository";
import { HttpException } from "../../../exceptions/http-exception";
import bcryptjs from "bcryptjs";

jest.mock("../../../utils/mailer", () => ({
  sendPasswordResetEmail: jest.fn().mockResolvedValue(undefined),
}));

import { sendPasswordResetEmail } from "../../../utils/mailer";

const userService = new UserService();

function mockUser(overrides: Record<string, any> = {}) {
  return {
    _id: { toString: () => "user-id-1" },
    fullname: "Test User",
    email: "test@example.com",
    password: "hashed-password",
    role: "user",
    ...overrides,
  };
}

afterEach(() => {
  jest.restoreAllMocks();
});

describe("UserService.createUser", () => {
  it("throws when email already exists", async () => {
    jest
      .spyOn(UserMongoRepository.prototype, "getUserByEmail")
      .mockResolvedValue(mockUser() as any);

    await expect(
      userService.createUser({
        fullname: "Test User",
        email: "test@example.com",
        password: "password123",
      } as any),
    ).rejects.toThrow(HttpException);
  });

  it("hashes the password and creates the user", async () => {
    jest
      .spyOn(UserMongoRepository.prototype, "getUserByEmail")
      .mockResolvedValue(null);
    const createSpy = jest
      .spyOn(UserMongoRepository.prototype, "createUser")
      .mockImplementation(async (data) => mockUser(data) as any);

    const result = await userService.createUser({
      fullname: "Test User",
      email: "test@example.com",
      password: "password123",
    } as any);

    expect(createSpy).toHaveBeenCalled();
    const savedPassword = createSpy.mock.calls[0][0].password as string;
    expect(savedPassword).not.toBe("password123");
    expect(await bcryptjs.compare("password123", savedPassword)).toBe(true);
    expect(result.email).toBe("test@example.com");
  });
});

describe("UserService.loginUser", () => {
  it("throws on unknown email", async () => {
    jest
      .spyOn(UserMongoRepository.prototype, "getUserByEmail")
      .mockResolvedValue(null);

    await expect(
      userService.loginUser({ email: "nobody@example.com", password: "x" } as any),
    ).rejects.toThrow("Invalid email");
  });

  it("throws for google-only accounts with no password", async () => {
    jest
      .spyOn(UserMongoRepository.prototype, "getUserByEmail")
      .mockResolvedValue(mockUser({ password: undefined }) as any);

    await expect(
      userService.loginUser({ email: "test@example.com", password: "x" } as any),
    ).rejects.toThrow("Google Sign-In");
  });

  it("throws on wrong password", async () => {
    const hashed = await bcryptjs.hash("correct-password", 10);
    jest
      .spyOn(UserMongoRepository.prototype, "getUserByEmail")
      .mockResolvedValue(mockUser({ password: hashed }) as any);

    await expect(
      userService.loginUser({
        email: "test@example.com",
        password: "wrong-password",
      } as any),
    ).rejects.toThrow("Invalid password");
  });

  it("returns a token on valid credentials", async () => {
    const hashed = await bcryptjs.hash("correct-password", 10);
    jest
      .spyOn(UserMongoRepository.prototype, "getUserByEmail")
      .mockResolvedValue(mockUser({ password: hashed }) as any);

    const { user, token } = await userService.loginUser({
      email: "test@example.com",
      password: "correct-password",
    } as any);

    expect(user.email).toBe("test@example.com");
    expect(typeof token).toBe("string");
    expect(token.split(".")).toHaveLength(3); // header.payload.signature
  });
});

describe("UserService.forgotPassword / resetPassword", () => {
  it("does nothing and does not send an email when the user is not found", async () => {
    jest
      .spyOn(UserMongoRepository.prototype, "getUserByEmail")
      .mockResolvedValue(null);

    await userService.forgotPassword("missing@example.com");

    expect(sendPasswordResetEmail).not.toHaveBeenCalled();
  });

  it("sets a reset code and emails it when the user exists", async () => {
    jest
      .spyOn(UserMongoRepository.prototype, "getUserByEmail")
      .mockResolvedValue(mockUser() as any);
    const setResetCodeSpy = jest
      .spyOn(UserMongoRepository.prototype, "setResetCode")
      .mockResolvedValue(undefined);

    await userService.forgotPassword("test@example.com");

    expect(setResetCodeSpy).toHaveBeenCalled();
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(
      "test@example.com",
      expect.stringMatching(/^\d{6}$/),
    );
  });

  it("rejects an invalid or expired reset code", async () => {
    jest
      .spyOn(UserMongoRepository.prototype, "getUserByResetCode")
      .mockResolvedValue(null);

    await expect(
      userService.resetPassword("test@example.com", "000000", "newpassword"),
    ).rejects.toThrow("Reset code is invalid or has expired");
  });

  it("updates the password and clears the reset code on a valid code", async () => {
    jest
      .spyOn(UserMongoRepository.prototype, "getUserByResetCode")
      .mockResolvedValue(mockUser() as any);
    const updateSpy = jest
      .spyOn(UserMongoRepository.prototype, "update")
      .mockResolvedValue(mockUser() as any);
    const clearSpy = jest
      .spyOn(UserMongoRepository.prototype, "clearResetCode")
      .mockResolvedValue(undefined);

    await userService.resetPassword("test@example.com", "123456", "newpassword");

    expect(updateSpy).toHaveBeenCalled();
    expect(clearSpy).toHaveBeenCalled();
  });
});

describe("UserService.changePassword", () => {
  it("throws when the current password is wrong", async () => {
    const hashed = await bcryptjs.hash("correct-password", 10);
    jest
      .spyOn(UserMongoRepository.prototype, "getUserById")
      .mockResolvedValue(mockUser({ password: hashed }) as any);

    await expect(
      userService.changePassword("user-id-1", "wrong-password", "new-password"),
    ).rejects.toThrow("Current password is incorrect");
  });

  it("updates the password when the current password is correct", async () => {
    const hashed = await bcryptjs.hash("correct-password", 10);
    jest
      .spyOn(UserMongoRepository.prototype, "getUserById")
      .mockResolvedValue(mockUser({ password: hashed }) as any);
    const updateSpy = jest
      .spyOn(UserMongoRepository.prototype, "update")
      .mockResolvedValue(mockUser() as any);

    await userService.changePassword("user-id-1", "correct-password", "new-password");

    expect(updateSpy).toHaveBeenCalledWith(
      "user-id-1",
      expect.objectContaining({ password: expect.any(String) }),
    );
  });
});
