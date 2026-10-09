import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, subject, message } = body ?? {};

    const cleanFullName = typeof fullName === "string" ? fullName.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const cleanMessage = typeof message === "string" ? message.trim() : "";

    if (!cleanFullName || !cleanEmail || !cleanMessage) {
      return NextResponse.json(
        { error: "fullName, email, and message are required" },
        { status: 400 }
      );
    }

    const db = getDb();

    await db.execute(
      `INSERT INTO contacts (fullName, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)`,
      [
        cleanFullName,
        cleanEmail,
        phone ? String(phone).trim() : null,
        subject ? String(subject).trim() : null,
        cleanMessage
      ]
    );

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Contact API Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

