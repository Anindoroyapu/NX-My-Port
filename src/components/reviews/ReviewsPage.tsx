"use client";
import React, { useEffect, useState } from "react";
import { ReviewCard, ReviewForm } from "@/components/reviews";

interface Review {
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
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (!data.error) {
        setReviews(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0.0";

  const highlightText =
    reviews.length > 0
      ? "Real feedback from clients who worked with us across different projects and services."
      : "Share your experience first and help future clients choose with confidence.";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.14),transparent_34%),linear-gradient(to_bottom,#f8fafc,#ffffff_46%,#f8fafc)]">
      <div className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-24 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="absolute bottom-0 -right-20 h-96 w-96 rounded-full bg-orange-400/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_35%,transparent_65%,rgba(255,255,255,0.04))]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
                Client voices
              </span>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Reviews that feel <span className="text-amber-300">real</span>{" "}
                and easy to trust.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                {highlightText}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-amber-400 active:scale-[0.98]"
                >
                  Write a Review
                </button>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Mobile friendly layout
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-300">
                  Total reviews
                </p>
                <div className="mt-3 text-4xl font-bold text-white">
                  {reviews.length}
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  A growing set of client experiences, collected in one place.
                </p>
              </div>

              <div className="rounded-3xl border border-amber-400/20 bg-linear-to-br from-amber-500 to-orange-500 p-6 text-slate-950 shadow-2xl shadow-amber-950/20">
                <p className="text-sm uppercase tracking-[0.18em] text-slate-900/75">
                  Average rating
                </p>
                <div className="mt-3 flex items-end gap-3">
                  <div className="text-4xl font-bold">{avgRating}</div>
                  <div className="pb-1 text-sm font-medium text-slate-900/75">
                    out of 5
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <span className="text-lg">★★★★★</span>
                  Client feedback
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Reviews
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {reviews.length} {reviews.length === 1 ? "review" : "reviews"}{" "}
              shared by our clients
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all hover:bg-amber-400 active:scale-[0.98]"
          >
            Write a Review
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center rounded-4xl border border-slate-200 bg-white py-20 shadow-sm">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-200 border-t-amber-500" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-4xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <svg
                className="w-10 h-10 text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
              </svg>
            </div>
            <h3 className="mb-1 text-lg font-semibold text-slate-900">
              No reviews yet
            </h3>
            <p className="mb-6 text-sm text-slate-500">
              Be the first to share your experience.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold text-slate-950 transition-all hover:bg-amber-400"
            >
              Write a Review
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left stats card */}
            <aside className="order-2 lg:order-1 lg:col-span-1">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Reviews
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      What clients say about us
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-slate-900">
                      {avgRating}
                    </div>
                    <div className="mt-1 text-sm text-slate-500">out of 5</div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {/* compute star counts */}
                  {(() => {
                    const counts = [0, 0, 0, 0, 0];
                    reviews.forEach((r) => {
                      const idx =
                        Math.max(1, Math.min(5, Math.round(r.rating))) - 1;
                      counts[idx] += 1;
                    });
                    const total = reviews.length || 1;
                    return [5, 4, 3, 2, 1].map((star, i) => {
                      const cnt = counts[5 - star];
                      const pct = Math.round((cnt / total) * 100);
                      return (
                        <div key={star} className="flex items-center gap-3">
                          <div className="w-8 text-sm text-slate-700">
                            {star}
                          </div>
                          <div className="flex-1">
                            <div className="h-3 w-full rounded-full bg-slate-100">
                              <div
                                className="h-3 rounded-full bg-purple-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                          <div className="w-12 text-right text-sm font-medium text-slate-700">
                            {cnt}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-400" />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {avgRating}
                      </div>
                      <div className="text-xs text-slate-500">Cleanliness</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-400" />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {avgRating}
                      </div>
                      <div className="text-xs text-slate-500">
                        Safety & Security
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-400" />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {avgRating}
                      </div>
                      <div className="text-xs text-slate-500">Staff</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-400" />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {avgRating}
                      </div>
                      <div className="text-xs text-slate-500">Location</div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right review list */}
            <section className="order-1 lg:order-2 lg:col-span-2">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      {showForm && (
        <ReviewForm
          onClose={() => setShowForm(false)}
          onSuccess={fetchReviews}
        />
      )}
    </div>
  );
}
