import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getProvider } from "./providerManager"; // provider selector

const openaiKey = process.env.OPENAI_API_KEY;
const geminiKey = process.env.GEMINI_API_KEY;

// PGVECTOR COLUMN = vector(1536)
const TARGET_DIMS = 1536;

function padVector(vec: number[]) {
  if (vec.length >= TARGET_DIMS) return vec.slice(0, TARGET_DIMS);
  return [...vec, ...Array(TARGET_DIMS - vec.length).fill(0)];
}

export const getEmbeddings = async (
  text: string,
  overrideProvider?: "openai" | "gemini"
) => {
  if (!text) return null;

  const provider = overrideProvider || getProvider();

  // --------------------------------------------------------
  // ⭐ 1) OPENAI EMBEDDINGS
  // --------------------------------------------------------
  if (provider === "openai" && openaiKey) {
    try {
      const client = new OpenAI({ apiKey: openaiKey });

      const resp = await client.embeddings.create({
        model: "text-embedding-3-small", // 1536 dims
        input: text
      });

      const vector = resp.data[0].embedding;

      return {
        provider: "openai",
        vector,          // already 1536 dims
        dims: vector.length
      };
    } catch (err) {
      console.error("OpenAI embeddings failed:", err);
      console.log("⚠ Switching to Gemini fallback...");
    }
  }

  // --------------------------------------------------------
  // ⭐ 2) GEMINI EMBEDDINGS (fallback or provider = gemini)
  // --------------------------------------------------------
  if (geminiKey) {
    try {
      const gen = new GoogleGenerativeAI(geminiKey);
      const model = gen.getGenerativeModel({
        model: "models/text-embedding-004"
      });

      const result = await model.embedContent(text);
      let vector = result.embedding.values;  // 768 dims typically

      vector = padVector(vector); // pad → 1536 dims

      return {
        provider: "gemini",
        vector,
        dims: vector.length
      };
    } catch (err) {
      console.error("Gemini embeddings failed:", err);
    }
  }

  console.warn("⚠ No embedding provider available or both failed.");
  return null;
};
