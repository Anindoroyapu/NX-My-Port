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
      style={{
        backgroundImage: `url(${indexHeaderBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // opacity: 0.5,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="hero-content wow fadeInUp text-center delay-0-2s">
              <h2 className=" text-nowrap ">ASHA LENSCRAFT</h2>
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
                    />
                  </li>
                  <li>
                    <Image
                      className="img-fluid"
                      src={FarabiImg}
                      alt="tanjirul"
                      width={100}
                      height={100}
                    />
                  </li>
                  <li>
                    <Image
                      className="img-fluid"
                      src={PanthoImg}
                      alt="tanjirul"
                      width={100}
                      height={100}
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
                width={0}
                height={0}
                sizes="100vh"
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="col-lg-3 pt-30">
            <div className="hero-content wow fadeInUp delay-0-4s">
              <p>
                Hi, I’m Anindo—a passionate photographer and a creative mind
                dedicated to crafting user-friendly and visually appealing
                digital experiences.
              </p>
              <Link className="theme-btn rounded-3" href="">
                Booking Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
