import About from "@/components/about";
import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About Anindo - Portfolio Next JS Template",
  description: "Anindo - Portfolio Next JS Template fresh and clean Design. ",
};

export default function index() {
  return (
    <Wrapper>
      <About />
    </Wrapper>
  );
}
