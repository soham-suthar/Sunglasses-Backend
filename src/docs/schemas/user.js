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
};

export default UserSchema;
