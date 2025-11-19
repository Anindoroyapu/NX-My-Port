"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function BrandArea() {
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      const scrollers = document.querySelectorAll(".scroller");
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", "true");
        const scrollerInner = scroller.querySelector(".scroller__inner");
        if (!scrollerInner) return;
        const scrollerContent = Array.from(scrollerInner.children);
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true) as HTMLElement;
          duplicatedItem.setAttribute("aria-hidden", "true");
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  }, []);

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
    <div className="company-design-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h2>Company I Worked With</h2>
            <div className="company-list">
              <div className="scroller" data-direction="left" data-speed="slow">
                <div className="scroller__inner d-flex">
                  <img
                    src="assets/images/client-logos/icon-bik-logo.svg"
                    alt="Company"
                  /> <img
                    src="assets/images/client-logos/icon-bik-logo.svg"
                    alt="Company"
                  /> <img
                    src="assets/images/client-logos/icon-bik-logo.svg"
                    alt="Company"
                  /> <img
                    src="assets/images/client-logos/icon-bik-logo.svg"
                    alt="Company"
                  /> <img
                    src="assets/images/client-logos/icon-bik-logo.svg"
                    alt="Company"
                  /> 
                
                </div>
              </div>
            </div>
            <div className="company-list">
              <div
                className="scroller"
                data-direction="right"
                data-speed="slow"
              >
                <div className="scroller__inner_img d-flex ">
                  {images2.map((url, index) => (
                    <Image width={100} height={100} sizes="100vw" className=" h-full w-auto" key={index} src={url} alt={`Company ${index + 1}`}  />
                  ))}
                </div>
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>
 
  );
}
