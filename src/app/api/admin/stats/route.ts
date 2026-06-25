import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();

    const [bookingRows] = await db.execute(
      "SELECT COUNT(*) as count, COALESCE(SUM(CAST(REPLACE(totalCost, '$', '') AS DECIMAL(10,2))), 0) as revenue FROM bookings"
    ) as any[];
    const [contactRows] = await db.execute(
      "SELECT COUNT(*) as count FROM contacts"
    ) as any[];
    const [visitorRows] = await db.execute(
      "SELECT COUNT(*) as count FROM visitors"
    ) as any[];
    const [leadRows] = await db.execute(
      "SELECT COUNT(*) as count FROM visitor_leads"
    ) as any[];

    const [recentBookings] = await db.execute(
      "SELECT id, fullName, email, bookingType, status, created_at FROM bookings ORDER BY created_at DESC LIMIT 5"
    ) as any[];
    const [recentContacts] = await db.execute(
      "SELECT id, fullName, email, subject, created_at FROM contacts ORDER BY created_at DESC LIMIT 5"
    ) as any[];

    return NextResponse.json({
      error: 0,
      data: {
        stats: {
          totalBookings: bookingRows[0]?.count || 0,
          totalRevenue: bookingRows[0]?.revenue || 0,
          totalContacts: contactRows[0]?.count || 0,
          totalVisitors: visitorRows[0]?.count || 0,
          totalLeads: leadRows[0]?.count || 0,
        },
        recentBookings: recentBookings || [],
        recentContacts: recentContacts || [],
      },
    });
  } catch (err) {
    console.error("Admin Stats API Error:", err);
    return NextResponse.json(
      { error: 1, message: "Internal server error" },
      { status: 500 }
    );
  }
}
