import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: {
      type: String,
    },

    emailVerificationExpires: {
      type: Date,
    },

    passwordResetToken: {
      type: String,
    },

    passwordResetExpires: {
      type: Date,
    },

    refreshTokenHash: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      userId: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m",
    },
  );
};

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      userId: this._id,
      jti: crypto.randomUUID(),
    },
    process.env.JWT_REFRESH_SECRET_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
    },
  );
};

UserSchema.methods.setRefreshToken = async function (token) {
  this.refreshTokenHash = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  await this.save();
};

UserSchema.methods.compareRefreshToken = function (token) {
  if (!this.refreshTokenHash) return false;
  const incomingHash = crypto.createHash("sha256").update(token).digest("hex");
  return incomingHash === this.refreshTokenHash;
};

const User = mongoose.model("User", UserSchema);

export default User;
