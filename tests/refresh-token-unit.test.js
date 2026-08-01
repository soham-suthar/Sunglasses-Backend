import {
  beforeAll,
  beforeEach,
  afterAll,
  describe,
  expect,
  test,
} from "@jest/globals";
import User from "../src/models/user-model.js";
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

test("rotation invalidates the old refresh token at the model level", async () => {
  const user = await User.create({
    name: "John Doe",
    email: "john@example.com",
    password: "hashed-placeholder",
    isVerified: true,
  });

  const tokenA = user.generateRefreshToken();
  await user.setRefreshToken(tokenA);

  // Re-fetch fresh, exactly like the controller does
  const afterFirstSave = await User.findById(user._id);
  const matchesA_afterFirstSave =
    await afterFirstSave.compareRefreshToken(tokenA);
  expect(matchesA_afterFirstSave).toBe(true); // sanity check — A should match right after saving A

  const tokenB = afterFirstSave.generateRefreshToken();
  expect(tokenB).not.toBe(tokenA); // confirm rotation actually produces a new token
  await afterFirstSave.setRefreshToken(tokenB);

  // Re-fetch fresh again — this simulates the "replay" request
  const afterSecondSave = await User.findById(user._id);
  const matchesA_afterSecondSave =
    await afterSecondSave.compareRefreshToken(tokenA);
  const matchesB_afterSecondSave =
    await afterSecondSave.compareRefreshToken(tokenB);

  expect(matchesA_afterSecondSave).toBe(false); // OLD token must now fail
  expect(matchesB_afterSecondSave).toBe(true); // NEW token must succeed
});
