//search.route.ts
import { Router } from "express";
const db = require("../../sequelize/models");
import { getEmbeddings } from "../utils/embeddings";

const router = Router();
/**
 * @openapi
 * /api/search:
 *   get:
 *     summary: Semantic search using embeddings + pgvector
 *     tags:
 *       - Search
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 */

/**
 * GET /search?query=ai future of work
 */
router.get("/", async (req, res) => {
  try {
    const query = req.query.query as string;
    if (!query) {
      return res.status(400).json({ success: false, error: "query parameter is required" });
    }

    // Generate embeddings for the search query
    const embedding = await getEmbeddings(query);
    if (!embedding?.vector) {
      return res.status(500).json({ success: false, error: "Failed to generate embeddings" });
    }

    // Pad to 1536 dims (same as workflow)
    let vector = embedding.vector;
    if (vector.length < 1536) {
      vector = [...vector, ...Array(1536 - vector.length).fill(0)];
    }

    // Run semantic search using pgvector <-> operator
    const results = await db.sequelize.query(
      `
  SELECT 
    id,
    content,
    engagement_score,
    embedding_vector <-> ARRAY[:...vector]::vector AS distance
  FROM "LinkedInPosts"
  ORDER BY distance ASC
  LIMIT 10;
  `,
      {
        replacements: { vector },
        type: db.Sequelize.QueryTypes.SELECT
      }
    );

    res.json({
      success: true,
      query,
      results
    });
  } catch (err: any) {
    console.error("Semantic search error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
