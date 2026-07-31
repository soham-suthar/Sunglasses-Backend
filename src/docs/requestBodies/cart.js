const CartRequestBodies = {
  AddToCartRequest: {
    required: true,

    content: {
      "application/json": {
        schema: {
          type: "object",

          required: ["productId", "quantity"],

          properties: {
            productId: {
              type: "string",
              example: "6889a2ef78c6f8b9c1d23456",
            },

            quantity: {
              type: "integer",
              minimum: 1,
              example: 2,
            },
          },
        },
      },
    },
  },

  UpdateCartRequest: {
    required: true,

    content: {
      "application/json": {
        schema: {
          type: "object",

          required: ["quantity"],

          properties: {
            quantity: {
              type: "integer",
              minimum: 1,
              example: 3,
            },
          },
        },
      },
    },
  },
};

export default CartRequestBodies;
