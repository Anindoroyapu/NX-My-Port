import Videography from "@/components/videography";
import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Videography | Asha Lenscraft Photography & Videography",
  description:
    "Explore our videography portfolio — wedding, event, couple, and outdoor videography projects in Khulna, Bangladesh by Anindo Roy of Asha Lenscraft.",
  keywords: [
    "videography Khulna",
    "wedding videography Khulna",
    "event videography Bangladesh",
    "Asha Lenscraft videography",
    "videography portfolio",
  ],
  alternates: { canonical: "https://ashaa.xyz/videography" },
  openGraph: {
    title: "Videography Portfolio | Asha Lenscraft",
    description:
      "Watch our videography work — wedding, events, couples, and outdoor videography in Khulna, Bangladesh.",
    url: "https://ashaa.xyz/videography",
  },
};

export default function VideographyPage() {
  return (
    <Wrapper>
      <Videography />
    </Wrapper>
  );
}
