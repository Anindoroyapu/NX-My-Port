import About from "@/components/about";
import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About Anindo Roy | Photographer & Videographer at Asha Lenscraft",
  description:
    "Meet Anindo Roy — a professional photographer & videographer with 8+ years of experience in wedding, event, couple, outdoor & indoor photography and videography based in Khulna, Bangladesh.",
  keywords: [
    "Anindo Roy photographer",
    "Anindo Roy videographer",
    "photographer in Khulna",
    "videographer in Khulna",
    "wedding photographer Khulna",
    "event videographer Khulna",
  ],
  alternates: { canonical: "https://ashaa.xyz/about" },
  openGraph: {
    title: "About Anindo Roy | Photographer at Asha Lenscraft",
    description:
      "8+ years of experience capturing meaningful moments. 1000+ projects completed. 90% client satisfaction.",
    url: "https://ashaa.xyz/about",
  },
};

export default function index() {
  return (
    <Wrapper>
      <About />
    </Wrapper>
  );
}
