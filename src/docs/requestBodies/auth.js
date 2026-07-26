const AuthRequestBodies = {
  RegisterRequest: {
    required: true,

    content: {
      "application/json": {
        schema: {
          type: "object",

          required: ["name", "email", "password"],

          properties: {
            name: {
              type: "string",
              example: "name",
            },

            email: {
              type: "string",
              format: "email",
              example: "yourname@gmail.com",
            },

            password: {
              type: "string",
              format: "password",
              example: "Password@123",
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
              example: "yourname@gmail.com",
            },

            password: {
              type: "string",
              format: "password",
              example: "Password@123",
            },
          },
        },
      },
    },
  },
};

export default AuthRequestBodies;
