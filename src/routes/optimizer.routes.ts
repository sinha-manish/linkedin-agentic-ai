import { Router } from "express";
import { engagementOptimizerAgent } from "../agents/engagementOptimizer.agent";

const router = Router();
/**
 * @openapi
 * /agent/post/write:
 *   post:
 *     summary: Generate a LinkedIn-style post based on a topic + tone
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
 *         description: Returns AI-generated post
 */

router.post("/optimize", async (req, res) => {
  try {
    const { post } = req.body;

    if (!post) {
      return res.status(400).json({ success: false, error: "Post is required." });
    }

    const result = await engagementOptimizerAgent(post);

    res.json({
      success: true,
      provider: "gemini",
      data: result
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
