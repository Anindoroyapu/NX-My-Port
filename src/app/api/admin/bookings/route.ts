import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 500, 1000);

    const db = getDb();
    const [rows] = await db.execute(
      `SELECT * FROM bookings ORDER BY created_at DESC LIMIT ${limit}`
    ) as any[];

    return NextResponse.json({ error: 0, data: rows || [] });
  } catch (err) {
    console.error("Admin Bookings API Error:", err);
    return NextResponse.json(
      { error: 1, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { id, status } = body ?? {};

    if (!id || !status) {
      return NextResponse.json(
        { error: 1, message: "id and status are required" },
        { status: 400 }
      );
    }

    const db = getDb();
    await db.execute("UPDATE bookings SET status = ? WHERE id = ?", [String(status).trim(), Number(id)]);

    return NextResponse.json({ error: 0, message: "Booking updated" });
  } catch (err) {
    console.error("Admin Bookings PATCH Error:", err);
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
    await db.execute("DELETE FROM bookings WHERE id = ?", [Number(id)]);

    return NextResponse.json({ error: 0, message: "Booking deleted" });
  } catch (err) {
    console.error("Admin Bookings DELETE Error:", err);
    return NextResponse.json(
      { error: 1, message: "Internal server error" },
      { status: 500 }
    );
  }
}

