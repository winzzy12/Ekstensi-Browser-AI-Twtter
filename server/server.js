const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const GEMINI_API_KEY = "ISI_API_KEY_KAMU"; // Ganti dengan milikmu

app.post("/ai", async (req, res) => {
  const userText = req.body.text;

  const funnyPrompt = `
Write a funny, casual and clever reply to this tweet:
"${userText}"

Keep it short, witty, and in English. Add emojis if appropriate.
`;

  try {
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: funnyPrompt
              }
            ]
          }
        ]
      }
    );

    const reply =
      geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Oops, no reply generated 😅";

    res.json({ reply: reply.trim() });
  } catch (err) {
    console.error("Gemini Error:", err?.response?.data || err.message);
    res.status(500).json({ reply: "Error getting reply from Gemini 😓" });
  }
});

app.listen(8000, () => {
  console.log("⚡ Gemini AI Server running on http://localhost:8000");
});
