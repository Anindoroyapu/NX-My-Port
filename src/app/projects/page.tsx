import Projects from "@/components/projects";
import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Portfolio | Photography Projects by Asha Lenscraft",
  description:
    "Browse the photography portfolio of Asha Lenscraft — wedding, portrait, wildlife, fashion and event photography projects by Anindo Roy.",
  alternates: { canonical: "https://ashaa.xyz/projects" },
  openGraph: {
    title: "Photography Portfolio | Asha Lenscraft",
    description:
      "Explore our curated photography projects — weddings, portraits, wildlife, fashion and events.",
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
