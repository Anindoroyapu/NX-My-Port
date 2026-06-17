import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

async function getLocationFromIP(ip: string): Promise<string | null> {
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=city,country`, {
      signal: AbortSignal.timeout(3000),
    });
    const data = await res.json();
    if (data.status === "success") {
      return [data.city, data.country].filter(Boolean).join(", ") || null;
    }
  } catch {
    // geolocation failed — proceed
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pageUrl, referrer, language, timezone, screen, platform } = body;

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "";

    const [location, browserLang] = await Promise.all([
      ip && ip !== "127.0.0.1" ? getLocationFromIP(ip) : Promise.resolve(null),
      Promise.resolve(language || null),
    ]);

    const db = getDb();

    await db.execute(`
      CREATE TABLE IF NOT EXISTS visitors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ip_address VARCHAR(45) NOT NULL,
        user_agent TEXT DEFAULT NULL,
        page_url VARCHAR(500) DEFAULT NULL,
        referrer VARCHAR(500) DEFAULT NULL,
        location VARCHAR(255) DEFAULT NULL,
        browser_language VARCHAR(50) DEFAULT NULL,
        timezone VARCHAR(100) DEFAULT NULL,
        screen_resolution VARCHAR(20) DEFAULT NULL,
        platform VARCHAR(100) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    for (const col of [
      ["location", "VARCHAR(255) DEFAULT NULL", "referrer"],
      ["browser_language", "VARCHAR(50) DEFAULT NULL", "location"],
      ["timezone", "VARCHAR(100) DEFAULT NULL", "browser_language"],
      ["screen_resolution", "VARCHAR(20) DEFAULT NULL", "timezone"],
      ["platform", "VARCHAR(100) DEFAULT NULL", "screen_resolution"],
    ]) {
      try {
        await db.execute(
          `ALTER TABLE visitors ADD COLUMN ${col[0]} ${col[1]} AFTER ${col[2]}`
        );
      } catch {
        // column already exists — proceed
      }
    }

    await db.execute(
      `INSERT INTO visitors (ip_address, user_agent, page_url, referrer, location, browser_language, timezone, screen_resolution, platform) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ip,
        userAgent,
        pageUrl || null,
        referrer || null,
        location,
        browserLang,
        timezone || null,
        screen || null,
        platform || null,
      ]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Track API Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
