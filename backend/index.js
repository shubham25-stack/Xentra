import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRouter);

// Start server only after DB connects
const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    console.error("❌ MongoDB connection error details:", error.message); // Log the error message
    console.error("❌ MongoDB connection error stack:", error.stack);   // Log the stack trace
    process.exit(1);
  }
};

startServer();
