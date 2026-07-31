import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import swaggerUi from "swagger-ui-express";

import userRouter from "./src/router/userRouter.js";
import adminRouter from "./src/router/admin/adminRouter.js";
import errorMiddleware from "./src/middleware/error-middleware.js";
import swaggerSpec from "./src/docs/swagger.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

app.use(helmet());

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());
const joinPublic = path.join(import.meta.dirname, "./public/");
app.use("/public", express.static(joinPublic));

app.use("/", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware);

export default app;
