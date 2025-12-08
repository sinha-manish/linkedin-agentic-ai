import { Router } from "express";
import { sendDailyDigestToAllUsers } from "../services/dailyDigest.service";

const router = Router();
/**
 * @openapi
 * /digest/send:
 *   get:
 *     summary: Manually trigger sending daily digests to all users
 *     tags:
 *       - Digest
 *     responses:
 *       200:
 *         description: Digest sent
 */

router.get("/send", async (req, res) => {
  await sendDailyDigestToAllUsers();
  res.json({ success: true, message: "Digest sent manually" });
});

export default router;
