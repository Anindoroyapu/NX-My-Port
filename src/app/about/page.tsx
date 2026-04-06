import About from "@/components/about";
import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About Anindo Roy | Photographer at Asha Lenscraft",
  description:
    "Meet Anindo Roy — a professional photographer with 8+ years of experience in wedding, portrait, wildlife and fashion photography based in Khulna, Bangladesh.",
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
