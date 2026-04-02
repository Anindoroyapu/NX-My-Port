import Group from "@/components/group/index";
import Wrapper from "@/layouts/Wrapper";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Group Events | Anindo - Portfolio Next JS",
  description:
    "Manage and organize event data in separate sections from the Group page.",
};

export default function GroupPage() {
  return (
    <Wrapper>
      <Group />
    </Wrapper>
  );
}
