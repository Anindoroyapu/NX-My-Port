import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

type VideoRow = {
  id: number;
  title: string;
  video_url: string;
  thumbnail_url: string;
  status: string;
};

export async function GET() {
  try {
    const db = getDb();
    const [rows] = await db.execute(
      `SELECT id, title, video_url, thumbnail_url, status FROM ashalenscraft_videos WHERE status = 'active' ORDER BY id ASC`
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error("Videos GET Error:", err);
    return NextResponse.json({ error: true, message: "Failed to load videos" }, { status: 500 });
  }
}