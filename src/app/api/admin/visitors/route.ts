import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();

    const [rows] = await db.execute(
      "SELECT * FROM visitors ORDER BY created_at DESC"
    ) as any[];

    return NextResponse.json({ error: 0, data: rows || [] });
  } catch (err) {
    console.error("Admin Visitors API Error:", err);
    return NextResponse.json(
      { error: 1, message: "Internal server error" },
      { status: 500 }
    );
  }
}
