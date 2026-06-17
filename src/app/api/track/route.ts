import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pageUrl, referrer, name, email, phone, location } = body;

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "";

    const db = getDb();

    await db.execute(`
      CREATE TABLE IF NOT EXISTS visitors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ip_address VARCHAR(45) NOT NULL,
        user_agent TEXT DEFAULT NULL,
        page_url VARCHAR(500) DEFAULT NULL,
        referrer VARCHAR(500) DEFAULT NULL,
        name VARCHAR(255) DEFAULT NULL,
        email VARCHAR(255) DEFAULT NULL,
        phone VARCHAR(100) DEFAULT NULL,
        location VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    for (const col of [
      ["name", "VARCHAR(255) DEFAULT NULL", "referrer"],
      ["email", "VARCHAR(255) DEFAULT NULL", "name"],
      ["phone", "VARCHAR(100) DEFAULT NULL", "email"],
      ["location", "VARCHAR(255) DEFAULT NULL", "phone"],
    ]) {
      try {
        await db.execute(
          `ALTER TABLE visitors ADD COLUMN ${col[0]} ${col[1]} AFTER ${col[2]}`
        );
      } catch {
        // column already exists — proceed
      }
    }

    await db.execute(
      `INSERT INTO visitors (ip_address, user_agent, page_url, referrer, name, email, phone, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ip,
        userAgent,
        pageUrl || null,
        referrer || null,
        name || null,
        email || null,
        phone || null,
        location || null,
      ]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Track API Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
