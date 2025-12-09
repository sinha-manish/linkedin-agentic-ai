import { Request, Response } from "express";
import { generateForYouFeed } from "../services/feed.service";

export async function getForYouFeed(req: Request, res: Response) {
  try {
    const userId = req.query.user_id?.toString() || "default_user";
    const interest = req.query.interest?.toString() || "ai future productivity";

    const feed = await generateForYouFeed(userId, interest);

    res.json({ success: true, feed });
  } catch (err: any) {
    console.error("Feed error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
