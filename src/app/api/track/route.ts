import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// In-memory cache for IP geolocations (IP -> { location: string | null, timestamp: number })
const ipCache = new Map<string, { location: string | null; timestamp: number }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_CACHE_SIZE = 500;

async function getLocationFromIP(ip: string): Promise<string | null> {
  if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return null;
  }

  const cached = ipCache.get(ip);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.location;
  }

  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=city,country`, {
      signal: AbortSignal.timeout(1200),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.status === "success") {
        const loc = [data.city, data.country].filter(Boolean).join(", ") || null;
        if (ipCache.size >= MAX_CACHE_SIZE) {
          const firstKey = ipCache.keys().next().value;
          if (firstKey) ipCache.delete(firstKey);
        }
        ipCache.set(ip, { location: loc, timestamp: Date.now() });
        return loc;
      }
    }
  } catch {
    // Geolocation failed or timed out — continue smoothly without blocking
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { pageUrl, referrer, language, timezone, screen, platform } = body ?? {};

    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "";

    const [location, browserLang] = await Promise.all([
      getLocationFromIP(ip),
      Promise.resolve(language || null),
    ]);

    const db = getDb();

    await db.execute(
      `INSERT INTO visitors (ip_address, user_agent, page_url, referrer, location, browser_language, timezone, screen_resolution, platform)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ip,
        userAgent ? userAgent.slice(0, 1000) : null,
        pageUrl ? String(pageUrl).slice(0, 500) : null,
        referrer ? String(referrer).slice(0, 500) : null,
        location,
        browserLang ? String(browserLang).slice(0, 50) : null,
        timezone ? String(timezone).slice(0, 100) : null,
        screen ? String(screen).slice(0, 20) : null,
        platform ? String(platform).slice(0, 100) : null,
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

