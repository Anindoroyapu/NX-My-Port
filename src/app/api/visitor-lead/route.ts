import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, contact } = body ?? {};

    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanContact = typeof contact === "string" ? contact.trim() : "";

    const db = getDb();

    await db.execute(
      `INSERT INTO visitor_leads (name, contact) VALUES (?, ?)`,
      [cleanName, cleanContact]
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


