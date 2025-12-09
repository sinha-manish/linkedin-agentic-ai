// provider.route.ts

import { Router } from "express";
import { setProvider, getProvider } from "../utils/providerManager";

const router = Router();
/**
 * @openapi
 * /api/provider/set:
 *   post:
 *     summary: Change AI provider (openai or gemini)
 *     tags:
 *       - Providers
 *     responses:
 *       200:
 *         description: Provider updated successfully
 */
router.post("/set", (req, res) => {
  try {
    const { provider } = req.body;
    setProvider(provider);
    res.json({ success: true, provider });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});


/**
 * @openapi
 * /api/provider/current:
 *   get:
 *     summary: Get current AI provider
 *     tags:
 *       - Providers
 *     responses:
 *       200:
 *         description: Returns active provider
 */
router.get("/current", (req, res) => {
  res.json({ provider: getProvider() });
});

export default router;
