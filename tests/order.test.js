import {
  beforeAll,
  afterAll,
  afterEach,
  describe,
  test,
  expect,
} from "@jest/globals";

import request from "supertest";

import app from "../app.js";

import Product from "../src/models/product-model.js";
import User from "../src/models/user-model.js";

import { connectTestDB, clearDatabase, closeDatabase } from "./setup.js";

beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe("Orders", () => {
  test("should checkout successfully", async () => {
    // Register
    await request(app).post("/api/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "Password123",
    });

    await User.findOneAndUpdate(
      { email: "john@example.com" },
      { isVerified: true },
    );

    // Login
    const login = await request(app).post("/api/login").send({
      email: "john@example.com",
      password: "Password123",
    });

    const token = login.body.token;

    // Create product
    const product = await Product.create({
      name: "Black Sunglasses",
      price: 1499,
      color: "Black",
      section: "Men",
      description: "Black sunglasses",
      quantity: 10,
      src: "/public/black.jpg",
      hoverSrc: "/public/black-hover.jpg",
    });

    // Add to cart
    await request(app)
      .post("/api/cart")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: product._id.toString(),
        quantity: 2,
      });

    // Checkout
    const response = await request(app)
      .post("/api/checkout")
      .set("Authorization", `Bearer ${token}`)
      .send({
        paymentMethod: "COD",
      });

    expect(response.statusCode).toBe(201);

    expect(response.body.message).toBe("Order created successfully");

    expect(response.body.order.totalItems).toBe(2);

    expect(response.body.order.totalPrice).toBe(2998);

    expect(response.body.order.paymentStatus).toBe("Pending");
  });
});
