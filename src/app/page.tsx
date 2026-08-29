import React from "react";

import type { Metadata } from "next";
import Home from "@/components/home";
import Wrapper from "@/layouts/Wrapper";

export const metadata: Metadata = {
  title: "Asha Lenscraft | Photography & Videography Studio in Khulna",
  description:
    "Asha Lenscraft — Khulna's premier photography & videography studio by Anindo Roy. Wedding, event, couple, single, outdoor & indoor photography and videography. 100+ five-star reviews. Book your session today.",
  keywords: [
    "photography Khulna",
    "videography Khulna",
    "wedding photography Khulna",
    "wedding videography Khulna",
    "event photography Khulna",
    "couple photoshoot Khulna",
    "single portrait photography Khulna",
    "outdoor photography Khulna",
    "indoor studio photoshoot Khulna",
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
};

export default function index() {
  return (
    <Wrapper>
      <Home />
    </Wrapper>
  );
}
