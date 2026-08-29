import React from "react";

import type { Metadata } from "next";
import Home from "@/components/home";
import Wrapper from "@/layouts/Wrapper";
export const metadata: Metadata = {
  title: "Anindo - Portfolio Next JS",
  description:
    "Anindo - Personal Portfolio Next. photography studios, painter portfolio",
};

export default function index() {
  return (
    <Wrapper>
      <Home />
    </Wrapper>
  );
}
