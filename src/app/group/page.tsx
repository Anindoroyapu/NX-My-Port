import Group from "@/components/group/index";
import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Event Management | Asha Lenscraft",
  description:
    "Internal event management for Asha Lenscraft photography & videography bookings.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GroupPage() {
  return (
    <Wrapper>
      <Group />
    </Wrapper>
  );
}
