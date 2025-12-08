import { Router } from "express";
const db = require("../../sequelize/models");

const router = Router();

/**
 * GET /posts
 * Query:
 *   ?limit=20&offset=0
 */
router.get("/", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const offset = Number(req.query.offset) || 0;

    const posts = await db.LinkedInPost.findAll({
      order: [["created_at", "DESC"]],
      limit,
      offset,
      attributes: ["id", "content", "engagement_score", "created_at"]
    });

    res.json({ success: true, posts });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /posts/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const post = await db.LinkedInPost.findByPk(id);
    if (!post) return res.status(404).json({ success: false, error: "Not found" });
    res.json({ success: true, post });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
