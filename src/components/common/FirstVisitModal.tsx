"use client";

import {
  Dialog,
  DialogContent,
  DialogBody,
} from "@/utils/dialog";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

const FirstVisitModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem("first_visit_done");
    if (!visited) {
      const timer = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("first_visit_done", "true");
    setSubmitted(true);
    setTimeout(() => setOpen(false), 800);
  };

  const handleSkip = () => {
    localStorage.setItem("first_visit_done", "true");
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent
        aria-describedby={undefined}
        className="!max-w-lg !rounded-[24px] !border-0 !bg-white !p-0 !shadow-2xl [&>button]:!hidden"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-amber-50 via-white to-orange-50">
          <button
            onClick={handleSkip}
            className="absolute top-3 right-3 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full bg-white/80 text-gray-400 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-gray-600"
          >
            <X className="size-4" />
          </button>

          <div className="px-8 pt-10 pb-8 text-center">
            <div className="mx-auto mb-2 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-400 shadow-lg">
              <svg className="size-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>

            <h2 className="mb-2 font-['Oswald'] text-3xl font-semibold tracking-wide text-gray-800">
              Welcome to Asha Lenscraft
            </h2>

            <p className="mx-auto mb-6 max-w-sm text-base leading-relaxed text-gray-500">
              We&apos;re thrilled to have you here. Every moment tells a story — let us help you capture yours beautifully.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex size-14 items-center justify-center rounded-full bg-green-100">
                  <svg className="size-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-green-600">Thank you for joining us!</p>
                <p className="text-sm text-gray-400">You&apos;ll hear from us soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-left">
                  <label className="mb-1.5 block text-sm font-medium text-gray-600">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Anindo Roy"
                    className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-3 text-sm text-gray-700 outline-none backdrop-blur-sm transition-all placeholder:text-gray-300 focus:border-amber-300 focus:ring-2 focus:ring-amber-100"
                  />
                </div>

                <div className="text-left">
                  <label className="mb-1.5 block text-sm font-medium text-gray-600">
                    Phone / Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="e.g. anindoroy112@gmail.com"
                    className="w-full rounded-xl border border-gray-200 bg-white/70 px-4 py-3 text-sm text-gray-700 outline-none backdrop-blur-sm transition-all placeholder:text-gray-300 focus:border-amber-300 focus:ring-2 focus:ring-amber-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:from-amber-600 hover:to-orange-600 hover:shadow-lg active:scale-[0.98]"
                >
                  Get Started
                </button>

                <button
                  type="button"
                  onClick={handleSkip}
                  className="cursor-pointer text-sm text-gray-400 underline-offset-2 transition-all hover:text-gray-500 hover:underline"
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
};

export default FirstVisitModal;
