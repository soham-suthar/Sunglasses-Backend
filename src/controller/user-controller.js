import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncMiddleware from "../middleware/asyncMiddleware.js";
import crypto from "crypto";
import sendEmail from "../util/sendEmail.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const Register = asyncMiddleware(async (req, res) => {
  const { name, password, email } = req.body;

  const verificationToken = crypto.randomBytes(32).toString("hex");

  const hashedVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  const UserExist = await User.findOne({ email: email.toLowerCase() });

  if (UserExist) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const saltRound = await bcrypt.genSalt(10);
  const hash_password = await bcrypt.hash(password, saltRound);

  const userCreated = await User.create({
    name,
    password: hash_password,
    email: email.toLowerCase(),

    isVerified: false,
    emailVerificationToken: hashedVerificationToken,
    emailVerificationExpires: Date.now() + 1000 * 60 * 10,
  });

  try {
    const verificationURL = `${process.env.CLIENT_URL}/api/verify-email/${verificationToken}`;

    await sendEmail({
      to: userCreated.email,
      subject: "Verify your email",
      html: `
        <h2>Welcome to Sunglasses Store!</h2>
        <p>Click the button below to verify your email.</p>
        
          href="${verificationURL}"
          style="
            background:#000;
            color:#fff;
            padding:12px 20px;
            text-decoration:none;
            border-radius:6px;
            display:inline-block;
          "
        >
          Verify Email
        </a>
        <p>This link expires in 10 minutes.</p>
      `,
    });
  } catch (error) {
    await User.findByIdAndDelete(userCreated._id);
    throw error;
  }

  return res.status(201).json({
    message:
      "Registration successful. Please verify your email before logging in.",
  });
});

const Login = asyncMiddleware(async (req, res) => {
  const { email, password } = req.body;

  const UserExist = await User.findOne({ email: email.toLowerCase() });

  if (!UserExist) {
    return res.status(401).json({
      message: "Invalid Credentials",
    });
  }

  const isMatch = await bcrypt.compare(password, UserExist.password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  if (!UserExist.isVerified) {
    return res.status(403).json({
      message: "Please verify your email before logging in.",
    });
  }

  const accessToken = UserExist.generateAccessToken();
  const newRefreshToken = UserExist.generateRefreshToken();
  await UserExist.setRefreshToken(newRefreshToken);
  console.log("Token generated");

  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);

  return res.status(200).json({
    message: "Login Successful",
    token: accessToken,
    userId: UserExist._id,
    name: UserExist.name,
  });
});

const getProfile = asyncMiddleware(async (req, res) => {
  res.status(200).json(req.user);
});

const verifyEmail = asyncMiddleware(async (req, res) => {
  const token = req.params.token;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid or expired verification link",
    });
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;

  await user.save();

  return res.status(200).json({
    message: "Email verified successfully",
  });
});

const resendVerificationEmail = asyncMiddleware(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({
    email: email.toLowerCase(),
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (user.isVerified) {
    return res.status(400).json({
      message: "Email is already verified",
    });
  }

  const verificationToken = crypto.randomBytes(32).toString("hex");

  user.emailVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  user.emailVerificationExpires = Date.now() + 10 * 60 * 1000;

  await user.save();

  const verificationURL = `${process.env.CLIENT_URL}/api/verify-email/${verificationToken}`;

  await sendEmail({
    to: user.email,
    subject: "Verify your Email",
    html: `
      <h2>Email Verification</h2>
      <p>Click below to verify your account:</p>
      <a href="${verificationURL}">${verificationURL}</a>
      <p>This link expires in 10 minutes.</p>
    `,
  });

  return res.status(200).json({
    message: "Verification email sent successfully",
  });
});

const refreshToken = asyncMiddleware(async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
  } catch {
    return res
      .status(401)
      .json({ message: "Invalid or expired refresh token" });
  }

  const user = await User.findById(decoded.userId);

  if (!user || !(await user.compareRefreshToken(token))) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  const newAccessToken = user.generateAccessToken();
  const newRefreshToken = user.generateRefreshToken();
  await user.setRefreshToken(newRefreshToken);

  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);

  return res.status(200).json({ token: newAccessToken });
});

const logout = asyncMiddleware(async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
      await User.findByIdAndUpdate(decoded.userId, { refreshTokenHash: null });
    } catch {
      // token already invalid/expired — nothing to clean up
    }
  }

  res.clearCookie("refreshToken", COOKIE_OPTIONS);
  return res.status(200).json({ message: "Logged out successfully" });
});

const redirect = asyncMiddleware(async (req, res) => {
  res.json({ message: "Sunglasses API — see /api-docs for documentation" });
});

export {
  Register,
  Login,
  getProfile,
  redirect,
  verifyEmail,
  resendVerificationEmail,
  refreshToken,
  logout,
};
