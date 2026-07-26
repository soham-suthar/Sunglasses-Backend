const CartRequestBodies = {
  AddToCartRequest: {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/AddToCart",
        },
      },
    },
  },

  UpdateCartRequest: {
    required: true,
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/UpdateCart",
        },
      },
    },
  },
};

export default CartRequestBodies;
