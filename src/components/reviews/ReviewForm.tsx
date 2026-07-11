"use client";

import React, { useRef, useState } from "react";
import StarRating from "./StarRating";

interface ReviewFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

type AuthMethod = "google" | "manual" | null;

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export default function ReviewForm({ onClose, onSuccess }: ReviewFormProps) {
  const [step, setStep] = useState<"auth" | "form" | "submitting" | "done">(
    "auth",
  );
  const [authMethod, setAuthMethod] = useState<AuthMethod>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [reviewImage, setReviewImage] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");

  const profileInputRef = useRef<HTMLInputElement>(null);
  const reviewImageInputRef = useRef<HTMLInputElement>(null);

  const selectGoogle = () => {
    setAuthMethod("google");
    setStep("form");
  };

  const selectManual = () => {
    setAuthMethod("manual");
    setStep("form");
  };

  const uploadProfilePhoto = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Profile photo must be under 5MB");
      return;
    }

    const dataUrl = await readFileAsDataUrl(file);
    setProfilePhoto(dataUrl);
    setError("");
  };

  const uploadReviewImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("Review image must be under 10MB");
      return;
    }

    const dataUrl = await readFileAsDataUrl(file);
    setReviewImage(dataUrl);
    setError("");
  };

  const handleSubmit = async () => {
    setError("");

    if (authMethod === "google" && !email.trim()) {
      setError("Please enter your Google email");
      return;
    }

    if (authMethod === "manual") {
      if (!name.trim()) {
        setError("Please enter your name");
        return;
      }

      if (!phone.trim()) {
        setError("Please enter your phone number");
        return;
      }

      if (!profilePhoto) {
        setError("Please upload your photo");
        return;
      }
    }

    if (!reviewText.trim()) {
      setError("Please write your review");
      return;
    }

    setStep("submitting");

    try {
      const payload = {
        authMethod,
        name,
        email,
        phone,
        profilePhoto,
        rating,
        reviewText,
        reviewImage,
      };

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setError(data.message || "Could not save review");
        setStep("form");
        return;
      }

      setStep("done");
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1200);
    } catch (submitError) {
      console.error(submitError);
      setError("Network error. Please try again.");
      setStep("form");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-4xl bg-white shadow-2xl sm:rounded-4xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-600">
                Public review
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">
                Share your experience
              </h2>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          {error && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {step === "auth" && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={selectGoogle}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <svg className="h-6 w-6" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Continue with Google
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Use your Gmail identity for a quick review.
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={selectManual}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-amber-200 hover:bg-amber-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <svg
                        className="h-6 w-6 text-slate-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Continue without Gmail
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Enter your name, phone, and photo manually.
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === "form" && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span
                  className={`rounded-full px-3 py-1 font-medium ${authMethod === "google" ? "bg-blue-50 text-blue-700" : "bg-amber-50 text-amber-700"}`}
                >
                  {authMethod === "google"
                    ? "Google identity"
                    : "Manual identity"}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 font-medium">
                  Rating + text + photo
                </span>
              </div>

              {authMethod === "google" ? (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Google Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-all focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                  <p className="mt-2 text-xs text-slate-400">
                    Your name will be shown from this email if you do not enter
                    one.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Enter your name"
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Profile Photo *
                    </label>
                    <input
                      ref={profileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={uploadProfilePhoto}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => profileInputRef.current?.click()}
                      className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-slate-300 px-4 py-4 text-left transition-all hover:border-amber-300 hover:bg-amber-50"
                    >
                      {profilePhoto ? (
                        <img
                          src={profilePhoto}
                          alt="Profile preview"
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                          <svg
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {profilePhoto ? "Change photo" : "Upload photo"}
                        </p>
                        <p className="text-xs text-slate-400">
                          JPG, PNG, WEBP up to 5MB
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <label className="mb-3 block text-sm font-medium text-slate-700">
                  Your Rating *
                </label>
                <StarRating value={rating} onChange={setRating} size="lg" />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Your Review *
                </label>
                <textarea
                  value={reviewText}
                  onChange={(event) => setReviewText(event.target.value)}
                  placeholder="Share your experience..."
                  rows={5}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-all focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Add a Photo (optional)
                </label>
                <input
                  ref={reviewImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={uploadReviewImage}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => reviewImageInputRef.current?.click()}
                  className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-slate-300 px-4 py-4 text-left transition-all hover:border-amber-300 hover:bg-amber-50"
                >
                  {reviewImage ? (
                    <img
                      src={reviewImage}
                      alt="Review preview"
                      className="h-12 w-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <svg
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                      </svg>
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {reviewImage ? "Change photo" : "Upload a photo"}
                    </p>
                    <p className="text-xs text-slate-400">
                      Optional attachment for your post
                    </p>
                  </div>
                </button>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
              >
                Submit Review
              </button>
            </div>
          )}

          {step === "submitting" && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-amber-200 border-t-amber-500" />
              <p className="text-sm text-slate-500">
                Saving your public review...
              </p>
            </div>
          )}

          {step === "done" && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Review submitted
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Thanks. Your review is now saved and will appear on the page.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
