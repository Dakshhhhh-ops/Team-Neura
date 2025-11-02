import mongoose from "mongoose";

const landSchema = new mongoose.Schema({
  wallet_address: { type: String, required: true },
  file_name: { type: String, required: true },
  cid: { type: String, required: true },
  hex_string: { type: String, required: true },
  transaction_hash: { type: String, default: null }, // ✅ NEW
  land_id: { type: String, default: null },          // ✅ NEW
  uploaded_at: { type: Date, default: Date.now },
});

export const Land = mongoose.models.Land || mongoose.model("Land", landSchema);
