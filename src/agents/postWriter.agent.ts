import { aiGenerate } from "../utils/ai";

interface PostWriterOptions {
  topic: string;
  tone?: string;
  industry?: string;
}

export const postWriterAgent = async (opts: PostWriterOptions) => {
  const tone = opts.tone || "human, storytelling, conversational";
  const industry = opts.industry || "general professionals";

  const prompt = `
Write a high-performing LinkedIn post.

Topic: "${opts.topic}"
Tone: ${tone}
Target Audience: ${industry}

Rules:
- START with a strong hook (one line, attention-grabbing)
- Use short paragraphs + whitespace for readability
- Write in a natural human voice (no robotic phrasing)
- Add a personal perspective or relatable insight
- Add emotional depth or a micro-story
- Provide one actionable takeaway
- End with a CTA that boosts engagement (question or prompt)
- No hashtags, no emojis unless it enhances clarity

Return ONLY the final LinkedIn post. Do NOT include markdown or explanations.
`;

  const output = await aiGenerate(prompt, "gemini");
  return output.trim();
};
