import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

type VideoRow = {
  id: number;
  title: string;
  video_url: string;
  thumbnail_url: string;
  status: string;
};

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDb();
    const [rows] = await db.execute(
      `SELECT id, title, video_url, thumbnail_url, status, views FROM ashalenscraft_videos WHERE status = 'active' ORDER BY id ASC`
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error("Videos GET Error:", err);
    return NextResponse.json({ error: true, message: "Failed to load videos" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawId = body?.id;
    const id = Number(rawId);

    if (!id || isNaN(id)) {
      return NextResponse.json({ error: true, message: "Missing or invalid video id" }, { status: 400 });
    }

    const db = getDb();
    await db.execute(
      "UPDATE ashalenscraft_videos SET views = COALESCE(views, 0) + 1 WHERE id = ?",
      [id]
    );

    return NextResponse.json({ success: true, message: "View incremented" });
  } catch (err) {
    console.error("Videos POST Error:", err);
    return NextResponse.json({ error: true, message: "Failed to increment view" }, { status: 500 });
  }
}
