import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName, email, phone, subject, bookingType, startDate, endDate,
      location, message, package: pkg, paymentMethod, status, paymentStatus,
      bookingCost, totalCost
    } = body ?? {};

    const cleanFullName = typeof fullName === "string" ? fullName.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim() : "";

    if (!cleanFullName || !cleanEmail) {
      return NextResponse.json(
        { error: 1, message: "fullName and email are required" },
        { status: 400 }
      );
    }

    const db = getDb();

    await db.execute(
      `INSERT INTO bookings (fullName, email, phone, subject, bookingType, startDate, endDate, location, message, package_name, paymentMethod, status, paymentStatus, bookingCost, totalCost)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        cleanFullName,
        cleanEmail,
        phone ? String(phone).trim() : null,
        subject ? String(subject).trim() : null,
        bookingType ? String(bookingType).trim() : null,
        startDate ? String(startDate).trim() : null,
        endDate ? String(endDate).trim() : null,
        location ? String(location).trim() : null,
        message ? String(message).trim() : null,
        pkg ? String(pkg).trim() : null,
        paymentMethod ? String(paymentMethod).trim() : null,
        status ? String(status).trim() : "pending",
        paymentStatus ? String(paymentStatus).trim() : "unpaid",
        bookingCost ? String(bookingCost).trim() : null,
        totalCost ? String(totalCost).trim() : null
      ]
    );

    return NextResponse.json({ error: 0, message: "Booking created successfully" });
  } catch (err) {
    console.error("Booking API Error:", err);
    return NextResponse.json(
      { error: 1, message: "Internal server error" },
      { status: 500 }
    );
  }
}

