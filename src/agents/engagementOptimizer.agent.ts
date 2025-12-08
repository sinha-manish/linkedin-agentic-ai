import { aiGenerate } from "../utils/ai";

export const engagementOptimizerAgent = async (post: string) => {
  const prompt = `
You are a LinkedIn Growth Strategist and Content Optimizer.

Your task:
Analyze the following LinkedIn post and improve it for higher engagement:

POST:
"${post}"

Deliver results in this EXACT JSON format (no markdown, no backticks):

{
  "score": number (1-10),
  "why": "brief explanation of score",
  "improved_post": "enhanced version of the post",
  "variants": [
    "Variant 1",
    "Variant 2",
    "Variant 3"
  ],
  "short_version": "short, punchy version for Twitter",
  "carousel_version": [
    "Slide 1 text",
    "Slide 2 text",
    "Slide 3 text",
    "Slide 4 text"
  ]
}

Rules:
- Improved post should keep the original topic but be clearer, more emotional, more engaging.
- Use strong hooks.
- Use short paragraphs for readability.
- No hashtags.
- No markdown.
  `;

  const raw = await aiGenerate(prompt, "gemini");

  // Clean Gemini output (just in case)
  const cleaned = raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("❌ EngagementOptimizer JSON parse error:", err);
    return { error: "Invalid JSON", raw, cleaned };
  }
};
