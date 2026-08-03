"use client";

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

const HOUR_MS = 60 * 60 * 1000;

export default function FirstVisitModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleSkip();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setErrorMessage("Please enter your name and contact details.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/visitor-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.message || "Unable to save your details right now.",
        );
      }

      localStorage.setItem("first_visit_submitted", "true");
      localStorage.removeItem("first_visit_skipped_at");
      setSubmitted(true);
      setTimeout(() => setOpen(false), 900);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to save your details right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("first_visit_skipped_at", String(Date.now()));
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-2 p-sm-3"
      style={{ zIndex: 2000, backdropFilter: "blur(3px)" }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="first-visit-modal-title"
    >
      <button
        type="button"
        aria-label="Close modal backdrop"
        className="position-absolute top-0 start-0 w-100 h-100 border-0"
        style={{ background: "rgba(2, 6, 23, 0.78)" }}
        onClick={handleSkip}
      />

      <div
        className="position-relative overflow-hidden w-100 rounded-4 bg-white"
        style={{
          maxWidth: 360,
          boxShadow: "0 28px 70px rgba(15, 23, 42, 0.42)",
          border: "1px solid rgba(255,255,255,0.6)",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100"
          style={{
            height: 4,
            background: "linear-gradient(90deg, #f59e0b, #f97316, #ef4444)",
          }}
        />

        <button
          type="button"
          aria-label="Close modal"
          className="position-absolute end-0 top-0 m-2 btn btn-light rounded-circle d-inline-flex align-items-center justify-content-center"
          style={{
            width: 36,
            height: 36,
            zIndex: 2,
            boxShadow: "0 6px 18px rgba(15, 23, 42, 0.12)",
          }}
          onClick={handleSkip}
        >
          <X size={16} />
        </button>

        <div className="p-3 p-sm-4">
          <div className="d-flex align-items-center gap-3 mb-3">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: 44,
                height: 44,
                background: "linear-gradient(135deg, #0f172a, #334155)",
              }}
            >
              <i className="ri-calendar-event-line text-white"></i>
            </div>
            <div>
              <p
                className="mb-0 text-uppercase small text-secondary"
                style={{ letterSpacing: "0.16em" }}
              >
                Quick booking
              </p>
              <h2
                id="first-visit-modal-title"
                className="h5 fw-bold mb-0 text-dark"
              >
                Asha Lenscraft
              </h2>
            </div>
          </div>

          {submitted ? (
            <div className="alert alert-success mb-0 rounded-3" role="status">
              Submitted successfully.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="row g-2">
                <div className="col-12">
                  <label
                    htmlFor="visitorName"
                    className="form-label fw-semibold text-dark mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="visitorName"
                    type="text"
                    className="form-control"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    style={{ borderRadius: 14, padding: "0.9rem 1rem" }}
                  />
                </div>

                <div className="col-12">
                  <label
                    htmlFor="visitorContact"
                    className="form-label fw-semibold text-dark mb-1"
                  >
                    Number
                  </label>
                  <input
                    id="visitorContact"
                    type="text"
                    className="form-control"
                    placeholder="Phone number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    autoComplete="tel"
                    style={{ borderRadius: 14, padding: "0.9rem 1rem" }}
                  />
                </div>

                {errorMessage ? (
                  <div className="col-12">
                    <div
                      className="alert alert-danger mb-0 py-2 rounded-3 small"
                      role="alert"
                    >
                      {errorMessage}
                    </div>
                  </div>
                ) : null}

                <div className="col-12 d-flex gap-2 pt-1">
                  <button
                    type="submit"
                    className="theme-btn grow"
                    disabled={isSubmitting}
                    style={{ minHeight: 48 }}
                  >
                    {isSubmitting ? "Sending..." : "Submit"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-3"
                    onClick={handleSkip}
                    disabled={isSubmitting}
                    style={{ minHeight: 48, borderRadius: 14 }}
                  >
                    Skip
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
