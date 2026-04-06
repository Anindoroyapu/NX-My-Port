import Link from "next/link";
import React from "react";

export default function CtaSection() {
  return (
    <section
      style={{
        background:
          "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0c0c0c 100%)",
        padding: "90px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row align-items-center">
          {/* Left: copy */}
          <div className="col-lg-7 wow fadeInUp delay-0-2s">
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                letterSpacing: "3px",
                fontSize: "11px",
                marginBottom: "14px",
              }}
            >
              — Let&apos;s create something beautiful
            </p>
            <h2
              style={{
                color: "#fff",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: "20px",
              }}
            >
              Every moment deserves
              <br />
              to be remembered.
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "16px",
                maxWidth: "500px",
                lineHeight: 1.7,
                marginBottom: 0,
              }}
            >
              From intimate portraits to grand wedding ceremonies — we capture
              the emotions, details, and stories that matter most to you.
            </p>
          </div>

          {/* Right: actions */}
          <div
            className="col-lg-5 wow fadeInUp delay-0-4s"
            style={{ marginTop: "32px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                alignItems: "flex-start",
              }}
            >
              <Link
                href="https://manage.ashaa.xyz/#/make-booking"
                className="theme-btn rounded-3"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: "14px 36px",
                }}
              >
                <i className="ri-calendar-check-line"></i>
                Book Your Session Now
              </Link>

              <div
                style={{
                  display: "flex",
                  gap: "24px",
                  marginTop: "8px",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="tel:+8801533780593"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                  }}
                >
                  <i className="ri-phone-line"></i>
                  +880 1533 780593
                </a>
                <a
                  href="https://www.facebook.com/anindoroy441/"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                  }}
                >
                  <i className="ri-facebook-circle-fill"></i>
                  Message on Facebook
                </a>
              </div>

              <p
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "12px",
                  marginBottom: 0,
                  marginTop: "4px",
                }}
              >
                <i className="ri-checkbox-circle-line"></i> Free consultation
                &nbsp;·&nbsp; Quick response &nbsp;·&nbsp; Flexible packages
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
