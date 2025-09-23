import express from "express";
import { initDB } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = await initDB();

    const user = await db.get(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    if (user) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "نام کاربری یا رمز عبور اشتباه است" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
