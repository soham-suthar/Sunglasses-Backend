const CommonParameters = {
  ObjectId: {
    name: "id",
    in: "path",
    required: true,
    description: "MongoDB ObjectId of the requested resource.",
    schema: {
      type: "string",
      pattern: "^[a-fA-F0-9]{24}$",
      example: "687f9c7f4d5d2d8b91a4f123",
    },
  },

  Page: {
    name: "page",
    in: "query",
    required: false,
    description: "Page number.",
    schema: {
      type: "integer",
      minimum: 1,
      default: 1,
      example: 1,
    },
  },

  Limit: {
    name: "limit",
    in: "query",
    required: false,
    description: "Number of records per page.",
    schema: {
      type: "integer",
      minimum: 1,
      example: 20,
    },
  },

  Search: {
    name: "search",
    in: "query",
    required: false,
    description: "Search by name or email.",
    schema: {
      type: "string",
      example: "Soham",
    },
  },

  Sort: {
    name: "sort",
    in: "query",
    required: false,
    description: "Sort results. Prefix with '-' for descending order.",
    schema: {
      type: "string",
      example: "-createdAt",
    },
  },

  Color: {
    name: "color",
    in: "query",
    required: false,
    description: "Filter products by color.",
    schema: {
      type: "string",
      example: "Black",
    },
  },

  Section: {
    name: "section",
    in: "query",
    required: false,
    description: "Filter products by section.",
    schema: {
      type: "string",
      example: "Men",
    },
  },

  Role: {
    name: "role",
    in: "query",
    required: false,
    description: "Filter users by role.",
    schema: {
      type: "string",
      enum: ["user", "admin"],
      example: "admin",
    },
  },

  OrderStatus: {
    name: "orderStatus",
    in: "query",
    required: false,
    description: "Filter orders by order status.",
    schema: {
      type: "string",
      enum: ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
      example: "Processing",
    },
  },

  PaymentStatus: {
    name: "paymentStatus",
    in: "query",
    required: false,
    description: "Filter orders by payment status.",
    schema: {
      type: "string",
      enum: ["Pending", "Paid", "Failed"],
      example: "Paid",
    },
  },
};

export default CommonParameters;
