"use client";

import { useState, useEffect } from "react";

interface VisitorInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; phone: string; location: string }) => void;
}

export default function VisitorInfoModal({ isOpen, onClose, onSubmit }: VisitorInfoModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("visitor_info_submitted");
    if (stored) {
      onClose();
    }
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { name, email, phone, location };
    localStorage.setItem("visitor_info_submitted", "true");
    localStorage.setItem("visitor_info", JSON.stringify(data));
    onSubmit(data);
    onClose();
  };

  const handleSkip = () => {
    localStorage.setItem("visitor_info_submitted", "true");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 9999 }}
      onClick={handleSkip}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div
          className="modal-content text-center p-4 p-md-5 rounded-4 shadow-lg border-0"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto bg-warning-subtle rounded-circle d-flex align-items-center justify-content-center border border-5 border-white shadow-sm"
            style={{ width: "80px", height: "80px", marginTop: "-60px" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          <div className="modal-body pt-4">
            <h3 className="fw-bold text-dark">Stay Connected!</h3>
            <p className="text-muted mt-2 mb-4">
              Leave your details so I can reach out to you. It helps me understand my visitors better!
            </p>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Your Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Your Location (City/Country)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="tel"
                    className="form-control form-control-lg"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="d-flex gap-3 justify-content-center mt-4">
                <button type="submit" className="btn btn-warning btn-lg px-5 fw-semibold">
                  Submit
                </button>
                <button type="button" onClick={handleSkip} className="btn btn-outline-secondary btn-lg px-4">
                  Skip
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
