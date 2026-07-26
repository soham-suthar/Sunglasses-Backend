const PaginationSchema = {
  Pagination: {
    type: "object",

    properties: {
      page: {
        type: "integer",
        example: 1,
      },

      limit: {
        type: "integer",
        example: 20,
      },

      totalPages: {
        type: "integer",
        example: 5,
      },

      hasNextPage: {
        type: "boolean",
        example: true,
      },

      hasPreviousPage: {
        type: "boolean",
        example: false,
      },
    },
  },
};

export default PaginationSchema;
