// workflowLogs.routes.ts

import { Router } from "express";
const db = require("../../sequelize/models");

const router = Router();
/**
 * @openapi
 * /api/workflow/logs:
 *   get:
 *     summary: Fetch workflow execution logs
 *     tags:
 *       - Workflows
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns workflow logs
 */
/**
 * GET /workflow/logs?limit=20&offset=0
 */
router.get("/", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 200);
    const offset = Number(req.query.offset) || 0;

    const logs = await db.WorkflowLog.findAll({
      order: [["created_at", "DESC"]],
      limit,
      offset
    });

    res.json({ success: true, logs });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
