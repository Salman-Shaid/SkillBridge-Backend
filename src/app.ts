import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();

app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


app.get("/", (_req: Request, res: Response) => {
  res.send("SkillBridge API Running ");
});

app.get("/favicon.ico", (_req: Request, res: Response) => res.status(204).end());

app.use("/api", routes);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  const error = new Error("Route not found");
  (error as any).status = 404;
  next(error);
});

// Global Error Handler
app.use(errorMiddleware);

export default app;
