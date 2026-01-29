import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
}));

// JSON & URL-encoded parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Root endpoint
app.get("/", (_req: Request, res: Response) => {
  res.send("SkillBridge API Running 🚀");
});

// Optional: handle favicon to prevent 500
app.get("/favicon.ico", (_req: Request, res: Response) => res.status(204).end());

// API Routes
app.use("/api", routes);

// 404 Handler for unknown routes
app.use((_req: Request, _res: Response, next: NextFunction) => {
  const error = new Error("Route not found");
  (error as any).status = 404;
  next(error);
});

// Global Error Handler
app.use(errorMiddleware);

export default app;
