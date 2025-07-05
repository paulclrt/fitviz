import express from "express";
import fitbitRoutes from "./routes/fitbit.js";
import { extractBearerToken } from "./middlewares/token.js";
const app = express();
app.use(express.json());
// routes
app.use("/api/fitbit", extractBearerToken, fitbitRoutes);
export default app;
