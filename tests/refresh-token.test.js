import request from "supertest";
import {
  beforeAll,
  beforeEach,
  afterAll,
  describe,
  expect,
  test,
} from "@jest/globals";

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

const createVerifiedUser = async () => {
  return User.create({
    name: "John Doe",
    email: "john@example.com",
    password: await bcrypt.hash("Password123", 10),
    isVerified: true,
  });
};

describe("Refresh Token & Logout", () => {
  test("should set a refresh token cookie on login", async () => {
    await createVerifiedUser();

    const response = await request(app).post("/api/login").send({
      email: "john@example.com",
      password: "Password123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers["set-cookie"]).toBeDefined();
    expect(
      response.headers["set-cookie"].some((c) => c.startsWith("refreshToken=")),
    ).toBe(true);
  });

  test("should issue a new access token using a valid refresh token cookie", async () => {
    await createVerifiedUser();
    const agent = request.agent(app);

    await agent.post("/api/login").send({
      email: "john@example.com",
      password: "Password123",
    });

    const response = await agent.post("/api/refresh-token");

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(typeof response.body.token).toBe("string");
  });

  test("should reject refresh when no cookie is present", async () => {
    const response = await request(app).post("/api/refresh-token");

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Refresh token missing");
  });

  test("should reject refresh with a tampered/invalid token", async () => {
    const response = await request(app)
      .post("/api/refresh-token")
      .set("Cookie", ["refreshToken=not-a-real-token"]);

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid or expired refresh token");
  });

  test("should rotate the refresh token — old token is invalid after one use", async () => {
    await createVerifiedUser();

    const loginResponse = await request(app).post("/api/login").send({
      email: "john@example.com",
      password: "Password123",
    });

    const originalCookie = loginResponse.headers["set-cookie"].find((c) =>
      c.startsWith("refreshToken="),
    );

    const firstRefresh = await request(app)
      .post("/api/refresh-token")
      .set("Cookie", originalCookie);
    expect(firstRefresh.statusCode).toBe(200);

    const replay = await request(app)
      .post("/api/refresh-token")
      .set("Cookie", originalCookie);
    expect(replay.statusCode).toBe(401);
  });

  test("should clear the cookie and invalidate the session on logout", async () => {
    const user = await createVerifiedUser();
    const agent = request.agent(app);

    await agent.post("/api/login").send({
      email: "john@example.com",
      password: "Password123",
    });

    const logoutResponse = await agent.post("/api/logout");
    expect(logoutResponse.statusCode).toBe(200);
    expect(logoutResponse.body.message).toBe("Logged out successfully");

    const updatedUser = await User.findById(user._id);
    expect(updatedUser.refreshTokenHash).toBeNull();

    const refreshAfterLogout = await agent.post("/api/refresh-token");
    expect(refreshAfterLogout.statusCode).toBe(401);
  });
});
