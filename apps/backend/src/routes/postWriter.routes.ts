// postWriter.route.ts

import { Router } from "express";
import { postWriterAgent } from "../agents/postWriter.agent";

const router = Router();
/**
 * @openapi
 * /api/agent/post/write:
 *   post:
 *     summary: Generate a LinkedIn-style post using AI
 *     tags:
 *       - Agents
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topic:
 *                 type: string
 *               tone:
 *                 type: string
 *               industry:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns an AI-generated post draft
 */
router.post("/write", async (req, res) => {
  try {
    const { topic, tone, industry } = req.body;

    if (!topic) {
      return res.status(400).json({ success: false, error: "Topic is required." });
    }

    const post = await postWriterAgent({ topic, tone, industry });

    res.json({
      success: true,
      provider: "gemini",
      post
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
