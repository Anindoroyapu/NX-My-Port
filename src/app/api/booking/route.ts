import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName, email, phone, subject, bookingType, startDate, endDate,
      location, message, package: pkg, paymentMethod, status, paymentStatus,
      bookingCost, totalCost
    } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: 1, message: "fullName and email are required" },
        { status: 400 }
      );
    }

    const db = getDb();

    await db.execute(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fullName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(100) DEFAULT NULL,
        subject VARCHAR(255) DEFAULT NULL,
        bookingType VARCHAR(100) DEFAULT NULL,
        startDate VARCHAR(50) DEFAULT NULL,
        endDate VARCHAR(50) DEFAULT NULL,
        location VARCHAR(255) DEFAULT NULL,
        message TEXT DEFAULT NULL,
        package_name VARCHAR(100) DEFAULT NULL,
        paymentMethod VARCHAR(100) DEFAULT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        paymentStatus VARCHAR(50) DEFAULT 'unpaid',
        bookingCost VARCHAR(50) DEFAULT NULL,
        totalCost VARCHAR(50) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await db.execute(
      `INSERT INTO bookings (fullName, email, phone, subject, bookingType, startDate, endDate, location, message, package_name, paymentMethod, status, paymentStatus, bookingCost, totalCost)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName, email, phone || null, subject || null, bookingType || null,
        startDate || null, endDate || null, location || null, message || null,
        pkg || null, paymentMethod || null, status || 'pending',
        paymentStatus || 'unpaid', bookingCost || null, totalCost || null
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
