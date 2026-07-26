const ProductSchema = {
  Product: {
    type: "object",

    properties: {
      _id: {
        type: "string",
      },

      name: {
        type: "string",
      },

      price: {
        type: "number",
      },

      quantity: {
        type: "integer",
      },

      color: {
        type: "string",
      },

      section: {
        type: "string",
      },

      description: {
        type: "string",
      },

      src: {
        type: "string",
      },

      hoverSrc: {
        type: "string",
      },

      createdAt: {
        type: "string",
        format: "date-time",
      },
    },
  },
};

export default ProductSchema;
