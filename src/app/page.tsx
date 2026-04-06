import React from "react";

import type { Metadata } from "next";
import Home from "@/components/home";
import Wrapper from "@/layouts/Wrapper";

export const metadata: Metadata = {
  title: "Asha Lenscraft | Professional Photography Studio in Khulna",
  description:
    "Asha Lenscraft — Khulna's premier photography studio by Anindo Roy. 8+ years of experience in wedding, portrait, wildlife & fashion photography. 100+ five-star reviews. Book your session today.",
  alternates: {
    canonical: "https://ashaa.xyz",
  },
  openGraph: {
    title: "Asha Lenscraft | Professional Photography Studio in Khulna",
    description:
      "Capturing life's most meaningful moments with artistry and emotion. Book your session with Anindo Roy — 100+ five-star reviews.",
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
