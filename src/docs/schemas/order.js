const OrderSchema = {
  OrderItem: {
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

      price: {
        type: "number",
        example: 1499,
      },

      product: {
        $ref: "#/components/schemas/Product",
      },
    },
  },

  Order: {
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
          $ref: "#/components/schemas/OrderItem",
        },
      },

      totalPrice: {
        type: "number",
        example: 2998,
      },

      paymentStatus: {
        type: "string",
        example: "Paid",
      },

      orderStatus: {
        type: "string",
        example: "Processing",
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

  OrderCreatedResponse: {
    type: "object",

    properties: {
      message: {
        type: "string",
        example: "Order created successfully",
      },

      order: {
        $ref: "#/components/schemas/Order",
      },
    },
  },

  PaymentResponse: {
    type: "object",

    properties: {
      message: {
        type: "string",
        example: "Payment successful",
      },

      order: {
        $ref: "#/components/schemas/Order",
      },
    },
  },

  CancelOrderResponse: {
    type: "object",

    properties: {
      message: {
        type: "string",
        example: "Order cancelled successfully",
      },

      order: {
        $ref: "#/components/schemas/Order",
      },
    },
  },
};

export default OrderSchema;
