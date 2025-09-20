"use client";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const images = [
  {
    src: "https://images.pexels.com/photos/4009023/pexels-photo-4009023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Dog reaching for food bowl",
  },
  {
    src: "https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Woman in brown hat drinking coffee",
  },
  {
    src: "https://images.pexels.com/photos/8996541/pexels-photo-8996541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Foot in white sneaker on a disco ball",
  },
  {
    src: "https://images.pexels.com/photos/3224164/pexels-photo-3224164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Christmas decorations with candles",
  },
  {
    src: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Man pouring water on his head in a lake",
  },
  {
    src: "https://images.pexels.com/photos/1618269/pexels-photo-1618269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Modern building at dusk",
  },
  {
    src: "https://images.pexels.com/photos/165427/pexels-photo-165427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Large cargo ship on the water",
  },
  {
    src: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Woman in a grey coat getting out of a car",
  },
  {
    src: "https://images.pexels.com/photos/8901353/pexels-photo-8901353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Riot police with shields in black and white",
  },
  {
    src: "https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    alt: "Close up of rocky ground in black and white",
  },
];

const dots = [{ opacity: 1 }, { opacity: 0.5 }, { opacity: 0.5 }];

const ProjectDetailSection = () => {
  const [images2, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch(
        "https://api.github.com/repos/Anindoroyapu/image_ar/contents"
      );
      const data = await res.json();
      const imageFiles = data
        .filter((file: any) => file.name.match(/\.(jpg|jpeg|png|gif)$/i))
        .map((file: any) => file.download_url);
      setImages(imageFiles);
    }
    fetchImages();
  }, []);

  return (
    <div className="container-fluid p-0">
      <div>
        <section
          className="position-relative d-flex flex-column justify-content-center align-items-center text-center text-white"
          style={{
            backgroundImage:
              "url('https://raw.githubusercontent.com/Anindoroyapu/image_ar/main/DSC07893.jpg')",
            minHeight: "85vh",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          />
          <div className="position-relative p-4" style={{ zIndex: 1 }}>
            <p
              className="text-uppercase small"
              style={{ letterSpacing: "0.4em" }}
            >
              INSPIRE 2016
            </p>
            <h1 className="display-2 fw-normal my-4">
              Vouge Italia December Campaign
            </h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <a
              href="#"
              className="d-inline-block mt-4 text-white text-decoration-none border-bottom pb-1 text-uppercase"
              style={{ letterSpacing: "0.2em" }}
            >
              EXPLORE NOW
            </a>
          </div>
          <div className="position-absolute bottom-0 mb-5 d-flex gap-2">
            {dots.map((dot, i) => (
              <span
                key={i}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  opacity: dot.opacity,
                }}
              />
            ))}
          </div>
        </section>
        <section className="container my-5 py-md-5">
          <div className="col-md-9 col-lg-8 mx-auto text-center">
            <p className="fs-3">
              Alexis Photography Studio based in Portland, Oregon. I specialise
              in shooting liquids and my colourful liquid work, titled “Biford”,
              has become very well known and collectable.
            </p>
          </div>
        </section>
        <section className="py-5 mb-50">
          <div className="container-fluid">
            {/* <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
              {images.map(({ src, alt }, i) => (
                <div className="col" key={i}>
                  <img
                    src={src}
                    alt={alt}
                    className="img-fluid w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div> */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3">
              {images2.map((src, idx) => (
                <div className="col" key={idx}>
                  <Image
                    width={500}
                    height={300}
                    src={src}
                    alt={`Project image ${idx + 1}`}
                    className="img-fluid w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const ProjectDetailsPage = () => (
  <>
    <HeaderOne />
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main>
          <ProjectDetailSection />
        </main>
        <FooterOne />
      </div>
    </div>
  </>
);

export default ProjectDetailsPage;
