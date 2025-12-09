import { aiGenerate } from "../utils/ai";

export async function commentGeneratorAgent(postText: string) {
  const prompt = `
You are a professional LinkedIn commenter. 
Write 3 comment variations for this post:

Post:
"${postText}"

1. Short supportive comment (10-20 words)
2. Insightful longer comment (40-60 words)
3. Engagement-boost comment (include 1 question)
`;

  const response = await aiGenerate(prompt);

  return response;
}
