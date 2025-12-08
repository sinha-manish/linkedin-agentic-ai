import { aiGenerate } from "./ai";

export async function generateDigestSummary(feed: any[]) {
  const topPosts = feed.slice(0, 5);

  const text = topPosts
    .map((p, i) => `(${i + 1}) ${p.content}`)
    .join("\n\n");

  const prompt = `
Summarize the following LinkedIn-style posts into a clean, engaging daily digest.
Highlight:
- Main themes
- Insights
- Why these posts matter
- 1 actionable takeaway for the reader

Posts:
${text}
`;

  const summary = await aiGenerate(prompt, "gemini");

  return summary;
}
