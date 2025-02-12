"use client";
import React, { useEffect } from "react";

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

  return (
    <>
      <div className="company-design-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Company I Worked With</h2>
              <div className="company-list">
                <div
                  className="scroller"
                  data-direction="left"
                  data-speed="slow"
                >
                  <div className="scroller__inner d-flex">
                    <img
                      src="assets/images/client-logos/icon-bik-logo.svg"
                      alt="Company"
                    />
                    <img
                      src="assets/images/client-logos/icon-bik-logo.svg"
                      alt="Company"
                    />
                    <img
                      src="assets/images/client-logos/icon-bik-logo.svg"
                      alt="Company"
                    />
                    <img
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
                  <div className="scroller__inner d-flex">
                    <img
                      src="assets/images/client-logos/01.jpg"
                      alt="Company"
                    />
                    <img
                      src="assets/images/client-logos/02.jpg"
                      alt="Company"
                    />
                    <img
                      src="assets/images/client-logos/03.jpg"
                      alt="Company"
                    />
                    <img
                      src="assets/images/client-logos/04.jpg"
                      alt="Company"
                    />
                    <img
                      src="assets/images/client-logos/05.jpg"
                      alt="Company"
                    />
                    <img
                      src="assets/images/client-logos/06.jpg"
                      alt="Company"
                    />
                    <img
                      src="assets/images/client-logos/07.jpg"
                      alt="Company"
                    />
                    <img
                      src="assets/images/client-logos/08.jpg"
                      alt="Company"
                    />
                    <img
                      src="assets/images/client-logos/09.jpg"
                      alt="Company"
                    />
                    <img
                      src="assets/images/client-logos/10.jpg"
                      alt="Company"
                    />
                    <img
                      src="assets/images/client-logos/11.jpg"
                      alt="Company"
                    />
                    <img
                      src="assets/images/client-logos/12.jpg"
                      alt="Company"
                    />
                    <img
                      src="assets/images/client-logos/13.jpg"
                      alt="Company"
                    />
                    <img
                      src="assets/images/client-logos/14.jpg"
                      alt="Company"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
