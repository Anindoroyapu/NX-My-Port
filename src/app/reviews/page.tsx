import ReviewsPage from "@/components/reviews/ReviewsPage";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Reviews | Asha Lenscraft Photography & Videography Khulna",
  description:
    "Read 100+ five-star reviews for Asha Lenscraft — Khulna's trusted wedding, event, couple, outdoor & indoor photography and videography studio by Anindo Roy.",
  keywords: [
    "Asha Lenscraft reviews",
    "best photographer Khulna reviews",
    "wedding photographer Khulna reviews",
    "videographer Khulna reviews",
  ],
  alternates: {
    canonical: "https://ashaa.xyz/reviews",
  },
  openGraph: {
    title: "Client Reviews | Asha Lenscraft Khulna",
    description:
      "100+ five-star reviews for photography & videography in Khulna, Bangladesh.",
    url: "https://ashaa.xyz/reviews",
  },
};

const P = () => {
  return <ReviewsPage />;
};

export default P;
