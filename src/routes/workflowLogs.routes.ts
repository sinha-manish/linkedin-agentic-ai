import { Router } from "express";
const db = require("../../sequelize/models");

const router = Router();

/**
 * GET /workflow/logs?limit=20&offset=0
 */
router.get("/logs", async (req, res) => {
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
