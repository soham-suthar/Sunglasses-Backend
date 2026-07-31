const CartSchema = {
  CartItem: {
    type: "object",

    properties: {
      productId: {
        type: "string",
        example: "6889a2ef78c6f8b9c1d23456",
      },

      quantity: {
        type: "integer",
        example: 2,
      },

      product: {
        $ref: "#/components/schemas/Product",
      },
    },
  },

  Cart: {
    type: "object",

    properties: {
      _id: {
        type: "string",
      },

      userId: {
        type: "string",
        example: "6889a2ef78c6f8b9c1d11111",
      },

      items: {
        type: "array",
        items: {
          $ref: "#/components/schemas/CartItem",
        },
      },

      totalPrice: {
        type: "number",
        example: 2998,
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },

      updatedAt: {
        type: "string",
        format: "date-time",
      },
    },
  },

  AddToCartResponse: {
    type: "object",

    properties: {
      message: {
        type: "string",
        example: "Product added to Cart",
      },
    },
  },

  UpdateCartResponse: {
    type: "object",

    properties: {
      message: {
        type: "string",
        example: "Cart updated successfully",
      },
    },
  },

  DeleteCartItemResponse: {
    type: "object",

    properties: {
      message: {
        type: "string",
        example: "Product removed from cart",
      },
    },
  },

  ClearCartResponse: {
    type: "object",

    properties: {
      message: {
        type: "string",
        example: "Cart cleared successfully",
      },
    },
  },
};

export default CartSchema;
