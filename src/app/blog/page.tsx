import Blog from "@/components/blog";
import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Stories & Blog | Asha Lenscraft Photography",
  description:
    "Photography stories, tips and behind-the-scenes from Asha Lenscraft. Birds, wildlife, flowers and more captured by Anindo Roy.",
  alternates: { canonical: "https://ashaa.xyz/blog" },
  openGraph: {
    title: "Photography Stories | Asha Lenscraft",
    description:
      "Photography stories, tips and behind-the-scenes by Anindo Roy.",
    url: "https://ashaa.xyz/blog",
  },
};

export default function index() {
  return (
    <Wrapper>
      <Blog />
    </Wrapper>
  );
}
