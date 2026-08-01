import {
  beforeAll,
  afterAll,
  afterEach,
  describe,
  test,
  expect,
} from "@jest/globals";

import mongoose from "mongoose";

import request from "supertest";

import app from "../app.js";
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

describe("Products", () => {
  test("should return all products", async () => {
    await Product.create([
      {
        name: "Black Sunglasses",
        price: 1499,
        color: "Black",
        section: "Men",
        description: "Black sunglasses",
        quantity: 15,
        src: "/public/black.jpg",
        hoverSrc: "/public/black-hover.jpg",
      },
      {
        name: "Blue Sunglasses",
        price: 1799,
        color: "Blue",
        section: "Women",
        description: "Blue sunglasses",
        quantity: 20,
        src: "/public/blue.jpg",
        hoverSrc: "/public/blue-hover.jpg",
      },
    ]);

    const response = await request(app).get("/api/products");

    expect(response.statusCode).toBe(200);

    expect(response.body).toBeDefined();
  });
});

test("should filter products by color", async () => {
  await Product.create([
    {
      name: "Black Sunglasses",
      price: 1499,
      color: "Black",
      section: "Men",
      description: "Black sunglasses",
      quantity: 15,
      src: "/public/black.jpg",
      hoverSrc: "/public/black-hover.jpg",
    },
    {
      name: "Blue Sunglasses",
      price: 1799,
      color: "Blue",
      section: "Women",
      description: "Blue sunglasses",
      quantity: 20,
      src: "/public/blue.jpg",
      hoverSrc: "/public/blue-hover.jpg",
    },
  ]);

  const response = await request(app).get("/api/products?color=Black");

  expect(response.statusCode).toBe(200);
});

test("should return all available colors", async () => {
  await Product.create([
    {
      name: "Black Sunglasses",
      price: 1499,
      color: "Black",
      section: "Men",
      description: "Black sunglasses",
      quantity: 15,
      src: "/public/black.jpg",
    },
    {
      name: "Blue Sunglasses",
      price: 1799,
      color: "Blue",
      section: "Women",
      description: "Blue sunglasses",
      quantity: 20,
      src: "/public/blue.jpg",
    },
  ]);

  const response = await request(app).get("/api/colors");
  expect(response.statusCode).toBe(200);
});

test("should return 404 when product does not exist", async () => {
  const id = new mongoose.Types.ObjectId();

  const response = await request(app).get(`/api/products/${id}`);

  expect(response.statusCode).toBe(404);
});
