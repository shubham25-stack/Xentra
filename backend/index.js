import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import geminiResponse from "./gemini.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Apply CORS BEFORE routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//  Gemini GET route for quick browser testing
// app.get("/", async (req, res) => {
//   const prompt = req.query.prompt;
//   if (!prompt) {
//     return res.status(400).json({ success: false, message: "Prompt is required" });
//   }

//   try {
//     const data = await geminiResponse(prompt);
//     res.json({ success: true, text: data.text, raw: data.raw });
//   } catch (err) {
//     console.error("Gemini error:", err.message);
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

//gemini response test route


// ✅ Auth & User routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("DB Connection Error:", err);
    process.exit(1);
  }
};

startServer();

// check all the api's and fix all the things then speak function call kro and modify kro...
