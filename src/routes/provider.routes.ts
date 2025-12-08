import { Router } from "express";
import { setProvider, getProvider } from "../utils/providerManager";

const router = Router();

router.post("/set", (req, res) => {
  try {
    const { provider } = req.body;
    setProvider(provider);
    res.json({ success: true, provider });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

router.get("/current", (req, res) => {
  res.json({ provider: getProvider() });
});

export default router;
