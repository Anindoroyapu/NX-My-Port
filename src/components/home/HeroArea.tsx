import Image from "next/image";
import React from "react";
import TanjirulImg from "@/assets/images/avatar/tanjirul-01.jpg";
import FarabiImg from "@/assets/images/avatar/farabi-01.jpg";
import PanthoImg from "@/assets/images/avatar/pantho-01.jpg";
import HeroImg from "@/assets/images/projects/IMG_0093.jpg";
import indexHeaderBg from "@/assets/images/projects/asha-main.jpg";
import Link from "next/link";

export default function HeroArea() {
  return (
    <section
      id="home"
      className="main-hero-area "
      style={{ position: "relative" }}
    >
      <Image
        src={indexHeaderBg}
        alt=""
        fill
        priority
        quality={75}
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center", zIndex: 0 }}
      />
      {/* Dark gradient overlay for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="row">
          <div className="col-lg-12">
            <div className="hero-content wow fadeInUp text-center delay-0-2s">
              <span
                style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  borderRadius: "50px",
                  padding: "6px 24px",
                  color: "rgba(255,255,255,0.88)",
                  fontSize: "11px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  marginBottom: "18px",
                }}
              >
                ✦ &nbsp; Professional Photography Studio
              </span>
              <h2 className="md:text-nowrap">ASHA LENSCRAFT</h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "12px",
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  marginTop: "10px",
                  marginBottom: 0,
                }}
              >
                Wedding &nbsp;·&nbsp; Portrait &nbsp;·&nbsp; Wildlife
                &nbsp;·&nbsp; Fashion
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 pt-30">
            <div className="hero-content wow fadeInUp delay-0-2s">
              <div className="clienti-reviews">
                <ul className="clienti-profile">
                  <li>
                    <Image
                      className="img-fluid"
                      src={TanjirulImg}
                      alt="tanjirul"
                      width={100}
                      height={100}
                      priority
                    />
                  </li>
                  <li>
                    <Image
                      className="img-fluid"
                      src={FarabiImg}
                      alt="farabi"
                      width={100}
                      height={100}
                      priority
                    />
                  </li>
                  <li>
                    <Image
                      className="img-fluid"
                      src={PanthoImg}
                      alt="pantho"
                      width={100}
                      height={100}
                      priority
                    />
                  </li>
                </ul>
                <div className="reviews">
                  100+ reviews <span>(4.96 of 5)</span>
                  <p>Five-star reviews from my esteemed clients.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 pt-50">
            <div className="hero-image ">
              <Image
                src={HeroImg}
                alt=""
                priority
                quality={80}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="col-lg-3 pt-30">
            <div className="hero-content wow fadeInUp delay-0-4s">
              <p>
                Hi, I&apos;m Anindo — a passionate photographer dedicated to
                capturing life&apos;s most meaningful moments with artistry and
                emotion.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginTop: "28px",
                }}
              >
                <Link
                  className="theme-btn rounded-3"
                  href="https://manage.ashaa.xyz/#/make-booking"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  <i className="ri-calendar-check-line"></i>
                  Book a Session
                </Link>
                <Link
                  className="theme-btn theme-btn-two rounded-3"
                  href="#portfolio"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  Explore Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
