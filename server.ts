import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for The Baobab Wisdom Guide (Gemini AI Assistant)
  app.post("/api/wisdom", async (req, res) => {
    try {
      const { query, topic, elderPerspective } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.status(200).json({
          reply: `[Offline Ancestral Archive]: "When spider webs unite, they can tie up a lion." (Ethiopian Proverb)\n\nWe are currently reading from our pre-recorded oral traditions library. To enable live AI-powered wisdom synthesis from our digital Baobab tree, please configure your valid GEMINI_API_KEY in the environment secrets.`,
          isFallback: true
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are "The Baobab Wisdom Guide", an interactive voice of Indigenous African ancestral wisdom, Ubuntu philosophy ("I am because we are"), cosmology, and ecological stewardship for the SUT Africa (Spiritual Unity of the Tribes, Africa) platform.
Your tone is warm, respectful, deeply grounded in nature, and reverent of African elders and traditions across the continent (from the San healers of the Kalahari, to the Maasai Laibons of the Rift Valley, Yoruba Griots, Zulu Sangomas, Dogon astronomers, and Berber nomads).
When answering:
1. Include a relevant authentic African proverb (attributing the tribe or region if known).
2. Connect the topic to spiritual unity, stewardship of the Mother Continent, or ancestral storytelling.
3. Keep the response concise, poetic yet accessible, and structured with clear paragraphs.`;

      const prompt = `Topic focus: ${topic || "General African Indigenous Wisdom"}\nElder perspective style: ${elderPerspective || "Pan-African Consensus"}\nUser question/reflection: "${query}"`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 600,
        }
      });

      res.json({
        reply: response.text || "May the wisdom of our ancestors guide your path on this sacred land.",
        isFallback: false
      });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({
        error: "Failed to consult the digital ancestral archives.",
        details: error.message
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "SUT Africa API" });
  });

  // Vite middleware for development & static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🌍 SUT Africa Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
