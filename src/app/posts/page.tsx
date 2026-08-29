import PostsPage from "@/components/posts/PostsPage";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Wrapper from "@/layouts/Wrapper";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Gallery | Photography & Videography Work in Khulna",
  description:
    "Browse Asha Lenscraft's gallery — wedding, event, couple, single, outdoor & indoor photography and videography from Khulna, Bangladesh by Anindo Roy.",
  keywords: [
    "photography gallery Khulna",
    "videography gallery Khulna",
    "wedding photos Khulna",
    "event photography Khulna",
    "outdoor photoshoot Khulna",
    "indoor studio photos Khulna",
  ],
  alternates: {
    canonical: "https://ashaa.xyz/posts",
  },
  openGraph: {
    title: "Gallery | Asha Lenscraft Khulna",
    description:
      "Wedding, event, couple, outdoor & indoor photography and videography gallery from Khulna, Bangladesh.",
    url: "https://ashaa.xyz/posts",
  },
};

const Page = () => {
  return (
    <Wrapper>
      <HeaderOne />
      <div
        className="bg-white"
        id="smooth-wrapper"
        style={{ paddingTop: "100px" }}
      >
        <div id="smooth-content">
          <PostsPage />
        </div>
      </div>
    </Wrapper>
  );
};

export default Page;
