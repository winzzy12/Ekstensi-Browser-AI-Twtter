const fs = require("fs");
const https = require("https");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 443;
const GEMINI_API_KEY = "API-KEY"; // 🔑 Ganti dengan API key kamu

// 🔧 Middleware
app.use(cors());
app.use(express.json());

// 🧠 Endpoint AI
app.post("/reply", async (req, res) => {
  const userText = req.body.tweet;
  console.log("🚀 Incoming tweet:", userText);

  const prompt = `
Write a funny, clever, short, and casual reply to this tweet:
"${userText}"

Use humor, add emojis if appropriate, and sound like a cool internet person.
`;

  try {
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const reply =
      geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Oops, no reply generated 😅";

    console.log("✅ Generated reply:", reply);
    res.json({ reply });
  } catch (error) {
    console.error(
      "❌ Gemini API error:",
      error?.response?.data || error.message
    );
    res.status(500).json({ reply: "😓 Failed to generate reply" });
  }
});

// 🔐 Load HTTPS certs
const httpsOptions = {
  key: fs.readFileSync(
    "/etc/letsencrypt/live/159-223-37-124.nip.io/privkey.pem"
  ),
  cert: fs.readFileSync(
    "/etc/letsencrypt/live/159-223-37-124.nip.io/fullchain.pem"
  ),
};

// 🚀 Run HTTPS server
https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`✅ HTTPS server is running at https://159-223-37-124.nip.io`);
});
