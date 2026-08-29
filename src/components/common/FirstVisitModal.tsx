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
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3 p-sm-4"
      style={{
        zIndex: 2000,
        backdropFilter: "blur(4px)",
        background: "rgba(15, 23, 42, 0.68)",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="first-visit-modal-title"
    >
      <button
        type="button"
        aria-label="Close modal backdrop"
        className="position-absolute top-0 start-0 w-100 h-100 border-0"
        style={{ background: "rgba(15, 23, 42, 0.26)" }}
        onClick={handleSkip}
      />

      <div
        className="position-relative overflow-hidden w-100"
        style={{
          maxWidth: 340,
          borderRadius: 22,
          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
          boxShadow: "0 22px 60px rgba(15, 23, 42, 0.3)",
          border: "1px solid rgba(148, 163, 184, 0.18)",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100"
          style={{
            height: 5,
            background:
              "linear-gradient(90deg, #f59e0b, #f97316, #ef4444, #a855f7)",
          }}
        />

        <div className="p-3 p-sm-3">
          <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
            <div className="d-flex align-items-center gap-2">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: 42,
                  height: 42,
                  background:
                    "linear-gradient(135deg, #0f172a, #334155 55%, #f97316)",
                  boxShadow: "0 12px 24px rgba(249, 115, 22, 0.18)",
                }}
              >
                <i className="ri-calendar-event-line text-white fs-6"></i>
              </div>

              <div>
                <p
                  className="mb-0 text-uppercase small text-secondary"
                  style={{ letterSpacing: "0.18em", fontSize: "0.62rem" }}
                >
                  Quick booking
                </p>
                <h2
                  id="first-visit-modal-title"
                  className="h6 fw-bold mb-0 text-dark"
                  style={{
                    letterSpacing: "0.04em",
                    fontFamily: "'Anton', sans-serif",
                    fontWeight: 400,
                    lineHeight: 1,
                    textTransform: "uppercase",
                    fontSize: "1rem",
                  }}
                >
                  Asha Lenscraft
                </h2>
              </div>
            </div>

            <button
              type="button"
              aria-label="Close modal"
              className="btn btn-light rounded-circle d-inline-flex align-items-center justify-content-center"
              style={{
                width: 32,
                height: 32,
                border: "1px solid rgba(148, 163, 184, 0.28)",
                boxShadow: "0 6px 14px rgba(15, 23, 42, 0.08)",
              }}
              onClick={handleSkip}
            >
              <X size={20} />
            </button>
          </div>

          <p
            className="mb-2 text-secondary"
            style={{ lineHeight: 1.5, fontSize: "0.82rem" }}
          >
            Leave your details and we&apos;ll contact you for the shoot.
          </p>

          {submitted ? (
            <div
              className="alert alert-success mb-0 rounded-4 border-0"
              role="status"
              style={{ background: "#ecfdf5", color: "#065f46" }}
            >
              Submitted successfully.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="row g-2">
                <div className="col-12 d-flex align-items-center gap-2">
                  <label
                    htmlFor="visitorName"
                    className="form-label fw-semibold text-dark mb-0"
                    style={{ fontSize: "0.78rem", minWidth: 44 }}
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
                    style={{
                      borderRadius: 12,
                      padding: "0.7rem 0.8rem",
                      border: "1px solid #e2e8f0",
                      background: "#fff",
                      boxShadow: "none",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>

                <div className="col-12 d-flex align-items-center gap-2">
                  <label
                    htmlFor="visitorContact"
                    className="form-label fw-semibold text-dark mb-0"
                    style={{ fontSize: "0.78rem", minWidth: 44 }}
                  >
                    Number
                  </label>
                  <input
                    id="visitorContact"
                    type="tel"
                    className="form-control"
                    placeholder="Phone number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    autoComplete="tel"
                    style={{
                      borderRadius: 12,
                      padding: "0.7rem 0.8rem",
                      border: "1px solid #e2e8f0",
                      background: "#fff",
                      boxShadow: "none",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>

                {errorMessage ? (
                  <div className="col-12">
                    <div
                      className="alert alert-danger mb-0 py-2 rounded-4 border-0 small"
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
                    style={{
                      minHeight: 44,
                      borderRadius: 12,
                      flex: 1,
                      background:
                        "linear-gradient(135deg, #f59e0b, #f97316 55%, #ef4444)",
                      border: "none",
                      fontSize: "0.88rem",
                    }}
                  >
                    {isSubmitting ? "Sending..." : "Submit"}
                  </button>
                  <button
                    type="button"
                    className="btn px-3"
                    onClick={handleSkip}
                    disabled={isSubmitting}
                    style={{
                      minHeight: 44,
                      borderRadius: 12,
                      border: "none",
                      background: "transparent",
                      color: "#475569",
                      fontSize: "0.88rem",
                    }}
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
