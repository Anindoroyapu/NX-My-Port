import Service from "@/components/service";
import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Services | Photography & Videography in Khulna",
  description:
    "Explore Asha Lenscraft's services in Khulna — wedding, event, couple, single, outdoor & indoor photography and videography by Anindo Roy. Book your session today.",
  keywords: [
    "photography services Khulna",
    "videography services Khulna",
    "wedding photography Khulna",
    "event videography Khulna",
    "couple photoshoot Khulna",
    "outdoor photography Khulna",
    "indoor studio photoshoot Khulna",
  ],
  alternates: {
    canonical: "https://ashaa.xyz/service",
  },
  openGraph: {
    title: "Services | Photography & Videography in Khulna",
    description:
      "Wedding, event, couple, single, outdoor & indoor photography and videography in Khulna, Bangladesh.",
    url: "https://ashaa.xyz/service",
  },
};

export default function index() {
  return (
    <Wrapper>
      <Service />
    </Wrapper>
  );
}
