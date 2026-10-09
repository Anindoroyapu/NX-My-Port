import React from "react";

import type { Metadata } from "next";
import Home from "@/components/home";
import Wrapper from "@/layouts/Wrapper";
export const metadata: Metadata = {
<<<<<<< HEAD
  title: "Anindo - Portfolio Next JS",
  description:
    "Anindo - Personal Portfolio Next. photography studios, painter portfolio",
=======
  title:
    "Asha Lenscraft | Professional Photography & Videography Studio in Khulna & Indore",
  description:
    "Asha Lenscraft — Your premier destination for professional photography & videography in Khulna and Indore. Specialized in wedding, event, couple, portrait, outdoor & indoor shoots. Book your session today.",
  keywords: [
    "photography Khulna",
    "videography Khulna",
    "photography Indore",
    "videography Indore",
    "wedding photography Khulna",
    "wedding photography Indore",
    "event photography Indore",
    "couple photoshoot Indore",
    "outdoor photography Indore",
    "indoor studio photoshoot Indore",
    "best photographer in Khulna",
    "খুলনা ফটোগ্রাফি",
    "খুলনা ভিডিওগ্রাফি",
  ],
  alternates: {
    canonical: "https://ashaa.xyz",
  },
  openGraph: {
    title: "Asha Lenscraft | Photography & Videography Studio in Khulna",
    description:
      "Wedding, event, couple, single, outdoor & indoor photography and videography in Khulna. Book your session with Anindo Roy — 100+ five-star reviews.",
    url: "https://ashaa.xyz",
    images: [
      {
        url: "/assets/images/projects/asha-main.jpg",
        width: 1200,
        height: 630,
        alt: "Asha Lenscraft Photography Studio",
      },
    ],
  },
>>>>>>> be4d760c4a0cda0777a97f89459bfcd6687413f2
};

export default function index() {
  return (
    <Wrapper>
      <Home />
    </Wrapper>
  );
}
