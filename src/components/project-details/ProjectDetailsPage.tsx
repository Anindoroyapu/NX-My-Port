"use client";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Image from "next/image";
import React, { useEffect, useState } from "react";



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
              "url('https://raw.githubusercontent.com/Anindoroyapu/image_ar/main/DSC07893.gif')",
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
