import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

type ReviewRow = {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  profile_photo: string | null;
  rating: number;
  review_text: string;
  review_image: string | null;
  auth_method: string | null;
  created_at: string;
};

async function ensureReviewsTable() {
  const db = getDb();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) DEFAULT NULL,
      email VARCHAR(255) DEFAULT NULL,
      phone VARCHAR(100) DEFAULT NULL,
      profile_photo LONGTEXT DEFAULT NULL,
      rating TINYINT NOT NULL,
      review_text TEXT NOT NULL,
      review_image LONGTEXT DEFAULT NULL,
      auth_method VARCHAR(20) DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  return db;
}

export async function GET() {
  try {
    const db = await ensureReviewsTable();
    const [rows] = await db.execute(
      `SELECT id, name, email, phone, profile_photo, rating, review_text, review_image, auth_method, created_at
       FROM reviews
       ORDER BY created_at DESC`
    );

    return NextResponse.json({ success: true, data: rows });
  } catch (err) {
    console.error("Reviews GET Error:", err);
    return NextResponse.json({ error: true, message: "Failed to load reviews" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      authMethod,
      name,
      email,
      phone,
      profilePhoto,
      rating,
      reviewText,
      reviewImage,
    } = body ?? {};

    const normalizedRating = Number(rating);
    const normalizedReviewText = typeof reviewText === "string" ? reviewText.trim() : "";
    const normalizedAuthMethod = authMethod === "google" ? "google" : authMethod === "manual" ? "manual" : null;

    if (!normalizedAuthMethod) {
      return NextResponse.json({ error: true, message: "authMethod is required" }, { status: 400 });
    }

    if (!Number.isInteger(normalizedRating) || normalizedRating < 1 || normalizedRating > 5) {
      return NextResponse.json({ error: true, message: "rating must be between 1 and 5" }, { status: 400 });
    }

    if (!normalizedReviewText) {
      return NextResponse.json({ error: true, message: "reviewText is required" }, { status: 400 });
    }

    const finalEmail = typeof email === "string" ? email.trim() : "";
    const finalName = typeof name === "string" ? name.trim() : "";
    const finalPhone = typeof phone === "string" ? phone.trim() : "";
    const finalProfilePhoto = typeof profilePhoto === "string" ? profilePhoto : null;
    const finalReviewImage = typeof reviewImage === "string" ? reviewImage : null;

    if (normalizedAuthMethod === "google") {
      if (!finalEmail) {
        return NextResponse.json({ error: true, message: "email is required for Google reviews" }, { status: 400 });
      }
    }

    if (normalizedAuthMethod === "manual") {
      if (!finalName || !finalPhone || !finalProfilePhoto) {
        return NextResponse.json(
          { error: true, message: "name, phone, and profile photo are required for manual reviews" },
          { status: 400 }
        );
      }
    }

    const db = await ensureReviewsTable();
    const displayName =
      normalizedAuthMethod === "google"
        ? finalName || finalEmail.split("@")[0]
        : finalName;

    await db.execute(
      `INSERT INTO reviews (name, email, phone, profile_photo, rating, review_text, review_image, auth_method)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)` ,
      [
        displayName || null,
        finalEmail || null,
        finalPhone || null,
        finalProfilePhoto,
        normalizedRating,
        normalizedReviewText,
        finalReviewImage,
        normalizedAuthMethod,
      ]
    );

    return NextResponse.json({ success: true, message: "Review saved successfully" });
  } catch (err) {
    console.error("Reviews POST Error:", err);
    return NextResponse.json({ error: true, message: "Failed to save review" }, { status: 500 });
  }
}