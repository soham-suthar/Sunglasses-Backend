const CommonResponses = {
  BadRequest: {
    description:
      "The request could not be processed because it contains invalid data or violates business rules.",
  },

  Unauthorized: {
    description: "Unauthorized",
  },

  Forbidden: {
    description: "Forbidden",
  },

  NotFound: {
    description: "Resource not found",
  },

  Conflict: {
    description: "Conflict",
  },

  InternalServerError: {
    description: "Internal server error",
  },
};

export default CommonResponses;
