import request from "supertest";
import {
  beforeAll,
  beforeEach,
  afterAll,
  describe,
  expect,
  test,
  jest,
} from "@jest/globals";

jest.setTimeout(120000);

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

describe("Authentication", () => {
  test("should register a new user", async () => {
    const response = await request(app).post("/api/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "Password123",
      phone: "9876543210",
    });

    expect(response.statusCode).toBe(201);

    expect(response.body.message).toBe(
      "Registration successful. Please verify your email before logging in.",
    );

    const user = await User.findOne({
      email: "john@example.com",
    });

    expect(user).not.toBeNull();

    expect(user.name).toBe("John Doe");

    expect(user.password).not.toBe("Password123");
  });
});

test("should reject duplicate email", async () => {
  await request(app).post("/api/register").send({
    name: "John Doe",
    email: "john@example.com",
    password: "Password123",
  });

  const response = await request(app).post("/api/register").send({
    name: "Another John",
    email: "john@example.com",
    password: "Password123",
  });

  expect(response.statusCode).toBe(409);
  expect(response.body.message).toBe("Email already exists");
});

test("should reject invalid registration data", async () => {
  const response = await request(app).post("/api/register").send({
    name: "",
    email: "invalid-email",
    password: "123",
  });

  expect(response.statusCode).toBe(400);
});

test("should login successfully", async () => {
  await request(app).post("/api/register").send({
    name: "John Doe",
    email: "john@example.com",
    password: "Password123",
    phone: "9876543210",
  });

  await User.findOneAndUpdate(
    { email: "john@example.com" },
    { isVerified: true },
  );

  const response = await request(app).post("/api/login").send({
    email: "john@example.com",
    password: "Password123",
  });

  expect(response.statusCode).toBe(200);

  expect(response.body.message).toBe("Login Successful");

  expect(response.body.token).toBeDefined();

  expect(typeof response.body.token).toBe("string");
});

test("should reject login with non-existent email", async () => {
  const response = await request(app).post("/api/login").send({
    email: "unknown@example.com",
    password: "Password123",
  });

  expect(response.statusCode).toBe(401);

  expect(response.body.message).toBe("Invalid Credentials");
});

test("should reject login with wrong password", async () => {
  await request(app).post("/api/register").send({
    name: "John Doe",
    email: "john@example.com",
    password: "Password123",
    phone: "9876543210",
  });

  const response = await request(app).post("/api/login").send({
    email: "john@example.com",
    password: "WrongPassword123",
  });

  expect(response.statusCode).toBe(401);
  expect(response.body.message).toBe("Invalid email or password");
});

test("should get authenticated user's profile", async () => {
  await request(app).post("/api/register").send({
    name: "John Doe",
    email: "john@example.com",
    password: "Password123",
    phone: "9876543210",
  });
  await User.findOneAndUpdate(
    { email: "john@example.com" },
    { isVerified: true },
  );

  const login = await request(app).post("/api/login").send({
    email: "john@example.com",
    password: "Password123",
  });

  const token = login.body.token;

  const response = await request(app)
    .get("/api/profile")
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(200);

  expect(response.body.email).toBe("john@example.com");
  expect(response.body.name).toBe("John Doe");
  expect(response.body.role).toBe("user");
  expect(response.body._id).toBeDefined();
});
test("should reject unauthenticated profile request", async () => {
  const response = await request(app).get("/api/profile");

  expect(response.statusCode).toBe(401);
});

test("should resend verification email", async () => {
  await User.create({
    name: "John Doe",
    email: "john@example.com",
    password: await bcrypt.hash("Password123", 10),
    isVerified: false,
  });

  const response = await request(app).post("/api/resend-verification").send({
    email: "john@example.com",
  });

  expect(response.statusCode).toBe(200);

  expect(response.body.message).toBe("Verification email sent successfully");

  const user = await User.findOne({
    email: "john@example.com",
  });

  expect(user.emailVerificationToken).toBeDefined();

  expect(user.emailVerificationExpires).toBeDefined();
});

test("should reject resend verification for verified user", async () => {
  await User.create({
    name: "John Doe",
    email: "john@example.com",
    password: await bcrypt.hash("Password123", 10),
    isVerified: true,
  });

  const response = await request(app).post("/api/resend-verification").send({
    email: "john@example.com",
  });

  expect(response.statusCode).toBe(400);

  expect(response.body.message).toBe("Email is already verified");
});

test("should reject resend verification for unknown email", async () => {
  const response = await request(app).post("/api/resend-verification").send({
    email: "unknown@example.com",
  });

  expect(response.statusCode).toBe(404);

  expect(response.body.message).toBe("User not found");
});
