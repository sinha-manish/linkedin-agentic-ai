//optimizer.route.ts
import { Router } from "express";
import { engagementOptimizerAgent } from "../agents/engagementOptimizer.agent";

const router = Router();
/**
 * @openapi
 * /api/agent/optimize/:
 *   post:
 *     summary: Optimize a LinkedIn post for maximum engagement
 *     tags:
 *       - Agents
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns optimized post with score
 */

router.post("/", async (req, res) => {
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
