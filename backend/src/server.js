import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import componentRoutes from "./routes/componentRoutes.js";
import animationRoutes from "./routes/animationRoutes.js";

import { notFound, errorHandler, } from "./middleware/errorMiddleware.js";

const app = express();

const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((origin) => origin.trim())
  : true;

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FrontForge API is running",
  });
});

app.use("/api/components", componentRoutes);
app.use("/api/animations", animationRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`FrontForge API running on port ${PORT}`);
  });
};

startServer();
