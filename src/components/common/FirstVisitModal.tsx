"use client";

import {
  Dialog,
  DialogContent,
} from "@/utils/dialog";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

const HOUR_MS = 60 * 60 * 1000;

export default function FirstVisitModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const done = localStorage.getItem("first_visit_submitted");
    if (done) return;

    const skippedAt = localStorage.getItem("first_visit_skipped_at");
    if (skippedAt) {
      const elapsed = Date.now() - Number(skippedAt);
      if (elapsed < HOUR_MS) return;
    }

    const timer = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/visitor-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact }),
      });
    } catch {
      // silently fail
    }
    localStorage.setItem("first_visit_submitted", "true");
    localStorage.removeItem("first_visit_skipped_at");
    setSubmitted(true);
    setTimeout(() => setOpen(false), 800);
  };

  const handleSkip = () => {
    localStorage.removeItem("first_visit_submitted");
    localStorage.setItem("first_visit_skipped_at", String(Date.now()));
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        aria-describedby={undefined}
        className="!mx-4 !w-auto !max-w-lg !rounded-[24px] !border-0 !bg-white !p-0 !shadow-2xl [&>button]:!hidden sm:!mx-auto sm:!w-[90%]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-amber-50 via-white to-orange-50">
          <button
            onClick={handleSkip}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex size-7 sm:size-8 cursor-pointer items-center justify-center rounded-full bg-white/80 text-gray-400 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-gray-600 touch-manipulation"
            aria-label="Close"
          >
            <X className="size-3.5 sm:size-4" />
          </button>

          <div className="px-5 sm:px-8 pt-8 sm:pt-10 pb-6 sm:pb-8 text-center">
            <div className="mx-auto mb-2 flex size-14 sm:size-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-400 shadow-lg">
              <svg className="size-7 sm:size-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>

            <h2 className="mb-2 font-['Oswald'] text-2xl sm:text-3xl font-semibold tracking-wide text-gray-800">
              Welcome to Asha Lenscraft
            </h2>

            <p className="mx-auto mb-5 sm:mb-6 max-w-xs sm:max-w-sm text-sm sm:text-base leading-relaxed text-gray-500">
              We&apos;re thrilled to have you here. Every moment tells a story — let us help you capture yours beautifully.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex size-12 sm:size-14 items-center justify-center rounded-full bg-green-100">
                  <svg className="size-6 sm:size-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-base sm:text-lg font-medium text-green-600">Thank you for joining us!</p>
                <p className="text-xs sm:text-sm text-gray-400">You&apos;ll hear from us soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="text-left">
                  <label className="mb-1 block text-xs sm:text-sm font-medium text-gray-600">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Anindo Roy"
                    className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-2.5 sm:py-3 text-sm text-gray-700 outline-none backdrop-blur-sm transition-all placeholder:text-gray-300 focus:border-amber-300 focus:ring-2 focus:ring-amber-100 min-h-[44px]"
                  />
                </div>

                <div className="text-left">
                  <label className="mb-1 block text-xs sm:text-sm font-medium text-gray-600">
                    Phone / Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="e.g. anindoroy112@gmail.com"
                    className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-2.5 sm:py-3 text-sm text-gray-700 outline-none backdrop-blur-sm transition-all placeholder:text-gray-300 focus:border-amber-300 focus:ring-2 focus:ring-amber-100 min-h-[44px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-md transition-all hover:from-amber-600 hover:to-orange-600 hover:shadow-lg active:scale-[0.98] min-h-[44px] touch-manipulation"
                >
                  Get Started
                </button>

                <button
                  type="button"
                  onClick={handleSkip}
                  className="w-full cursor-pointer py-2 text-xs sm:text-sm text-gray-400 underline-offset-2 transition-all hover:text-gray-500 hover:underline touch-manipulation min-h-[36px]"
                >
                  Skip, I&apos;ll explore first
                </button>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
