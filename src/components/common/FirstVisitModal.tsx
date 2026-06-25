"use client";

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

  if (!open) return null;

  return (
    <div className="overflow-hidden rounded-[32px] bg-white shadow-2xl">
      <div className="grid lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden lg:block relative">
          <img
            src="/images/wedding.jpg"
            alt=""
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute bottom-8 left-8 text-white">
            <h3 className="text-3xl font-bold">Capture Every Moment</h3>

            <p className="mt-2 text-white/80">Wedding • Events • Portraits</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 lg:p-12">
          <h2 className="font-['Oswald'] text-4xl text-gray-900">
            Welcome to Asha Lenscraft
          </h2>

          <p className="mt-3 text-gray-500">
            Let's create timeless memories together.
          </p>

          <div className="mt-8 space-y-5">
            <input
              className="h-14 w-full rounded-2xl border px-5"
              placeholder="Your Name"
            />

            <input
              className="h-14 w-full rounded-2xl border px-5"
              placeholder="Phone / Email"
            />

            <button className="h-14 w-full rounded-2xl bg-amber-500 text-white font-semibold">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
