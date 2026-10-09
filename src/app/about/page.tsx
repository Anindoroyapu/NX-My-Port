import About from "@/components/about";
import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "About Anindo - Portfolio Next JS Template",
  description: "Anindo - Portfolio Next JS Template fresh and clean Design. ",
=======
  title:
    "About Anindo Roy | Professional Photographer & Videographer in Khulna & Indore",
  description:
    "Meet Anindo Roy — a professional photographer & videographer with 8+ years of experience in wedding, event, couple, outdoor & indoor photography and videography serving clients in Khulna, Bangladesh and Indore, India.",
  keywords: [
    "Anindo Roy photographer",
    "Anindo Roy videographer",
    "photographer in Khulna",
    "photographer in Indore",
    "videographer in Khulna",
    "videographer in Indore",
    "wedding photographer Indore",
    "event videographer Indore",
  ],
  alternates: { canonical: "https://ashaa.xyz/about" },
  openGraph: {
    title: "About Anindo Roy | Photographer at Asha Lenscraft",
    description:
      "8+ years of experience capturing meaningful moments. 1000+ projects completed. 90% client satisfaction.",
    url: "https://ashaa.xyz/about",
  },
>>>>>>> be4d760c4a0cda0777a97f89459bfcd6687413f2
};

export default function index() {
  return (
    <Wrapper>
      <About />
    </Wrapper>
  );
}
