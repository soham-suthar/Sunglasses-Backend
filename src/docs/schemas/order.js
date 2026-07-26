const OrderSchema = {
  Order: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        example: "689beef6e5db9d97e7f4d001",
      },

      user: {
        type: "string",
        example: "689beef6e5db9d97e7f4d002",
      },

      items: {
        type: "array",
        items: {
          type: "object",
          properties: {
            product: {
              type: "string",
              example: "689beef6e5db9d97e7f4d003",
            },
            quantity: {
              type: "integer",
              example: 2,
            },
            price: {
              type: "number",
              example: 2499,
            },
          },
        },
      },

      totalItems: {
        type: "integer",
        example: 2,
      },

      totalPrice: {
        type: "number",
        example: 4998,
      },

      paymentMethod: {
        type: "string",
        example: "COD",
      },

      paymentStatus: {
        type: "string",
        example: "Pending",
      },

      orderStatus: {
        type: "string",
        example: "Placed",
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },
    },
  },
};

export default OrderSchema;
