import React from "react";

import type { Metadata } from "next";
import Wrapper from "@/layouts/Wrapper";
import BlogDetails from "@/components/blog-details";
export const metadata: Metadata = {
  title: "About Anindo - Portfolio Next JS Template",
  description: "Anindo - Portfolio Next JS Template fresh and clean Design. ",
};

export default function index() {
  return (
    <Wrapper>
      <BlogDetails />
    </Wrapper>
  );
}
