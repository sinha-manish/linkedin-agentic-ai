import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { sequelize } from "./db/index";
import agentRoutes from "./routes/agent.routes";
import providerRoutes from "./routes/provider.routes";
import postWriterRoutes from "./routes/postWriter.routes";
import optimizerRoutes from "./routes/optimizer.routes";
import workflowRoutes from "./routes/workflow.routes";
import postsRoutes from "./routes/posts.routes";
import workflowLogsRoutes from "./routes/workflowLogs.routes";
import searchRoutes from "./routes/search.routes";
import analyticsRoutes from "./routes/analytics.routes";
import feedRoutes from "./routes/feed.routes";
import "./cron/dailyDigest.cron"; // load cron jobs
import digestRoutes from "./routes/digest.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swagger";

dotenv.config();

// Validate env variables
["DB_HOST", "DB_USER", "DB_PASS", "DB_NAME", "OPENAI_API_KEY"].forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing environment variable: ${key}`);
    process.exit(1);
  }
});

const app = express();

// --------------------------
// SECURITY MIDDLEWARE
// --------------------------
app.use(helmet()); // secure headers

const allowedOrigins = [
  "http://localhost:3000",
  "https://yourdomain.com"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  }
}));

// Rate limiting (to avoid spam / attacks)
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 min
    max: 100,                // limit per IP
    message: { error: "Too many requests, try again later." }
  })
);

app.use(express.json({ limit: "2mb" }));

// --------------------------
// ROUTES
// --------------------------

app.get("/", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "LinkedIn Agentic AI Backend Running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/agent", agentRoutes);
app.use("/api/provider", providerRoutes);
app.use("/api/agent/post", postWriterRoutes);
app.use("/api/agent/optimize", optimizerRoutes);
app.use("/api/workflow", workflowRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/workflow", workflowLogsRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/digest", digestRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --------------------------
// ERROR HANDLER
// --------------------------
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({
    error: "Internal Server Error",
    details: err.message,
  });
});

// --------------------------
// START SERVER WITH DB CHECK
// --------------------------

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  }
};

startServer();

// --------------------------
// GRACEFUL SHUTDOWN
// --------------------------
process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received. Shutting down...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 SIGINT received. Shutting down...");
  process.exit(0);
});
