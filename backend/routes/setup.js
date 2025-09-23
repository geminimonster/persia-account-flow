import express from "express";
import { initDB } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { companyName, fiscalYear, admin } = req.body;
    const db = await initDB();

    await db.run(
      "INSERT INTO company (name, fiscal_start, fiscal_end, fiscal_label) VALUES (?, ?, ?, ?)",
      [companyName, fiscalYear.start, fiscalYear.end, fiscalYear.label]
    );

    await db.run(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [admin.username, admin.password] // بعداً هش می‌کنیم
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
