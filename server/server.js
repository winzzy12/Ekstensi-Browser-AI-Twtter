const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/ai", async (req, res) => {
  const userText = req.body.text;
  const funnyPrompt = `
Buat balasan lucu dan santai untuk tweet berikut ini:
"${userText}"

Balasan harus tetap relevan dan membuat orang senyum 😄.
`;

  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3",
      prompt: funnyPrompt,
      stream: false
    });

    res.json({ reply: response.data.response.trim() });
  } catch (error) {
    console.error("Error contacting LLaMA:", error);
    res.status(500).json({ reply: "😅 Wah, AI-nya lagi bobo kayaknya..." });
  }
});

app.listen(8000, () => {
  console.log("🤖 AI server listening at http://localhost:8000");
});
