"use client";
import React, { useState } from "react";
import img_1 from "@/assets/images/projects/_MG_6619-01.jpeg";
import img_2 from "@/assets/images/projects/_MG_0151 copy.jpg";
import img_3 from "@/assets/images/projects/_MG_1559.jpg";
import img_4 from "@/assets/images/projects/_MG_2549-01.jpeg";
import Image from "next/image";
import ImagePopup from "@/modals/ImagePopup";

const portfolio_images = [
  {
    id: 1,
    image: img_1,
  },
  {
    id: 2,
    image: img_2,
  },
  {
    id: 3,
    image: img_3,
  },
  {
    id: 4,
    image: img_4,
  },
];

export default function SingleProjectArea() {
  // photoIndex
  const [photoIndex, setPhotoIndex] = useState(null);
  // image open state
  const [isOpen, setIsOpen] = useState(false);
  // handleImagePopup
  const handleImagePopup = (i: any) => {
    setPhotoIndex(i);
    setIsOpen(true);
  };
  //  images
  const image = portfolio_images.slice(0, 5).map((item) => item.image.src);

  return (
    <>
      <div className="single-project-page-design">
        <div className="single-project-image">
          <img src="assets/images/projects/_MG_0151 copy.jpg" alt="image" />
        </div>
        <div className="container pt-60 pb-40">
          <div className="row">
            <div className="col-lg-4">
              <div className="single-project-page-left wow fadeInUp delay-0-2s">
                <div className="single-info">
                  <p>Year</p>
                  <h3>2024</h3>
                </div>
                <div className="single-info">
                  <p>Client</p>
                  <h3>ASHA Studio</h3>
                </div>
                <div className="single-info">
                  <p>Services</p>
                  <h3>Photography</h3>
                </div>
                <div className="single-info">
                  <p>Project</p>
                  <h3>Creative</h3>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="single-project-page-right wow fadeInUp delay-0-4s">
                <h2>Description</h2>
                <p>
                  I specialize in portrait photography, turning moments into
                  memories that tell unique, personal stories. My work focuses
                  on capturing authentic emotions, natural expressions, and the
                  beauty of individuality in every frame.
                </p>
                <p>
                  With an emphasis on lighting, composition, and connection, I
                  aim to create portraits that feel timeless and meaningful.
                  Whether it’s a candid smile or a thoughtful gaze, each image
                  is crafted to celebrate the essence of the person in front of
                  the lens. For collaborations or bookings, let’s connect and
                  create portraits that truly reflect you.
                </p>
                <p>Portrait Photographer | Capturing Authentic Emotions</p>
              </div>
            </div>
          </div>

          <div className="row pt-60">
            {portfolio_images.map((item, i) => (
              <div className="col-lg-6">
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => handleImagePopup(i)}
                  className="work-popup"
                >
                  <div className="single-image wow fadeInUp delay-0-2s">
                    <Image
                      src={item.image}
                      style={{ height: "auto" }}
                      alt="gallery"
                    />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* image light box start */}
      {isOpen && (
        <ImagePopup
          images={image}
          setIsOpen={setIsOpen}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
        />
      )}
      {/* image light box end */}
    </>
  );
}
