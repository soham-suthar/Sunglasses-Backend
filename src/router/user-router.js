import express from "express";
import * as Page from "../controller/user-controller.js";
import validate from "../middleware/validation-middleware.js";
import {
  registerSchema,
  loginSchema,
  resendVerificationSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validation/validation.js";
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

userRouter.route("/api/verify-email/:token").get(Page.verifyEmail);
userRouter
  .route("/api/resend-verification")
  .post(validate(resendVerificationSchema), Page.resendVerificationEmail);

userRouter.route("/api/refresh-token").post(Page.refreshToken);
userRouter.route("/api/logout").post(Page.logout);

userRouter
  .route("/api/forgot-password")
  .post(authLimiter, validate(forgotPasswordSchema), Page.forgotPassword);

userRouter
  .route("/api/reset-password/:token")
  .post(validate(resetPasswordSchema), Page.resetPassword);

export default userRouter;
