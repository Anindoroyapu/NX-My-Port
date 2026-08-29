import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

type VideoRow = {
  id: number;
  title: string;
  link: string;
  active: number;
};

export async function GET() {
  try {
    const db = getDb();
    const [rows] = await db.execute(
      `SELECT id, title, link, active FROM videos WHERE active = 1 ORDER BY id ASC`
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error("Videos GET Error:", err);
    return NextResponse.json({ error: true, message: "Failed to load videos" }, { status: 500 });
  }
}