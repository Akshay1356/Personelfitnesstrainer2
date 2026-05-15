import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Check if API key loaded
console.log(
  "Gemini API Key Loaded:",
  process.env.GEMINI_API_KEY ? "YES" : "NO"
);

// Gemini setup
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    console.log("Incoming Request:", req.body);

    const { message } = req.body;

    // Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
    });

    // Fitness coach prompt
    const prompt = `
You are a professional AI fitness coach.

Help users with:
- fat loss
- muscle gain
- workouts
- nutrition
- beginner fitness
- calorie advice
- gym routines

User question:
${message}
`;

    // Generate AI content
    const result = await model.generateContent(prompt);

    const response = await result.response;

    const text = response.text();

    console.log("AI RESPONSE:", text);

    // Send response
    res.json({
      reply: text,
    });

  } catch (error) {
    console.error("FULL GEMINI ERROR:", error);

    // Rate limit
    if (error.status === 429) {
      return res.status(429).json({
        reply:
          "Gemini free-tier limit reached. Please wait 30-60 seconds and try again.",
      });
    }

    // Invalid API key
    if (error.status === 401) {
      return res.status(401).json({
        reply: "Invalid Gemini API key.",
      });
    }

    // Model error
    if (error.status === 404) {
      return res.status(404).json({
        reply: "Gemini model unavailable.",
      });
    }

    // Generic error
    res.status(500).json({
      reply: "AI server error.",
    });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Gemini server running on http://localhost:5000");
});