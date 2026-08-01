import swaggerJsdoc from "swagger-jsdoc";
import ProductSchema from "./schemas/product.js";
import UserSchema from "./schemas/user.js";
import CartSchema from "./schemas/cart.js";
import OrderSchema from "./schemas/order.js";
import PaginationSchema from "./schemas/pagination.js";
import AuthRequestBodies from "./requestBodies/auth.js";
import CommonResponses from "./responses/common.js";
import CommonParameters from "./parameters/common.js";
import AdminRequestBodies from "./requestBodies/admin.js";
import CartRequestBodies from "./requestBodies/cart.js";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "E-commerce Backend API",
      version: "1.1.0",
      description:
        "RESTful API for an e-commerce platform supporting authentication, product browsing, shopping cart, order management, and administrative operations.",

      contact: {
        name: "Soham Suthar",
        url: "https://github.com/Soham-Suthar",
        email: "sohamnishithsutharrr@gmail.com",
      },
      externalDocs: {
        description: "GitHub Repository",
        url: "https://github.com/Soham-Suthar/Sunglasses-Backend",
      },
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Development Server",
      },
      {
        url: "https://sungalsses-backend.onrender.com",
        description: "Production Server",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "refreshToken",
        },
      },

      schemas: {
        ...ProductSchema,
        ...UserSchema,
        ...CartSchema,
        ...OrderSchema,
        ...PaginationSchema,
      },
      requestBodies: {
        ...AuthRequestBodies,
        ...AdminRequestBodies,
        ...CartRequestBodies,
      },
      responses: {
        ...CommonResponses,
      },
      parameters: {
        ...CommonParameters,
      },
    },

    tags: [
      {
        name: "Authentication",
        description: "User registration and login",
      },
      {
        name: "Products",
        description: "Product browsing and searching",
      },
      {
        name: "Cart",
        description: "Shopping cart operations",
      },
      {
        name: "Orders",
        description: "Checkout and order management",
      },
      {
        name: "Payments",
        description: "Payment processing",
      },
      {
        name: "Invoices",
        description: "Invoice generation",
      },
      {
        name: "Admin",
        description: "Admin operations",
      },
    ],

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/docs/paths/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
