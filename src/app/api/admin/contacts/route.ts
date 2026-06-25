import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();

    const [rows] = await db.execute(
      "SELECT * FROM contacts ORDER BY created_at DESC"
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
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 1, message: "id is required" },
        { status: 400 }
      );
    }

    const db = getDb();
    await db.execute("DELETE FROM contacts WHERE id = ?", [id]);

    return NextResponse.json({ error: 0, message: "Contact deleted" });
  } catch (err) {
    console.error("Admin Contacts DELETE Error:", err);
    return NextResponse.json(
      { error: 1, message: "Internal server error" },
      { status: 500 }
    );
  }
}
