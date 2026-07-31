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

import User from "../src/models/user-model.js";
import Product from "../src/models/product-model.js";

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

describe("Cart", () => {
  test("should add product to cart", async () => {
    // Register user
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

    // Create a product
    const product = await Product.create({
      name: "Black Sunglasses",
      price: 1499,
      color: "Black",
      section: "Men",
      description: "Black sunglasses",
      quantity: 15,
      src: "/public/black.jpg",
      hoverSrc: "/public/black-hover.jpg",
    });

    // Add to cart
    const response = await request(app)
      .post("/api/cart")
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId: product._id.toString(),
        quantity: 2,
      });

    expect(response.statusCode).toBe(200);

    expect(response.body.message).toBe("Product added to Cart");

    expect(response.body.cart.items).toHaveLength(1);

    expect(response.body.cart.items[0].quantity).toBe(2);

    expect(response.body.cart.items[0].product.toString()).toBe(
      product._id.toString(),
    );
  });
});

test("should return the user's cart", async () => {
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

  // Product
  const product = await Product.create({
    name: "Black Sunglasses",
    price: 1499,
    color: "Black",
    section: "Men",
    description: "Black sunglasses",
    quantity: 15,
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

  // Fetch cart
  const response = await request(app)
    .get("/api/cart")
    .set("Authorization", `Bearer ${token}`);

  expect(response.statusCode).toBe(200);

  expect(response.body.items).toHaveLength(1);

  expect(response.body.totalItems).toBe(2);

  expect(response.body.totalPrice).toBe(2998);

  expect(response.body.items[0].product.name).toBe("Black Sunglasses");

  expect(response.body.items[0].quantity).toBe(2);
});
