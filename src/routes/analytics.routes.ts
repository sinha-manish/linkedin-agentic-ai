// analytics.route.ts
import { Router } from "express";
const db = require("../../sequelize/models");
import { Sequelize } from "sequelize";

const router = Router();

/**
 * @openapi
 * /api/analytics/overview:
 *   get:
 *     summary: Get global analytics (topics, providers, engagement)
 *     tags:
 *       - Analytics
 */
/**
 * GET /analytics/overview
 */
router.get("/overview", async (req, res) => {
  try {
    const avgScore = await db.LinkedInPost.findOne({
      attributes: [[Sequelize.fn("AVG", Sequelize.col("engagement_score")), "avg_engagement"]]
    });

    const totalPosts = await db.LinkedInPost.count();

    const topics = await db.WorkflowLog.findAll({
      attributes: [
        "topic",
        [Sequelize.fn("COUNT", Sequelize.col("topic")), "count"]
      ],
      where: { topic: { [db.Sequelize.Op.ne]: null } },
      group: ["topic"],
      order: [[Sequelize.literal("count"), "DESC"]],
      limit: 10
    });

    const providerUsage = await db.WorkflowLog.findAll({
      attributes: [
        "provider",
        [Sequelize.fn("COUNT", Sequelize.col("provider")), "count"]
      ],
      group: ["provider"]
    });

    const topPosts = await db.LinkedInPost.findAll({
      order: [["engagement_score", "DESC"]],
      limit: 5
    });

    res.json({
      success: true,
      data: {
        totals: { totalPosts },
        avg_engagement: avgScore?.dataValues?.avg_engagement || 0,
        top_topics: topics,
        provider_usage: providerUsage,
        top_performing_posts: topPosts
      }
    });
  } catch (err: any) {
    console.error("Analytics error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
