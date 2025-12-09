import { getEmbeddings } from "../utils/embeddings";
const db = require("../../sequelize/models");

export const reembedAllPosts = async () => {
  console.log("🔄 Re-embedding all posts...");

  const posts = await db.LinkedInPost.findAll();

  for (const post of posts) {
    try {
      const text = post.content;
      const embedding = await getEmbeddings(text);

      if (!embedding?.vector) {
        console.warn(`Skipping post ${post.id}: embedding failed`);
        continue;
      }

      let vector = embedding.vector;
      if (vector.length < 1536) {
        vector = [...vector, ...Array(1536 - vector.length).fill(0)];
      }

      await post.update({
        embedding_vector: vector,
        embedding: embedding
      });

      console.log(`✅ Updated post ${post.id}`);
    } catch (err) {
      console.error(`❌ Error updating post ${post.id}:`, err);
    }
  }

  console.log("🎉 Re-embedding complete.");
};
