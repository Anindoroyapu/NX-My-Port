import SingleProject from "@/components/single-project";
import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Project | Photography & Videography Portfolio in Khulna",
  description:
    "A closer look at an Asha Lenscraft project — wedding, event, couple, outdoor & indoor photography and videography in Khulna, Bangladesh by Anindo Roy.",
  alternates: {
    canonical: "https://ashaa.xyz/single-project",
  },
  openGraph: {
    title: "Project | Asha Lenscraft Portfolio",
    description:
      "Wedding, event, couple, outdoor & indoor photography and videography work in Khulna, Bangladesh.",
    url: "https://ashaa.xyz/single-project",
  },
};

export default function index() {
  return (
    <Wrapper>
      <SingleProject />
    </Wrapper>
  );
}
