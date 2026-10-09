import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDb();

    // Execute all 6 stats queries in parallel
    const [
      [bookingRows],
      [contactRows],
      [visitorRows],
      [leadRows],
      [recentBookings],
      [recentContacts],
    ] = await Promise.all([
      db.execute("SELECT COUNT(*) as count, COALESCE(SUM(CAST(REPLACE(totalCost, '$', '') AS DECIMAL(10,2))), 0) as revenue FROM bookings") as Promise<[any[], any]>,
      db.execute("SELECT COUNT(*) as count FROM contacts") as Promise<[any[], any]>,
      db.execute("SELECT COUNT(*) as count FROM visitors") as Promise<[any[], any]>,
      db.execute("SELECT COUNT(*) as count FROM visitor_leads") as Promise<[any[], any]>,
      db.execute("SELECT id, fullName, email, bookingType, status, created_at FROM bookings ORDER BY created_at DESC LIMIT 5") as Promise<[any[], any]>,
      db.execute("SELECT id, fullName, email, subject, created_at FROM contacts ORDER BY created_at DESC LIMIT 5") as Promise<[any[], any]>,
    ]);

    return NextResponse.json({
      error: 0,
      data: {
        stats: {
          totalBookings: (bookingRows as any[])[0]?.count || 0,
          totalRevenue: (bookingRows as any[])[0]?.revenue || 0,
          totalContacts: (contactRows as any[])[0]?.count || 0,
          totalVisitors: (visitorRows as any[])[0]?.count || 0,
          totalLeads: (leadRows as any[])[0]?.count || 0,
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

