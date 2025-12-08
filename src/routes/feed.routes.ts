import { Router } from "express";
import { getForYouFeed } from "../controllers/feed.controller";

const router = Router();
/**
 * @openapi
 * /feed/for-you:
 *   get:
 *     summary: Personalized AI feed ranked using embeddings + user memory + engagement scores
 *     tags:
 *       - Feed
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         required: false
 *       - in: query
 *         name: interest
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns personalized feed
 */

router.get("/for-you", getForYouFeed);

export default router;
