import React from "react";
import BookingForm from "./components/BookingForm";

const BookingFormPage: React.FC = () => {
  return (
    <div
      className="position-relative overflow-hidden py-5"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(94, 234, 212, 0.18), transparent 32%), radial-gradient(circle at top right, rgba(59, 130, 246, 0.16), transparent 26%), linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="position-absolute rounded-circle"
        style={{
          width: 220,
          height: 220,
          left: "-80px",
          top: "120px",
          background: "rgba(14, 165, 233, 0.08)",
          filter: "blur(10px)",
        }}
      />
      <main className="position-relative z-1 container py-4 py-lg-5">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <BookingForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingFormPage;
