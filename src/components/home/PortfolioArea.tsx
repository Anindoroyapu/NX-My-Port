"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import ImagePopup from "@/modals/ImagePopup";

import portfolio_img_1 from "@/assets/images/projects/_MG_0151 copy.jpg";
import portfolio_img_2 from "@/assets/images/projects/_MG_6619-01.jpeg";
import portfolio_img_3 from "@/assets/images/projects/_MG_2549-01.jpeg";
import portfolio_img_4 from "@/assets/images/projects/_MG_8549 copy.jpg";
import portfolio_img_5 from "@/assets/images/projects/_MG_8733 copy.jpg";
import portfolio_img_6 from "@/assets/images/projects/_MG_1558.jpg";
import portfolio_img_7 from "@/assets/images/projects/_MG_1559.jpg";
import portfolio_img_8 from "@/assets/images/projects/IMG_0092.jpg";

interface DataType {
  id: number;
  col: string;
  image: StaticImageData;
  title: string;
  category: string;
}

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

  const image = portfolio_data.slice(0, 5).map((item) => item.image.src);

  return (
    <>
      <div className="projects-area" id="portfolio">
        <div className="custom-icon">
          <img src="assets/images/custom/work-scribble.svg" alt="custom" />
        </div>
        <div className="container-fluid">
          <div className="row g-4 portfolio-grid">
            {portfolio_data.map((item, i) => (
              <div
                key={i}
                className={`col-md-6 col-xl-${item.col} portfolio-item category-1`}
              >
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => handleImagePopup(i)}
                  className="work-popup"
                >
                  <div className="portfolio-box">
                    <Image
                      src={item.image}
                      alt=""
                      style={{ height: "auto" }}
                      data-rjs="2"
                    />
                    <span className="portfolio-category">{item.category}</span>
                    <div className="portfolio-caption">
                      <h1>{item.title}</h1>
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
