import { getEmbeddings } from "../utils/embeddings";
import { commentGeneratorAgent } from "../agents/commentGenerator.agent";
import { explainFeedScore } from "../utils/feedExplanation";
import { updateUserMemory } from "./memory.service";

const db = require("../../sequelize/models");

export async function generateForYouFeed(userId: string, interest: string) {

  // 1) User memory or fallback to interest embedding
  const memory = await db.UserMemory.findOne({ where: { user_id: userId } });

  let embedVector;

  if (memory?.interests_vector) {
    embedVector = memory.interests_vector;
  } else {
    const emb = await getEmbeddings(interest);
    embedVector = emb.vector;
  }

  const vectorLiteral = `[${embedVector.join(",")}]`;

  // 2) Query similar posts
  const posts = await db.sequelize.query(
    `
    SELECT *,
      (embedding_vector <-> (:vec)::vector) AS distance
    FROM "LinkedInPosts"
    ORDER BY distance ASC
    LIMIT 20;
    `,
    {
      replacements: { vec: vectorLiteral },
      type: db.Sequelize.QueryTypes.SELECT
    }
  );

  // 3) Enrich posts with comments + explanations
  const enriched = [];

  for (const post of posts) {
    const comments = await commentGeneratorAgent(post.content);
    const explanation = explainFeedScore(post, embedVector);

    enriched.push({
      ...post,
      comments,
      explanation
    });
  }

  return enriched;
}
