import request from "supertest";
import {
  beforeAll,
  beforeEach,
  afterAll,
  describe,
  expect,
  test,
} from "@jest/globals";
import crypto from "crypto";

import app from "../app.js";
import User from "../src/models/user-model.js";
import bcrypt from "bcrypt";

import { connectTestDB, clearDatabase, closeDatabase } from "./setup.js";

beforeAll(async () => {
  await connectTestDB();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

const createVerifiedUser = async (overrides = {}) => {
  return User.create({
    name: "John Doe",
    email: "john@example.com",
    password: await bcrypt.hash("Password123", 10),
    isVerified: true,
    ...overrides,
  });
};

describe("Forgot Password", () => {
  test("should return generic success message when email exists", async () => {
    await createVerifiedUser();

    const response = await request(app).post("/api/forgot-password").send({
      email: "john@example.com",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "If an account with that email exists, a password reset link has been sent.",
    );

    const user = await User.findOne({ email: "john@example.com" });
    expect(user.passwordResetToken).toBeDefined();
    expect(user.passwordResetExpires).toBeDefined();
  });

  test("should return the SAME generic message when email does not exist (no account enumeration)", async () => {
    const response = await request(app).post("/api/forgot-password").send({
      email: "unknown@example.com",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "If an account with that email exists, a password reset link has been sent.",
    );
  });

  test("should reject an invalid email format", async () => {
    const response = await request(app).post("/api/forgot-password").send({
      email: "not-an-email",
    });

    expect(response.statusCode).toBe(400);
  });
});

describe("Reset Password", () => {
  const setResetToken = async (user, expiresInMs = 10 * 60 * 1000) => {
    const plainToken = crypto.randomBytes(32).toString("hex");

    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(plainToken)
      .digest("hex");
    user.passwordResetExpires = Date.now() + expiresInMs;

    await user.save();

    return plainToken;
  };

  test("should reset the password with a valid token", async () => {
    const user = await createVerifiedUser();
    const plainToken = await setResetToken(user);

    const response = await request(app)
      .post(`/api/reset-password/${plainToken}`)
      .send({ password: "NewPassword123" });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(
      "Password reset successful. Please log in with your new password.",
    );

    const updatedUser = await User.findById(user._id);
    expect(updatedUser.passwordResetToken).toBeUndefined();
    expect(updatedUser.passwordResetExpires).toBeUndefined();

    const passwordMatches = await bcrypt.compare(
      "NewPassword123",
      updatedUser.password,
    );
    expect(passwordMatches).toBe(true);
  });

  test("should allow login with the new password after reset", async () => {
    const user = await createVerifiedUser();
    const plainToken = await setResetToken(user);

    await request(app)
      .post(`/api/reset-password/${plainToken}`)
      .send({ password: "NewPassword123" });

    const loginResponse = await request(app).post("/api/login").send({
      email: "john@example.com",
      password: "NewPassword123",
    });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.token).toBeDefined();
  });

  test("should invalidate any existing refresh token session on reset", async () => {
    const user = await createVerifiedUser();

    // Simulate an existing logged-in session
    const oldRefreshToken = user.generateRefreshToken();
    await user.setRefreshToken(oldRefreshToken);

    const plainToken = await setResetToken(user);

    await request(app)
      .post(`/api/reset-password/${plainToken}`)
      .send({ password: "NewPassword123" });

    const updatedUser = await User.findById(user._id);
    expect(updatedUser.refreshTokenHash).toBeNull();
  });

  test("should reject an invalid/unknown reset token", async () => {
    const response = await request(app)
      .post("/api/reset-password/not-a-real-token")
      .send({ password: "NewPassword123" });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      "Invalid or expired password reset link",
    );
  });

  test("should reject an expired reset token", async () => {
    const user = await createVerifiedUser();
    const plainToken = await setResetToken(user, -1000); // already expired

    const response = await request(app)
      .post(`/api/reset-password/${plainToken}`)
      .send({ password: "NewPassword123" });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      "Invalid or expired password reset link",
    );
  });

  test("should reject a password that is too short", async () => {
    const user = await createVerifiedUser();
    const plainToken = await setResetToken(user);

    const response = await request(app)
      .post(`/api/reset-password/${plainToken}`)
      .send({ password: "123" });

    expect(response.statusCode).toBe(400);
  });
});
