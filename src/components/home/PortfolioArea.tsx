"use client";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import ImagePopup from "@/modals/ImagePopup";

import portfolio_img_1 from "@/assets/images/projects/_MG_0151 copy.jpg";
import portfolio_img_2 from "@/assets/images/projects/_MG_6619-01.jpeg";
import portfolio_img_3 from "@/assets/images/projects/_MG_2549-01.jpeg";
import portfolio_img_4 from "@/assets/images/projects/_MG_8549 copy.jpg";
import portfolio_img_5 from "@/assets/images/projects/_MG_8733 copy.jpg";
import portfolio_img_6 from "@/assets/images/projects/_MG_1558.jpg";
import portfolio_img_7 from "@/assets/images/projects/_MG_1559.jpg";
import portfolio_img_8 from "@/assets/images/projects/IMG_0093.jpg";

type DataType = {
  id: number;
  col: string;
  image: StaticImageData;
  title: string;
  category: string;
};

const portfolio_data: DataType[] = [
  {
    id: 1,
    col: "6",
    image: portfolio_img_1,
    title: "Glasses of Cocktail",
    category: "Branding",
  },
  {
    id: 2,
    col: "6",
    image: portfolio_img_2,
    title: "A Branch with Flowers",
    category: "Mockup",
  },
  {
    id: 3,
    col: "4",
    image: portfolio_img_3,
    title: "Orange Rose Flower",
    category: "Video",
  },
  {
    id: 4,
    col: "4",
    image: portfolio_img_4,
    title: "Green Plant on a Desk",
    category: "Branding",
  },
  {
    id: 5,
    col: "4",
    image: portfolio_img_5,
    title: "Orange Rose Flower",
    category: "Mockup",
  },
  {
    id: 6,
    col: "4",
    image: portfolio_img_6,
    title: "Orange Rose Flower",
    category: "Video",
  },
  {
    id: 7,
    col: "4",
    image: portfolio_img_7,
    title: "Green Plant on a Desk",
    category: "Branding",
  },
  {
    id: 8,
    col: "4",
    image: portfolio_img_8,
    title: "Orange Rose Flower",
    category: "Mockup",
  },
];

export default function PortfolioArea() {
  const [photoIndex, setPhotoIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleImagePopup = (i: any) => {
    setPhotoIndex(i);
    setIsOpen(true);
  };

  const [images2, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchImages() {
      const res = await fetch(
        "https://api.github.com/repos/Anindoroyapu/image_ar/contents",
      );
      const data = await res.json();
      const imageFiles = data
        .filter((file: any) => file.name.match(/\.(jpg|jpeg|png|gif)$/i))
        .map((file: any) => file.download_url);
      setImages(imageFiles);
    }
    fetchImages();
  }, []);
  const image = portfolio_data.slice(0, 5).map((item) => item.image.src);

  return (
    <>
      <div className="projects-area" id="portfolio">
        <div className="custom-icon">
          <img src="assets/images/custom/work-scribble.svg" alt="custom" />
        </div>
        <div className="container-fluid">
          <div className="row g-4 portfolio-grid">
            {images2.map((url, index) => (
              <div
                key={index}
                className={`col-md-6 col-xl-4 portfolio-item category-1`}
              >
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => handleImagePopup(index)}
                  className="work-popup"
                >
                  <div className="portfolio-box">
                    <Image
                      src={url}
                      alt=""
                      style={{ height: "auto" }}
                      loading="lazy"
                      quality={80}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      data-rjs="2"
                      width={500}
                      height={500}
                    />
                    <span className="portfolio-category">{index}</span>
                    <div className="portfolio-caption">
                      <h1>{index}</h1>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <ImagePopup
          images={image}
          setIsOpen={setIsOpen}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
        />
      )}
    </>
  );
}
