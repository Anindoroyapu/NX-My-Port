import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 500, 1000);

    const db = getDb();
    const [rows] = await db.execute(
      `SELECT * FROM visitor_leads ORDER BY created_at DESC LIMIT ${limit}`
    ) as any[];

    return NextResponse.json({ error: 0, data: rows || [] });
  } catch (err) {
    console.error("Admin Visitor Leads API Error:", err);
    return NextResponse.json(
      { error: 1, message: "Internal server error" },
      { status: 500 }
    );
  }
}

