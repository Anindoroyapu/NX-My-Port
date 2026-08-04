import ProjectDetailsPage from "@/components/project-details/ProjectDetailsPage";
import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Project Details | Photography & Videography in Khulna",
  description:
    "Explore project details from Asha Lenscraft — wedding, event, couple, single, outdoor & indoor photography and videography in Khulna, Bangladesh.",
  alternates: {
    canonical: "https://ashaa.xyz/project-details",
  },
  openGraph: {
    title: "Project Details | Asha Lenscraft",
    description:
      "Wedding, event, couple, single, outdoor & indoor photography and videography in Khulna, Bangladesh.",
    url: "https://ashaa.xyz/project-details",
  },
};

export default function index() {
  return (
    <Wrapper>
      <ProjectDetailsPage />
    </Wrapper>
  );
}
