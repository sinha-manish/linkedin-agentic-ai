import { aiGenerate } from "../utils/ai";

export const trendingTopicAgent = async (industry: string, count: number = 10) => {
  try {
    const prompt = `
Generate ${count} trending LinkedIn topics for the **${industry}** industry.

Return ONLY valid JSON (no markdown) in this format:

[
  {
    "topic": "...",
    "why_it_trends": "...",
    "angle": "..."
  }
]
`;

    const raw = await aiGenerate(prompt, "gemini");

    return JSON.parse(raw);

  } catch (err: any) {
    return { error: "Invalid JSON", details: err.message };
  }
};
