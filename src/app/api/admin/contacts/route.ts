import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 500, 1000);

    const db = getDb();
    const [rows] = await db.execute(
      `SELECT * FROM contacts ORDER BY created_at DESC LIMIT ${limit}`
    ) as any[];

    return NextResponse.json({ error: 0, data: rows || [] });
  } catch (err) {
    console.error("Admin Contacts API Error:", err);
    return NextResponse.json(
      { error: 1, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { id } = body ?? {};

    if (!id) {
      return NextResponse.json(
        { error: 1, message: "id is required" },
        { status: 400 }
      );
    }

    const db = getDb();
    await db.execute("DELETE FROM contacts WHERE id = ?", [Number(id)]);

    return NextResponse.json({ error: 0, message: "Contact deleted" });
  } catch (err) {
    console.error("Admin Contacts DELETE Error:", err);
    return NextResponse.json(
      { error: 1, message: "Internal server error" },
      { status: 500 }
    );
  }
}

