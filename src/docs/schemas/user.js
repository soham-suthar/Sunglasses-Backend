const UserSchema = {
  User: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        example: "688a1234567890abcdef1234",
      },
      name: {
        type: "string",
        example: "Soham Suthar",
      },
      email: {
        type: "string",
        format: "email",
        example: "soham@gmail.com",
      },
      role: {
        type: "string",
        enum: ["user", "admin"],
        example: "user",
      },
      createdAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  LoginResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Login Successful",
      },
      token: {
        type: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
    },
  },

  RegisterResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example:
          "Registration successful. Please verify your email before logging in.",
      },
    },
  },
  RefreshTokenResponse: {
    type: "object",
    properties: {
      token: {
        type: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
    },
  },

  LogoutResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Logged out successfully",
      },
    },
  },

  ForgotPasswordResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example:
          "If an account with that email exists, a password reset link has been sent.",
      },
    },
  },

  ResetPasswordResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example:
          "Password reset successful. Please log in with your new password.",
      },
    },
  },
};

export default UserSchema;
