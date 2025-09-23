import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function initDB() {
  const db = await open({
    filename: "./backend/db/persia.db",
    driver: sqlite3.Database
  });

  // ساخت جداول اولیه
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS company (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      fiscal_start TEXT,
      fiscal_end TEXT,
      fiscal_label TEXT
    );
  `);

  return db;
}
