import express from "express";
import { Land } from "../models/Land.js";

const router = express.Router();

// ✅ Get all lands by wallet
router.get("/:address", async (req, res) => {
  try {
    const lands = await Land.find({ wallet_address: req.params.address });
    res.json(lands);
  } catch (err) {
    console.error("Fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch lands" });
  }
});

// ✅ Create or update land (optionally with tx hash)
router.post("/", async (req, res) => {
  try {
    const { wallet_address, file_name, cid, hex_string, transaction_hash, land_id } = req.body;
    const land = new Land({ wallet_address, file_name, cid, hex_string, transaction_hash, land_id });
    await land.save();
    res.json({ success: true, message: "Land saved successfully!" });
  } catch (err) {
    console.error("Insert error:", err.message);
    res.status(500).json({ error: "Failed to save land" });
  }
});

export default router;
