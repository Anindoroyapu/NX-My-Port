import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, contact } = body;

    if (!name || !contact) {
      return NextResponse.json(
        { error: 1, message: "Name and contact are required" },
        { status: 400 }
      );
    }

    const db = getDb();

    await db.execute(`
      CREATE TABLE IF NOT EXISTS visitor_leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        contact VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await db.execute(
      `INSERT INTO visitor_leads (name, contact) VALUES (?, ?)`,
      [name, contact]
    );

    return NextResponse.json({ error: 0, message: "Lead saved successfully" });
  } catch (err) {
    console.error("Visitor Lead API Error:", err);
    return NextResponse.json(
      { error: 1, message: "Internal server error" },
      { status: 500 }
    );
  }
}
