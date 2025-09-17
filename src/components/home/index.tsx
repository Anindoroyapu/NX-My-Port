import React from "react";
import HeroArea from "./HeroArea";
import BrandArea from "./BrandArea";
import AboutArea from "./AboutArea";
import ServiceArea from "./ServiceArea";
import HeaderOne from "@/layouts/headers/HeaderOne";
import PortfolioArea from "./PortfolioArea";
import TestimonoalArea from "./TestimonoalArea";
import BlogArea from "./BlogArea";
import ContactArea from "./ContactArea";
import FooterOne from "@/layouts/footers/FooterOne";
import AlbumPage from "./AlbumPage";

export default function Home() {
  return (
    <>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <HeroArea />
            <BrandArea />
            <AboutArea />
            {/* <ServiceArea /> */}
            <AlbumPage />
            <PortfolioArea />

            <TestimonoalArea />
            <BlogArea />
            <ContactArea />
          </main>
          <FooterOne />
        </div>
      </div>
    </>
  );
}
