const db = require("../../sequelize/models");
import { getEmbeddings } from "../utils/embeddings";

export async function updateUserMemory(userId: string, postContent: string, topic?: string) {
  const embedding = await getEmbeddings(postContent);

  if (!embedding?.vector) return;

  let vector = embedding.vector;
  vector = vector.length < 1536 ? [...vector, ...Array(1536 - vector.length)] : vector;

  let memory = await db.UserMemory.findOne({ where: { user_id: userId } });

  if (!memory) {
    // First time
    memory = await db.UserMemory.create({
      user_id: userId,
      interests_vector: vector,
      topics_history: topic ? [{ topic, count: 1 }] : []
    });
    return memory;
  }

  // Average the embeddings (simple learning)
  const currentVector = memory.interests_vector || Array(1536).fill(0);

  const updatedVector = currentVector.map((v, i) => (v + vector[i]) / 2);

  // Update topics
  let topics = memory.topics_history || [];
  if (topic) {
    const existing = topics.find(t => t.topic === topic);
    if (existing) existing.count++;
    else topics.push({ topic, count: 1 });
  }

  await memory.update({
    interests_vector: updatedVector,
    topics_history: topics,
    last_updated: new Date()
  });

  return memory;
}
