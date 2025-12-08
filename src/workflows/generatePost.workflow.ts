import { trendingTopicAgent } from "../agents/trendingTopic.agent";
import { postWriterAgent } from "../agents/postWriter.agent";
import { engagementOptimizerAgent } from "../agents/engagementOptimizer.agent";
const db = require("../../sequelize/models");
import { getProvider } from "../utils/providerManager";
import { getEmbeddings } from "../utils/embeddings";

export const generatePostWorkflow = async (opts: {
  industry?: string;
  tone?: string;
  provider?: string;
  save?: boolean;
}) => {
  const start = Date.now();
  const provider = opts.provider || getProvider();
  const workflowName = "generatePostWorkflow";

  // Create workflow log entry
  let log: any = null;
  try {
    log = await db.WorkflowLog.create({
      workflow_name: workflowName,
      status: "started",
      provider,
      topic: null,
      post_id: null,
      error: null,
      duration_ms: null,
      meta: { industry: opts.industry || "general" }
    });
  } catch (err) {
    console.error("Failed to create workflow log:", err);
  }

  try {
    const industry = opts.industry || "general";
    const tone = opts.tone || "human, storytelling";
    const save = opts.save ?? true;

    // -----------------------------------------
    // 1) Get trending topics
    // -----------------------------------------
    const topicsResult = await trendingTopicAgent(industry);

    if (!Array.isArray(topicsResult)) {
      throw new Error(
        "TrendingTopicAgent returned invalid result: " +
          JSON.stringify(topicsResult)
      );
    }

    const firstTopic = topicsResult[0];
    if (!firstTopic?.topic) {
      throw new Error("No topic found from TrendingTopicAgent");
    }

    const topicText = firstTopic.topic;

    // Update workflow log with topic
    if (log) {
      try {
        await log.update({ topic: topicText });
      } catch (e) {}
    }

    // -----------------------------------------
    // 2) Draft the post
    // -----------------------------------------
    const draftPost = await postWriterAgent({
      topic: topicText,
      tone,
      industry
    });

    // -----------------------------------------
    // 3) Optimize post
    // -----------------------------------------
    const optimized = await engagementOptimizerAgent(draftPost);

    const finalPostText =
      optimized?.improved_post?.trim() || draftPost.trim();

    // -----------------------------------------
    // 4) Generate embeddings
    // -----------------------------------------
    let embedding: any = null;
    try {
      embedding = await getEmbeddings(finalPostText);
    } catch (err) {
      console.warn("Embedding generation failed:", err);
    }

    // -----------------------------------------
    // 5) Save to DB (includes vector padding)
    // -----------------------------------------
    let savedRecord: any = null;

    if (save) {
      // Prepare save payload
      const baseData: any = {
        content: finalPostText,
        engagement_score: optimized?.score ?? null,
        embedding // JSON metadata
      };

      // If vector exists → pad → store in embedding_vector
      if (embedding?.vector) {
        let vector = embedding.vector;

        // pgvector requires fixed-length vector(1536)
        if (vector.length < 1536) {
          vector = [...vector, ...Array(1536 - vector.length).fill(0)];
        }

        baseData.embedding_vector = vector;
      }

      try {
        savedRecord = await db.LinkedInPost.create(baseData);
      } catch (err) {
        console.error("DB save error:", err);
      }
    }

    // -----------------------------------------
    // 6) Update workflow log as success
    // -----------------------------------------
    const duration = Date.now() - start;

    if (log) {
      try {
        await log.update({
          status: "success",
          post_id: savedRecord ? savedRecord.id : null,
          duration_ms: duration,
          meta: {
            topics_count: topicsResult.length,
            embedding_provider: embedding?.provider || null
          }
        });
      } catch (e) {}
    }

    return {
      success: true,
      meta: {
        industry,
        topic: topicText,
        saved: !!savedRecord,
        postId: savedRecord?.id ?? null
      },
      topic: firstTopic,
      draft: draftPost,
      optimized,
      final: finalPostText,
      raw_topics: topicsResult
    };
  } catch (err: any) {
    const duration = Date.now() - start;

    console.error("generatePostWorkflow error:", err);

    if (log) {
      try {
        await log.update({
          status: "failed",
          error: err.message || String(err),
          duration_ms: duration
        });
      } catch (e) {}
    }

    return { success: false, error: err.message || String(err) };
  }
};
