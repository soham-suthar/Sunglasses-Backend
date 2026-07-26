const UserSchema = {
  User: {
    type: "object",

    properties: {
      _id: {
        type: "string",
      },

      name: {
        type: "string",
        example: "Soham Suthar",
      },

      email: {
        type: "string",
        example: "soham@gmail.com",
      },

      role: {
        type: "string",
        example: "user",
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },
    },
  },
};

export default UserSchema;
