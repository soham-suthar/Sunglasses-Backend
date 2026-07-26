const CartSchemas = {
  AddToCart: {
    type: "object",
    required: ["productId"],
    properties: {
      productId: {
        type: "string",
        example: "688d9d93c6c1f6f6e8a12345",
      },
      quantity: {
        type: "integer",
        example: 2,
        default: 1,
      },
    },
  },

  UpdateCart: {
    type: "object",
    required: ["quantity"],
    properties: {
      quantity: {
        type: "integer",
        example: 3,
      },
    },
  },
};

export default CartSchemas;
