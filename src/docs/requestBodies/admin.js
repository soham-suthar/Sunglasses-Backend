const AdminRequestBodies = {
  AddProductRequest: {
    required: true,

    content: {
      "application/json": {
        schema: {
          type: "object",

          required: [
            "name",
            "price",
            "quantity",
            "color",
            "description",
            "section",
            "src",
            "hoverSrc",
          ],

          properties: {
            name: {
              type: "string",
              example: "Ray-Ban Wayfarer",
            },

            price: {
              type: "number",
              example: 4999,
            },

            quantity: {
              type: "integer",
              example: 25,
            },

            color: {
              type: "string",
              example: "Black",
            },

            section: {
              type: "string",
              example: "Men",
            },

            description: {
              type: "string",
              example: "Premium polarized sunglasses.",
            },

            src: {
              type: "string",
              example: "/images/products/rayban-black.webp",
            },

            hoverSrc: {
              type: "string",
              example: "/images/products/rayban-black-hover.webp",
            },
          },
        },
      },
    },
  },

  UpdateProductRequest: {
    required: true,

    content: {
      "application/json": {
        schema: {
          type: "object",

          properties: {
            name: {
              type: "string",
              example: "Ray-Ban Wayfarer",
            },

            price: {
              type: "number",
              example: 4999,
            },

            quantity: {
              type: "integer",
              example: 30,
            },

            color: {
              type: "string",
              example: "Black",
            },

            section: {
              type: "string",
              example: "Men",
            },

            description: {
              type: "string",
              example: "Updated product description.",
            },

            src: {
              type: "string",
              example: "/images/products/rayban-black.webp",
            },

            hoverSrc: {
              type: "string",
              example: "/images/products/rayban-black-hover.webp",
            },
          },
        },
      },
    },
  },

  UpdateUserRequest: {
    required: true,

    content: {
      "application/json": {
        schema: {
          type: "object",

          properties: {
            name: {
              type: "string",
              example: "Soham Suthar",
            },

            role: {
              type: "string",
              enum: ["user", "admin"],
              example: "admin",
            },
          },
        },
      },
    },
  },

  UpdateOrderStatusRequest: {
    required: true,

    content: {
      "application/json": {
        schema: {
          type: "object",

          required: ["orderStatus"],

          properties: {
            orderStatus: {
              type: "string",
              enum: ["Placed", "Processing", "Shipped", "Delivered"],
              example: "Processing",
            },
          },
        },
      },
    },
  },
};

export default AdminRequestBodies;
