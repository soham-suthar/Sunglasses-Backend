import express from "express";
import * as Page from "../controller/user-controller.js";
import validate from "../middleware/validation-middleware.js";
import { registerSchema, loginSchema } from "../validation/validation.js";
import authMiddleware from "../middleware/auth-middleware.js";
import authLimiter from "../middleware/rate-limiting.js";

const userRouter = express.Router();

userRouter
  .route("/api/register")
  .post(authLimiter, validate(registerSchema), Page.Register);
userRouter
  .route("/api/login")
  .post(authLimiter, validate(loginSchema), Page.Login);
userRouter.route("/api/profile").get(authMiddleware, Page.getProfile);
userRouter.route("/").get(Page.redirect);

export default userRouter;
