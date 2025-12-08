// workflow.route.ts

import { Router } from "express";
import { generatePostWorkflow } from "../workflows/generatePost.workflow";

const router = Router();
/**
 * @openapi
 * /api/workflow/generate-post:
 *   post:
 *     summary: Full post-generation workflow (topic → write → optimize → embed → save)
 *     tags:
 *       - Workflows
 *     responses:
 *       200:
 *         description: Workflow executed successfully
 */

/**
 * POST /workflow/generate-post
 * Body:
 * {
 *   "industry": "ai",
 *   "tone": "motivational",
 *   "provider": "gemini",   // optional per-request override
 *   "save": true           // defaults to true
 * }
 */
router.post("/generate-post", async (req, res) => {
  try {
    const { industry, tone, provider, save } = req.body || {};
    const result = await generatePostWorkflow({
      industry,
      tone,
      provider,
      save: typeof save === "boolean" ? save : true
    });

    if (!result.success) {
      return res.status(500).json(result);
    }

    res.json(result);
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || String(err) });
  }
});

export default router;
