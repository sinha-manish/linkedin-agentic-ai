import { Router } from "express";
import { postWriterAgent } from "../agents/postWriter.agent";

const router = Router();

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
