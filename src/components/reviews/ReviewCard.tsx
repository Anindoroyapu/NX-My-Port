import React from "react";
import StarRating from "./StarRating";

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

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ReviewCard({ review }: { review: Review }) {
  const displayName = review.name || review.email?.split("@")[0] || "Anonymous";
  const isGoogle = review.auth_method === "google";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-5 flex items-center gap-4">
          <div className="relative shrink-0">
            {review.profile_photo ? (
              <img
                src={review.profile_photo}
                alt={displayName}
                className="h-14 w-14 rounded-full object-cover ring-2 ring-amber-200"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-lg font-bold text-white">
                {getInitials(displayName)}
              </div>
            )}
            {isGoogle && (
              <span className="absolute -bottom-1 -right-1 rounded-full border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-blue-600 shadow-sm">
                G
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-base font-semibold text-slate-900">
                {displayName}
              </h3>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500">
                {isGoogle ? "Google" : "Manual"}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <StarRating value={review.rating} readonly size="sm" />
              <span className="text-xs font-semibold text-amber-600">
                {review.rating}.0
              </span>
            </div>
          </div>
        </div>

        <p className="flex-1 text-sm leading-7 text-slate-600">
          {review.review_text}
        </p>

        {review.review_image && (
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            <img
              src={review.review_image}
              alt="Review attachment"
              className="h-56 w-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-4 text-xs text-slate-500">
        <span>{formatDate(review.created_at)}</span>
        <span>{review.phone ? review.phone : "Public review"}</span>
      </div>
    </article>
  );
}
