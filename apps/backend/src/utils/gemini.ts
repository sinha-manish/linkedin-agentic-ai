import { GoogleGenerativeAI } from "@google/generative-ai";

const geminiAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// Recommended free-tier model
export const geminiModel = geminiAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});
