import express from "express";
import path from "path";
import fitbitRoutes from "./routes/fitbit";
import { extractBearerToken } from "./middlewares/token"
import { RequestLogger } from "./middlewares/RequestLogger"

const app = express();

app.use(express.json());
app.use(RequestLogger);

// routes
app.use("/api/fitbit", extractBearerToken, fitbitRoutes);

export default app;

