const AuthRequestBodies = {
  RegisterRequest: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["name", "email", "password", "phone"],
          properties: {
            name: {
              type: "string",
              minLength: 6,
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            password: {
              type: "string",
              minLength: 7,
              example: "Password123",
            },
            phone: {
              type: "string",
              minLength: 10,
              maxLength: 10,
              example: "9876543210",
            },
          },
        },
      },
    },
  },

  LoginRequest: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            password: {
              type: "string",
              example: "Password123",
            },
          },
        },
      },
    },
  },

  ForgotPasswordRequest: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["email"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "soham@gmail.com",
            },
          },
        },
      },
    },
  },

  ResetPasswordRequest: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["password"],
          properties: {
            password: {
              type: "string",
              minLength: 7,
              example: "NewPassword123",
            },
          },
        },
      },
    },
  },
};

export default AuthRequestBodies;
