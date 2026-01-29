import express from "express";
import cors from "cors";
import routes from "./routes";
import errorMiddleware from "./middlewares/error.middleware";
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (_req, res) => {
    res.send("SkillBridge API Running 🚀");
});
app.use("/api", routes);
// Global Error Handler
app.use(errorMiddleware);
export default app;
