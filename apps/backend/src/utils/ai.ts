import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getProvider } from "./providerManager";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Initialize Google Gemini client
const geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// Use correct model name
const gemini = geminiAI.getGenerativeModel({
  model: "gemini-2.5-flash"   // FREE, FAST, and AVAILABLE
});

/**
 * Clean Gemini output by removing markdown wrappers.
 */
const cleanGeminiOutput = (text: string) => {
  if (!text) return text;
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .replace(/^\s*Here is the JSON[:\s]*/i, "")
    .replace(/^\s*JSON[:\s]*/i, "")
    .trim();
};

export const aiGenerate = async (prompt: string, overrideProvider?: string) => {
  const provider = overrideProvider || getProvider();

  if (provider === "openai") {
    const response = await openai.responses.create({
      model: "gpt-4.1",
      input: prompt,
      max_output_tokens: 1500
    });
    return response.output_text;
  }

  if (provider === "gemini") {
    const result = await gemini.generateContent(prompt);
    const text = result.response.text();
    return cleanGeminiOutput(text);
  }

  throw new Error("Invalid provider selected");
};
