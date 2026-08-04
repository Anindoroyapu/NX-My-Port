import Projects from "@/components/projects";
import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Portfolio | Photography & Videography Projects in Khulna",
  description:
    "Browse the portfolio of Asha Lenscraft — wedding, event, couple, single, outdoor & indoor photography and videography projects in Khulna, Bangladesh by Anindo Roy.",
  keywords: [
    "photography portfolio Khulna",
    "videography portfolio Khulna",
    "wedding photography Khulna",
    "event videography Khulna",
    "couple photoshoot Khulna",
    "outdoor photography Khulna",
    "indoor studio photoshoot Khulna",
  ],
  alternates: { canonical: "https://ashaa.xyz/projects" },
  openGraph: {
    title: "Photography & Videography Portfolio | Asha Lenscraft",
    description:
      "Explore our curated projects — wedding, event, couple, single, outdoor & indoor photography and videography in Khulna, Bangladesh.",
    url: "https://ashaa.xyz/projects",
  },
};

export default function index() {
  return (
    <Wrapper>
      <Projects />
    </Wrapper>
  );
}
