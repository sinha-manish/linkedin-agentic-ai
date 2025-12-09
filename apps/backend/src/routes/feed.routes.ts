// feed.route.ts
import { Router } from "express";
import { getForYouFeed } from "../controllers/feed.controller";

const router = Router();
/**
 * @openapi
 * /api/feed/for-you:
 *   get:
 *     summary: Personalized AI feed using embeddings & user memory
 *     tags:
 *       - Feed
 */

router.get("/for-you", getForYouFeed);

export default router;
